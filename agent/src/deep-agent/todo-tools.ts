/**
 * TODO Management Tools for Deep Agent Task Planning
 */

import { z } from "zod";
import { tool } from "@langchain/core/tools";
import { Todo } from "./state";

export const writeTodos = tool(
  (args: { todos: Todo[] }) => {
    const timestamp = new Date().toISOString();
    const processedTodos = args.todos.map(todo => ({
      ...todo,
      createdAt: todo.createdAt || timestamp,
      updatedAt: timestamp,
    }));

    return {
      updateType: 'todos',
      update: processedTodos,
      message: `Updated TODO list with ${processedTodos.length} tasks.`
    };
  },
  {
    name: "writeTodos",
    description: "Create or update the agent's TODO list for task planning",
    schema: z.object({
      todos: z.array(z.object({
        content: z.string(),
        status: z.enum(['pending', 'in_progress', 'completed']),
        priority: z.enum(['low', 'medium', 'high']),
        assignedAgent: z.string().optional(),
        createdAt: z.string().optional(),
        updatedAt: z.string().optional(),
      })),
    }),
  }
);

export const todoTools = [writeTodos];