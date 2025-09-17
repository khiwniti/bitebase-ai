import { SharedStateProvider } from "@/components/shared/SharedStateProvider";
import MapComponent from "@/components/map/MapComponent";
import ChatInterface from "@/components/chat/ChatInterface";

export default function Home() {
  return (
    <SharedStateProvider>
      <div className="h-screen bg-gray-100 flex flex-col overflow-hidden">
        <div className="flex-1 flex flex-col max-w-full mx-auto px-2 sm:px-3 overflow-hidden">
          <header className="flex-shrink-0 py-2 sm:py-3">
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 mb-1">
              🗺️ Enhanced AI Map Assistant
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate">
              Professional-grade map interaction with AI assistant
            </p>
          </header>
          
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 min-h-0 overflow-hidden">
            {/* Map Component - Takes up 2/3 of the space */}
            <div className="lg:col-span-2 min-h-0 overflow-hidden">
              <MapComponent />
            </div>
            
            {/* Chat Interface - Takes up 1/3 of the space */}
            <div className="lg:col-span-1 min-h-0 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        </div>
      </div>
    </SharedStateProvider>
  );
}
