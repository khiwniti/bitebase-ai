(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/services/socketService.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SocketService",
    ()=>SocketService,
    "socketService",
    ()=>socketService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
;
class SocketService {
    connect() {
        return new Promise((resolve, reject)=>{
            var _this_socket;
            if ((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected) {
                resolve();
                return;
            }
            this.socket = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(this.serverUrl, {
                timeout: 10000,
                forceNew: false,
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionAttempts: 5
            });
            this.socket.on('connect', ()=>{
                console.log('🔌 Connected to BiteBase AI backend');
                resolve();
            });
            this.socket.on('connect_error', (error)=>{
                console.error('❌ Socket connection error:', error);
                reject(error);
            });
            this.socket.on('disconnect', (reason)=>{
                console.log('❌ Disconnected from backend:', reason);
            });
            // Set up event listeners
            this.setupEventListeners();
        });
    }
    setupEventListeners() {
        if (!this.socket) return;
        this.socket.on('progress-update', (data)=>{
            this.progressCallbacks.forEach((callback)=>callback(data));
        });
        this.socket.on('agent-started', (data)=>{
            this.agentStartedCallbacks.forEach((callback)=>callback(data));
        });
        this.socket.on('agent-completed', (data)=>{
            this.agentCompletedCallbacks.forEach((callback)=>callback(data));
        });
        this.socket.on('analysis-completed', (data)=>{
            this.analysisCompletedCallbacks.forEach((callback)=>callback(data));
        });
        this.socket.on('analysis-error', (data)=>{
            this.errorCallbacks.forEach((callback)=>callback(data));
        });
        this.socket.on('analysis-paused', (data)=>{
            console.log("⏸️ Analysis paused: ".concat(data.sessionId));
        });
        this.socket.on('analysis-resumed', (data)=>{
            console.log("▶️ Analysis resumed: ".concat(data.sessionId));
        });
        this.socket.on('analysis-stopped', (data)=>{
            console.log("🛑 Analysis stopped: ".concat(data.sessionId));
        });
    }
    startAnalysis(sessionId, parameters) {
        var _this_socket;
        if (!((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected)) {
            console.error('❌ Socket not connected');
            return;
        }
        console.log("🚀 Starting analysis for session: ".concat(sessionId));
        this.socket.emit('start-analysis', {
            sessionId,
            parameters
        });
    }
    pauseAnalysis(sessionId) {
        var _this_socket;
        if (!((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected)) {
            console.error('❌ Socket not connected');
            return;
        }
        console.log("⏸️ Pausing analysis: ".concat(sessionId));
        this.socket.emit('pause-analysis', {
            sessionId
        });
    }
    resumeAnalysis(sessionId) {
        var _this_socket;
        if (!((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected)) {
            console.error('❌ Socket not connected');
            return;
        }
        console.log("▶️ Resuming analysis: ".concat(sessionId));
        this.socket.emit('resume-analysis', {
            sessionId
        });
    }
    stopAnalysis(sessionId) {
        var _this_socket;
        if (!((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected)) {
            console.error('❌ Socket not connected');
            return;
        }
        console.log("🛑 Stopping analysis: ".concat(sessionId));
        this.socket.emit('stop-analysis', {
            sessionId
        });
    }
    // Callback registration methods
    onProgress(callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.progressCallbacks.set(id, callback);
        return id;
    }
    onAgentStarted(callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.agentStartedCallbacks.set(id, callback);
        return id;
    }
    onAgentCompleted(callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.agentCompletedCallbacks.set(id, callback);
        return id;
    }
    onAnalysisCompleted(callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.analysisCompletedCallbacks.set(id, callback);
        return id;
    }
    onError(callback) {
        const id = Math.random().toString(36).substr(2, 9);
        this.errorCallbacks.set(id, callback);
        return id;
    }
    // Cleanup methods
    removeCallback(type, id) {
        switch(type){
            case 'progress':
                this.progressCallbacks.delete(id);
                break;
            case 'agentStarted':
                this.agentStartedCallbacks.delete(id);
                break;
            case 'agentCompleted':
                this.agentCompletedCallbacks.delete(id);
                break;
            case 'analysisCompleted':
                this.analysisCompletedCallbacks.delete(id);
                break;
            case 'error':
                this.errorCallbacks.delete(id);
                break;
        }
    }
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
        }
        // Clear all callbacks
        this.progressCallbacks.clear();
        this.agentStartedCallbacks.clear();
        this.agentCompletedCallbacks.clear();
        this.analysisCompletedCallbacks.clear();
        this.errorCallbacks.clear();
    }
    isConnected() {
        var _this_socket;
        return ((_this_socket = this.socket) === null || _this_socket === void 0 ? void 0 : _this_socket.connected) || false;
    }
    getConnectionStatus() {
        if (!this.socket) return 'disconnected';
        if (this.socket.connected) return 'connected';
        if (this.socket.connecting) return 'connecting';
        return 'disconnected';
    }
    constructor(serverUrl = 'http://localhost:3001'){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "socket", null);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "serverUrl", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "progressCallbacks", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "agentStartedCallbacks", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "agentCompletedCallbacks", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "analysisCompletedCallbacks", new Map());
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "errorCallbacks", new Map());
        this.serverUrl = serverUrl;
    }
}
const socketService = new SocketService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/realtime/RealTimeProgress.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "RealTimeProgress",
    ()=>RealTimeProgress,
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/services/socketService.ts [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
const ProgressBar = (param)=>{
    let { value, className = '', size = 'md' } = param;
    const sizeClasses = {
        sm: 'h-2',
        md: 'h-3',
        lg: 'h-4'
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full bg-gray-200 rounded-full overflow-hidden ".concat(sizeClasses[size], " ").concat(className),
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-500 ease-out",
            style: {
                width: "".concat(Math.max(0, Math.min(100, value)), "%")
            }
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
            lineNumber: 21,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
        lineNumber: 20,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = ProgressBar;
const RealTimeProgress = (param)=>{
    let { sessionId, parameters, onAnalysisCompleted, onError } = param;
    _s();
    const [connectionStatus, setConnectionStatus] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('disconnected');
    const [overallProgress, setOverallProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [currentMessage, setCurrentMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])('Initializing analysis...');
    const [analysisStarted, setAnalysisStarted] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isPaused, setIsPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [agents, setAgents] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([
        {
            name: 'product',
            label: 'Product Analysis',
            status: 'pending',
            progress: 0
        },
        {
            name: 'place',
            label: 'Place Analysis',
            status: 'pending',
            progress: 0
        },
        {
            name: 'price',
            label: 'Price Analysis',
            status: 'pending',
            progress: 0
        },
        {
            name: 'promotion',
            label: 'Promotion Analysis',
            status: 'pending',
            progress: 0
        },
        {
            name: 'report',
            label: 'Report Generation',
            status: 'pending',
            progress: 0
        }
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "RealTimeProgress.useEffect": ()=>{
            const connectSocket = {
                "RealTimeProgress.useEffect.connectSocket": async ()=>{
                    try {
                        setConnectionStatus('connecting');
                        await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].connect();
                        setConnectionStatus('connected');
                    } catch (error) {
                        console.error('Failed to connect to socket:', error);
                        setConnectionStatus('disconnected');
                    }
                }
            }["RealTimeProgress.useEffect.connectSocket"];
            connectSocket();
            // Set up event listeners
            const progressId = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].onProgress({
                "RealTimeProgress.useEffect.progressId": (progress)=>{
                    if (progress.sessionId !== sessionId) return;
                    setOverallProgress(progress.overallProgress);
                    setCurrentMessage(progress.message);
                    setAgents({
                        "RealTimeProgress.useEffect.progressId": (prev)=>prev.map({
                                "RealTimeProgress.useEffect.progressId": (agent)=>agent.name === progress.agent ? {
                                        ...agent,
                                        status: 'running',
                                        progress: progress.agentProgress
                                    } : agent
                            }["RealTimeProgress.useEffect.progressId"])
                    }["RealTimeProgress.useEffect.progressId"]);
                }
            }["RealTimeProgress.useEffect.progressId"]);
            const agentStartedId = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].onAgentStarted({
                "RealTimeProgress.useEffect.agentStartedId": (data)=>{
                    if (data.sessionId !== sessionId) return;
                    setAgents({
                        "RealTimeProgress.useEffect.agentStartedId": (prev)=>prev.map({
                                "RealTimeProgress.useEffect.agentStartedId": (agent)=>agent.name === data.agent ? {
                                        ...agent,
                                        status: 'running',
                                        progress: 0
                                    } : agent
                            }["RealTimeProgress.useEffect.agentStartedId"])
                    }["RealTimeProgress.useEffect.agentStartedId"]);
                    setCurrentMessage("Starting ".concat(data.label, "..."));
                }
            }["RealTimeProgress.useEffect.agentStartedId"]);
            const agentCompletedId = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].onAgentCompleted({
                "RealTimeProgress.useEffect.agentCompletedId": (data)=>{
                    if (data.sessionId !== sessionId) return;
                    setAgents({
                        "RealTimeProgress.useEffect.agentCompletedId": (prev)=>prev.map({
                                "RealTimeProgress.useEffect.agentCompletedId": (agent)=>agent.name === data.agent ? {
                                        ...agent,
                                        status: 'completed',
                                        progress: 100,
                                        data: data.data
                                    } : agent
                            }["RealTimeProgress.useEffect.agentCompletedId"])
                    }["RealTimeProgress.useEffect.agentCompletedId"]);
                    setCurrentMessage("".concat(data.agent, " analysis completed!"));
                }
            }["RealTimeProgress.useEffect.agentCompletedId"]);
            const analysisCompletedId = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].onAnalysisCompleted({
                "RealTimeProgress.useEffect.analysisCompletedId": (data)=>{
                    if (data.sessionId !== sessionId) return;
                    setOverallProgress(100);
                    setCurrentMessage('Analysis completed successfully!');
                    onAnalysisCompleted === null || onAnalysisCompleted === void 0 ? void 0 : onAnalysisCompleted(data);
                }
            }["RealTimeProgress.useEffect.analysisCompletedId"]);
            const errorId = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].onError({
                "RealTimeProgress.useEffect.errorId": (error)=>{
                    if (error.sessionId !== sessionId) return;
                    setCurrentMessage("Error: ".concat(error.error));
                    onError === null || onError === void 0 ? void 0 : onError(error);
                }
            }["RealTimeProgress.useEffect.errorId"]);
            return ({
                "RealTimeProgress.useEffect": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].removeCallback('progress', progressId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].removeCallback('agentStarted', agentStartedId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].removeCallback('agentCompleted', agentCompletedId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].removeCallback('analysisCompleted', analysisCompletedId);
                    __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].removeCallback('error', errorId);
                }
            })["RealTimeProgress.useEffect"];
        }
    }["RealTimeProgress.useEffect"], [
        sessionId,
        onAnalysisCompleted,
        onError
    ]);
    const startAnalysis = ()=>{
        if (connectionStatus === 'connected') {
            __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].startAnalysis(sessionId, parameters);
            setAnalysisStarted(true);
            setCurrentMessage('Starting analysis...');
        }
    };
    const pauseAnalysis = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].pauseAnalysis(sessionId);
        setIsPaused(true);
        setCurrentMessage('Analysis paused');
    };
    const resumeAnalysis = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].resumeAnalysis(sessionId);
        setIsPaused(false);
        setCurrentMessage('Analysis resumed');
    };
    const stopAnalysis = ()=>{
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$services$2f$socketService$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["socketService"].stopAnalysis(sessionId);
        setAnalysisStarted(false);
        setIsPaused(false);
        setOverallProgress(0);
        setCurrentMessage('Analysis stopped');
        setAgents((prev)=>prev.map((agent)=>({
                    ...agent,
                    status: 'pending',
                    progress: 0
                })));
    };
    const getStatusIcon = (status)=>{
        switch(status){
            case 'pending':
                return '⏳';
            case 'running':
                return '🔄';
            case 'completed':
                return '✅';
            case 'error':
                return '❌';
        }
    };
    const getStatusColor = (status)=>{
        switch(status){
            case 'pending':
                return 'text-gray-500';
            case 'running':
                return 'text-blue-600';
            case 'completed':
                return 'text-green-600';
            case 'error':
                return 'text-red-600';
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "bg-white rounded-lg shadow-lg p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                        className: "text-lg font-semibold text-gray-900",
                        children: "Analysis Progress"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 201,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center space-x-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "w-2 h-2 rounded-full ".concat(connectionStatus === 'connected' ? 'bg-green-500' : connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500')
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                lineNumber: 203,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600 capitalize",
                                children: connectionStatus
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                lineNumber: 207,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 202,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                lineNumber: 200,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex justify-between items-center",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm font-medium text-gray-700",
                                children: "Overall Progress"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                lineNumber: 214,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-sm text-gray-600",
                                children: [
                                    Math.round(overallProgress),
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                lineNumber: 215,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 213,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressBar, {
                        value: overallProgress,
                        size: "lg"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 217,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "text-sm text-gray-600 min-h-[20px]",
                        children: currentMessage
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 218,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                lineNumber: 212,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "space-y-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                        className: "text-md font-medium text-gray-800",
                        children: "Agent Status"
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                        lineNumber: 223,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    agents.map((agent)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-lg",
                                                    children: getStatusIcon(agent.status)
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                                    lineNumber: 228,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-sm font-medium ".concat(getStatusColor(agent.status)),
                                                    children: agent.label
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                            lineNumber: 227,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-sm text-gray-600",
                                            children: [
                                                Math.round(agent.progress),
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                            lineNumber: 233,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                    lineNumber: 226,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProgressBar, {
                                    value: agent.progress,
                                    size: "sm"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                                    lineNumber: 235,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, agent.name, true, {
                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                            lineNumber: 225,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0)))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                lineNumber: 222,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex space-x-3 pt-4 border-t border-gray-200",
                children: !analysisStarted ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: startAnalysis,
                    disabled: connectionStatus !== 'connected',
                    className: "flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors",
                    children: "🚀 Start Analysis"
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                    lineNumber: 243,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                    children: [
                        !isPaused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: pauseAnalysis,
                            className: "flex-1 bg-yellow-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-yellow-700 transition-colors",
                            children: "⏸️ Pause"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                            lineNumber: 253,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: resumeAnalysis,
                            className: "flex-1 bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition-colors",
                            children: "▶️ Resume"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                            lineNumber: 260,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: stopAnalysis,
                            className: "flex-1 bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition-colors",
                            children: "🛑 Stop"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                            lineNumber: 267,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                lineNumber: 241,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-gray-500 pt-2 border-t border-gray-100",
                children: [
                    "Session ID: ",
                    sessionId.slice(0, 8),
                    "..."
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
                lineNumber: 278,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/realtime/RealTimeProgress.tsx",
        lineNumber: 198,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(RealTimeProgress, "DJRiwP4MULJkMPK651dE2+lNkeI=");
_c1 = RealTimeProgress;
const __TURBOPACK__default__export__ = RealTimeProgress;
var _c, _c1;
__turbopack_context__.k.register(_c, "ProgressBar");
__turbopack_context__.k.register(_c1, "RealTimeProgress");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/app/realtime-demo/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>RealTimeDemoPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$realtime$2f$RealTimeProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/realtime/RealTimeProgress.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
'use client';
;
;
function RealTimeDemoPage() {
    _s();
    const [sessionId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        "RealTimeDemoPage.useState": ()=>"session_".concat(Date.now(), "_").concat(Math.random().toString(36).substr(2, 9))
    }["RealTimeDemoPage.useState"]);
    const [analysisResult, setAnalysisResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // Mock parameters for testing
    const parameters = {
        restaurantType: 'Thai Restaurant',
        cuisine: 'Thai',
        location: 'Bangkok, Sukhumvit',
        budget: {
            min: 1000000,
            max: 3000000
        },
        radius: 2,
        targetCustomers: [
            'Food Enthusiasts',
            'Families',
            'Young Professionals'
        ],
        businessModel: 'hybrid'
    };
    const handleAnalysisCompleted = (data)=>{
        console.log('Analysis completed:', data);
        setAnalysisResult(data.finalReport);
        setError(null);
    };
    const handleError = (error)=>{
        console.error('Analysis error:', error);
        setError(error.error);
        setAnalysisResult(null);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-gray-50 p-6",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "max-w-4xl mx-auto space-y-8",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "text-center",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                            className: "text-3xl font-bold text-gray-900 mb-2",
                            children: "🍽️ BiteBase AI Real-Time Analysis"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 40,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-gray-600",
                            children: "Watch the 4P analysis workflow in real-time"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 43,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                    lineNumber: 39,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800 mb-4",
                            children: "Analysis Parameters"
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 50,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "grid grid-cols-2 gap-4 text-sm",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Restaurant Type:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 53,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: parameters.restaurantType
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 54,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 52,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Cuisine:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 57,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: parameters.cuisine
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 58,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 56,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Location:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 61,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: parameters.location
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 62,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 60,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Budget Range:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 65,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: [
                                                "฿",
                                                parameters.budget.min.toLocaleString(),
                                                " - ฿",
                                                parameters.budget.max.toLocaleString()
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 66,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 64,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Analysis Radius:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 71,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600",
                                            children: [
                                                parameters.radius,
                                                " km"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 72,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 70,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "font-medium text-gray-700",
                                            children: "Business Model:"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 75,
                                            columnNumber: 15
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "ml-2 text-gray-600 capitalize",
                                            children: parameters.businessModel
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 76,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 74,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 51,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mt-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-medium text-gray-700",
                                    children: "Target Customers:"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 80,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mt-2 flex flex-wrap gap-2",
                                    children: parameters.targetCustomers.map((customer, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs",
                                            children: customer
                                        }, index, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 83,
                                            columnNumber: 17
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 81,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 79,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                    lineNumber: 49,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$realtime$2f$RealTimeProgress$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    sessionId: sessionId,
                    parameters: parameters,
                    onAnalysisCompleted: handleAnalysisCompleted,
                    onError: handleError
                }, void 0, false, {
                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                    lineNumber: 92,
                    columnNumber: 9
                }, this),
                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-red-50 border border-red-200 rounded-lg p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-red-600 text-lg mr-2",
                                    children: "❌"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 103,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-red-800 font-medium",
                                    children: "Analysis Error"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 104,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 102,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "text-red-700 mt-2",
                            children: error
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 106,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                    lineNumber: 101,
                    columnNumber: 11
                }, this),
                analysisResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-md p-6",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-semibold text-gray-800 mb-4 flex items-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-green-600 mr-2",
                                    children: "✅"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 114,
                                    columnNumber: 15
                                }, this),
                                "Analysis Results"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 113,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-700 mb-2",
                                    children: "Executive Summary"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 120,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "text-gray-600 leading-relaxed",
                                    children: analysisResult.executiveSummary
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 121,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 119,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-700 mb-2",
                                    children: "Viability Score"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 126,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-1 bg-gray-200 rounded-full h-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "bg-gradient-to-r from-green-400 to-green-600 h-4 rounded-full transition-all duration-1000",
                                                style: {
                                                    width: "".concat(analysisResult.viabilityScore, "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                lineNumber: 129,
                                                columnNumber: 19
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 128,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-2xl font-bold text-green-600",
                                            children: [
                                                analysisResult.viabilityScore,
                                                "%"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 134,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 127,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 125,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-700 mb-2",
                                    children: "Risk Assessment"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 142,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "bg-gray-50 rounded-lg p-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center mb-2",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "font-medium text-gray-700",
                                                    children: "Risk Level:"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 145,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "ml-2 px-3 py-1 rounded-full text-xs font-medium ".concat(analysisResult.riskAssessment.level === 'low' ? 'bg-green-100 text-green-800' : analysisResult.riskAssessment.level === 'medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-red-100 text-red-800'),
                                                    children: analysisResult.riskAssessment.level.toUpperCase()
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 146,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 144,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid md:grid-cols-2 gap-4 mt-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-medium text-gray-600 mb-2",
                                                            children: "Risk Factors:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 156,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "text-sm text-gray-600 space-y-1",
                                                            children: analysisResult.riskAssessment.factors.map((factor, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-red-500 mr-2",
                                                                            children: "•"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                            lineNumber: 160,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        factor
                                                                    ]
                                                                }, index, true, {
                                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                    lineNumber: 159,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 157,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 155,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                            className: "font-medium text-gray-600 mb-2",
                                                            children: "Mitigation Strategies:"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 167,
                                                            columnNumber: 21
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                            className: "text-sm text-gray-600 space-y-1",
                                                            children: analysisResult.riskAssessment.mitigation.map((strategy, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                                    className: "flex items-start",
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            className: "text-green-500 mr-2",
                                                                            children: "•"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                            lineNumber: 171,
                                                                            columnNumber: 27
                                                                        }, this),
                                                                        strategy
                                                                    ]
                                                                }, index, true, {
                                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                    lineNumber: 170,
                                                                    columnNumber: 25
                                                                }, this))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 168,
                                                            columnNumber: 21
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 166,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 154,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 143,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 141,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-700 mb-2",
                                    children: "Recommendations"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 183,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-3 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-blue-50 rounded-lg p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-blue-800 mb-2",
                                                    children: "Immediate Actions"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 186,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "text-sm text-blue-700 space-y-1",
                                                    children: analysisResult.recommendations.immediate.map((rec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-blue-500 mr-2",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                    lineNumber: 190,
                                                                    columnNumber: 25
                                                                }, this),
                                                                rec
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 189,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 187,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 185,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-green-50 rounded-lg p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-green-800 mb-2",
                                                    children: "Short Term (1-3 months)"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 197,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "text-sm text-green-700 space-y-1",
                                                    children: analysisResult.recommendations.shortTerm.map((rec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-green-500 mr-2",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                    lineNumber: 201,
                                                                    columnNumber: 25
                                                                }, this),
                                                                rec
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 200,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 198,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 196,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-purple-50 rounded-lg p-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                                    className: "font-medium text-purple-800 mb-2",
                                                    children: "Long Term (6+ months)"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 208,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                                    className: "text-sm text-purple-700 space-y-1",
                                                    children: analysisResult.recommendations.longTerm.map((rec, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                            className: "flex items-start",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    className: "text-purple-500 mr-2",
                                                                    children: "•"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                                    lineNumber: 212,
                                                                    columnNumber: 25
                                                                }, this),
                                                                rec
                                                            ]
                                                        }, index, true, {
                                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                            lineNumber: 211,
                                                            columnNumber: 23
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 209,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 207,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 184,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 182,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    className: "text-lg font-medium text-gray-700 mb-2",
                                    children: "Financial Summary"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 223,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "grid md:grid-cols-2 lg:grid-cols-4 gap-4",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-4 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-gray-900",
                                                    children: [
                                                        "฿",
                                                        analysisResult.financialSummary.initialInvestment.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 226,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Initial Investment"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 229,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 225,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-4 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-gray-900",
                                                    children: [
                                                        "฿",
                                                        analysisResult.financialSummary.projectedRevenue.toLocaleString()
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 232,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Annual Revenue"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 235,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 231,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-4 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-gray-900",
                                                    children: analysisResult.financialSummary.breakEvenMonths
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 238,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "Break-even (months)"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 241,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 237,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gray-50 rounded-lg p-4 text-center",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-2xl font-bold text-gray-900",
                                                    children: analysisResult.financialSummary.roiTimeframe
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 244,
                                                    columnNumber: 19
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-sm text-gray-600",
                                                    children: "ROI Timeframe"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                                    lineNumber: 247,
                                                    columnNumber: 19
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                            lineNumber: 243,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                                    lineNumber: 224,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                            lineNumber: 222,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
                    lineNumber: 112,
                    columnNumber: 11
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
            lineNumber: 37,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/frontend/src/app/realtime-demo/page.tsx",
        lineNumber: 36,
        columnNumber: 5
    }, this);
}
_s(RealTimeDemoPage, "c+MwpYotbyCUbsHLzVq+jK6y2PE=");
_c = RealTimeDemoPage;
var _c;
__turbopack_context__.k.register(_c, "RealTimeDemoPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_7f2e3e70._.js.map