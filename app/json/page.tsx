import type { Metadata } from "next";
import { ToolShell } from "../components/ToolShell";
import Client from "./client";

export const metadata: Metadata = { title: "JSON整形" };
export default function Page() {
  return <ToolShell slug="json"><Client /></ToolShell>;
}
