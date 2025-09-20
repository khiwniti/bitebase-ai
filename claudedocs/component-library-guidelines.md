# Component Library Guidelines

## Overview

This document provides comprehensive guidelines for maintaining consistency across the BiteBase AI component library. Based on analysis of existing components, this establishes patterns for UI components, generative components, chat components, and shared state management.

## Architecture Principles

### 1. Three-Tier Component Architecture

**Base UI Components** (`src/components/ui/`)
- Built on shadcn/ui + Radix UI primitives
- Provide foundational, accessible components
- Use class-variance-authority (cva) for variant management
- TypeScript with forwardRef patterns

**Generative Components** (`src/components/generative/`)
- Business logic components for AI-generated content
- Integrate with SharedStateProvider for data management
- Use base UI components as building blocks
- Handle dynamic content creation and user interactions

**Chat Components** (`src/components/chat/`)
- Specialized for AI interaction and conversation flows
- Real-time streaming capabilities with EventSource
- Command processing and history management
- Professional market research command integration

### 2. State Management Strategy

**Centralized State** (`SharedStateProvider.tsx`)
- Single source of truth for map, restaurant, and analysis data
- Real-time updates with streaming capabilities
- Type-safe context with comprehensive interfaces
- Event-driven architecture for component communication

## Component Patterns

### Base UI Component Pattern

```tsx
// Standard shadcn/ui component structure
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"
import { forwardRef } from "react"

const componentVariants = cva(
  "base-classes", // Common styles
  {
    variants: {
      variant: {
        default: "default-styles",
        secondary: "secondary-styles",
      },
      size: {
        default: "default-size",
        sm: "small-size",
        lg: "large-size",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

interface ComponentProps
  extends React.ComponentProps<"element">,
    VariantProps<typeof componentVariants> {
  // Additional props
}

const Component = forwardRef<HTMLElementType, ComponentProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <element
        className={cn(componentVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Component.displayName = "Component"

export { Component, componentVariants }
```

### Generative Component Pattern

```tsx
// Business logic component with state integration
import { useSharedState } from '@/components/shared/SharedStateProvider'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface GenerativeComponentProps {
  data: BusinessData
  onAction?: (action: string, data: any) => void
  showActions?: boolean
}

export function GenerativeComponent({
  data,
  onAction,
  showActions = true
}: GenerativeComponentProps) {
  const {
    addMarker,
    addRestaurant,
    conductMarketAnalysis
  } = useSharedState()

  const handleBusinessAction = async (action: string) => {
    // Business logic implementation
    if (onAction) {
      onAction(action, data)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{data.title}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Content using base UI components */}
        {showActions && (
          <div className="flex gap-2 mt-4">
            <Button onClick={() => handleBusinessAction('approve')}>
              Approve
            </Button>
            <Button variant="outline" onClick={() => handleBusinessAction('modify')}>
              Modify
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
```

### Chat Component Pattern

```tsx
// AI interaction component with streaming
import { useState, useCallback, useRef, useEffect } from 'react'
import { useSharedState } from '@/components/shared/SharedStateProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface ChatComponentProps {
  onMessage?: (message: string) => void
  enableStreaming?: boolean
}

export function ChatComponent({
  onMessage,
  enableStreaming = true
}: ChatComponentProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const { mapState, conductMarketAnalysis } = useSharedState()

  const processAICommand = useCallback(async (userMessage: string) => {
    setIsProcessing(true)
    try {
      // AI command processing logic
      const result = await processCommand(userMessage, mapState)
      addAIMessage(result.content, result.type)
    } catch (error) {
      addAIMessage("Error processing command", "error")
    } finally {
      setIsProcessing(false)
    }
  }, [mapState])

  return (
    <div className="chat-interface">
      {/* Chat implementation using base UI components */}
    </div>
  )
}
```

## Styling Guidelines

### 1. Tailwind CSS Usage

**Consistent Color Palette**
- Use semantic color tokens: `primary`, `secondary`, `destructive`, `muted`
- Maintain contrast ratios for accessibility
- Use design system tokens over arbitrary values

**Spacing and Layout**
- Follow 4px grid system (space-1 = 4px, space-2 = 8px, etc.)
- Use flexbox and grid for layouts
- Maintain consistent padding and margin patterns

### 2. Component Styling Patterns

**State-based Styling**
```tsx
// Use data attributes for state-based styling
<div
  className={cn(
    "base-styles",
    isActive && "active-styles",
    isDisabled && "disabled-styles"
  )}
  data-state={isActive ? "active" : "inactive"}
>
```

**Responsive Design**
```tsx
// Mobile-first responsive patterns
className="text-sm md:text-base lg:text-lg"
className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
```

## Integration Patterns

### 1. State Integration

**Accessing Shared State**
```tsx
const {
  mapState,
  addMarker,
  addRestaurant,
  conductMarketAnalysis,
  generateLocationInsights
} = useSharedState()
```

**Updating State**
```tsx
// Always use provided methods, never direct state mutation
addRestaurant(restaurantData)
updateMapCenter(newCenter)
setAnalysisResults(results)
```

### 2. AI Action Integration

