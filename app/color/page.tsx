import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "カラー変換" };
export default function Page() {
  return <ToolShell slug="color"><Client /></ToolShell>;
}
