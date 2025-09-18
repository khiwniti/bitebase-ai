import { SharedStateProvider } from "@/components/shared/SharedStateProvider";
import StudioApp from "@/components/landing/StudioApp";
import FastLanding from "@/components/dev/FastLanding";

export default function Home() {
  // Use fast development version in dev mode for quicker loading
  if (process.env.NODE_ENV === 'development') {
    return <FastLanding />;
  }

  return (
    <SharedStateProvider>
      <StudioApp />
    </SharedStateProvider>
  );
}
