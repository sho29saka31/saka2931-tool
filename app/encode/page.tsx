import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "エンコード変換" };
export default function Page() {
  return <ToolShell slug="encode"><Client /></ToolShell>;
}
