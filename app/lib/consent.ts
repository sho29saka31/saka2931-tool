// GTM(Google Tag Manager)は環境変数 NEXT_PUBLIC_GTM_CONTAINER_ID を設定したときだけ有効になる。
// 同意(Consent Mode v2)の仕組みは saka2931.jp の他サイトと共通。
// NEXT_PUBLIC_GTM_CONTAINER_ID が未設定の間は、CookieBanner自体が非表示になり
// (components/CookieBanner.tsx参照)、このモジュールの関数も何もしない。
const GTM_CONTAINER_ID = process.env.NEXT_PUBLIC_GTM_CONTAINER_ID;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

export function initConsentDefaults() {
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push(args);
  };
  window.gtag("consent", "default", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
    security_storage: "granted",
    wait_for_update: 500,
  });
}

// 同意状態は saka2931.jp 配下の全サイトで共通にする。
// 1度の選択がすべてのサイトに効くよう、Cookieのdomainを .saka2931.jp にする。
const CONSENT_COOKIE_DOMAIN = ".saka2931.jp";

function setCookie(name: string, value: string, days: number) {
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  const shared = location.hostname.endsWith("saka2931.jp") ? `;domain=${CONSENT_COOKIE_DOMAIN}` : "";
  // 共通化前に保存されたホスト単位のCookieが残ると値が食い違うため、先に消す。
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/`;
  document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/${shared};SameSite=Lax`;
}

export function getCookie(name: string) {
  const nameEQ = name + "=";
  let found: string | null = null;
  // 共通化前のホスト単位のCookieと並ぶ場合があるため、最後(=最も新しく書かれたもの)を採用する。
  for (const c of document.cookie.split(";")) {
    const trimmed = c.trimStart();
    if (trimmed.startsWith(nameEQ)) found = trimmed.slice(nameEQ.length);
  }
  return found;
}

let gtmLoaded = false;
function loadGTM() {
  if (gtmLoaded || !GTM_CONTAINER_ID) return;
  gtmLoaded = true;
  window.dataLayer.push({ "gtm.start": new Date().getTime(), event: "gtm.js" });
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_CONTAINER_ID}`;
  document.head.appendChild(script);
}

export function grantConsent() {
  if (typeof window.gtag !== "function") initConsentDefaults();
  window.gtag("consent", "update", {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "granted",
    functionality_storage: "granted",
    personalization_storage: "granted",
  });
  loadGTM();
}

export function denyConsent() {
  if (typeof window.gtag !== "function") initConsentDefaults();
  window.gtag("consent", "update", {
    analytics_storage: "denied",
    functionality_storage: "denied",
    personalization_storage: "denied",
  });
}

export function acceptCookies() {
  setCookie("cookie_consent", "accepted", 365);
  grantConsent();
}

export function rejectCookies() {
  setCookie("cookie_consent", "rejected", 365);
  denyConsent();
}
