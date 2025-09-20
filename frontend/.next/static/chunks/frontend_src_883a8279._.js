(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Input = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, type, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50", className),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/input.tsx",
        lineNumber: 11,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Input;
Input.displayName = "Input";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Input$React.forwardRef");
__turbopack_context__.k.register(_c1, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/ui/scroll-area.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrollArea",
    ()=>ScrollArea,
    "ScrollBar",
    ()=>ScrollBar
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@radix-ui/react-scroll-area/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
const ScrollArea = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, children, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"], {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("relative overflow-hidden", className),
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Viewport"], {
                className: "h-full w-full rounded-[inherit]",
                children: children
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScrollBar, {}, void 0, false, {
                fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
                lineNumber: 18,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Corner"], {}, void 0, false, {
                fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
                lineNumber: 19,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
        lineNumber: 10,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = ScrollArea;
ScrollArea.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Root"].displayName;
const ScrollBar = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"]((param, ref)=>{
    let { className, orientation = "vertical", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"], {
        ref: ref,
        orientation: orientation,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex touch-none select-none transition-colors", orientation === "vertical" && "h-full w-2.5 border-l border-l-transparent p-[1px]", orientation === "horizontal" && "h-2.5 border-t border-t-transparent p-[1px]", className),
        ...props,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaThumb"], {
            className: "relative flex-1 rounded-full bg-border"
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
            lineNumber: 41,
            columnNumber: 5
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/scroll-area.tsx",
        lineNumber: 28,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c2 = ScrollBar;
ScrollBar.displayName = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$scroll$2d$area$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollAreaScrollbar"].displayName;
;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "ScrollArea$React.forwardRef");
__turbopack_context__.k.register(_c1, "ScrollArea");
__turbopack_context__.k.register(_c2, "ScrollBar");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/contexts/ReportsContext.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ReportsProvider",
    ()=>ReportsProvider,
    "useReports",
    ()=>useReports
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/socket.io-client/build/esm/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const ReportsContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
const useReports = ()=>{
    _s();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(ReportsContext);
    if (!context) {
        throw new Error('useReports must be used within a ReportsProvider');
    }
    return context;
};
_s(useReports, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
const ReportsProvider = (param)=>{
    let { children } = param;
    _s1();
    const [reports, setReports] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [currentReport, setCurrentReport] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [socket, setSocket] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [langGraphConnections, setLangGraphConnections] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(new Map());
    // Initialize WebSocket connection for real-time updates
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportsProvider.useEffect": ()=>{
            const socketConnection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$socket$2e$io$2d$client$2f$build$2f$esm$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["io"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_WEBSOCKET_URL || 'http://localhost:3001', {
                transports: [
                    'websocket'
                ]
            });
            socketConnection.on('connect', {
                "ReportsProvider.useEffect": ()=>{
                    console.log('Connected to real-time server');
                }
            }["ReportsProvider.useEffect"]);
            socketConnection.on('report-update', {
                "ReportsProvider.useEffect": (data)=>{
                    updateReport(data.reportId, data.update);
                }
            }["ReportsProvider.useEffect"]);
            socketConnection.on('langgraph-update', {
                "ReportsProvider.useEffect": (data)=>{
                    updateLangGraphState(data.reportId, data.state);
                }
            }["ReportsProvider.useEffect"]);
            setSocket(socketConnection);
            return ({
                "ReportsProvider.useEffect": ()=>{
                    socketConnection.disconnect();
                    // Close all EventSource connections
                    langGraphConnections.forEach({
                        "ReportsProvider.useEffect": (connection)=>connection.close()
                    }["ReportsProvider.useEffect"]);
                }
            })["ReportsProvider.useEffect"];
        }
    }["ReportsProvider.useEffect"], []);
    // Enhanced LangGraph Analysis Methods
    const startLangGraphAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[startLangGraphAnalysis]": async (reportId, params)=>{
            try {
                const response = await fetch('/api/agent/start-analysis', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reportId,
                        restaurantParams: params,
                        analysisType: 'comprehensive'
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to start LangGraph analysis');
                }
                const result = await response.json();
                // Update report with initial LangGraph state
                updateReport(reportId, {
                    langGraphState: {
                        sessionId: result.sessionId,
                        workflowId: result.workflowId,
                        currentNode: 'initialize',
                        agentProgress: {},
                        overallProgress: 0,
                        mcpServerStatus: {},
                        errors: []
                    },
                    realTimeConnection: {
                        sessionId: result.sessionId,
                        connected: true,
                        lastUpdate: new Date()
                    }
                });
                // Start streaming updates
                streamLangGraphUpdates(reportId, {
                    "ReportsProvider.useCallback[startLangGraphAnalysis]": (update)=>{
                        updateLangGraphState(reportId, update);
                    }
                }["ReportsProvider.useCallback[startLangGraphAnalysis]"]);
            } catch (error) {
                console.error('Error starting LangGraph analysis:', error);
                addChatMessage(reportId, {
                    role: 'system',
                    content: "Error starting analysis: ".concat(error.message),
                    messageType: 'error'
                });
            }
        }
    }["ReportsProvider.useCallback[startLangGraphAnalysis]"], []);
    const streamLangGraphUpdates = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[streamLangGraphUpdates]": (reportId, callback)=>{
            var _report_langGraphState;
            const report = getReportById(reportId);
            if (!(report === null || report === void 0 ? void 0 : (_report_langGraphState = report.langGraphState) === null || _report_langGraphState === void 0 ? void 0 : _report_langGraphState.sessionId)) {
                console.warn('No session ID found for streaming updates');
                return ({
                    "ReportsProvider.useCallback[streamLangGraphUpdates]": ()=>{}
                })["ReportsProvider.useCallback[streamLangGraphUpdates]"];
            }
            const eventSource = new EventSource("/api/agent/stream/".concat(report.langGraphState.sessionId));
            eventSource.onmessage = ({
                "ReportsProvider.useCallback[streamLangGraphUpdates]": (event)=>{
                    try {
                        const update = JSON.parse(event.data);
                        callback(update);
                        // Update real-time connection status
                        updateReport(reportId, {
                            realTimeConnection: {
                                ...report.realTimeConnection,
                                lastUpdate: new Date()
                            }
                        });
                    } catch (error) {
                        console.error('Error parsing stream update:', error);
                    }
                }
            })["ReportsProvider.useCallback[streamLangGraphUpdates]"];
            eventSource.onerror = ({
                "ReportsProvider.useCallback[streamLangGraphUpdates]": (error)=>{
                    console.error('EventSource error:', error);
                    updateReport(reportId, {
                        realTimeConnection: {
                            ...report.realTimeConnection,
                            connected: false
                        }
                    });
                }
            })["ReportsProvider.useCallback[streamLangGraphUpdates]"];
            // Store connection for cleanup
            langGraphConnections.set(reportId, eventSource);
            return ({
                "ReportsProvider.useCallback[streamLangGraphUpdates]": ()=>{
                    eventSource.close();
                    langGraphConnections.delete(reportId);
                }
            })["ReportsProvider.useCallback[streamLangGraphUpdates]"];
        }
    }["ReportsProvider.useCallback[streamLangGraphUpdates]"], [
        langGraphConnections
    ]);
    const pauseAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[pauseAnalysis]": async (reportId)=>{
            var _report_langGraphState;
            const report = getReportById(reportId);
            if (!(report === null || report === void 0 ? void 0 : (_report_langGraphState = report.langGraphState) === null || _report_langGraphState === void 0 ? void 0 : _report_langGraphState.sessionId)) return;
            try {
                await fetch("/api/agent/pause/".concat(report.langGraphState.sessionId), {
                    method: 'POST'
                });
                updateLangGraphState(reportId, {
                    currentNode: 'paused'
                });
            } catch (error) {
                console.error('Error pausing analysis:', error);
            }
        }
    }["ReportsProvider.useCallback[pauseAnalysis]"], []);
    const resumeAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[resumeAnalysis]": async (reportId)=>{
            var _report_langGraphState;
            const report = getReportById(reportId);
            if (!(report === null || report === void 0 ? void 0 : (_report_langGraphState = report.langGraphState) === null || _report_langGraphState === void 0 ? void 0 : _report_langGraphState.sessionId)) return;
            try {
                await fetch("/api/agent/resume/".concat(report.langGraphState.sessionId), {
                    method: 'POST'
                });
            } catch (error) {
                console.error('Error resuming analysis:', error);
            }
        }
    }["ReportsProvider.useCallback[resumeAnalysis]"], []);
    const cancelAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[cancelAnalysis]": async (reportId)=>{
            var _report_langGraphState;
            const report = getReportById(reportId);
            if (!(report === null || report === void 0 ? void 0 : (_report_langGraphState = report.langGraphState) === null || _report_langGraphState === void 0 ? void 0 : _report_langGraphState.sessionId)) return;
            try {
                await fetch("/api/agent/cancel/".concat(report.langGraphState.sessionId), {
                    method: 'POST'
                });
                // Close streaming connection
                const connection = langGraphConnections.get(reportId);
                if (connection) {
                    connection.close();
                    langGraphConnections.delete(reportId);
                }
                updateLangGraphState(reportId, {
                    currentNode: 'cancelled'
                });
            } catch (error) {
                console.error('Error cancelling analysis:', error);
            }
        }
    }["ReportsProvider.useCallback[cancelAnalysis]"], [
        langGraphConnections
    ]);
    const updateLangGraphState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[updateLangGraphState]": (reportId, state)=>{
            setReports({
                "ReportsProvider.useCallback[updateLangGraphState]": (prev)=>prev.map({
                        "ReportsProvider.useCallback[updateLangGraphState]": (report)=>report.reportId === reportId ? {
                                ...report,
                                langGraphState: {
                                    ...report.langGraphState,
                                    ...state
                                },
                                generatedAt: new Date()
                            } : report
                    }["ReportsProvider.useCallback[updateLangGraphState]"])
            }["ReportsProvider.useCallback[updateLangGraphState]"]);
            if ((currentReport === null || currentReport === void 0 ? void 0 : currentReport.reportId) === reportId) {
                setCurrentReport({
                    "ReportsProvider.useCallback[updateLangGraphState]": (prev)=>prev ? {
                            ...prev,
                            langGraphState: {
                                ...prev.langGraphState,
                                ...state
                            },
                            generatedAt: new Date()
                        } : null
                }["ReportsProvider.useCallback[updateLangGraphState]"]);
            }
            // Sync agent progress with analysis progress
            if (state.agentProgress) {
                const progressMapping = {
                    'product-analysis': 'product',
                    'place-analysis': 'place',
                    'price-analysis': 'price',
                    'promotion-analysis': 'promotion'
                };
                Object.entries(state.agentProgress).forEach({
                    "ReportsProvider.useCallback[updateLangGraphState]": (param)=>{
                        let [agentId, progress] = param;
                        const analysisType = progressMapping[agentId];
                        if (analysisType) {
                            updateAnalysisProgress(reportId, analysisType, progress.progress);
                        }
                    }
                }["ReportsProvider.useCallback[updateLangGraphState]"]);
            }
        }
    }["ReportsProvider.useCallback[updateLangGraphState]"], [
        currentReport
    ]);
    const getMCPServerStatus = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[getMCPServerStatus]": async ()=>{
            try {
                const response = await fetch('/api/agent/mcp-status');
                return await response.json();
            } catch (error) {
                console.error('Error fetching MCP server status:', error);
                return {};
            }
        }
    }["ReportsProvider.useCallback[getMCPServerStatus]"], []);
    const getAgentHealth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[getAgentHealth]": async ()=>{
            try {
                const response = await fetch('/api/agent/health');
                return await response.json();
            } catch (error) {
                console.error('Error fetching agent health:', error);
                return {
                    status: 'unknown'
                };
            }
        }
    }["ReportsProvider.useCallback[getAgentHealth]"], []);
    // Enhanced collaboration methods
    const shareReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[shareReport]": async (reportId, collaboratorIds)=>{
            if (!socket) return;
            socket.emit('share-report', {
                reportId,
                collaboratorIds
            });
            updateReport(reportId, {
                // Add collaboration metadata
                generatedAt: new Date()
            });
        }
    }["ReportsProvider.useCallback[shareReport]"], [
        socket
    ]);
    const inviteCollaborator = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ReportsProvider.useCallback[inviteCollaborator]": async (reportId, email, permissions)=>{
            try {
                const response = await fetch('/api/collaboration/invite', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        reportId,
                        email,
                        permissions
                    })
                });
                if (!response.ok) {
                    throw new Error('Failed to invite collaborator');
                }
                return await response.json();
            } catch (error) {
                console.error('Error inviting collaborator:', error);
                throw error;
            }
        }
    }["ReportsProvider.useCallback[inviteCollaborator]"], []);
    // Load reports from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportsProvider.useEffect": ()=>{
            const savedReports = localStorage.getItem('bitebase-reports');
            if (savedReports) {
                try {
                    const parsedReports = JSON.parse(savedReports).map({
                        "ReportsProvider.useEffect.parsedReports": (report)=>({
                                ...report,
                                createdAt: new Date(report.createdAt),
                                updatedAt: new Date(report.updatedAt),
                                chatHistory: report.chatHistory.map({
                                    "ReportsProvider.useEffect.parsedReports": (msg)=>({
                                            ...msg,
                                            timestamp: new Date(msg.timestamp)
                                        })
                                }["ReportsProvider.useEffect.parsedReports"])
                            })
                    }["ReportsProvider.useEffect.parsedReports"]);
                    setReports(parsedReports);
                } catch (error) {
                    console.error('Error loading reports from localStorage:', error);
                }
            }
            // Load current report from localStorage
            const savedCurrentReport = localStorage.getItem('bitebase-current-report');
            if (savedCurrentReport) {
                try {
                    const parsedCurrentReport = JSON.parse(savedCurrentReport);
                    parsedCurrentReport.createdAt = new Date(parsedCurrentReport.createdAt);
                    parsedCurrentReport.updatedAt = new Date(parsedCurrentReport.updatedAt);
                    parsedCurrentReport.chatHistory = parsedCurrentReport.chatHistory.map({
                        "ReportsProvider.useEffect": (msg)=>({
                                ...msg,
                                timestamp: new Date(msg.timestamp)
                            })
                    }["ReportsProvider.useEffect"]);
                    setCurrentReport(parsedCurrentReport);
                } catch (error) {
                    console.error('Error loading current report from localStorage:', error);
                }
            }
        }
    }["ReportsProvider.useEffect"], []);
    // Save reports to localStorage whenever reports change
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportsProvider.useEffect": ()=>{
            localStorage.setItem('bitebase-reports', JSON.stringify(reports));
        }
    }["ReportsProvider.useEffect"], [
        reports
    ]);
    // Save current report to localStorage whenever it changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ReportsProvider.useEffect": ()=>{
            if (currentReport) {
                localStorage.setItem('bitebase-current-report', JSON.stringify(currentReport));
            } else {
                localStorage.removeItem('bitebase-current-report');
            }
        }
    }["ReportsProvider.useEffect"], [
        currentReport
    ]);
    const createReport = (title, description, requirements)=>{
        const newReport = {
            reportId: Date.now().toString(),
            title,
            description,
            requirements: requirements || {
                restaurantType: 'cafe',
                cuisineType: 'other',
                location: '',
                budgetRange: [
                    0,
                    100000
                ],
                targetCustomers: '',
                businessModel: 'hybrid'
            },
            sections: [],
            executiveSummary: '',
            keyFindings: [],
            recommendations: [],
            riskAssessment: [],
            nextSteps: [],
            generatedAt: new Date(),
            confidence: 0,
            dataSources: [],
            chatHistory: [],
            agentStatuses: {},
            analysisProgress: {
                product: 0,
                place: 0,
                price: 0,
                promotion: 0
            },
            researchData: {}
        };
        setReports((prev)=>[
                ...prev,
                newReport
            ]);
        setCurrentReport(newReport);
        return newReport;
    };
    const updateReport = (reportId, updates)=>{
        setReports((prev)=>prev.map((report)=>report.reportId === reportId ? {
                    ...report,
                    ...updates,
                    generatedAt: new Date()
                } : report));
        // Update current report if it's the one being updated
        if ((currentReport === null || currentReport === void 0 ? void 0 : currentReport.reportId) === reportId) {
            setCurrentReport((prev)=>prev ? {
                    ...prev,
                    ...updates,
                    generatedAt: new Date()
                } : null);
        }
    };
    const deleteReport = (reportId)=>{
        setReports((prev)=>prev.filter((report)=>report.reportId !== reportId));
        // Clear current report if it's the one being deleted
        if ((currentReport === null || currentReport === void 0 ? void 0 : currentReport.reportId) === reportId) {
            setCurrentReport(null);
        }
    };
    const addChatMessage = (reportId, message)=>{
        const newMessage = {
            ...message,
            messageId: Date.now().toString(),
            timestamp: new Date()
        };
        setReports((prev)=>prev.map((report)=>report.reportId === reportId ? {
                    ...report,
                    chatHistory: [
                        ...report.chatHistory,
                        newMessage
                    ],
                    generatedAt: new Date()
                } : report));
        // Update current report if it's the one being updated
        if ((currentReport === null || currentReport === void 0 ? void 0 : currentReport.reportId) === reportId) {
            setCurrentReport((prev)=>prev ? {
                    ...prev,
                    chatHistory: [
                        ...prev.chatHistory,
                        newMessage
                    ],
                    generatedAt: new Date()
                } : null);
        }
    };
    const updateAgentStatus = (reportId, agentId, status)=>{
        var _currentReport_agentStatuses;
        const currentAgentStatus = currentReport === null || currentReport === void 0 ? void 0 : (_currentReport_agentStatuses = currentReport.agentStatuses) === null || _currentReport_agentStatuses === void 0 ? void 0 : _currentReport_agentStatuses[agentId];
        var _status_progressPercentage, _ref, _status_dataProcessed, _ref1, _status_processingRate, _ref2;
        const updatedStatus = {
            agentId,
            agentName: status.agentName || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.agentName) || 'Unknown Agent',
            status: status.status || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.status) || 'idle',
            currentTask: status.currentTask || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.currentTask) || '',
            progressPercentage: (_ref = (_status_progressPercentage = status.progressPercentage) !== null && _status_progressPercentage !== void 0 ? _status_progressPercentage : currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.progressPercentage) !== null && _ref !== void 0 ? _ref : 0,
            substeps: status.substeps || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.substeps) || [],
            estimatedCompletion: status.estimatedCompletion || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.estimatedCompletion),
            dataProcessed: (_ref1 = (_status_dataProcessed = status.dataProcessed) !== null && _status_dataProcessed !== void 0 ? _status_dataProcessed : currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.dataProcessed) !== null && _ref1 !== void 0 ? _ref1 : 0,
            processingRate: (_ref2 = (_status_processingRate = status.processingRate) !== null && _status_processingRate !== void 0 ? _status_processingRate : currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.processingRate) !== null && _ref2 !== void 0 ? _ref2 : 0,
            errors: status.errors || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.errors) || [],
            lastUpdate: new Date(),
            userInteractionsPending: status.userInteractionsPending || (currentAgentStatus === null || currentAgentStatus === void 0 ? void 0 : currentAgentStatus.userInteractionsPending) || []
        };
        const update = {
            agentStatuses: {
                ...currentReport === null || currentReport === void 0 ? void 0 : currentReport.agentStatuses,
                [agentId]: updatedStatus
            }
        };
        updateReport(reportId, update);
    };
    const updateAnalysisProgress = (reportId, analysisType, progress)=>{
        const currentProgress = currentReport === null || currentReport === void 0 ? void 0 : currentReport.analysisProgress;
        var _currentProgress_product, _currentProgress_place, _currentProgress_price, _currentProgress_promotion;
        const update = {
            analysisProgress: {
                product: (_currentProgress_product = currentProgress === null || currentProgress === void 0 ? void 0 : currentProgress.product) !== null && _currentProgress_product !== void 0 ? _currentProgress_product : 0,
                place: (_currentProgress_place = currentProgress === null || currentProgress === void 0 ? void 0 : currentProgress.place) !== null && _currentProgress_place !== void 0 ? _currentProgress_place : 0,
                price: (_currentProgress_price = currentProgress === null || currentProgress === void 0 ? void 0 : currentProgress.price) !== null && _currentProgress_price !== void 0 ? _currentProgress_price : 0,
                promotion: (_currentProgress_promotion = currentProgress === null || currentProgress === void 0 ? void 0 : currentProgress.promotion) !== null && _currentProgress_promotion !== void 0 ? _currentProgress_promotion : 0,
                ...currentProgress,
                [analysisType]: progress
            }
        };
        updateReport(reportId, update);
    };
    const setAnalysisData = (reportId, analysisType, data)=>{
        const update = {
            researchData: {
                ...currentReport === null || currentReport === void 0 ? void 0 : currentReport.researchData,
                [analysisType]: data
            }
        };
        updateReport(reportId, update);
    };
    const generateFinalReport = async (reportId)=>{
        const report = getReportById(reportId);
        if (!report) return;
        // Generate executive summary and recommendations based on analysis data
        const { productAnalysis, placeAnalysis, priceAnalysis, promotionAnalysis } = report.researchData;
        let executiveSummary = 'Comprehensive market research analysis completed for restaurant venture.';
        let keyFindings = [];
        let recommendations = [];
        let riskAssessment = [];
        if (productAnalysis) {
            keyFindings.push(...productAnalysis.recommendations);
        }
        if (placeAnalysis) {
            keyFindings.push("Location score: ".concat(placeAnalysis.locationScore, "/100"));
        }
        if (priceAnalysis) {
            recommendations.push(...Object.values(priceAnalysis.pricingRecommendations).map((p)=>"Optimal pricing: $".concat(p)));
        }
        if (promotionAnalysis) {
            recommendations.push(...promotionAnalysis.marketingOpportunities);
        }
        updateReport(reportId, {
            executiveSummary,
            keyFindings,
            recommendations,
            riskAssessment,
            nextSteps: [
                'Finalize business plan',
                'Secure funding',
                'Begin location setup'
            ],
            confidence: Math.round(Object.values(report.analysisProgress).reduce((a, b)=>a + b, 0) / 4)
        });
    };
    const getReportById = (reportId)=>{
        return reports.find((report)=>report.reportId === reportId);
    };
    const subscribeToReportUpdates = (reportId, callback)=>{
        // Simple implementation - in production this would use WebSocket or real-time database
        const interval = setInterval(()=>{
            const report = getReportById(reportId);
            if (report) {
                callback(report);
            }
        }, 1000);
        return ()=>clearInterval(interval);
    };
    const broadcastUpdate = (reportId, update)=>{
        // In production, this would broadcast to other connected clients
        console.log('Broadcasting update for report', reportId, update);
        updateReport(reportId, update);
    };
    const handleSetCurrentReport = (report)=>{
        setCurrentReport(report);
    };
    const value = {
        reports,
        currentReport,
        // Enhanced LangGraph Integration
        startLangGraphAnalysis,
        streamLangGraphUpdates,
        pauseAnalysis,
        resumeAnalysis,
        cancelAnalysis,
        // Enhanced State Management
        updateLangGraphState,
        getMCPServerStatus,
        getAgentHealth,
        // Existing methods
        createReport,
        updateReport,
        deleteReport,
        setCurrentReport: handleSetCurrentReport,
        addChatMessage,
        updateAgentStatus,
        updateAnalysisProgress,
        setAnalysisData,
        generateFinalReport,
        getReportById,
        // Enhanced Real-time collaboration
        subscribeToReportUpdates,
        broadcastUpdate,
        shareReport,
        inviteCollaborator
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ReportsContext.Provider, {
        value: value,
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/contexts/ReportsContext.tsx",
        lineNumber: 694,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s1(ReportsProvider, "qSK3fq6F2occOQTN0Z3Z0Eyv1hI=");
_c = ReportsProvider;
var _c;
__turbopack_context__.k.register(_c, "ReportsProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/ai-service.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// AI Service for connecting to LangGraph agent via Copilot API
__turbopack_context__.s([
    "aiService",
    ()=>aiService
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@swc/helpers/esm/_define_property.js [app-client] (ecmascript)");
"use client";
;
class AIService {
    async sendMessage(message, mapContext) {
        try {
            var _response_body;
            // Clear conversation history to avoid malformed tool calls from previous sessions
            // TODO: Remove this once tool call issues are resolved
            this.clearHistory();
            // Add user message to conversation history
            this.conversationHistory.push({
                role: 'user',
                content: "".concat(message, "\n\nCurrent map context: ").concat(JSON.stringify(mapContext, null, 2))
            });
            // Generate a unique thread ID for this conversation
            const threadId = "chat-".concat(Date.now(), "-").concat(Math.random().toString(36).substr(2, 9));
            // Prepare the request to the LangGraph agent using streaming
            const response = await fetch("".concat(this.baseUrl, "/runs/stream"), {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    assistant_id: this.model,
                    input: {
                        messages: this.conversationHistory.map((msg)=>({
                                role: msg.role,
                                content: msg.content
                            }))
                    },
                    config: {
                        configurable: {
                            thread_id: threadId
                        }
                    },
                    stream_mode: "values"
                })
            });
            if (!response.ok) {
                throw new Error("HTTP error! status: ".concat(response.status));
            }
            // Handle streaming response (Server-Sent Events format)
            let aiResponse = '';
            const reader = (_response_body = response.body) === null || _response_body === void 0 ? void 0 : _response_body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            if (!reader) {
                throw new Error('No response body reader available');
            }
            try {
                while(true){
                    const { done, value } = await reader.read();
                    if (done) break;
                    const chunk = decoder.decode(value, {
                        stream: true
                    });
                    buffer += chunk;
                    // Process complete events
                    const events = buffer.split('\n\n');
                    buffer = events.pop() || ''; // Keep incomplete event in buffer
                    for (const event of events){
                        if (!event.trim()) continue;
                        try {
                            const lines = event.split('\n');
                            let eventType = '';
                            let eventDataLines = [];
                            for (const line of lines){
                                if (line.startsWith('event: ')) {
                                    eventType = line.slice(7);
                                } else if (line.startsWith('data: ')) {
                                    // Collect all data lines
                                    eventDataLines.push(line.slice(6));
                                }
                            }
                            // Join all data lines to form complete JSON
                            const eventData = eventDataLines.join('');
                            if (eventType === 'values' && eventData) {
                                const data = JSON.parse(eventData);
                                // Look for AI/assistant messages
                                if (data.messages && Array.isArray(data.messages)) {
                                    // Check each message, prioritizing AI/assistant messages
                                    for(let i = data.messages.length - 1; i >= 0; i--){
                                        const msg = data.messages[i];
                                        if (msg && msg.content && (msg.role === 'assistant' || msg.type === 'ai' || msg.type === 'AIMessage')) {
                                            aiResponse = msg.content;
                                            break; // Take the most recent AI message
                                        }
                                    }
                                }
                            }
                        } catch (parseError) {
                            console.warn('Failed to parse SSE event:', parseError);
                        }
                    }
                }
            } finally{
                reader.releaseLock();
            }
            if (!aiResponse) {
                console.warn('No AI response found in stream');
                throw new Error('No valid response received from agent - stream may have been interrupted');
            }
            // Add AI response to conversation history
            this.conversationHistory.push({
                role: 'assistant',
                content: aiResponse
            });
            // Parse response for potential actions
            const actions = this.parseActions(aiResponse, message, mapContext);
            return {
                content: aiResponse,
                actions: actions,
                metadata: {
                    confidence: 0.85,
                    reasoning: 'Response generated by LangGraph restaurant intelligence agent'
                }
            };
        } catch (error) {
            console.error('AI Service Error:', error);
            // Fallback to local processing for offline/error scenarios
            return this.fallbackResponse(message, mapContext);
        }
    }
    parseActions(response, userMessage, mapContext) {
        const actions = [];
        const lowerResponse = response.toLowerCase();
        const lowerMessage = userMessage.toLowerCase();
        // Pattern matching for common map operations
        if (lowerMessage.includes('add') && (lowerMessage.includes('marker') || lowerMessage.includes('pin'))) {
            // Determine marker type
            let markerType = 'location';
            if (lowerMessage.includes('poi') || lowerMessage.includes('landmark')) markerType = 'poi';
            if (lowerMessage.includes('business') || lowerMessage.includes('restaurant') || lowerMessage.includes('coffee')) markerType = 'business';
            if (lowerMessage.includes('route')) markerType = 'route';
            // Check for bulk operations
            const numberMatch = lowerMessage.match(/(\d+)/);
            const count = numberMatch ? parseInt(numberMatch[1]) : 1;
            if (count > 1) {
                actions.push({
                    type: 'bulk_add_markers',
                    payload: {
                        count: Math.min(count, 10),
                        type: markerType,
                        center: mapContext.center
                    }
                });
            } else {
                actions.push({
                    type: 'add_marker',
                    payload: {
                        type: markerType,
                        position: mapContext.center,
                        title: "AI Generated ".concat(markerType),
                        description: 'Created from: "'.concat(userMessage, '"')
                    }
                });
            }
        }
        if (lowerMessage.includes('clear') || lowerMessage.includes('remove all')) {
            actions.push({
                type: 'clear_markers',
                payload: {}
            });
        }
        if (lowerMessage.includes('zoom')) {
            const zoomMatch = lowerMessage.match(/zoom.*?(\d+)/);
            if (zoomMatch) {
                actions.push({
                    type: 'update_zoom',
                    payload: {
                        zoom: parseInt(zoomMatch[1])
                    }
                });
            } else if (lowerMessage.includes('in')) {
                actions.push({
                    type: 'update_zoom',
                    payload: {
                        zoom: Math.min(20, mapContext.zoom + 2)
                    }
                });
            } else if (lowerMessage.includes('out')) {
                actions.push({
                    type: 'update_zoom',
                    payload: {
                        zoom: Math.max(1, mapContext.zoom - 2)
                    }
                });
            }
        }
        // Geographic location commands
        if (lowerMessage.includes('go to') || lowerMessage.includes('center on')) {
            if (lowerMessage.includes('san francisco')) {
                actions.push({
                    type: 'update_center',
                    payload: {
                        center: {
                            lat: 37.7749,
                            lng: -122.4194
                        }
                    }
                });
            } else if (lowerMessage.includes('new york')) {
                actions.push({
                    type: 'update_center',
                    payload: {
                        center: {
                            lat: 40.7128,
                            lng: -74.0060
                        }
                    }
                });
            } else if (lowerMessage.includes('london')) {
                actions.push({
                    type: 'update_center',
                    payload: {
                        center: {
                            lat: 51.5074,
                            lng: -0.1278
                        }
                    }
                });
            }
        }
        return actions;
    }
    fallbackResponse(message, mapContext) {
        const lowerMessage = message.toLowerCase();
        if (lowerMessage.includes('help')) {
            return {
                content: '🤖 **AI Map Assistant Help**\n\nI can help you with:\n• **Add markers**: "add 3 coffee shops near current location"\n• **Map navigation**: "zoom to level 15", "center on New York"\n• **Data analysis**: "analyze marker distribution"\n• **Bulk operations**: "clear all markers", "add sample data"\n\nCurrently running in offline mode. Start the LangGraph agent server for enhanced capabilities.',
                actions: []
            };
        }
        if (lowerMessage.includes('status')) {
            return {
                content: "📊 **Map Status**\n• Markers: ".concat(mapContext.markers.length, "\n• Center: ").concat(mapContext.center.lat.toFixed(4), ", ").concat(mapContext.center.lng.toFixed(4), "\n• Zoom: ").concat(mapContext.zoom.toFixed(1), "x\n• API Status: Offline (using fallback mode)"),
                actions: []
            };
        }
        return {
            content: 'I understand you said: "'.concat(message, "\". I'm currently in offline mode. Please start the LangGraph agent server and ensure it's running on port 8123.\n\nThen I'll be able to provide enhanced AI assistance!"),
            actions: []
        };
    }
    clearHistory() {
        this.conversationHistory = this.conversationHistory.slice(0, 1); // Keep system message
    }
    getConversationHistory() {
        return [
            ...this.conversationHistory
        ];
    }
    constructor(){
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "baseUrl", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "model", void 0);
        (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$swc$2f$helpers$2f$esm$2f$_define_property$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["_"])(this, "conversationHistory", []);
        this.baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].env.NEXT_PUBLIC_LANGGRAPH_ENDPOINT || 'http://localhost:8123';
        this.model = 'starterAgent'; // LangGraph assistant ID
        // Initialize with system context
        this.conversationHistory = [
            {
                role: 'system',
                content: "You are an AI assistant specialized in map interaction and geospatial analysis. \n      You can help users with:\n      - Adding markers (POI, business, location, route)\n      - Map navigation (zoom, pan, center)\n      - Data analysis and insights\n      - Bulk operations\n      - Geographic queries\n\n      When responding, you can suggest actions by including them in your response. Available actions:\n      - add_marker: Add a single marker\n      - bulk_add_markers: Add multiple markers\n      - remove_marker: Remove a specific marker\n      - clear_markers: Remove all markers\n      - update_zoom: Change zoom level\n      - update_center: Change map center\n      \n      Always provide helpful, contextual responses about map operations and geographic data."
            }
        ];
    }
}
const aiService = new AIService();
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/chat/ChatInterface.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ChatInterface
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/scroll-area.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$shared$2f$SharedStateProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/shared/SharedStateProvider.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$ReportsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/contexts/ReportsContext.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/ai-service.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/send.js [app-client] (ecmascript) <export default as Send>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/bot.js [app-client] (ecmascript) <export default as Bot>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/user.js [app-client] (ecmascript) <export default as User>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/code.js [app-client] (ecmascript) <export default as Code>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/history.js [app-client] (ecmascript) <export default as History>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/refresh-cw.js [app-client] (ecmascript) <export default as RefreshCw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/terminal.js [app-client] (ecmascript) <export default as Terminal>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
// Lazy load heavy components for better performance
const GenerativeUIManager = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/frontend/src/components/generative/GenerativeUIManager.tsx [app-client] (ecmascript, async loader)").then((module)=>({
            default: module.GenerativeUIManager
        })));
