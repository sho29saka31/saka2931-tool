import handler from "vinext/server/fetch-handler";
export * from "vinext/server/fetch-handler";

// 緊急メンテナンス: adac の機能フラグ(service=tool)が有効なあいだ、メンテナンス画面(503)を返す。
// フラグは、saka2931.jp(service)の公開 API から取得する(このサイトには DB がないため)。取得に失敗したときは、止めない(通常どおり表示)。
const FLAG_URL = "https://saka2931.jp/api/maintenance/tool";
const CACHE_MS = 20_000;
let cached: { active: boolean; at: number } | null = null;

async function isMaintenance(): Promise<boolean> {
  if (cached && Date.now() - cached.at < CACHE_MS) return cached.active;
  try {
    const res = await fetch(FLAG_URL, { signal: AbortSignal.timeout(1500) });
    if (res.ok) {
      const body = (await res.json()) as { active?: boolean };
      cached = { active: body.active === true, at: Date.now() };
      return cached.active;
    }
  } catch {
    // 取得できないときは、止めない
  }
  cached = { active: false, at: Date.now() };
  return false;
}

const PAGE = `<!doctype html><html lang="ja"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>メンテナンス中 | saka2931.jp</title></head><body style="font-family:-apple-system,BlinkMacSystemFont,'Hiragino Sans','Noto Sans JP',sans-serif;max-width:32rem;margin:15vh auto;padding:0 1.25rem;line-height:1.8;color:#1f2937"><h1 style="font-size:1.4rem">メンテナンス中です</h1><p>ただいま、メンテナンスのため、このサイトをご利用いただけません。作業が終わり次第、再開します。</p><p><a href="https://status.saka2931.jp">ステータスページで、状況を確認する</a></p></body></html>`;

function viewerOk(request: Request, env: { MAINTENANCE_VIEWER_CODE?: string }): { ok: boolean; redirect?: Response } {
  const code = env.MAINTENANCE_VIEWER_CODE;
  if (!code) return { ok: false };
  const url = new URL(request.url);
  if (url.searchParams.get("viewer") === code) {
    url.searchParams.delete("viewer");
    return { ok: true, redirect: new Response(null, { status: 302, headers: { Location: url.toString(), "Set-Cookie": `maint-viewer=${code}; Path=/; HttpOnly; Secure; SameSite=Lax` } }) };
  }
  return { ok: /(?:^|; )maint-viewer=([^;]*)/.exec(request.headers.get("cookie") ?? "")?.[1] === code };
}

export default {
  async fetch(request: Request, env: { MAINTENANCE_VIEWER_CODE?: string }, ctx: unknown) {
    const { pathname } = new URL(request.url);
    const exempt = pathname === "/robots.txt" || pathname.startsWith("/_next/") || pathname === "/favicon.ico";
    if (!exempt) {
      const v = viewerOk(request, env);
      if (v.redirect) return v.redirect;
      if (!v.ok && (await isMaintenance())) {
        return new Response(PAGE, { status: 503, headers: { "Content-Type": "text/html; charset=utf-8", "Retry-After": "600", "Cache-Control": "no-store" } });
      }
    }
    // vinext の既定の入口(関数、または fetch を持つオブジェクト)へ、そのまま渡す
    const h = handler as unknown as ((r: Request, e: unknown, c: unknown) => Promise<Response>) | { fetch: (r: Request, e: unknown, c: unknown) => Promise<Response> };
    return typeof h === "function" ? h(request, env, ctx) : h.fetch(request, env, ctx);
  },
};
