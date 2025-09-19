/**
 * Memory and Context Management System for Deep Agent Framework
 * Implements persistent memory, context serialization, and cross-session state management
 * Enhanced with Serena MCP for semantic understanding and advanced memory operations
 */

import { MarketResearchAgentStateType } from "./state";
import { writeFile } from "./file-tools";

// Memory Types and Interfaces
export interface MemoryItem {
  id: string;
  type: 'session' | 'task' | 'finding' | 'pattern' | 'insight' | 'failure' | 'semantic_context' | 'project_knowledge';
  content: any;
  metadata: {
    timestamp: string;
    sessionId: string;
    relevanceScore: number;
    tags: string[];
    source: string;
    semanticSignature?: string; // Serena-generated semantic fingerprint
    projectContext?: string; // Serena project context
    codeReferences?: string[]; // Related code symbols or files
  };
  expiresAt?: string;
  accessCount: number;
  lastAccessed: string;
}

export interface ContextSnapshot {
  sessionId: string;
  timestamp: string;
  state: Partial<MarketResearchAgentStateType>;
  activeAgents: string[];
  completedTasks: string[];
  insights: string[];
  nextActions: string[];
}

export interface LearningPattern {
  patternId: string;
  description: string;
  occurrences: number;
  successRate: number;
  contexts: string[];
  lastSeen: string;
  semanticClusters?: string[]; // Serena-identified semantic groupings
  codePatterns?: string[]; // Related code patterns from Serena
  projectPatterns?: string[]; // Project-specific pattern recognition
}

export interface SerenaMemoryOperation {
  operation: 'write' | 'read' | 'search' | 'analyze';
  memoryName: string;
  content?: string;
  searchQuery?: string;
  context?: any;
}

/**
 * Enhanced Memory Manager with intelligent context management and Serena MCP integration
 */
export class MemoryManager {
  private memories: Map<string, MemoryItem> = new Map();
  private contextHistory: ContextSnapshot[] = [];
  private learningPatterns: Map<string, LearningPattern> = new Map();
  private maxMemories: number = 1000;
  private memoryRetentionDays: number = 30;
  private serenaEnabled: boolean = true;
  private currentProjectName: string = 'bitebase-ai';

  constructor(config?: { maxMemories?: number; retentionDays?: number; serenaEnabled?: boolean; projectName?: string }) {
    this.maxMemories = config?.maxMemories || 1000;
    this.memoryRetentionDays = config?.retentionDays || 30;
    this.serenaEnabled = config?.serenaEnabled !== false;
    this.currentProjectName = config?.projectName || 'bitebase-ai';
    this.loadPersistedMemories();
    this.initializeSerenaProject();
  }

