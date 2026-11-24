import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "割合・税計算" };
export default function Page() {
  return <ToolShell slug="calc"><Client /></ToolShell>;
}
