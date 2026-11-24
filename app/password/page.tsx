import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "パスワード生成" };
export default function Page() {
  return <ToolShell slug="password"><Client /></ToolShell>;
}
