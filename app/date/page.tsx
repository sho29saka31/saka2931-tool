import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "日付計算" };
export default function Page() {
  return <ToolShell slug="date"><Client /></ToolShell>;
}
