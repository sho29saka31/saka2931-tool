import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "文字数カウント" };
export default function Page() {
  return <ToolShell slug="char-counter"><Client /></ToolShell>;
}
