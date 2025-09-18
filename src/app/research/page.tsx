import ResearchWorkflow from '@/components/landing/ResearchWorkflow';
import { SharedStateProvider } from '@/components/shared/SharedStateProvider';

export default function ResearchPage() {
  return (
    <SharedStateProvider>
      <ResearchWorkflow />
    </SharedStateProvider>
  );
}