**Action Dispatcher Usage**
```tsx
import { aiActionDispatcher } from '@/lib/ai-actions'

const handleAnalysis = async () => {
  const result = await aiActionDispatcher.dispatch(
    'analyzeCompetitors',
    {
      location: mapState.center,
      radius: 1000,
      cuisineFilter: ['italian', 'thai']
    }
  )

  if (result.success) {
    // Handle success
    setAnalysisResults(result.data)
  }
}
```

### 3. Real-time Streaming

**EventSource Integration**
```tsx
useEffect(() => {
  if (enableStreaming) {
    const eventSource = new EventSource('/api/stream')

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data)
      handleStreamEvent(data)
    }

    return () => eventSource.close()
  }
}, [enableStreaming])
```

## Performance Guidelines

### 1. Lazy Loading

**Component Lazy Loading**
```tsx
import { lazy, Suspense } from 'react'

const HeavyComponent = lazy(() => import('./HeavyComponent'))

function App() {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      <HeavyComponent />
    </Suspense>
  )
}
```

### 2. Memoization

**Expensive Calculations**
```tsx
const expensiveValue = useMemo(() => {
  return calculateExpensiveValue(data)
}, [data])

const memoizedComponent = memo(({ data }) => {
  return <Component data={data} />
})
```

### 3. Bundle Optimization

**Import Optimization**
```tsx
// Prefer named imports
import { Button } from '@/components/ui/button'

// Avoid default imports for large libraries
import { map, filter } from 'lodash-es'
```

## Accessibility Guidelines

### 1. ARIA Implementation

**Semantic HTML**
```tsx
<nav aria-label="Main navigation">
  <ul role="list">
    <li role="listitem">
      <a href="#" aria-current="page">Current Page</a>
    </li>
  </ul>
</nav>
```

**Interactive Elements**
```tsx
<button
  aria-label="Add restaurant to analysis"
  aria-describedby="restaurant-help"
  disabled={isLoading}
>
  {isLoading ? <Spinner /> : "Add Restaurant"}
</button>
```

### 2. Keyboard Navigation

**Focus Management**
```tsx
const [focusedIndex, setFocusedIndex] = useState(0)

const handleKeyDown = (e: KeyboardEvent) => {
  switch (e.key) {
    case 'ArrowDown':
      setFocusedIndex(prev => (prev + 1) % items.length)
      break
    case 'ArrowUp':
      setFocusedIndex(prev => (prev - 1 + items.length) % items.length)
      break
  }
}
```

## Testing Guidelines

### 1. Component Testing

**Unit Tests**
```tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from './button'

test('button handles click events', () => {
  const handleClick = jest.fn()
  render(<Button onClick={handleClick}>Click me</Button>)

  fireEvent.click(screen.getByRole('button'))
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### 2. Integration Testing

**State Integration Tests**
```tsx
test('component integrates with shared state', () => {
  render(
    <SharedStateProvider>
      <ComponentUnderTest />
    </SharedStateProvider>
  )

  // Test state interactions
})
```

## File Organization

### 1. Directory Structure

```
src/components/
├── ui/                    # Base shadcn/ui components
│   ├── button.tsx
│   ├── card.tsx
│   └── input.tsx
├── generative/            # Business logic components
│   ├── MarketAnalysisCard.tsx
│   ├── CompetitorAnalysisCard.tsx
│   └── GenerativeUIManager.tsx
├── chat/                  # AI interaction components
│   ├── ChatInterface.tsx
│   ├── MessageComponent.tsx
│   └── CommandProcessor.tsx
└── shared/                # State and utility components
    ├── SharedStateProvider.tsx
    └── LazyMapComponent.tsx
```

### 2. Naming Conventions

**Component Files**: PascalCase with descriptive names
- `MarketAnalysisCard.tsx` (not `Card.tsx`)
- `CompetitorAnalysisCard.tsx` (not `Competitor.tsx`)

**Prop Interfaces**: Component name + Props
- `MarketAnalysisCardProps`
- `ChatInterfaceProps`

## Migration Guidelines

### 1. Adding New Components

1. **Choose the appropriate tier** (UI, Generative, or Chat)
2. **Follow established patterns** for that tier
3. **Use TypeScript** with proper interface definitions
4. **Integrate with SharedStateProvider** if stateful
5. **Add proper accessibility** attributes
6. **Include error boundaries** for complex components

### 2. Updating Existing Components

1. **Maintain backward compatibility** when possible
2. **Use deprecation warnings** for breaking changes
3. **Update related components** that depend on changes
4. **Test integration points** thoroughly

## Best Practices Summary

1. **Always use base UI components** as building blocks
2. **Integrate with SharedStateProvider** for state management
3. **Follow TypeScript patterns** with proper typing
4. **Implement proper error handling** and loading states
5. **Use class-variance-authority** for component variants
6. **Maintain accessibility standards** throughout
7. **Optimize for performance** with lazy loading and memoization
8. **Test component integration** not just isolated functionality
9. **Document complex business logic** within components
10. **Follow established naming conventions** consistently

This component library provides a solid foundation for building consistent, maintainable, and scalable React components within the BiteBase AI application.