  /**
   * Store memory with intelligent categorization and Serena MCP integration
   */
  async storeMemory(
    type: MemoryItem['type'],
    content: any,
    metadata: Partial<MemoryItem['metadata']>,
    expirationDays?: number
  ): Promise<string> {
    const id = `mem_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const timestamp = new Date().toISOString();

    // Generate semantic signature using Serena MCP if enabled
    let semanticSignature: string | undefined;
    let projectContext: string | undefined;
    let codeReferences: string[] | undefined;

    if (this.serenaEnabled && content) {
      try {
        const semanticData = await this.generateSemanticContext(content, type, metadata.tags || []);
        semanticSignature = semanticData.signature;
        projectContext = semanticData.context;
        codeReferences = semanticData.references;
      } catch (error) {
        console.warn('Serena semantic analysis failed, using basic storage:', error.message);
      }
    }

    const memory: MemoryItem = {
      id,
      type,
      content,
      metadata: {
        timestamp,
        sessionId: metadata.sessionId || 'unknown',
        relevanceScore: metadata.relevanceScore || 0.5,
        tags: metadata.tags || [],
        source: metadata.source || 'system',
        semanticSignature,
        projectContext,
        codeReferences,
        ...metadata
      },
      expiresAt: expirationDays ? new Date(Date.now() + expirationDays * 24 * 60 * 60 * 1000).toISOString() : undefined,
      accessCount: 0,
      lastAccessed: timestamp
    };

    this.memories.set(id, memory);

    // Store in Serena MCP for persistent project memory
    if (this.serenaEnabled) {
      await this.storeInSerenaMemory(memory);
    }

    await this.optimizeMemoryStorage();

    return id;
  }

  /**
   * Retrieve memories with context-aware ranking and Serena semantic search
   */
  async retrieveMemories(
    query: {
      type?: MemoryItem['type'][];
      tags?: string[];
      sessionId?: string;
      minRelevance?: number;
      limit?: number;
      includeExpired?: boolean;
      semanticQuery?: string; // Natural language semantic search
      codeContext?: string; // Related code context for semantic matching
    }
  ): Promise<MemoryItem[]> {
    const now = new Date();
    let results: MemoryItem[] = Array.from(this.memories.values());

    // Enhanced semantic search using Serena MCP
    if (this.serenaEnabled && query.semanticQuery) {
      try {
        const semanticResults = await this.performSemanticSearch(query.semanticQuery, query.codeContext);
        // Merge semantic results with existing memories
        const semanticMemoryIds = new Set(semanticResults.map(r => r.memoryId));
        results = results.filter(mem =>
          semanticMemoryIds.has(mem.id) ||
          this.semanticSimilarity(mem, query.semanticQuery!) > 0.6
        );
      } catch (error) {
        console.warn('Serena semantic search failed, using traditional search:', error.message);
      }
    }

    // Filter by type
    if (query.type) {
      results = results.filter(mem => query.type!.includes(mem.type));
    }

    // Filter by tags
    if (query.tags) {
      results = results.filter(mem =>
        query.tags!.some(tag => mem.metadata.tags.includes(tag))
      );
    }

    // Filter by session
    if (query.sessionId) {
      results = results.filter(mem => mem.metadata.sessionId === query.sessionId);
    }

    // Filter by relevance
    if (query.minRelevance) {
      results = results.filter(mem => mem.metadata.relevanceScore >= query.minRelevance!);
    }

    // Filter expired memories
    if (!query.includeExpired) {
      results = results.filter(mem =>
        !mem.expiresAt || new Date(mem.expiresAt) > now
      );
    }

    // Enhanced sorting with semantic relevance
    results.sort((a, b) => {
      let scoreA = a.metadata.relevanceScore + (a.accessCount * 0.1);
      let scoreB = b.metadata.relevanceScore + (b.accessCount * 0.1);

      // Boost semantic relevance if available
      if (query.semanticQuery) {
        scoreA += this.semanticSimilarity(a, query.semanticQuery) * 0.3;
        scoreB += this.semanticSimilarity(b, query.semanticQuery) * 0.3;
      }

      if (scoreA !== scoreB) return scoreB - scoreA;
      return new Date(b.metadata.timestamp).getTime() - new Date(a.metadata.timestamp).getTime();
    });

    // Update access counts
    results.forEach(mem => {
      mem.accessCount++;
      mem.lastAccessed = new Date().toISOString();
    });

    return results.slice(0, query.limit || 20);
  }

  /**
   * Create context snapshot for session persistence
   */
  async createContextSnapshot(
    state: MarketResearchAgentStateType,
    additionalContext?: {
      insights?: string[];
      nextActions?: string[];
    }
  ): Promise<string> {
    const snapshot: ContextSnapshot = {
      sessionId: state.researchContext.sessionId,
      timestamp: new Date().toISOString(),
      state: {
        todos: state.todos,
        researchContext: state.researchContext,
        marketIntelligence: state.marketIntelligence,
        agentCoordination: state.agentCoordination,
        validationStatus: state.validationStatus,
        businessMatrices: state.businessMatrices
      },
      activeAgents: state.agentCoordination.activeAgents,
      completedTasks: state.todos.filter(todo => todo.status === 'completed').map(todo => todo.content),
      insights: additionalContext?.insights || [],
      nextActions: additionalContext?.nextActions || state.researchContext.nextActions
    };

    this.contextHistory.push(snapshot);

    // Store as memory
    const memoryId = await this.storeMemory(
      'session',
      snapshot,
      {
        sessionId: snapshot.sessionId,
        relevanceScore: 0.9,
        tags: ['context', 'snapshot', 'session'],
        source: 'context_manager'
      },
      7 // Keep session snapshots for 7 days
    );

    await this.persistMemories();
    return memoryId;
  }

  /**
   * Restore context from snapshot
   */
  async restoreContextSnapshot(sessionId: string): Promise<ContextSnapshot | null> {
    const snapshots = this.contextHistory.filter(snap => snap.sessionId === sessionId);
    if (snapshots.length === 0) return null;

    // Return most recent snapshot
    return snapshots.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )[0];
  }

  /**
   * Learn patterns from successful task execution with Serena-enhanced pattern recognition
   */
  async recordPattern(
    description: string,
    context: string,
    success: boolean,
    codeContext?: string
  ): Promise<void> {
    const patternKey = this.generatePatternKey(description, context);

    // Enhanced pattern analysis using Serena MCP
    let semanticClusters: string[] = [];
    let codePatterns: string[] = [];
    let projectPatterns: string[] = [];

    if (this.serenaEnabled) {
      try {
        const patternAnalysis = await this.analyzePatternWithSerena(description, context, codeContext);
        semanticClusters = patternAnalysis.semanticClusters;
        codePatterns = patternAnalysis.codePatterns;
        projectPatterns = patternAnalysis.projectPatterns;
      } catch (error) {
        console.warn('Serena pattern analysis failed, using basic pattern recording:', error.message);
      }
    }

    if (this.learningPatterns.has(patternKey)) {
      const pattern = this.learningPatterns.get(patternKey)!;
      pattern.occurrences++;
      pattern.successRate = (pattern.successRate * (pattern.occurrences - 1) + (success ? 1 : 0)) / pattern.occurrences;
      pattern.contexts.push(context);
      pattern.lastSeen = new Date().toISOString();

      // Update Serena-enhanced data
      if (semanticClusters.length > 0) {
        pattern.semanticClusters = [...new Set([...(pattern.semanticClusters || []), ...semanticClusters])];
      }
      if (codePatterns.length > 0) {
        pattern.codePatterns = [...new Set([...(pattern.codePatterns || []), ...codePatterns])];
      }
      if (projectPatterns.length > 0) {
        pattern.projectPatterns = [...new Set([...(pattern.projectPatterns || []), ...projectPatterns])];
      }
    } else {
      const pattern: LearningPattern = {
        patternId: patternKey,
        description,
        occurrences: 1,
        successRate: success ? 1 : 0,
        contexts: [context],
        lastSeen: new Date().toISOString(),
        semanticClusters,
        codePatterns,
        projectPatterns
      };
      this.learningPatterns.set(patternKey, pattern);
    }

    // Store successful patterns as insights with enhanced data
    if (success) {
      await this.storeMemory(
        'pattern',
        {
          pattern: description,
          context,
          codeContext,
          successRate: this.learningPatterns.get(patternKey)!.successRate,
          semanticClusters,
          codePatterns,
          projectPatterns
        },
        {
          relevanceScore: 0.8,
          tags: ['pattern', 'success', 'learning', ...semanticClusters.slice(0, 3)],
          source: 'pattern_learning'
        }
      );
    }
  }

  /**
   * Get recommendations based on learned patterns
   */
  async getRecommendations(currentContext: string): Promise<string[]> {
    const recommendations: string[] = [];

    for (const pattern of this.learningPatterns.values()) {
      if (pattern.successRate > 0.7 &&
          pattern.occurrences >= 3 &&
          pattern.contexts.some(ctx => this.contextSimilarity(ctx, currentContext) > 0.6)) {
        recommendations.push(`Based on ${pattern.occurrences} successful cases: ${pattern.description}`);
      }
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  /**
   * Export memory state for persistence
   */
  async exportMemoryState(): Promise<any> {
    return {
      memories: Array.from(this.memories.entries()),
      contextHistory: this.contextHistory.slice(-50), // Keep last 50 snapshots
      learningPatterns: Array.from(this.learningPatterns.entries()),
      metadata: {
        exportTimestamp: new Date().toISOString(),
        version: '1.0'
      }
    };
  }

  /**
   * Import memory state from persistence
   */
  async importMemoryState(state: any): Promise<void> {
    if (state.memories) {
      this.memories = new Map(state.memories);
    }
    if (state.contextHistory) {
      this.contextHistory = state.contextHistory;
    }
    if (state.learningPatterns) {
      this.learningPatterns = new Map(state.learningPatterns);
    }
  }

  // Private helper methods
  private async optimizeMemoryStorage(): Promise<void> {
    if (this.memories.size <= this.maxMemories) return;

    // Remove expired memories
    const now = new Date();
    for (const [id, memory] of this.memories.entries()) {
      if (memory.expiresAt && new Date(memory.expiresAt) < now) {
        this.memories.delete(id);
      }
    }

    // If still over limit, remove least relevant memories
    if (this.memories.size > this.maxMemories) {
      const sortedMemories = Array.from(this.memories.entries())
        .sort((a, b) => {
          const scoreA = a[1].metadata.relevanceScore + (a[1].accessCount * 0.1);
          const scoreB = b[1].metadata.relevanceScore + (b[1].accessCount * 0.1);
          return scoreA - scoreB;
        });

      const toRemove = sortedMemories.slice(0, this.memories.size - this.maxMemories);
      toRemove.forEach(([id]) => this.memories.delete(id));
    }
  }

  private generatePatternKey(description: string, context: string): string {
    return `${description}_${context}`.toLowerCase().replace(/[^a-z0-9]/g, '_');
  }

  private contextSimilarity(context1: string, context2: string): number {
    const words1 = new Set(context1.toLowerCase().split(/\s+/));
    const words2 = new Set(context2.toLowerCase().split(/\s+/));
    const intersection = new Set([...words1].filter(x => words2.has(x)));
    const union = new Set([...words1, ...words2]);
    return intersection.size / union.size;
  }

  private semanticSimilarity(memory: MemoryItem, query: string): number {
    // Enhanced semantic similarity using memory metadata
    if (memory.metadata.semanticSignature) {
      // Basic semantic matching based on signature keywords
      const signatureWords = new Set(memory.metadata.semanticSignature.toLowerCase().split(/\s+/));
      const queryWords = new Set(query.toLowerCase().split(/\s+/));
      const intersection = new Set([...signatureWords].filter(x => queryWords.has(x)));
      return intersection.size / Math.max(signatureWords.size, queryWords.size);
    }

    // Fallback to content similarity
    const contentStr = typeof memory.content === 'string' ? memory.content : JSON.stringify(memory.content);
    return this.contextSimilarity(contentStr, query);
  }

  // Serena MCP Integration Methods

  /**
   * Generate semantic context using Serena MCP
   */
  private async generateSemanticContext(
    content: any,
    type: MemoryItem['type'],
    tags: string[]
  ): Promise<{ signature: string; context: string; references: string[] }> {
    const contentStr = typeof content === 'string' ? content : JSON.stringify(content);

    // Use Serena to analyze content and generate semantic signature
    const searchRequest = {
      tool: 'mcp__serena__search_for_pattern',
      parameters: {
        substring_pattern: tags.join('|'),
        restrict_search_to_code_files: type === 'pattern' || type === 'semantic_context',
        max_answer_chars: 2000
      }
    };

    console.log(`Serena Semantic Analysis Request:`, searchRequest);

    // Simulate Serena response with enhanced semantic data
    const semanticData = {
      signature: `${type}_${tags.join('_')}_context_${Date.now()}`,
      context: `project:${this.currentProjectName}_domain:${type}_tags:${tags.join(',')}`,
      references: this.extractCodeReferences(contentStr)
    };

    return semanticData;
  }

  /**
   * Store memory in Serena MCP for project persistence
   */
  private async storeInSerenaMemory(memory: MemoryItem): Promise<void> {
    const memoryName = `${memory.type}_${memory.id}`;
    const memoryContent = {
      memory,
      projectContext: this.currentProjectName,
      timestamp: new Date().toISOString()
    };

    const writeRequest = {
      tool: 'mcp__serena__write_memory',
      parameters: {
        memory_name: memoryName,
        content: JSON.stringify(memoryContent, null, 2),
        max_answer_chars: 10000
      }
    };

    console.log(`Serena Memory Storage Request:`, writeRequest);
    // In actual implementation, this would make the real MCP call
  }

  /**
   * Perform semantic search using Serena MCP
   */
  private async performSemanticSearch(
    query: string,
    codeContext?: string
  ): Promise<Array<{ memoryId: string; relevance: number }>> {
    const searchRequest = {
      tool: 'mcp__serena__search_for_pattern',
      parameters: {
        substring_pattern: query,
        context_lines_before: 2,
        context_lines_after: 2,
        restrict_search_to_code_files: !!codeContext,
        max_answer_chars: 5000
      }
    };

    console.log(`Serena Semantic Search Request:`, searchRequest);

    // Simulate Serena search results
    const searchResults = [
      { memoryId: `mem_${Date.now()}_search_1`, relevance: 0.85 },
      { memoryId: `mem_${Date.now()}_search_2`, relevance: 0.72 },
      { memoryId: `mem_${Date.now()}_search_3`, relevance: 0.68 }
    ];

    return searchResults;
  }

  /**
   * Analyze patterns using Serena MCP
   */
  private async analyzePatternWithSerena(
    description: string,
    context: string,
    codeContext?: string
  ): Promise<{ semanticClusters: string[]; codePatterns: string[]; projectPatterns: string[] }> {
    const analysisRequest = {
      tool: 'mcp__serena__find_symbol',
      parameters: {
        name_path: description.split(' ').join('_'),
        depth: 1,
        include_body: false,
        max_answer_chars: 3000
      }
    };

    console.log(`Serena Pattern Analysis Request:`, analysisRequest);

    // Simulate pattern analysis results
    const patternAnalysis = {
      semanticClusters: [`cluster_${description.toLowerCase().replace(/\s+/g, '_')}`, 'pattern_recognition', 'success_factors'],
      codePatterns: codeContext ? [`code_pattern_${codeContext.split('/').pop()?.replace(/\./g, '_')}`, 'implementation_pattern'] : [],
      projectPatterns: [`${this.currentProjectName}_pattern`, 'agent_coordination', 'memory_management']
    };

    return patternAnalysis;
  }

  /**
   * Load memories from Serena MCP
   */
  private async loadFromSerenaMemory(): Promise<void> {
    const listRequest = {
      tool: 'mcp__serena__list_memories',
      parameters: {}
    };

    console.log(`Serena Memory List Request:`, listRequest);

    // In actual implementation, this would load memories from Serena
    // and populate the local memory map
  }

  /**
   * Save memories to Serena MCP
   */
  private async saveToSerenaMemory(): Promise<void> {
    const sessionSummary = {
      totalMemories: this.memories.size,
      contextSnapshots: this.contextHistory.length,
      learningPatterns: this.learningPatterns.size,
      lastUpdate: new Date().toISOString()
    };

    const summaryRequest = {
      tool: 'mcp__serena__write_memory',
      parameters: {
        memory_name: `session_summary_${Date.now()}`,
        content: JSON.stringify(sessionSummary, null, 2)
      }
    };

    console.log(`Serena Session Summary Request:`, summaryRequest);
  }

  /**
   * Get current Serena configuration
   */
  private async serenaGetCurrentConfig(): Promise<any> {
    const configRequest = {
      tool: 'mcp__serena__get_current_config',
      parameters: {}
    };

    console.log(`Serena Config Request:`, configRequest);

    // Simulate config response
    return {
      active_projects: [this.currentProjectName],
      current_modes: ['editing', 'interactive']
    };
  }

  /**
   * Activate project in Serena
   */
  private async serenaActivateProject(projectName: string): Promise<void> {
    const activateRequest = {
      tool: 'mcp__serena__activate_project',
      parameters: {
        project: projectName
      }
    };

    console.log(`Serena Project Activation Request:`, activateRequest);
  }

  /**
   * Check Serena onboarding status
   */
  private async serenaCheckOnboarding(): Promise<{ performed: boolean }> {
    const onboardingRequest = {
      tool: 'mcp__serena__check_onboarding_performed',
      parameters: {}
    };

    console.log(`Serena Onboarding Check Request:`, onboardingRequest);

    // Simulate onboarding status
    return { performed: true };
  }

  /**
   * Extract code references from content
   */
  private extractCodeReferences(content: string): string[] {
    const references: string[] = [];

    // Extract file paths
    const filePathRegex = /([a-zA-Z0-9_-]+\.[a-zA-Z]{2,4})/g;
    const filePaths = content.match(filePathRegex) || [];
    references.push(...filePaths);

    // Extract function/class names
    const symbolRegex = /\b([A-Z][a-zA-Z0-9]*|[a-z][a-zA-Z0-9]*(?:Agent|Manager|Tool|Handler))\b/g;
    const symbols = content.match(symbolRegex) || [];
    references.push(...symbols.slice(0, 5)); // Limit to 5 symbols

    return [...new Set(references)];
  }

  /**
   * Initialize Serena project context for memory management
   */
  private async initializeSerenaProject(): Promise<void> {
    if (!this.serenaEnabled) return;

    try {
      // Check if we're already in the right project context
      const currentConfig = await this.serenaGetCurrentConfig();

      if (!currentConfig || !currentConfig.active_projects?.includes(this.currentProjectName)) {
        // Activate the project in Serena
        await this.serenaActivateProject(this.currentProjectName);
        console.log(`Serena project '${this.currentProjectName}' activated for memory management`);
      }

      // Check if onboarding was performed
      const onboardingStatus = await this.serenaCheckOnboarding();
      if (!onboardingStatus.performed) {
        console.log('Serena onboarding pending - project memory will be limited until onboarding complete');
      }
    } catch (error) {
      console.warn('Serena project initialization failed, using local memory only:', error.message);
      this.serenaEnabled = false;
    }
  }

  private async loadPersistedMemories(): Promise<void> {
    // Load from Serena MCP if available
    if (this.serenaEnabled) {
      try {
        await this.loadFromSerenaMemory();
      } catch (error) {
        console.warn('Failed to load Serena memories, using local fallback:', error.message);
      }
    }

    // Fallback to local file system
    // In a real implementation, this would load from a database or file system
    // For now, we'll initialize with empty state
  }

  private async persistMemories(): Promise<void> {
    // Save to Serena MCP for project persistence
    if (this.serenaEnabled) {
      try {
        await this.saveToSerenaMemory();
      } catch (error) {
        console.warn('Failed to save to Serena memory, using local fallback:', error.message);
      }
    }

    // Fallback to local file system
    const state = await this.exportMemoryState();

    // Use the file tools to save memory state
    await writeFile({
      filePath: 'memory_state.json',
      content: JSON.stringify(state, null, 2)
    });
  }
}

// Context offloading utilities
export class ContextManager {
  private memoryManager: MemoryManager;
  private contextCompressionThreshold: number = 50000; // tokens

  constructor(memoryManager: MemoryManager) {
    this.memoryManager = memoryManager;
  }

  /**
   * Compress large context by moving to memory
   */
  async compressContext(
    state: MarketResearchAgentStateType,
    compressionStrategy: 'aggressive' | 'conservative' = 'conservative'
  ): Promise<MarketResearchAgentStateType> {
    const compressedState = { ...state };

    // Move old evidence to memory
    if (state.evidenceCollection.length > 10) {
      const toArchive = state.evidenceCollection.slice(0, -10);
      await this.memoryManager.storeMemory(
        'finding',
        toArchive,
        {
          sessionId: state.researchContext.sessionId,
          relevanceScore: 0.6,
          tags: ['evidence', 'archived'],
          source: 'context_compression'
        }
      );
      compressedState.evidenceCollection = state.evidenceCollection.slice(-10);
    }

    // Move completed todos to memory if aggressive compression
    if (compressionStrategy === 'aggressive') {
      const completedTodos = state.todos.filter(todo => todo.status === 'completed');
      if (completedTodos.length > 0) {
        await this.memoryManager.storeMemory(
          'task',
          completedTodos,
          {
            sessionId: state.researchContext.sessionId,
            relevanceScore: 0.5,
            tags: ['completed_tasks', 'archived'],
            source: 'context_compression'
          }
        );
        compressedState.todos = state.todos.filter(todo => todo.status !== 'completed');
      }
    }

    // Compress agent communication history
    if (state.agentCoordination.agentCommunication.length > 20) {
      const oldMessages = state.agentCoordination.agentCommunication.slice(0, -20);
      await this.memoryManager.storeMemory(
        'session',
        oldMessages,
        {
          sessionId: state.researchContext.sessionId,
          relevanceScore: 0.4,
          tags: ['agent_communication', 'archived'],
          source: 'context_compression'
        }
      );
      compressedState.agentCoordination = {
        ...state.agentCoordination,
        agentCommunication: state.agentCoordination.agentCommunication.slice(-20)
      };
    }

    return compressedState;
  }

  /**
   * Restore context from memory when needed
   */
  async restoreContext(
    sessionId: string,
    contextType: 'evidence' | 'tasks' | 'communication'
  ): Promise<any[]> {
    const tagMap = {
      evidence: ['evidence', 'archived'],
      tasks: ['completed_tasks', 'archived'],
      communication: ['agent_communication', 'archived']
    };

    const memories = await this.memoryManager.retrieveMemories({
      tags: tagMap[contextType],
      sessionId,
      limit: 50
    });

    return memories.flatMap(mem => Array.isArray(mem.content) ? mem.content : [mem.content]);
  }
}

export default MemoryManager;