import { ToolShell } from "../components/ToolShell";
import { tools } from "../tools";
import { itemMetadata } from "../lib/seo";
import Client from "./client";

const item = tools.find((i) => i.slug === "unit")!;
export const metadata = itemMetadata(item);

export default function Page() {
  return <ToolShell slug="unit"><Client /></ToolShell>;
}
