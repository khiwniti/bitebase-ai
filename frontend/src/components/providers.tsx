'use client';

import { ReportsProvider } from '@/contexts/ReportsContext';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReportsProvider>
      <SharedStateProvider>
        {children}
      </SharedStateProvider>
    </ReportsProvider>
  );
}