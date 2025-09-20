# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Primary Development Workflow
```bash
# Full development mode with UI, agent, and copilot
bun dev

# UI + Agent only (for studio work)
bun dev:studio

# Individual services
bun dev:ui          # Next.js frontend on port 3000
bun dev:agent       # LangGraph agent on port 8123
bun dev:copilot     # Copilot API on port 4141

# Fast development mode
bun dev:fast        # Next.js with Turbo mode

# Production builds
bun build           # Build for production
bun start           # Start production server
bun lint            # Run ESLint
```

### Agent Development
```bash
cd agent
npx @langchain/langgraph-cli dev --port 8123
```

## Architecture Overview

### Dual-Agent Architecture
This project implements a sophisticated dual-agent system:

1. **Frontend Agent** (Next.js): AI-powered UI generation and business intelligence
   - Location: `src/lib/ai-actions.ts`
   - Handles restaurant analysis, market research, competitor intelligence
   - Generates dynamic UI components based on AI analysis results

2. **Backend Agent** (LangGraph): Deep market research agent framework
   - Location: `agent/src/deep-agent/`
   - Specialized sub-agents: CompetitorAgent, MarketTrendAgent, ConsumerAgent, etc.
   - MCP tool integration for web search, data analysis, and business intelligence

### Core Technology Stack
- **Frontend**: Next.js 14 with React 18, TypeScript
- **UI Framework**: Radix UI + Tailwind CSS + shadcn/ui components
- **AI Integration**: CopilotKit for conversational AI interface
- **Maps**: Mapbox GL JS with react-map-gl
- **Agent Framework**: LangGraph with TypeScript
- **MCP Integration**: Open-source MCP servers (no API keys required)

### Project Structure
```
src/
├── app/                    # Next.js 13+ app router
│   ├── chat/              # AI chat interface
│   ├── research/          # Market research dashboard
│   └── reports/           # Generated reports
├── components/
│   ├── generative/        # AI-generated UI components
│   ├── map/              # Mapbox integration
│   ├── shared/           # State management
│   └── ui/               # shadcn/ui components
├── lib/
│   ├── ai-actions.ts     # AI action framework
│   ├── ai-service.ts     # AI service integration
│   └── generative-ui.tsx # Dynamic UI generation
├── features/             # Business domain modules
│   ├── place/           # Location analysis
│   ├── price/           # Pricing intelligence
│   ├── product/         # Menu/product analysis
│   └── promotion/       # Marketing campaigns
agent/
├── src/
│   ├── deep-agent/      # Production-ready agent framework
│   │   ├── sub-agents.ts    # Specialized market research agents
│   │   ├── mcp-integration.ts # MCP server connections
│   │   └── workflow-engine.ts # Research orchestration
│   └── tools/           # Restaurant intelligence tools
```

### AI Actions Framework
The `ai-actions.ts` file defines a comprehensive action system for AI-driven business intelligence:
- **Place Module**: Market gap analysis, competitor analysis, hotspot detection
- **Product Module**: Menu performance, sales forecasting, customer segmentation
- **Price Module**: Price benchmarking, elasticity analysis, optimization
- **Promotion Module**: Campaign analysis, churn prediction, sentiment analysis

### State Management
Uses a shared state system (`SharedStateProvider.tsx`) with:
- Map state coordination between components
- Real-time data synchronization
- Cross-component communication

### Performance Optimizations
- Lazy loading for heavy components (maps, charts)
- Bundle splitting with specialized chunks (framework, maps, UI, vendor)
- Development vs production optimizations
- Webpack caching and compression

### MCP Server Integration
The deep agent framework uses open-source MCP servers:
- `web-search`: Free Google search scraping
- `qdrant-mcp`: Vector database for semantic memory
- `playwright-mcp`: Browser automation for data collection
- `filesystem-mcp`: Local file operations
- No API keys required for core functionality

## Development Guidelines

### Component Organization
- UI components in `src/components/ui/` (shadcn/ui)
- Business components in `src/components/generative/`
- Map components in `src/components/map/`
- Use lazy loading for heavy components

### AI Integration Patterns
- Extend `AIActionDispatcher` for new business intelligence actions
- Use the `ActionParameters` type system for type safety
- Generate visualizations with `VisualizationSpec` interface
- Follow the action → insight → visualization pattern

### Agent Development
- Sub-agents should inherit from base agent interfaces
- Use MCP tools for external data access
- Implement proper error handling and fallbacks
- Document agent capabilities in `ARCHITECTURE.md`

### Performance Considerations
- Map components are lazy-loaded (see `LazyMapComponent.tsx`)
- Use production builds for performance testing
- Monitor bundle sizes with webpack analyzer
- Implement proper caching strategies

### Environment Configuration
- Development: Uses mock data, reduced analytics
- Production: Real data integration, full feature set
- Configuration in `src/config/production.ts`

## Testing and Quality

### Running Tests
```bash
# Check for existing test patterns first
find . -name "*.test.*" -o -name "test*" -o -name "__tests__"

# Run linting
bun lint

# TypeScript checking
npx tsc --noEmit
```

### Performance Monitoring
- Current development load time: ~10.4s (see PERFORMANCE_GUIDE.md)
- Production target: <2s first load
- Use `curl -w "Total: %{time_total}s\n" http://localhost:3000` for timing

## Key Dependencies
- **Next.js 14**: React framework with app router
- **CopilotKit**: AI chat integration
- **Radix UI**: Accessible component primitives
- **Mapbox GL**: Interactive maps
- **LangGraph**: Agent orchestration framework
- **Tailwind CSS**: Utility-first styling

## Common Issues
- Map loading performance: Use `LazyMapComponent` wrapper
- Bundle size: Check webpack splitting configuration
- Agent communication: Ensure ports 3000, 8123, 4141 are available
- MCP server setup: Follow deep-agent README for tool installation