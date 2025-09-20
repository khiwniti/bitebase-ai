'use client';

export default function SimplePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            BiteBase AI
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            AI-powered market research for restaurant success
          </p>
          <div className="space-y-4">
            <a href="/chat" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700">
              Start Analysis
            </a>
            <div className="mt-8">
              <h2 className="text-2xl font-bold mb-4">Navigation</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <a href="/chat" className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
                  <h3 className="font-semibold">Chat</h3>
                  <p className="text-sm text-gray-600">AI Analysis</p>
                </a>
                <a href="/reports" className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
                  <h3 className="font-semibold">Reports</h3>
                  <p className="text-sm text-gray-600">View Results</p>
                </a>
                <a href="/map" className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
                  <h3 className="font-semibold">Map</h3>
                  <p className="text-sm text-gray-600">Location Analysis</p>
                </a>
                <a href="/settings" className="p-4 bg-white rounded-lg shadow hover:shadow-lg">
                  <h3 className="font-semibold">Settings</h3>
                  <p className="text-sm text-gray-600">Configuration</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}