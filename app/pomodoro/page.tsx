import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "ポモドーロタイマー" };
export default function Page() {
  return <ToolShell slug="pomodoro"><Client /></ToolShell>;
}