_c = GenerativeUIManager;
// Client-only timestamp component to prevent hydration issues
function ClientTimestamp(param) {
    let { timestamp } = param;
    _s();
    const [isClient, setIsClient] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ClientTimestamp.useEffect": ()=>{
            setIsClient(true);
        }
    }["ClientTimestamp.useEffect"], []);
    if (!isClient) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            children: "--:--:--"
        }, void 0, false, {
            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
            lineNumber: 48,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        children: timestamp.toLocaleTimeString()
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
        lineNumber: 51,
        columnNumber: 10
    }, this);
}
_s(ClientTimestamp, "k460N28PNzD7zo1YW47Q9UigQis=");
_c1 = ClientTimestamp;
const AI_CAPABILITIES = [
    {
        name: "Map Control",
        description: "Control map zoom, center, and navigation",
        examples: [
            "zoom to level 15",
            "center map on San Francisco",
            "move to coordinates 37.7749, -122.4194"
        ],
        category: "map"
    },
    {
        name: "Marker Management",
        description: "Add, remove, and modify markers",
        examples: [
            "add a coffee shop marker at current center",
            "remove all business markers",
            "create 5 random POI markers"
        ],
        category: "map"
    },
    {
        name: "Data Analysis",
        description: "Analyze map data and provide insights",
        examples: [
            "analyze marker distribution",
            "find closest markers to center",
            "calculate total distance between markers"
        ],
        category: "analysis"
    },
    {
        name: "Component Generation",
        description: "Generate custom UI components",
        examples: [
            "create a marker info panel",
            "generate a statistics dashboard",
            "build a custom control widget"
        ],
        category: "ui"
    },
    {
        name: "Bulk Operations",
        description: "Perform operations on multiple items",
        examples: [
            "import markers from coordinates list",
            "export all POI markers",
            "batch update marker titles"
        ],
        category: "data"
    }
];
function ChatInterface(param) {
    let { className = "", initialMessage, reportId } = param;
    _s1();
    const { currentReport, addChatMessage, updateReport } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$ReportsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReports"])();
    // Memoized state to prevent unnecessary re-renders
    const [messages, setMessages] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [inputValue, setInputValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [isProcessing, setIsProcessing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [commandHistory, setCommandHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [historyIndex, setHistoryIndex] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(-1);
    const [showAdvanced, setShowAdvanced] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [isGenerativeUIReady, setIsGenerativeUIReady] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const messagesEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const inputRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Optimized chat history loading with memoization
    const formattedMessages = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ChatInterface.useMemo[formattedMessages]": ()=>{
            if (!(currentReport === null || currentReport === void 0 ? void 0 : currentReport.chatHistory)) return [];
            return currentReport.chatHistory.map({
                "ChatInterface.useMemo[formattedMessages]": (msg)=>({
                        id: msg.messageId,
                        content: msg.content,
                        sender: msg.sender === 'agent' ? 'ai' : msg.sender === 'user' ? 'user' : 'ai',
                        timestamp: msg.timestamp,
                        type: 'text',
                        metadata: msg.metadata
                    })
            }["ChatInterface.useMemo[formattedMessages]"]);
        }
    }["ChatInterface.useMemo[formattedMessages]"], [
        currentReport === null || currentReport === void 0 ? void 0 : currentReport.chatHistory
    ]);
    // Load chat history from current report
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            setMessages(formattedMessages);
        }
    }["ChatInterface.useEffect"], [
        formattedMessages
    ]);
    // Enhanced shared state integration for seamless report-chat connectivity
    const { mapState, addMarker, updateMarker, removeMarker, clearMarkers, bulkAddMarkers, selectMarker, updateZoom, updateCenter, executeCommand, generateComponent, getMarkersByType, getMarkersInBounds, exportState, forceSync, conductMarketAnalysis, generateLocationInsights } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$shared$2f$SharedStateProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSharedState"])();
    // Optimized auto-scroll with throttling
    const scrollToBottom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInterface.useCallback[scrollToBottom]": ()=>{
            var _messagesEndRef_current;
            (_messagesEndRef_current = messagesEndRef.current) === null || _messagesEndRef_current === void 0 ? void 0 : _messagesEndRef_current.scrollIntoView({
                behavior: "smooth"
            });
        }
    }["ChatInterface.useCallback[scrollToBottom]"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            const timeoutId = setTimeout(scrollToBottom, 100);
            return ({
                "ChatInterface.useEffect": ()=>clearTimeout(timeoutId)
            })["ChatInterface.useEffect"];
        }
    }["ChatInterface.useEffect"], [
        messages,
        scrollToBottom
    ]);
    // Enhanced state change monitoring
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            const checkStateChanges = {
                "ChatInterface.useEffect.checkStateChanges": ()=>{
                    var _lastMessage_metadata;
                    // Monitor for significant state changes and provide contextual responses
                    if (mapState.isSyncing) {
                        // Don't spam during sync
                        return;
                    }
                    // Check for new markers
                    const currentMarkerCount = mapState.markers.length;
                    const lastMessage = messages[messages.length - 1];
                    if ((lastMessage === null || lastMessage === void 0 ? void 0 : (_lastMessage_metadata = lastMessage.metadata) === null || _lastMessage_metadata === void 0 ? void 0 : _lastMessage_metadata.markerCount) !== undefined && currentMarkerCount !== lastMessage.metadata.markerCount && lastMessage.sender === "ai" && Date.now() - lastMessage.timestamp.getTime() > 2000) {
                        if (currentMarkerCount > lastMessage.metadata.markerCount) {
                            addAIMessage("🎯 I detected ".concat(currentMarkerCount - lastMessage.metadata.markerCount, " new marker(s) added! The map now has ").concat(currentMarkerCount, " total markers."), "success", {
                                markerCount: currentMarkerCount
                            });
                        } else if (currentMarkerCount < lastMessage.metadata.markerCount) {
                            addAIMessage("🗑️ ".concat(lastMessage.metadata.markerCount - currentMarkerCount, " marker(s) removed. ").concat(currentMarkerCount, " markers remaining."), "text", {
                                markerCount: currentMarkerCount
                            });
                        }
                    }
                }
            }["ChatInterface.useEffect.checkStateChanges"];
            const interval = setInterval(checkStateChanges, 3000);
            return ({
                "ChatInterface.useEffect": ()=>clearInterval(interval)
            })["ChatInterface.useEffect"];
        }
    }["ChatInterface.useEffect"], [
        mapState.markers.length,
        mapState.isSyncing,
        messages
    ]);
    const addUserMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInterface.useCallback[addUserMessage]": function(content) {
            let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "text";
            const newMessage = {
                id: "user-".concat(Date.now()),
                content,
                sender: "user",
                timestamp: new Date(),
                type
            };
            setMessages({
                "ChatInterface.useCallback[addUserMessage]": (prev)=>[
                        ...prev,
                        newMessage
                    ]
            }["ChatInterface.useCallback[addUserMessage]"]);
            // Save to reports context
            if (currentReport && reportId) {
                addChatMessage(reportId, {
                    content,
                    sender: "user",
                    metadata: {},
                    messageType: "user_query"
                });
            }
            // Add to command history
            if (type === "command" || content.startsWith("/")) {
                setCommandHistory({
                    "ChatInterface.useCallback[addUserMessage]": (prev)=>{
                        const newHistory = [
                            content,
                            ...prev.filter({
                                "ChatInterface.useCallback[addUserMessage]": (cmd)=>cmd !== content
                            }["ChatInterface.useCallback[addUserMessage]"])
                        ];
                        return newHistory.slice(0, 50); // Keep last 50 commands
                    }
                }["ChatInterface.useCallback[addUserMessage]"]);
                setHistoryIndex(-1);
            }
        }
    }["ChatInterface.useCallback[addUserMessage]"], [
        currentReport,
        reportId,
        addChatMessage
    ]);
    const addAIMessage = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInterface.useCallback[addAIMessage]": function(content) {
            let type = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "text", metadata = arguments.length > 2 ? arguments[2] : void 0, component = arguments.length > 3 ? arguments[3] : void 0;
            const newMessage = {
                id: "ai-".concat(Date.now()),
                content,
                sender: "ai",
                timestamp: new Date(),
                type,
                metadata: {
                    markerCount: mapState.markers.length,
                    ...metadata
                },
                component
            };
            setMessages({
                "ChatInterface.useCallback[addAIMessage]": (prev)=>[
                        ...prev,
                        newMessage
                    ]
            }["ChatInterface.useCallback[addAIMessage]"]);
            // Save to reports context
            if (currentReport && reportId) {
                addChatMessage(reportId, {
                    content,
                    sender: "agent",
                    metadata: metadata || {},
                    messageType: "agent_response"
                });
            }
        }
    }["ChatInterface.useCallback[addAIMessage]"], [
        mapState.markers.length,
        currentReport,
        reportId,
        addChatMessage
    ]);
    const processAICommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInterface.useCallback[processAICommand]": async (userMessage)=>{
            try {
                // Enhanced keyword detection for comprehensive restaurant analytics
                const lowerMessage = userMessage.toLowerCase();
                // Import BiteBase API for advanced analytics
                const { bitebaseApi } = await __turbopack_context__.A("[project]/frontend/src/services/bitebaseApi.ts [app-client] (ecmascript, async loader)");
                // Professional Market Research Commands
                // 1. Comprehensive Market Analysis
                if (lowerMessage.includes('comprehensive') && (lowerMessage.includes('analysis') || lowerMessage.includes('market'))) {
                    addAIMessage("🔍 Conducting comprehensive market analysis with advanced geospatial intelligence...", "text");
                    const query = {
                        center: mapState.center,
                        radius: mapState.bufferRadius || 1000,
                        filters: {
                            includeCompetitors: true,
                            minimumRating: 3.0
                        }
                    };
                    const analysis = await bitebaseApi.conductComprehensiveAnalysis(query);
                    const comprehensiveAnalysis = {
                        id: "analysis-".concat(Date.now()),
                        location: mapState.center,
                        locationName: "Current Location",
                        radius: query.radius,
                        competitorCount: analysis.competitors.length,
                        marketSaturation: analysis.marketSummary.saturationLevel,
                        opportunityScore: analysis.marketSummary.opportunityScore,
                        confidenceLevel: 95,
                        recommendedCuisines: analysis.marketSummary.recommendations.filter({
                            "ChatInterface.useCallback[processAICommand]": (r)=>r.includes('cuisine') || r.includes('Asian') || r.includes('Mexican')
                        }["ChatInterface.useCallback[processAICommand]"]).map({
                            "ChatInterface.useCallback[processAICommand]": (r)=>r.toLowerCase().replace(/[^a-z]/g, '')
                        }["ChatInterface.useCallback[processAICommand]"]).filter(Boolean).slice(0, 3) || [
                            'fusion',
                            'american',
                            'asian'
                        ],
                        recommendedPriceRange: '$$',
                        estimatedRevenue: {
                            conservative: analysis.marketSummary.totalMarketSize * 0.05,
                            realistic: analysis.marketSummary.totalMarketSize * 0.08,
                            optimistic: analysis.marketSummary.totalMarketSize * 0.12
                        },
                        riskFactors: [
                            "Market competition",
                            "Economic volatility",
                            "Seasonal variation"
                        ],
                        strengths: [
                            "Growing market",
                            "Demographic alignment",
                            "Location accessibility"
                        ],
                        insights: analysis.marketSummary.recommendations,
                        competitors: analysis.competitors.map({
                            "ChatInterface.useCallback[processAICommand]": (comp)=>({
                                    name: comp.restaurant.name,
                                    distance: Math.round(Math.random() * 1000),
                                    rating: comp.restaurant.rating,
                                    priceRange: comp.restaurant.priceRange,
                                    cuisine: comp.restaurant.cuisine,
                                    threatLevel: comp.threatLevel,
                                    weaknesses: comp.weaknesses,
                                    strengths: comp.competitiveAdvantages,
                                    marketShare: comp.marketShare
                                })
                        }["ChatInterface.useCallback[processAICommand]"]),
                        marketMetrics: {
                            marketSize: analysis.marketSummary.totalMarketSize,
                            marketGrowth: analysis.marketSummary.growthRate,
                            customerAcquisitionCost: 45,
                            averageLifetimeValue: 850,
                            marketPenetration: 8.5,
                            seasonalityIndex: 0.25
                        },
                        demographics: {
                            totalPopulation: 12500,
                            targetDemographic: 8200,
                            avgIncome: 72000,
                            diningFrequency: 8.5,
                            preferredCuisines: [
                                'asian',
                                'american',
                                'mediterranean'
                            ],
                            priceToleranceRange: {
                                min: 15,
                                max: 45
                            },
                            primaryAgeGroups: {
                                '26-35': 35,
                                '36-45': 25,
                                '18-25': 20,
                                '46-55': 15,
                                '55+': 5
                            },
                            lifestyleSegments: {
                                'young_professionals': 40,
                                'families': 30,
                                'students': 15,
                                'other': 15
                            }
                        },
                        recommendations: {
                            positioning: "Modern casual dining with focus on fresh, healthy options",
                            menuStrategy: [
                                "Customizable bowls",
                                "Locally sourced ingredients",
                                "Dietary restrictions accommodation"
                            ],
                            pricingStrategy: "Premium value positioning with competitive lunch pricing",
                            marketingChannels: [
                                "Instagram",
                                "Google Ads",
                                "Local partnerships",
                                "Delivery apps"
                            ],
                            operationalInsights: [
                                "Extended lunch hours",
                                "Delivery optimization",
                                "Loyalty program"
                            ]
                        },
                        footTrafficAnalysis: {
                            peakHours: [
                                '12:00-13:30',
                                '18:00-20:00'
                            ],
                            dailyTraffic: 450,
                            seasonalVariation: 0.2,
                            weekdayVsWeekend: {
                                weekday: 380,
                                weekend: 520
                            }
                        }
                    };
                    const { MarketAnalysisCard } = await __turbopack_context__.A("[project]/frontend/src/components/generative/MarketAnalysisCard.tsx [app-client] (ecmascript, async loader)");
                    addAIMessage("📊 **Comprehensive Market Analysis Complete!**\n\n" + "🎯 **Opportunity Score: ".concat(comprehensiveAnalysis.opportunityScore, "/100**\n") + "🏪 **Market Saturation: ".concat(comprehensiveAnalysis.marketSaturation, "**\n") + "💰 **Market Size: $".concat((analysis.marketSummary.totalMarketSize / 1000000).toFixed(1), "M**\n") + "📈 **Growth Rate: ".concat(analysis.marketSummary.growthRate, "%**\n\n") + "**Key Insights:**\n" + analysis.marketSummary.recommendations.map({
                        "ChatInterface.useCallback[processAICommand]": (r)=>"• ".concat(r)
                    }["ChatInterface.useCallback[processAICommand]"]).join('\n') + "\n\n*Review the detailed analysis card below for comprehensive insights.*", "component", {
                        analysisType: 'comprehensive'
                    }, {
                        "ChatInterface.useCallback[processAICommand]": ()=>MarketAnalysisCard({
                                analysis: comprehensiveAnalysis,
                                onApprove: {
                                    "ChatInterface.useCallback[processAICommand]": (data)=>{
                                        addAIMessage("✅ Comprehensive analysis approved and added to map!", "success");
                                    }
                                }["ChatInterface.useCallback[processAICommand]"],
                                onReject: {
                                    "ChatInterface.useCallback[processAICommand]": ()=>{
                                        addAIMessage("❌ Analysis rejected. Let me know if you'd like a different approach.", "text");
                                    }
                                }["ChatInterface.useCallback[processAICommand]"],
                                onRequestDetails: {
                                    "ChatInterface.useCallback[processAICommand]": ()=>{
                                        addAIMessage("🔍 Generating detailed breakdown...", "text");
                                    }
                                }["ChatInterface.useCallback[processAICommand]"]
                            })
                    }["ChatInterface.useCallback[processAICommand]"]);
                    return;
                }
                // 2. Hotspot Analysis
                if (lowerMessage.includes('hotspot') || lowerMessage.includes('delivery') && lowerMessage.includes('analysis')) {
                    addAIMessage("🔥 Analyzing delivery and foot traffic hotspots...", "text");
                    const hotspots = await bitebaseApi.analyzeHotspots({
                        center: mapState.center,
                        radius: mapState.bufferRadius || 1000
                    });
                    let hotspotReport = "🔥 **Hotspot Analysis Results**\n\n";
                    hotspots.forEach({
                        "ChatInterface.useCallback[processAICommand]": (hotspot, idx)=>{
                            hotspotReport += "**".concat(idx + 1, ". ").concat(hotspot.type.toUpperCase(), " Hotspot**\n");
                            hotspotReport += "• Intensity: ".concat((hotspot.intensity * 100).toFixed(0), "% (").concat(hotspot.confidence, "% confidence)\n");
                            hotspotReport += "• Peak Hours: ".concat(hotspot.peakHours.join(', '), "\n");
                            hotspotReport += "• Average Volume: ".concat(hotspot.metrics.averageVolume, "/day\n");
                            hotspotReport += "• Growth Rate: ".concat(hotspot.metrics.growthRate, "% YoY\n");
                            hotspotReport += "• Primary Demo: ".concat(hotspot.demographicProfile.primaryAgeGroup, ", $").concat(hotspot.demographicProfile.avgIncome.toLocaleString(), "\n\n");
                        }
                    }["ChatInterface.useCallback[processAICommand]"]);
                    hotspotReport += "💡 **Strategic Recommendations:**\n";
                    hotspotReport += "• Position near high-intensity delivery hotspots\n";
                    hotspotReport += "• Optimize menu for peak hour demographics\n";
                    hotspotReport += "• Consider satellite locations in secondary hotspots\n";
                    addAIMessage(hotspotReport, "success");
                    return;
                }
                // 3. Competitor Deep Dive
                if (lowerMessage.includes('competitor') && (lowerMessage.includes('analysis') || lowerMessage.includes('deep'))) {
                    // Generate competitor analysis card
                    const competitorData = {
                        location: mapState.center,
                        radius: 1000,
                        competitorCount: 8,
                        averageRating: 4.2,
                        priceDistribution: {
                            '$': 2,
                            '$$': 4,
                            '$$$': 2,
                            '$$$$': 0
                        },
                        cuisineGaps: [
                            'Mexican',
                            'Thai',
                            'Vegan'
                        ],
                        topCompetitors: [
                            {
                                name: "Tony's Pizzeria",
                                cuisine: "Italian",
                                rating: 4.5,
                                priceRange: "$$",
                                distance: 250,
                                weaknesses: [
                                    "Limited seating",
                                    "No delivery"
                                ]
                            },
                            {
                                name: "Burger Palace",
                                cuisine: "American",
                                rating: 4.1,
                                priceRange: "$",
                                distance: 180,
                                weaknesses: [
                                    "Fast food only",
                                    "No dinner menu"
                                ]
                            },
                            {
                                name: "Sushi Zen",
                                cuisine: "Japanese",
                                rating: 4.7,
                                priceRange: "$$$",
                                distance: 320,
                                weaknesses: [
                                    "High prices",
                                    "Limited lunch hours"
                                ]
                            }
                        ],
                        marketOpportunities: [
                            "Gap in affordable Mexican cuisine",
                            "No quality breakfast options",
                            "Limited vegetarian/vegan choices"
                        ],
                        competitiveAdvantages: [
                            "Prime location with high foot traffic",
                            "Ample parking available",
                            "Close to business district"
                        ],
                        threats: [
                            "Established competitors with loyal customers",
                            "High rent costs in area"
                        ],
                        overallThreatLevel: 'medium'
                    };
                    const aiMessage = {
                        id: "ai-".concat(Date.now()),
                        content: "I've analyzed the competitive landscape in this area. Here's what I found:",
                        sender: "ai",
                        timestamp: new Date(),
                        type: "generative_ui",
                        generativeUI: {
                            type: 'competitor_analysis',
                            data: competitorData,
                            pendingApproval: true
                        }
                    };
                    setMessages({
                        "ChatInterface.useCallback[processAICommand]": (prev)=>[
                                ...prev,
                                aiMessage
                            ]
                    }["ChatInterface.useCallback[processAICommand]"]);
                    return;
                }
                // Check for market analysis specifically
                if (lowerMessage.includes('market') && lowerMessage.includes('analysis')) {
                    try {
                        const analysisData = await conductMarketAnalysis(mapState.center, 1000);
                        const aiMessage = {
                            id: "ai-".concat(Date.now()),
                            content: "I've conducted a market analysis for this location. Here are the findings:",
                            sender: "ai",
                            timestamp: new Date(),
                            type: "generative_ui",
                            generativeUI: {
                                type: 'market_analysis',
                                data: analysisData,
                                pendingApproval: true
                            }
                        };
                        setMessages({
                            "ChatInterface.useCallback[processAICommand]": (prev)=>[
                                    ...prev,
                                    aiMessage
                                ]
                        }["ChatInterface.useCallback[processAICommand]"]);
                    } catch (error) {
                        console.error('Market analysis failed:', error);
                        const errorMessage = {
                            id: "ai-".concat(Date.now()),
                            content: "I apologize, but I encountered an error while generating the market analysis. Please try again.",
                            sender: "ai",
                            timestamp: new Date()
                        };
                        setMessages({
                            "ChatInterface.useCallback[processAICommand]": (prev)=>[
                                    ...prev,
                                    errorMessage
                                ]
                        }["ChatInterface.useCallback[processAICommand]"]);
                    }
                    return;
                }
                // Check for location search queries (restaurants, cafes, etc.)
                const locationSearchTerms = [
                    'find',
                    'search'
                ];
                const businessTypeTerms = [
                    'restaurant',
                    'cafe',
                    'coffee shop',
                    'bistro'
                ];
                const isLocationSearch = locationSearchTerms.some({
                    "ChatInterface.useCallback[processAICommand]": (term)=>lowerMessage.includes(term)
                }["ChatInterface.useCallback[processAICommand]"]) && businessTypeTerms.some({
                    "ChatInterface.useCallback[processAICommand]": (term)=>lowerMessage.includes(term)
                }["ChatInterface.useCallback[processAICommand]"]);
                if (isLocationSearch) {
                    try {
                        const locationData = await generateLocationInsights(mapState.center);
                        const aiMessage = {
                            id: "ai-".concat(Date.now()),
                            content: "I found a location that matches your search. Here are the details:",
                            sender: "ai",
                            timestamp: new Date(),
                            type: "generative_ui",
                            generativeUI: {
                                type: 'location',
                                data: locationData,
                                pendingApproval: true
                            }
                        };
                        setMessages({
                            "ChatInterface.useCallback[processAICommand]": (prev)=>[
                                    ...prev,
                                    aiMessage
                                ]
                        }["ChatInterface.useCallback[processAICommand]"]);
                    } catch (error) {
                        console.error('Location search failed:', error);
                        const errorMessage = {
                            id: "ai-".concat(Date.now()),
                            content: "I apologize, but I encountered an error while searching for locations. Please try again.",
                            sender: "ai",
                            timestamp: new Date()
                        };
                        setMessages({
                            "ChatInterface.useCallback[processAICommand]": (prev)=>[
                                    ...prev,
                                    errorMessage
                                ]
                        }["ChatInterface.useCallback[processAICommand]"]);
                    }
                    return;
                }
                // If not a special generative UI query, proceed with normal AI processing
                // Prepare map context for AI service
                const mapContext = {
                    center: mapState.center,
                    zoom: mapState.zoom,
                    markers: mapState.markers.map({
                        "ChatInterface.useCallback[processAICommand]": (marker)=>({
                                id: marker.id,
                                type: marker.type,
                                position: marker.position,
                                title: marker.title,
                                description: marker.description
                            })
                    }["ChatInterface.useCallback[processAICommand]"]),
                    bounds: mapState.bounds
                };
                // Send message to AI service
                const response = await __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$ai$2d$service$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["aiService"].sendMessage(userMessage, mapContext);
                // Display AI response
                addAIMessage(response.content, "success", response.metadata);
                // Execute any actions suggested by the AI
                if (response.actions && response.actions.length > 0) {
                    for (const action of response.actions){
                        await executeAIAction(action);
                    }
                }
            } catch (error) {
                console.error('AI Command Error:', error);
                addAIMessage("❌ Error processing AI command: ".concat(error instanceof Error ? error.message : 'Unknown error'), "error");
            }
        }
    }["ChatInterface.useCallback[processAICommand]"], [
        mapState,
        addAIMessage
    ]);
    const executeAIAction = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ChatInterface.useCallback[executeAIAction]": async (action)=>{
            try {
                switch(action.type){
                    case 'add_marker':
                        await addMarker({
                            type: action.payload.type,
                            position: action.payload.position,
                            title: action.payload.title,
                            description: action.payload.description
                        });
                        break;
                    case 'bulk_add_markers':
                        const markers = Array.from({
                            length: action.payload.count
                        }, {
                            "ChatInterface.useCallback[executeAIAction].markers": (_, i)=>({
                                    type: action.payload.type,
                                    position: {
                                        lat: action.payload.center.lat + (Math.random() - 0.5) * 0.02,
                                        lng: action.payload.center.lng + (Math.random() - 0.5) * 0.02
                                    },
                                    title: "AI Generated ".concat(action.payload.type, " ").concat(i + 1),
                                    description: "Generated by AI assistant"
                                })
                        }["ChatInterface.useCallback[executeAIAction].markers"]);
                        await bulkAddMarkers(markers);
                        break;
                    case 'remove_marker':
                        if (action.payload.id) {
                            removeMarker(action.payload.id);
                        }
                        break;
                    case 'clear_markers':
                        clearMarkers();
                        break;
                    case 'update_zoom':
                        updateZoom(action.payload.zoom);
                        break;
                    case 'update_center':
                        updateCenter(action.payload.center);
                        break;
                    default:
                        console.warn('Unknown AI action type:', action.type);
                }
            } catch (error) {
                console.error('Error executing AI action:', error);
                addAIMessage("⚠️ Failed to execute action: ".concat(action.type), "error");
            }
        }
    }["ChatInterface.useCallback[executeAIAction]"], [
        addMarker,
        bulkAddMarkers,
        removeMarker,
        clearMarkers,
        updateZoom,
        updateCenter,
        addAIMessage
    ]);
    // Handle initial message from landing page
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ChatInterface.useEffect": ()=>{
            if (initialMessage && messages.length === 0) {
                // Add the user message
                const userMessage = {
                    id: "user-".concat(Date.now()),
                    content: initialMessage,
                    sender: "user",
                    timestamp: new Date(),
                    type: "text"
                };
                setMessages([
                    userMessage
                ]);
                setIsProcessing(true);
                // Process the message with AI
                processAICommand(initialMessage).finally({
                    "ChatInterface.useEffect": ()=>{
                        setIsProcessing(false);
                    }
                }["ChatInterface.useEffect"]);
            }
        }
    }["ChatInterface.useEffect"], [
        initialMessage,
        messages.length,
        processAICommand
    ]);
    const handleSubmit = async (e)=>{
        e.preventDefault();
        if (!inputValue.trim() || isProcessing) return;
        const message = inputValue.trim();
        const isCommand = message.startsWith("/") || message.toLowerCase().includes("add") || message.toLowerCase().includes("zoom") || message.toLowerCase().includes("clear");
        addUserMessage(message, isCommand ? "command" : "text");
        setInputValue("");
        setIsProcessing(true);
        try {
            await processAICommand(message);
        } finally{
            setIsProcessing(false);
        }
    };
    const handleKeyDown = (e)=>{
        if (e.key === "ArrowUp" && commandHistory.length > 0) {
            e.preventDefault();
            const newIndex = Math.min(historyIndex + 1, commandHistory.length - 1);
            setHistoryIndex(newIndex);
            setInputValue(commandHistory[newIndex]);
        } else if (e.key === "ArrowDown") {
            e.preventDefault();
            if (historyIndex > 0) {
                const newIndex = historyIndex - 1;
                setHistoryIndex(newIndex);
                setInputValue(commandHistory[newIndex]);
            } else {
                setHistoryIndex(-1);
                setInputValue("");
            }
        }
    };
    const handleSuggestionClick = (suggestion)=>{
        var _inputRef_current;
        setInputValue(suggestion);
        (_inputRef_current = inputRef.current) === null || _inputRef_current === void 0 ? void 0 : _inputRef_current.focus();
    };
    const clearChat = ()=>{
        setMessages([]);
    };
    const exportChat = ()=>{
        const chatData = {
            messages,
            timestamp: new Date().toISOString(),
            mapState: {
                center: mapState.center,
                zoom: mapState.zoom,
                markerCount: mapState.markers.length
            }
        };
        const blob = new Blob([
            JSON.stringify(chatData, null, 2)
        ], {
            type: 'application/json'
        });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = "chat-history-".concat(new Date().toISOString().split('T')[0], ".json");
        a.click();
        URL.revokeObjectURL(url);
    };
    const quickCommands = [
        "find italian restaurant nearby",
        "analyze market for new cafe",
        "search potential restaurant sites",
        "competitor analysis in area",
        "find coffee shops in location",
        "market analysis for thai restaurant",
        "demographic data for location",
        "add 3 coffee shops nearby",
        "analyze marker distribution",
        "zoom to level 15",
        "center map on current location",
        "create a statistics panel",
        "clear all markers",
        "export map data",
        "help - show all capabilities"
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
        className: "flex flex-col h-full overflow-hidden bg-transparent border-none shadow-none ".concat(className),
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                className: "flex-grow p-0 overflow-hidden bg-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$scroll$2d$area$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrollArea"], {
                    className: "h-full p-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "space-y-4",
                        children: [
                            messages.map((message)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 ".concat(message.sender === "user" ? "justify-end" : "justify-start"),
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "flex gap-3 max-w-[85%] ".concat(message.sender === "user" ? "flex-row-reverse" : ""),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ".concat(message.sender === "user" ? "bg-blue-500 text-white" : "bg-gradient-to-r from-purple-500 to-pink-500 text-white"),
                                                children: message.sender === "user" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$user$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__User$3e$__["User"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 50
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                    className: "h-4 w-4"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                    lineNumber: 787,
                                                    columnNumber: 81
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                lineNumber: 782,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col gap-2 ".concat(message.sender === "user" ? "items-end" : "items-start"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "p-3 rounded-lg ".concat(message.sender === "user" ? "bg-blue-500 text-white" : message.type === "error" ? "bg-red-50 border border-red-200 text-red-800" : message.type === "success" ? "bg-green-50 border border-green-200 text-green-800" : message.type === "command" ? "bg-yellow-50 border border-yellow-200 text-yellow-800" : message.type === "generative_ui" ? "bg-blue-50 border border-blue-200 text-blue-800" : "bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-200 text-gray-800"),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "whitespace-pre-wrap text-sm",
                                                                children: message.content
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                lineNumber: 804,
                                                                columnNumber: 23
                                                            }, this),
                                                            message.component && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "mt-3 p-3 bg-white rounded border",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(message.component, {}, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                    lineNumber: 810,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                lineNumber: 809,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                        lineNumber: 791,
                                                        columnNumber: 21
                                                    }, this),
                                                    message.generativeUI && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mt-2 w-full max-w-lg",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GenerativeUIManager, {
                                                            type: message.generativeUI.type,
                                                            data: message.generativeUI.data,
                                                            messageId: message.id,
                                                            showActions: message.generativeUI.pendingApproval,
                                                            onApprove: (data)=>{
                                                                // Update message to show approval
                                                                setMessages((prev)=>prev.map((msg)=>msg.id === message.id ? {
                                                                            ...msg,
                                                                            generativeUI: {
                                                                                ...msg.generativeUI,
                                                                                pendingApproval: false
                                                                            }
                                                                        } : msg));
                                                                // Add confirmation message
                                                                addAIMessage("✅ ".concat(message.generativeUI.type.replace('_', ' '), " has been added to the map successfully!"), "success");
                                                            },
                                                            onReject: ()=>{
                                                                // Update message to hide actions
                                                                setMessages((prev)=>prev.map((msg)=>msg.id === message.id ? {
                                                                            ...msg,
                                                                            generativeUI: {
                                                                                ...msg.generativeUI,
                                                                                pendingApproval: false
                                                                            }
                                                                        } : msg));
                                                                // Add rejection message
                                                                addAIMessage("The suggestion has been rejected. Would you like me to find alternatives?", "text");
                                                            },
                                                            onRequestMore: ()=>{
                                                                // Generate follow-up AI response
                                                                addAIMessage("Let me provide more detailed information about this suggestion...", "text");
                                                                // You could trigger additional API calls here
                                                                setTimeout(()=>{
                                                                    addAIMessage("Here are additional insights and recommendations based on the data.", "success");
                                                                }, 1000);
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                            lineNumber: 818,
                                                            columnNumber: 25
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                        lineNumber: 817,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex items-center gap-2 text-xs text-gray-500",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ClientTimestamp, {
                                                                timestamp: message.timestamp
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                lineNumber: 871,
                                                                columnNumber: 23
                                                            }, this),
                                                            message.type && message.type !== "text" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                                variant: "outline",
                                                                className: "text-xs",
                                                                children: message.type
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                lineNumber: 873,
                                                                columnNumber: 25
                                                            }, this),
                                                            message.sender === "ai" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                                size: "sm",
                                                                variant: "ghost",
                                                                className: "h-6 w-6 p-0",
                                                                onClick: ()=>navigator.clipboard.writeText(message.content),
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {
                                                                    className: "h-3 w-3"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                    lineNumber: 884,
                                                                    columnNumber: 27
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                                lineNumber: 878,
                                                                columnNumber: 25
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                        lineNumber: 870,
                                                        columnNumber: 21
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                lineNumber: 790,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                        lineNumber: 781,
                                        columnNumber: 17
                                    }, this)
                                }, message.id, false, {
                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                    lineNumber: 777,
                                    columnNumber: 15
                                }, this)),
                            isProcessing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-3 justify-start",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex gap-3 max-w-[85%]",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white flex items-center justify-center",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$bot$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Bot$3e$__["Bot"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                lineNumber: 897,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                            lineNumber: 896,
                                            columnNumber: 19
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "bg-gradient-to-r from-indigo-50 to-purple-50 border border-purple-200 p-3 rounded-lg",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex items-center gap-2 text-sm text-gray-600",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                                        className: "h-4 w-4 animate-spin"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                        lineNumber: 901,
                                                        columnNumber: 23
                                                    }, this),
                                                    "Processing your request..."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                                lineNumber: 900,
                                                columnNumber: 21
                                            }, this)
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                            lineNumber: 899,
                                            columnNumber: 19
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                    lineNumber: 895,
                                    columnNumber: 17
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 894,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: messagesEndRef
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 909,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                        lineNumber: 775,
                        columnNumber: 11
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                    lineNumber: 774,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                lineNumber: 773,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-4 py-3 bg-gray-50 border-t",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between mb-2",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "text-sm font-medium text-gray-700 flex items-center gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$terminal$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Terminal$3e$__["Terminal"], {
                                        className: "h-4 w-4"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                        lineNumber: 918,
                                        columnNumber: 13
                                    }, this),
                                    "Quick Commands"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 917,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                size: "sm",
                                variant: "ghost",
                                onClick: ()=>setShowAdvanced(!showAdvanced),
                                children: showAdvanced ? "Less" : "More"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 921,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                        lineNumber: 916,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid gap-2 ".concat(showAdvanced ? "grid-cols-1" : "grid-cols-2"),
                        children: (showAdvanced ? quickCommands : quickCommands.slice(0, 4)).map((command, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                variant: "outline",
                                className: "text-xs justify-start h-auto py-2 bg-white hover:bg-indigo-50 text-indigo-700 border-indigo-200",
                                onClick: ()=>handleSuggestionClick(command),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code$3e$__["Code"], {
                                        className: "h-3 w-3 mr-2 flex-shrink-0"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                        lineNumber: 938,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "truncate",
                                        children: command
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                        lineNumber: 939,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, index, true, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 932,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                        lineNumber: 930,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                lineNumber: 915,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardFooter"], {
                className: "p-4 pt-2 bg-transparent",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                    onSubmit: handleSubmit,
                    className: "flex w-full gap-2",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-grow relative",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                    ref: inputRef,
                                    placeholder: "Type a command or question... (↑/↓ for history)",
                                    value: inputValue,
                                    onChange: (e)=>setInputValue(e.target.value),
                                    onKeyDown: handleKeyDown,
                                    className: "pr-10",
                                    disabled: isProcessing
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                    lineNumber: 948,
                                    columnNumber: 13
                                }, this),
                                commandHistory.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                    variant: "outline",
                                    className: "absolute right-2 top-1/2 -translate-y-1/2 text-xs",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$history$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__History$3e$__["History"], {
                                            className: "h-3 w-3 mr-1"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                            lineNumber: 959,
                                            columnNumber: 17
                                        }, this),
                                        commandHistory.length
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                    lineNumber: 958,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                            lineNumber: 947,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                            type: "submit",
                            size: "icon",
                            disabled: !inputValue.trim() || isProcessing,
                            className: "bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700",
                            children: isProcessing ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$cw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCw$3e$__["RefreshCw"], {
                                className: "h-4 w-4 animate-spin"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 971,
                                columnNumber: 15
                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$send$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Send$3e$__["Send"], {
                                className: "h-4 w-4"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                                lineNumber: 973,
                                columnNumber: 15
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                            lineNumber: 964,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                    lineNumber: 946,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
                lineNumber: 945,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/chat/ChatInterface.tsx",
        lineNumber: 771,
        columnNumber: 5
    }, this);
}
_s1(ChatInterface, "YDnOR8glp0IknjWODJLVnYzggNc=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$contexts$2f$ReportsContext$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useReports"],
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$shared$2f$SharedStateProvider$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSharedState"]
    ];
});
_c2 = ChatInterface;
var _c, _c1, _c2;
__turbopack_context__.k.register(_c, "GenerativeUIManager");
__turbopack_context__.k.register(_c1, "ClientTimestamp");
__turbopack_context__.k.register(_c2, "ChatInterface");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_883a8279._.js.map