const { io } = require('socket.io-client');

console.log('Testing WebSocket connection to BiteBase AI Backend...');

const socket = io('http://localhost:45003', {
  transports: ['websocket', 'polling']
});

socket.on('connect', () => {
  console.log('✅ Connected to backend server');
  console.log('Socket ID:', socket.id);
  
  // Test analysis workflow
  const sessionId = `test_${Date.now()}`;
  console.log('🚀 Starting test analysis:', sessionId);
  
  socket.emit('start-analysis', {
    sessionId,
    parameters: {
      location: 'Bangkok',
      cuisine: 'Thai',
      budget: 500000
    }
  });
});

socket.on('agent-started', (data) => {
  console.log('🎯 Agent started:', data);
});

socket.on('agent-progress', (data) => {
  console.log('📊 Progress:', `${data.agent}: ${Math.round(data.agentProgress)}% - ${data.message}`);
});

socket.on('agent-completed', (data) => {
  console.log('✅ Agent completed:', data.agent);
});

socket.on('analysis-completed', (data) => {
  console.log('🎉 Analysis completed!');
  console.log('Recommendations:', data.data.recommendations);
  process.exit(0);
});

socket.on('analysis-error', (error) => {
  console.error('❌ Analysis error:', error);
  process.exit(1);
});

socket.on('disconnect', () => {
  console.log('🔌 Disconnected from server');
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection error:', error.message);
  process.exit(1);
});

// Timeout after 30 seconds
setTimeout(() => {
  console.log('⏰ Test timeout');
  process.exit(1);
}, 30000);