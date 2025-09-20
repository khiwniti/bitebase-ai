/**
 * Virtual Filesystem Tools for Context Offloading
 */

import { z } from "zod";
import { tool } from "@langchain/core/tools";

export const writeFile = tool(
  (args: { filePath: string; content: string }) => {
    const timestamp = new Date().toISOString();
    const finalContent = `---
Created: ${timestamp}
Updated: ${timestamp}
---

${args.content}`;

    return {
      updateType: 'file',
      filePath: args.filePath,
      content: finalContent,
      message: `File "${args.filePath}" created/updated.`
    };
  },
  {
    name: "writeFile",
    description: "Write or update files in the virtual filesystem",
    schema: z.object({
      filePath: z.string(),
      content: z.string(),
    }),
  }
);

export const fileTools = [writeFile];