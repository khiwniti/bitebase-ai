/**
 * Enhanced Deep Agent State Management
 * Based on LangChain deep-agents-from-scratch patterns
 */

import { BaseMessage } from "@langchain/core/messages";
import { Annotation } from "@langchain/langgraph";
import { RestaurantAnalyticsState } from "../types/restaurant-intelligence";

// TODO Task Tracking
export interface Todo {
  content: string;
  status: 'pending' | 'in_progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  assignedAgent?: string;
  createdAt: string;
  updatedAt: string;
}

// Analysis Context for maintaining research state
export interface AnalysisContext {
  sessionId: string;
  topic: string;
  phase: 'planning' | 'research' | 'analysis' | 'synthesis' | 'reporting';
  objectives: string[];
  findings: Record<string, any>;
  nextActions: string[];
}

// Enhanced Business Intelligence Matrices
export interface BusinessMatrix {
  name: string;
  type: 'swot' | 'porter_5_forces' | 'bcg' | 'ansoff' | 'value_chain' | 'pest' | 'canvas' | 'kpi_dashboard';
  data: Record<string, any>;
  analysis: Record<string, any>;
  recommendations: string[];
  confidence: number;
  lastUpdated: string;
}

// Enhanced Deep Agent State
export const DeepAgentState = Annotation.Root({
  // Core messaging
  messages: Annotation<BaseMessage[]>({
    reducer: (currentState: BaseMessage[], updateValue: BaseMessage[]) => currentState.concat(updateValue),
    default: () => [],
  }),
  
  // Task Planning & Progress Tracking
  todos: Annotation<Todo[]>({
    reducer: (left: Todo[] | undefined, right: Todo[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newTodo of right) {
        const existingIndex = merged.findIndex(todo => todo.content === newTodo.content);
        if (existingIndex >= 0) {
          merged[existingIndex] = newTodo;
        } else {
          merged.push(newTodo);
        }
      }
      return merged;
    },
    default: () => [],
  }),
  
  // Virtual Filesystem for Context Offloading
  files: Annotation<Record<string, string>>({
    reducer: (left: Record<string, string> | undefined, right: Record<string, string> | undefined) => {
      if (!left) return right || {};
      if (!right) return left;
      return { ...left, ...right };
    },
    default: () => ({}),
  }),
  
  // Business Intelligence Matrices
  businessMatrices: Annotation<BusinessMatrix[]>({
    reducer: (left: BusinessMatrix[] | undefined, right: BusinessMatrix[] | undefined) => {
      if (!left) return right || [];
      if (!right) return left;
      
      const merged = [...left];
      for (const newMatrix of right) {
        const existingIndex = merged.findIndex(matrix => matrix.name === newMatrix.name && matrix.type === newMatrix.type);
        if (existingIndex >= 0) {
          merged[existingIndex] = newMatrix;
        } else {
          merged.push(newMatrix);
        }
      }
      return merged;
    },
    default: () => [],
  }),
});

export type DeepAgentStateType = typeof DeepAgentState.State;