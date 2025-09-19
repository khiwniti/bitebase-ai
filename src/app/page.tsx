import { SharedStateProvider } from "@/components/shared/SharedStateProvider";
import StudioApp from "@/components/landing/StudioApp";

export default function Home() {
  return (
    <SharedStateProvider>
      <StudioApp />
    </SharedStateProvider>
  );
}
