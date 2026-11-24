import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "ランダム抽選" };
export default function Page() {
  return <ToolShell slug="random"><Client /></ToolShell>;
}
