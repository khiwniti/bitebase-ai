(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/frontend/src/components/shared/SharedStateProvider.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "SharedStateProvider",
    ()=>SharedStateProvider,
    "useSharedState",
    ()=>useSharedState
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/uuid/dist/v4.js [app-client] (ecmascript) <export default as v4>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const initialState = {
    zoom: 12,
    center: {
        lat: 13.7563,
        lng: 100.5018
    },
    markers: [
        {
            id: "bkk-1",
            type: "location",
            position: {
                lat: 13.7563,
                lng: 100.5018
            },
            title: "Bangkok",
            description: "The vibrant capital of Thailand",
            selected: false
        },
        {
            id: "bkk-2",
            type: "poi",
            position: {
                lat: 37.8059,
                lng: -122.4103
            },
            title: "North Beach",
            description: "Historic Italian neighborhood",
            selected: false
        }
    ],
    selectedMarkerId: null,
    layers: [],
    activeLayers: [],
    mode: "explore",
    activeMarkerType: null,
    // Restaurant Research Data
    restaurants: [
        {
            id: "sample-restaurant-1",
            name: "Bangkok Bistro",
            type: "casual_dining",
            cuisine: "thai",
            priceRange: "$$",
            averageSpend: 25,
            capacity: 80,
            operatingHours: {
                monday: {
                    open: "11:00",
                    close: "22:00",
                    isOpen: true
                },
                tuesday: {
                    open: "11:00",
                    close: "22:00",
                    isOpen: true
                },
                wednesday: {
                    open: "11:00",
                    close: "22:00",
                    isOpen: true
                },
                thursday: {
                    open: "11:00",
                    close: "22:00",
                    isOpen: true
                },
                friday: {
                    open: "11:00",
                    close: "23:00",
                    isOpen: true
                },
                saturday: {
                    open: "11:00",
                    close: "23:00",
                    isOpen: true
                },
                sunday: {
                    open: "12:00",
                    close: "21:00",
                    isOpen: true
                }
            },
            coordinates: {
                lat: 13.7563,
                lng: 100.5018
            },
            address: "123 Sukhumvit Road, Bangkok 10110",
            phone: "+66-2-123-4567",
            website: "https://bangkokbistro.com",
            rating: 4.2,
            reviewCount: 245,
            isCompetitor: false,
            competitorThreatLevel: "low",
            marketShare: 12.5,
            distanceFromUser: 0,
            establishedDate: "2019-06-15"
        }
    ],
    demographics: [
        {
            id: "sample-demo-1",
            coordinates: {
                lat: 13.7563,
                lng: 100.5018
            },
            radius: 1000,
            population: 8500,
            ageGroups: {
                "18-25": 1200,
                "26-35": 2800,
                "36-45": 2100,
                "46-55": 1600,
                "56-65": 500,
                "65+": 300
            },
            incomeRanges: {
                "under_30k": 1500,
                "30k_50k": 2200,
                "50k_75k": 2600,
                "75k_100k": 1400,
                "100k_150k": 600,
                "over_150k": 200
            },
            lifestyleSegments: {
                young_professionals: 3000,
                families: 2500,
                students: 1500,
                seniors: 800,
                tourists: 500,
                locals: 7200,
                millennials: 2800,
                gen_z: 1200,
                high_income: 1800,
                middle_income: 4200,
                budget_conscious: 2500
            },
            diningFrequency: {
                daily: 2000,
                weekly: 4500,
                monthly: 1500,
                occasionally: 500
            }
        }
    ],
    marketAnalyses: [],
    selectedRestaurantId: null,
    selectedDemographicId: null,
    // Research Filters - Enhanced
    researchFilters: {
        cuisineTypes: [],
        restaurantTypes: [],
        priceRanges: [],
        radius: 2,
        showCompetitors: true,
        showDemographics: true,
        showFootTraffic: false,
        showRevenueZones: false,
        showDeliveryHotspots: false,
        showMarketGaps: false,
        showPriceComparison: false,
        competitorThreatLevel: [
            "low",
            "medium",
            "high",
            "critical"
        ],
        marketPosition: [
            "leader",
            "challenger",
            "follower",
            "niche"
        ],
        minimumRating: 0,
        maximumDistance: 5000,
        dayPartFilter: [],
        customerSegmentFilter: []
    },
    // Advanced Analytics Layers
    analyticsLayers: {
        hotspotAnalysis: {
            enabled: false,
            type: "delivery",
            timeFrame: "daily",
            statisticalSignificance: 0.05,
            zScoreThreshold: 1.96,
            gridSize: 100
        },
        competitiveAnalysis: {
            enabled: false,
            showThreatLevels: true,
            showMarketShare: true,
            proximityRadius: 1000,
            benchmarkMetrics: [
                "price",
                "rating"
            ]
        },
        customerFlow: {
            enabled: false,
            showOriginDestination: false,
            timeOfDay: [],
            dayOfWeek: [],
            animationSpeed: 1
        },
        marketSaturation: {
            enabled: false,
            saturationThreshold: 0.7,
            gridResolution: 50,
            colorScheme: "viridis"
        },
        priceMapping: {
            enabled: false,
            showPriceRange: true,
            showPriceDisparity: false,
            normalizeByCuisine: true
        }
    },
    // Buffer Radius Visualization
    bufferRadius: 500,
    showBufferRadius: false,
    bufferCenter: null,
    bufferOpacity: 0.3,
    // Analysis State
    currentAnalysis: null,
    isAnalyzing: false,
    analysisProgress: 0,
    isSyncing: false,
    lastSyncTime: null,
    history: [],
    historyIndex: -1,
    pendingCommands: [],
    componentRegistry: new Map(),
    isRealTimeEnabled: false,
    connectionStatus: 'connected'
};
const SharedStateContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function SharedStateProvider(param) {
    let { children } = param;
    var _this = this;
    _s();
    const [mapState, setMapState] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(initialState);
    const syncTimeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const commandQueueRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])([]);
    // Enhanced sync mechanism with debouncing
    const triggerSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[triggerSync]": function() {
            let immediate = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : false;
            if (syncTimeoutRef.current) {
                clearTimeout(syncTimeoutRef.current);
            }
            const syncFn = {
                "SharedStateProvider.useCallback[triggerSync].syncFn": ()=>{
                    setMapState({
                        "SharedStateProvider.useCallback[triggerSync].syncFn": (prev)=>({
                                ...prev,
                                isSyncing: true,
                                lastSyncTime: new Date()
                            })
                    }["SharedStateProvider.useCallback[triggerSync].syncFn"]);
                    // Simulate sync completion
                    setTimeout({
                        "SharedStateProvider.useCallback[triggerSync].syncFn": ()=>{
                            setMapState({
                                "SharedStateProvider.useCallback[triggerSync].syncFn": (prev)=>({
                                        ...prev,
                                        isSyncing: false
                                    })
                            }["SharedStateProvider.useCallback[triggerSync].syncFn"]);
                        }
                    }["SharedStateProvider.useCallback[triggerSync].syncFn"], immediate ? 300 : 1000);
                }
            }["SharedStateProvider.useCallback[triggerSync].syncFn"];
            if (immediate) {
                syncFn();
            } else {
                syncTimeoutRef.current = setTimeout(syncFn, 100);
            }
        }
    }["SharedStateProvider.useCallback[triggerSync]"], []);
    // Action history management
    const addToHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[addToHistory]": (action)=>{
            const historyItem = {
                id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                timestamp: new Date(),
                ...action
            };
            setMapState({
                "SharedStateProvider.useCallback[addToHistory]": (prev)=>{
                    const newHistory = prev.history.slice(0, prev.historyIndex + 1);
                    newHistory.push(historyItem);
                    // Limit history size
                    if (newHistory.length > 100) {
                        newHistory.shift();
                    }
                    return {
                        ...prev,
                        history: newHistory,
                        historyIndex: newHistory.length - 1
                    };
                }
            }["SharedStateProvider.useCallback[addToHistory]"]);
        }
    }["SharedStateProvider.useCallback[addToHistory]"], []);
    // Core map operations
    const updateZoom = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateZoom]": (zoom)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateZoom]": (prev)=>({
                        ...prev,
                        zoom
                    })
            }["SharedStateProvider.useCallback[updateZoom]"]);
            addToHistory({
                type: "zoom",
                data: {
                    zoom
                },
                description: "Zoomed to level ".concat(zoom)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateZoom]"], [
        addToHistory,
        triggerSync
    ]);
    const updateCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateCenter]": (center)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateCenter]": (prev)=>({
                        ...prev,
                        center
                    })
            }["SharedStateProvider.useCallback[updateCenter]"]);
            addToHistory({
                type: "pan",
                data: {
                    center
                },
                description: "Moved to ".concat(center.lat.toFixed(4), ", ").concat(center.lng.toFixed(4))
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateCenter]"], [
        addToHistory,
        triggerSync
    ]);
    const updateBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateBounds]": (bounds)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateBounds]": (prev)=>({
                        ...prev,
                        bounds
                    })
            }["SharedStateProvider.useCallback[updateBounds]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateBounds]"], [
        triggerSync
    ]);
    // Enhanced marker operations
    const addMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[addMarker]": async (marker)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newMarker = {
                ...marker,
                id,
                selected: false
            };
            setMapState({
                "SharedStateProvider.useCallback[addMarker]": (prev)=>({
                        ...prev,
                        markers: [
                            ...prev.markers,
                            newMarker
                        ]
                    })
            }["SharedStateProvider.useCallback[addMarker]"]);
            addToHistory({
                type: "add_marker",
                data: {
                    marker: newMarker
                },
                description: "Added ".concat(marker.type, " marker: ").concat(marker.title)
            });
            triggerSync();
            return id;
        }
    }["SharedStateProvider.useCallback[addMarker]"], [
        addToHistory,
        triggerSync
    ]);
    const updateMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateMarker]": (id, updates)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateMarker]": (prev)=>({
                        ...prev,
                        markers: prev.markers.map({
                            "SharedStateProvider.useCallback[updateMarker]": (marker)=>marker.id === id ? {
                                    ...marker,
                                    ...updates
                                } : marker
                        }["SharedStateProvider.useCallback[updateMarker]"])
                    })
            }["SharedStateProvider.useCallback[updateMarker]"]);
            addToHistory({
                type: "update_marker",
                data: {
                    id,
                    updates
                },
                description: "Updated marker ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateMarker]"], [
        addToHistory,
        triggerSync
    ]);
    const removeMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[removeMarker]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[removeMarker]": (prev)=>{
                    const marker = prev.markers.find({
                        "SharedStateProvider.useCallback[removeMarker].marker": (m)=>m.id === id
                    }["SharedStateProvider.useCallback[removeMarker].marker"]);
                    return {
                        ...prev,
                        markers: prev.markers.filter({
                            "SharedStateProvider.useCallback[removeMarker]": (m)=>m.id !== id
                        }["SharedStateProvider.useCallback[removeMarker]"]),
                        selectedMarkerId: prev.selectedMarkerId === id ? null : prev.selectedMarkerId
                    };
                }
            }["SharedStateProvider.useCallback[removeMarker]"]);
            addToHistory({
                type: "remove_marker",
                data: {
                    id
                },
                description: "Removed marker ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[removeMarker]"], [
        addToHistory,
        triggerSync
    ]);
    const selectMarker = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[selectMarker]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[selectMarker]": (prev)=>({
                        ...prev,
                        markers: prev.markers.map({
                            "SharedStateProvider.useCallback[selectMarker]": (marker)=>({
                                    ...marker,
                                    selected: marker.id === id
                                })
                        }["SharedStateProvider.useCallback[selectMarker]"]),
                        selectedMarkerId: id
                    })
            }["SharedStateProvider.useCallback[selectMarker]"]);
            addToHistory({
                type: "select",
                data: {
                    id
                },
                description: "Selected marker ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[selectMarker]"], [
        addToHistory,
        triggerSync
    ]);
    const clearMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[clearMarkers]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[clearMarkers]": (prev)=>({
                        ...prev,
                        markers: [],
                        selectedMarkerId: null
                    })
            }["SharedStateProvider.useCallback[clearMarkers]"]);
            addToHistory({
                type: "clear",
                data: {},
                description: "Cleared all markers"
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[clearMarkers]"], [
        addToHistory,
        triggerSync
    ]);
    const bulkAddMarkers = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[bulkAddMarkers]": async (markers)=>{
            const newMarkers = markers.map({
                "SharedStateProvider.useCallback[bulkAddMarkers].newMarkers": (marker)=>({
                        ...marker,
                        id: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])(),
                        selected: false
                    })
            }["SharedStateProvider.useCallback[bulkAddMarkers].newMarkers"]);
            setMapState({
                "SharedStateProvider.useCallback[bulkAddMarkers]": (prev)=>({
                        ...prev,
                        markers: [
                            ...prev.markers,
                            ...newMarkers
                        ]
                    })
            }["SharedStateProvider.useCallback[bulkAddMarkers]"]);
            addToHistory({
                type: "add_marker",
                data: {
                    markers: newMarkers
                },
                description: "Added ".concat(markers.length, " markers")
            });
            triggerSync();
            return newMarkers.map({
                "SharedStateProvider.useCallback[bulkAddMarkers]": (m)=>m.id
            }["SharedStateProvider.useCallback[bulkAddMarkers]"]);
        }
    }["SharedStateProvider.useCallback[bulkAddMarkers]"], [
        addToHistory,
        triggerSync
    ]);
    // Layer management
    const addLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[addLayer]": (layer)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newLayer = {
                ...layer,
                id
            };
            setMapState({
                "SharedStateProvider.useCallback[addLayer]": (prev)=>({
                        ...prev,
                        layers: [
                            ...prev.layers,
                            newLayer
                        ],
                        activeLayers: [
                            ...prev.activeLayers,
                            id
                        ]
                    })
            }["SharedStateProvider.useCallback[addLayer]"]);
            triggerSync();
            return id;
        }
    }["SharedStateProvider.useCallback[addLayer]"], [
        triggerSync
    ]);
    const updateLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateLayer]": (id, updates)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateLayer]": (prev)=>({
                        ...prev,
                        layers: prev.layers.map({
                            "SharedStateProvider.useCallback[updateLayer]": (layer)=>layer.id === id ? {
                                    ...layer,
                                    ...updates
                                } : layer
                        }["SharedStateProvider.useCallback[updateLayer]"])
                    })
            }["SharedStateProvider.useCallback[updateLayer]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateLayer]"], [
        triggerSync
    ]);
    const removeLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[removeLayer]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[removeLayer]": (prev)=>({
                        ...prev,
                        layers: prev.layers.filter({
                            "SharedStateProvider.useCallback[removeLayer]": (layer)=>layer.id !== id
                        }["SharedStateProvider.useCallback[removeLayer]"]),
                        activeLayers: prev.activeLayers.filter({
                            "SharedStateProvider.useCallback[removeLayer]": (layerId)=>layerId !== id
                        }["SharedStateProvider.useCallback[removeLayer]"])
                    })
            }["SharedStateProvider.useCallback[removeLayer]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[removeLayer]"], [
        triggerSync
    ]);
    const toggleLayer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[toggleLayer]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[toggleLayer]": (prev)=>({
                        ...prev,
                        activeLayers: prev.activeLayers.includes(id) ? prev.activeLayers.filter({
                            "SharedStateProvider.useCallback[toggleLayer]": (layerId)=>layerId !== id
                        }["SharedStateProvider.useCallback[toggleLayer]"]) : [
                            ...prev.activeLayers,
                            id
                        ]
                    })
            }["SharedStateProvider.useCallback[toggleLayer]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[toggleLayer]"], [
        triggerSync
    ]);
    // Mode and interaction
    const setMode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setMode]": (mode)=>{
            setMapState({
                "SharedStateProvider.useCallback[setMode]": (prev)=>({
                        ...prev,
                        mode
                    })
            }["SharedStateProvider.useCallback[setMode]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[setMode]"], [
        triggerSync
    ]);
    const setActiveMarkerType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setActiveMarkerType]": (type)=>{
            setMapState({
                "SharedStateProvider.useCallback[setActiveMarkerType]": (prev)=>({
                        ...prev,
                        activeMarkerType: type
                    })
            }["SharedStateProvider.useCallback[setActiveMarkerType]"]);
        }
    }["SharedStateProvider.useCallback[setActiveMarkerType]"], []);
    // Generative UI system
    const executeCommand = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[executeCommand]": async function(command) {
            let parameters = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            const commandId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const generativeCommand = {
                id: commandId,
                command,
                parameters,
                timestamp: new Date(),
                status: 'pending'
            };
            setMapState({
                "SharedStateProvider.useCallback[executeCommand]": (prev)=>({
                        ...prev,
                        pendingCommands: [
                            ...prev.pendingCommands,
                            generativeCommand
                        ]
                    })
            }["SharedStateProvider.useCallback[executeCommand]"]);
            try {
                // Update status to executing
                setMapState({
                    "SharedStateProvider.useCallback[executeCommand]": (prev)=>({
                            ...prev,
                            pendingCommands: prev.pendingCommands.map({
                                "SharedStateProvider.useCallback[executeCommand]": (cmd)=>cmd.id === commandId ? {
                                        ...cmd,
                                        status: 'executing'
                                    } : cmd
                            }["SharedStateProvider.useCallback[executeCommand]"])
                        })
                }["SharedStateProvider.useCallback[executeCommand]"]);
                // Execute command based on type
                let result;
                const lowerCommand = command.toLowerCase();
                if (lowerCommand.includes('add') && lowerCommand.includes('marker')) {
                    const { lat, lng, title, type = 'location' } = parameters;
                    result = await addMarker({
                        type: type,
                        position: {
                            lat: lat || mapState.center.lat,
                            lng: lng || mapState.center.lng
                        },
                        title: title || 'AI Generated Marker',
                        description: "Generated by AI command: ".concat(command)
                    });
                } else if (lowerCommand.includes('clear')) {
                    clearMarkers();
                    result = 'Markers cleared';
                } else if (lowerCommand.includes('zoom')) {
                    const { level } = parameters;
                    updateZoom(level || mapState.zoom + 1);
                    result = "Zoomed to level ".concat(level || mapState.zoom + 1);
                } else if (lowerCommand.includes('center') || lowerCommand.includes('move')) {
                    const { lat, lng } = parameters;
                    updateCenter({
                        lat: lat || mapState.center.lat,
                        lng: lng || mapState.center.lng
                    });
                    result = "Moved to ".concat(lat, ", ").concat(lng);
                }
                // Update status to completed
                setMapState({
                    "SharedStateProvider.useCallback[executeCommand]": (prev)=>({
                            ...prev,
                            pendingCommands: prev.pendingCommands.map({
                                "SharedStateProvider.useCallback[executeCommand]": (cmd)=>cmd.id === commandId ? {
                                        ...cmd,
                                        status: 'completed',
                                        result
                                    } : cmd
                            }["SharedStateProvider.useCallback[executeCommand]"])
                        })
                }["SharedStateProvider.useCallback[executeCommand]"]);
                return result;
            } catch (error) {
                // Update status to failed
                setMapState({
                    "SharedStateProvider.useCallback[executeCommand]": (prev)=>({
                            ...prev,
                            pendingCommands: prev.pendingCommands.map({
                                "SharedStateProvider.useCallback[executeCommand]": (cmd)=>cmd.id === commandId ? {
                                        ...cmd,
                                        status: 'failed',
                                        result: error
                                    } : cmd
                            }["SharedStateProvider.useCallback[executeCommand]"])
                        })
                }["SharedStateProvider.useCallback[executeCommand]"]);
                throw error;
            }
        }
    }["SharedStateProvider.useCallback[executeCommand]"], [
        addMarker,
        clearMarkers,
        updateZoom,
        updateCenter,
        mapState.center,
        mapState.zoom
    ]);
    const registerComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[registerComponent]": (name, component)=>{
            setMapState({
                "SharedStateProvider.useCallback[registerComponent]": (prev)=>{
                    const newRegistry = new Map(prev.componentRegistry);
                    newRegistry.set(name, component);
                    return {
                        ...prev,
                        componentRegistry: newRegistry
                    };
                }
            }["SharedStateProvider.useCallback[registerComponent]"]);
        }
    }["SharedStateProvider.useCallback[registerComponent]"], []);
    const generateComponent = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateComponent]": async function(description) {
            let props = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
            // This would integrate with an AI service to generate components
            // For now, return a simple component
            const GeneratedComponent = {
                "SharedStateProvider.useCallback[generateComponent].GeneratedComponent": (componentProps)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "bg-blue-100 p-2 rounded border",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h4", {
                                className: "font-semibold",
                                children: [
                                    "AI Generated: ",
                                    description
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/shared/SharedStateProvider.tsx",
                                lineNumber: 1066,
                                columnNumber: 9
                            }, _this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("pre", {
                                className: "text-xs",
                                children: JSON.stringify({
                                    ...props,
                                    ...componentProps
                                }, null, 2)
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/shared/SharedStateProvider.tsx",
                                lineNumber: 1067,
                                columnNumber: 9
                            }, _this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/shared/SharedStateProvider.tsx",
                        lineNumber: 1065,
                        columnNumber: 7
                    }, _this)
            }["SharedStateProvider.useCallback[generateComponent].GeneratedComponent"];
            const componentName = "generated_".concat(Date.now());
            registerComponent(componentName, GeneratedComponent);
            return GeneratedComponent;
        }
    }["SharedStateProvider.useCallback[generateComponent]"], [
        registerComponent
    ]);
    // History management
    const undo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[undo]": ()=>{
            if (mapState.historyIndex > 0) {
                setMapState({
                    "SharedStateProvider.useCallback[undo]": (prev)=>({
                            ...prev,
                            historyIndex: prev.historyIndex - 1
                        })
                }["SharedStateProvider.useCallback[undo]"]);
                // Apply undo logic here
                triggerSync();
            }
        }
    }["SharedStateProvider.useCallback[undo]"], [
        mapState.historyIndex,
        triggerSync
    ]);
    const redo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[redo]": ()=>{
            if (mapState.historyIndex < mapState.history.length - 1) {
                setMapState({
                    "SharedStateProvider.useCallback[redo]": (prev)=>({
                            ...prev,
                            historyIndex: prev.historyIndex + 1
                        })
                }["SharedStateProvider.useCallback[redo]"]);
                // Apply redo logic here
                triggerSync();
            }
        }
    }["SharedStateProvider.useCallback[redo]"], [
        mapState.historyIndex,
        mapState.history.length,
        triggerSync
    ]);
    const canUndo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[canUndo]": ()=>mapState.historyIndex > 0
    }["SharedStateProvider.useCallback[canUndo]"], [
        mapState.historyIndex
    ]);
    const canRedo = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[canRedo]": ()=>mapState.historyIndex < mapState.history.length - 1
    }["SharedStateProvider.useCallback[canRedo]"], [
        mapState.historyIndex,
        mapState.history.length
    ]);
    const clearHistory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[clearHistory]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[clearHistory]": (prev)=>({
                        ...prev,
                        history: [],
                        historyIndex: -1
                    })
            }["SharedStateProvider.useCallback[clearHistory]"]);
        }
    }["SharedStateProvider.useCallback[clearHistory]"], []);
    // Real-time synchronization
    const enableRealTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[enableRealTime]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[enableRealTime]": (prev)=>({
                        ...prev,
                        isRealTimeEnabled: true,
                        connectionStatus: 'connected'
                    })
            }["SharedStateProvider.useCallback[enableRealTime]"]);
        }
    }["SharedStateProvider.useCallback[enableRealTime]"], []);
    const disableRealTime = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[disableRealTime]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[disableRealTime]": (prev)=>({
                        ...prev,
                        isRealTimeEnabled: false,
                        connectionStatus: 'disconnected'
                    })
            }["SharedStateProvider.useCallback[disableRealTime]"]);
        }
    }["SharedStateProvider.useCallback[disableRealTime]"], []);
    const forceSync = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[forceSync]": async ()=>{
            triggerSync(true);
        }
    }["SharedStateProvider.useCallback[forceSync]"], [
        triggerSync
    ]);
    // Utility functions
    const setSyncing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setSyncing]": (isSyncing)=>{
            setMapState({
                "SharedStateProvider.useCallback[setSyncing]": (prev)=>({
                        ...prev,
                        isSyncing
                    })
            }["SharedStateProvider.useCallback[setSyncing]"]);
        }
    }["SharedStateProvider.useCallback[setSyncing]"], []);
    const getMarkersByType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getMarkersByType]": (type)=>{
            return mapState.markers.filter({
                "SharedStateProvider.useCallback[getMarkersByType]": (marker)=>marker.type === type
            }["SharedStateProvider.useCallback[getMarkersByType]"]);
        }
    }["SharedStateProvider.useCallback[getMarkersByType]"], [
        mapState.markers
    ]);
    const getMarkersInBounds = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getMarkersInBounds]": (bounds)=>{
            return mapState.markers.filter({
                "SharedStateProvider.useCallback[getMarkersInBounds]": (marker)=>marker.position.lat <= bounds.north && marker.position.lat >= bounds.south && marker.position.lng <= bounds.east && marker.position.lng >= bounds.west
            }["SharedStateProvider.useCallback[getMarkersInBounds]"]);
        }
    }["SharedStateProvider.useCallback[getMarkersInBounds]"], [
        mapState.markers
    ]);
    const exportState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[exportState]": ()=>{
            return JSON.stringify({
                ...mapState,
                componentRegistry: Array.from(mapState.componentRegistry.entries())
            });
        }
    }["SharedStateProvider.useCallback[exportState]"], [
        mapState
    ]);
    const importState = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[importState]": (state)=>{
            try {
                const parsed = JSON.parse(state);
                const componentRegistry = new Map(parsed.componentRegistry || []);
                setMapState({
                    ...parsed,
                    componentRegistry
                });
                triggerSync();
            } catch (error) {
                console.error('Failed to import state:', error);
            }
        }
    }["SharedStateProvider.useCallback[importState]"], [
        triggerSync
    ]);
    // Restaurant Research Functions
    const addRestaurant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[addRestaurant]": async (restaurant)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newRestaurant = {
                ...restaurant,
                id
            };
            setMapState({
                "SharedStateProvider.useCallback[addRestaurant]": (prev)=>({
                        ...prev,
                        restaurants: [
                            ...prev.restaurants,
                            newRestaurant
                        ]
                    })
            }["SharedStateProvider.useCallback[addRestaurant]"]);
            addToHistory({
                type: "add_marker",
                data: {
                    restaurant: newRestaurant
                },
                description: "Added restaurant: ".concat(restaurant.name)
            });
            triggerSync();
            return id;
        }
    }["SharedStateProvider.useCallback[addRestaurant]"], [
        addToHistory,
        triggerSync
    ]);
    const updateRestaurant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateRestaurant]": (id, updates)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateRestaurant]": (prev)=>({
                        ...prev,
                        restaurants: prev.restaurants.map({
                            "SharedStateProvider.useCallback[updateRestaurant]": (restaurant)=>restaurant.id === id ? {
                                    ...restaurant,
                                    ...updates
                                } : restaurant
                        }["SharedStateProvider.useCallback[updateRestaurant]"])
                    })
            }["SharedStateProvider.useCallback[updateRestaurant]"]);
            addToHistory({
                type: "update_marker",
                data: {
                    id,
                    updates
                },
                description: "Updated restaurant ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateRestaurant]"], [
        addToHistory,
        triggerSync
    ]);
    const removeRestaurant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[removeRestaurant]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[removeRestaurant]": (prev)=>({
                        ...prev,
                        restaurants: prev.restaurants.filter({
                            "SharedStateProvider.useCallback[removeRestaurant]": (r)=>r.id !== id
                        }["SharedStateProvider.useCallback[removeRestaurant]"]),
                        selectedRestaurantId: prev.selectedRestaurantId === id ? null : prev.selectedRestaurantId
                    })
            }["SharedStateProvider.useCallback[removeRestaurant]"]);
            addToHistory({
                type: "remove_marker",
                data: {
                    id
                },
                description: "Removed restaurant ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[removeRestaurant]"], [
        addToHistory,
        triggerSync
    ]);
    const selectRestaurant = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[selectRestaurant]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[selectRestaurant]": (prev)=>({
                        ...prev,
                        selectedRestaurantId: id
                    })
            }["SharedStateProvider.useCallback[selectRestaurant]"]);
            addToHistory({
                type: "select",
                data: {
                    id
                },
                description: "Selected restaurant ".concat(id)
            });
            triggerSync();
        }
    }["SharedStateProvider.useCallback[selectRestaurant]"], [
        addToHistory,
        triggerSync
    ]);
    const getRestaurantsByType = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getRestaurantsByType]": (type)=>{
            return mapState.restaurants.filter({
                "SharedStateProvider.useCallback[getRestaurantsByType]": (restaurant)=>restaurant.type === type
            }["SharedStateProvider.useCallback[getRestaurantsByType]"]);
        }
    }["SharedStateProvider.useCallback[getRestaurantsByType]"], [
        mapState.restaurants
    ]);
    const getRestaurantsByCuisine = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getRestaurantsByCuisine]": (cuisine)=>{
            return mapState.restaurants.filter({
                "SharedStateProvider.useCallback[getRestaurantsByCuisine]": (restaurant)=>restaurant.cuisine === cuisine
            }["SharedStateProvider.useCallback[getRestaurantsByCuisine]"]);
        }
    }["SharedStateProvider.useCallback[getRestaurantsByCuisine]"], [
        mapState.restaurants
    ]);
    const getCompetitors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getCompetitors]": (location, radius)=>{
            return mapState.restaurants.filter({
                "SharedStateProvider.useCallback[getCompetitors]": (restaurant)=>{
                    if (!restaurant.isCompetitor) return false;
                    const distance = Math.sqrt(Math.pow(restaurant.coordinates.lat - location.lat, 2) + Math.pow(restaurant.coordinates.lng - location.lng, 2)) * 111000; // Rough conversion to meters
                    return distance <= radius;
                }
            }["SharedStateProvider.useCallback[getCompetitors]"]);
        }
    }["SharedStateProvider.useCallback[getCompetitors]"], [
        mapState.restaurants
    ]);
    // Demographic Analysis Functions
    const addDemographicData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[addDemographicData]": async (demographic)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            const newDemographic = {
                ...demographic,
                id
            };
            setMapState({
                "SharedStateProvider.useCallback[addDemographicData]": (prev)=>({
                        ...prev,
                        demographics: [
                            ...prev.demographics,
                            newDemographic
                        ]
                    })
            }["SharedStateProvider.useCallback[addDemographicData]"]);
            triggerSync();
            return id;
        }
    }["SharedStateProvider.useCallback[addDemographicData]"], [
        triggerSync
    ]);
    const updateDemographicData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateDemographicData]": (id, updates)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateDemographicData]": (prev)=>({
                        ...prev,
                        demographics: prev.demographics.map({
                            "SharedStateProvider.useCallback[updateDemographicData]": (demo)=>demo.id === id ? {
                                    ...demo,
                                    ...updates
                                } : demo
                        }["SharedStateProvider.useCallback[updateDemographicData]"])
                    })
            }["SharedStateProvider.useCallback[updateDemographicData]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateDemographicData]"], [
        triggerSync
    ]);
    const removeDemographicData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[removeDemographicData]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[removeDemographicData]": (prev)=>({
                        ...prev,
                        demographics: prev.demographics.filter({
                            "SharedStateProvider.useCallback[removeDemographicData]": (d)=>d.id !== id
                        }["SharedStateProvider.useCallback[removeDemographicData]"]),
                        selectedDemographicId: prev.selectedDemographicId === id ? null : prev.selectedDemographicId
                    })
            }["SharedStateProvider.useCallback[removeDemographicData]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[removeDemographicData]"], [
        triggerSync
    ]);
    const selectDemographic = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[selectDemographic]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[selectDemographic]": (prev)=>({
                        ...prev,
                        selectedDemographicId: id
                    })
            }["SharedStateProvider.useCallback[selectDemographic]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[selectDemographic]"], [
        triggerSync
    ]);
    const getDemographicsInRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getDemographicsInRadius]": (location, radius)=>{
            return mapState.demographics.filter({
                "SharedStateProvider.useCallback[getDemographicsInRadius]": (demo)=>{
                    const distance = Math.sqrt(Math.pow(demo.coordinates.lat - location.lat, 2) + Math.pow(demo.coordinates.lng - location.lng, 2)) * 111000; // Rough conversion to meters
                    return distance <= radius;
                }
            }["SharedStateProvider.useCallback[getDemographicsInRadius]"]);
        }
    }["SharedStateProvider.useCallback[getDemographicsInRadius]"], [
        mapState.demographics
    ]);
    // Market Analysis Functions
    const conductMarketAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[conductMarketAnalysis]": async (location, radius, options)=>{
            const id = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$uuid$2f$dist$2f$v4$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__v4$3e$__["v4"])();
            setMapState({
                "SharedStateProvider.useCallback[conductMarketAnalysis]": (prev)=>({
                        ...prev,
                        isAnalyzing: true,
                        analysisProgress: 0
                    })
            }["SharedStateProvider.useCallback[conductMarketAnalysis]"]);
            // Simulate analysis with progress updates
            for(let i = 0; i <= 100; i += 20){
                await new Promise({
                    "SharedStateProvider.useCallback[conductMarketAnalysis]": (resolve)=>setTimeout(resolve, 200)
                }["SharedStateProvider.useCallback[conductMarketAnalysis]"]);
                setMapState({
                    "SharedStateProvider.useCallback[conductMarketAnalysis]": (prev)=>({
                            ...prev,
                            analysisProgress: i
                        })
                }["SharedStateProvider.useCallback[conductMarketAnalysis]"]);
            }
            const competitors = getCompetitors(location, radius);
            const demographics = getDemographicsInRadius(location, radius);
            const analysis = {
                id,
                timestamp: new Date(),
                location,
                radius,
                competitorCount: competitors.length,
                marketSaturation: competitors.length > 10 ? "high" : competitors.length > 5 ? "medium" : "low",
                opportunityScore: Math.max(0, 100 - competitors.length * 10),
                recommendedCuisines: [
                    "italian",
                    "mexican",
                    "asian"
                ],
                recommendedPriceRange: "$$",
                estimatedRevenue: {
                    conservative: 180000,
                    realistic: 250000,
                    optimistic: 320000
                },
                riskFactors: competitors.length > 8 ? [
                    "High competition",
                    "Market saturation"
                ] : [
                    "Normal market risk"
                ],
                strengths: demographics.length > 0 ? [
                    "Good demographic data available"
                ] : [],
                insights: [
                    "".concat(competitors.length, " competitors found within ").concat(radius, "m radius"),
                    "Market saturation level: ".concat(competitors.length > 10 ? "high" : competitors.length > 5 ? "medium" : "low"),
                    "Demographic data shows ".concat(demographics.reduce({
                        "SharedStateProvider.useCallback[conductMarketAnalysis]": (sum, d)=>sum + d.population
                    }["SharedStateProvider.useCallback[conductMarketAnalysis]"], 0), " people in area")
                ]
            };
            setMapState({
                "SharedStateProvider.useCallback[conductMarketAnalysis]": (prev)=>({
                        ...prev,
                        marketAnalyses: [
                            ...prev.marketAnalyses,
                            analysis
                        ],
                        currentAnalysis: analysis,
                        isAnalyzing: false,
                        analysisProgress: 100
                    })
            }["SharedStateProvider.useCallback[conductMarketAnalysis]"]);
            triggerSync();
            return analysis;
        }
    }["SharedStateProvider.useCallback[conductMarketAnalysis]"], [
        getCompetitors,
        getDemographicsInRadius,
        triggerSync
    ]);
    const updateMarketAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateMarketAnalysis]": (id, updates)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateMarketAnalysis]": (prev)=>({
                        ...prev,
                        marketAnalyses: prev.marketAnalyses.map({
                            "SharedStateProvider.useCallback[updateMarketAnalysis]": (analysis)=>analysis.id === id ? {
                                    ...analysis,
                                    ...updates
                                } : analysis
                        }["SharedStateProvider.useCallback[updateMarketAnalysis]"])
                    })
            }["SharedStateProvider.useCallback[updateMarketAnalysis]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateMarketAnalysis]"], [
        triggerSync
    ]);
    const removeMarketAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[removeMarketAnalysis]": (id)=>{
            setMapState({
                "SharedStateProvider.useCallback[removeMarketAnalysis]": (prev)=>{
                    var _prev_currentAnalysis;
                    return {
                        ...prev,
                        marketAnalyses: prev.marketAnalyses.filter({
                            "SharedStateProvider.useCallback[removeMarketAnalysis]": (a)=>a.id !== id
                        }["SharedStateProvider.useCallback[removeMarketAnalysis]"]),
                        currentAnalysis: ((_prev_currentAnalysis = prev.currentAnalysis) === null || _prev_currentAnalysis === void 0 ? void 0 : _prev_currentAnalysis.id) === id ? null : prev.currentAnalysis
                    };
                }
            }["SharedStateProvider.useCallback[removeMarketAnalysis]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[removeMarketAnalysis]"], [
        triggerSync
    ]);
    const getLatestAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[getLatestAnalysis]": ()=>{
            return mapState.currentAnalysis;
        }
    }["SharedStateProvider.useCallback[getLatestAnalysis]"], [
        mapState.currentAnalysis
    ]);
    // Research Filters
    const updateResearchFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[updateResearchFilters]": (filters)=>{
            setMapState({
                "SharedStateProvider.useCallback[updateResearchFilters]": (prev)=>({
                        ...prev,
                        researchFilters: {
                            ...prev.researchFilters,
                            ...filters
                        }
                    })
            }["SharedStateProvider.useCallback[updateResearchFilters]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[updateResearchFilters]"], [
        triggerSync
    ]);
    const resetResearchFilters = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[resetResearchFilters]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[resetResearchFilters]": (prev)=>({
                        ...prev,
                        researchFilters: {
                            cuisineTypes: [],
                            restaurantTypes: [],
                            priceRanges: [],
                            radius: 2,
                            showCompetitors: true,
                            showDemographics: true,
                            showFootTraffic: false,
                            showRevenueZones: false,
                            showDeliveryHotspots: false,
                            showMarketGaps: false,
                            showPriceComparison: false,
                            competitorThreatLevel: [
                                "low",
                                "medium",
                                "high",
                                "critical"
                            ],
                            marketPosition: [
                                "leader",
                                "challenger",
                                "follower",
                                "niche"
                            ],
                            minimumRating: 0,
                            maximumDistance: 5000,
                            dayPartFilter: [],
                            customerSegmentFilter: []
                        }
                    })
            }["SharedStateProvider.useCallback[resetResearchFilters]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[resetResearchFilters]"], [
        triggerSync
    ]);
    // AI-Powered Insights (Mock implementations for now)
    const generateLocationInsights = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateLocationInsights]": async (location)=>{
            await new Promise({
                "SharedStateProvider.useCallback[generateLocationInsights]": (resolve)=>setTimeout(resolve, 1000)
            }["SharedStateProvider.useCallback[generateLocationInsights]"]); // Simulate API call
            return [
                "High foot traffic area with excellent visibility",
                "Strong demographic match for casual dining",
                "Limited parking but good public transport access",
                "Growing neighborhood with increasing property values"
            ];
        }
    }["SharedStateProvider.useCallback[generateLocationInsights]"], []);
    const generateCompetitorAnalysis = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateCompetitorAnalysis]": async (location, radius)=>{
            await new Promise({
                "SharedStateProvider.useCallback[generateCompetitorAnalysis]": (resolve)=>setTimeout(resolve, 1500)
            }["SharedStateProvider.useCallback[generateCompetitorAnalysis]"]); // Simulate API call
            const competitors = getCompetitors(location, radius);
            return {
                competitorCount: competitors.length,
                averageRating: competitors.reduce({
                    "SharedStateProvider.useCallback[generateCompetitorAnalysis]": (sum, c)=>sum + c.rating
                }["SharedStateProvider.useCallback[generateCompetitorAnalysis]"], 0) / competitors.length || 0,
                priceDistribution: competitors.reduce({
                    "SharedStateProvider.useCallback[generateCompetitorAnalysis]": (acc, c)=>{
                        acc[c.priceRange] = (acc[c.priceRange] || 0) + 1;
                        return acc;
                    }
                }["SharedStateProvider.useCallback[generateCompetitorAnalysis]"], {}),
                cuisineGaps: [
                    "korean",
                    "mediterranean",
                    "middle_eastern"
                ]
            };
        }
    }["SharedStateProvider.useCallback[generateCompetitorAnalysis]"], [
        getCompetitors
    ]);
    const generateRevenueProjection = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateRevenueProjection]": async (restaurant, demographics)=>{
            await new Promise({
                "SharedStateProvider.useCallback[generateRevenueProjection]": (resolve)=>setTimeout(resolve, 2000)
            }["SharedStateProvider.useCallback[generateRevenueProjection]"]); // Simulate complex calculation
            const totalPopulation = demographics.reduce({
                "SharedStateProvider.useCallback[generateRevenueProjection].totalPopulation": (sum, d)=>sum + d.population
            }["SharedStateProvider.useCallback[generateRevenueProjection].totalPopulation"], 0);
            const averageSpend = restaurant.averageSpend || 25;
            const capacity = restaurant.capacity || 50;
            const totalRevenue = Math.round(totalPopulation * 0.1 * averageSpend * 12);
            return {
                monthlyRevenue: {
                    "Jan": 18000,
                    "Feb": 19000,
                    "Mar": 22000,
                    "Apr": 24000,
                    "May": 26000,
                    "Jun": 28000,
                    "Jul": 30000,
                    "Aug": 29000,
                    "Sep": 25000,
                    "Oct": 23000,
                    "Nov": 21000,
                    "Dec": 25000
                },
                dailyAverage: Math.round(totalPopulation * 0.1 * averageSpend / 30),
                projectedAnnual: totalRevenue,
                costStructure: {
                    food: 0.30,
                    labor: 0.25,
                    rent: 0.15,
                    utilities: 0.05,
                    marketing: 0.08,
                    other: 0.17
                },
                profitMargin: 0.12,
                // Enhanced revenue analytics
                daily: {
                    "2024-01-01": 800,
                    "2024-01-02": 850,
                    "2024-01-03": 900
                },
                monthly: {
                    "Jan": 18000,
                    "Feb": 19000,
                    "Mar": 22000,
                    "Apr": 24000
                },
                seasonal: {
                    "Spring": 72000,
                    "Summer": 87000,
                    "Fall": 69000,
                    "Winter": 62000
                },
                totalRevenue: totalRevenue,
                averageOrderValue: averageSpend,
                peakRevenueHours: [
                    "12:00",
                    "18:00",
                    "19:00"
                ],
                revenueByDayPart: {
                    breakfast: 5000,
                    brunch: 8000,
                    lunch: 12000,
                    afternoon: 3000,
                    dinner: 15000,
                    late_night: 2000
                },
                revenueGrowthRate: 5.2,
                costOfGoodsSold: totalRevenue * 0.30,
                operatingExpenses: totalRevenue * 0.70,
                netProfit: totalRevenue * 0.12,
                breakEvenPoint: 45
            };
        }
    }["SharedStateProvider.useCallback[generateRevenueProjection]"], []);
    const generateOptimalPricing = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateOptimalPricing]": async (location, cuisine)=>{
            await new Promise({
                "SharedStateProvider.useCallback[generateOptimalPricing]": (resolve)=>setTimeout(resolve, 1000)
            }["SharedStateProvider.useCallback[generateOptimalPricing]"]); // Simulate API call
            const demographics = getDemographicsInRadius(location, 1000);
            const avgIncome = demographics.reduce({
                "SharedStateProvider.useCallback[generateOptimalPricing]": (sum, d)=>{
                    return sum + (d.incomeRanges["50k_75k"] + d.incomeRanges["75k_100k"] * 1.5);
                }
            }["SharedStateProvider.useCallback[generateOptimalPricing]"], 0) / demographics.length || 0;
            const priceRange = avgIncome > 1000 ? "$$" : "$";
            const reasoning = "Based on local demographics showing average income levels, ".concat(priceRange, " pricing is optimal for ").concat(cuisine, " cuisine in this area.");
            return {
                priceRange,
                reasoning
            };
        }
    }["SharedStateProvider.useCallback[generateOptimalPricing]"], [
        getDemographicsInRadius
    ]);
    // Data Export/Import
    const exportRestaurantData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[exportRestaurantData]": ()=>{
            return JSON.stringify({
                restaurants: mapState.restaurants,
                demographics: mapState.demographics,
                marketAnalyses: mapState.marketAnalyses,
                researchFilters: mapState.researchFilters,
                exportedAt: new Date().toISOString()
            });
        }
    }["SharedStateProvider.useCallback[exportRestaurantData]"], [
        mapState
    ]);
    const importRestaurantData = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[importRestaurantData]": (data)=>{
            try {
                const parsed = JSON.parse(data);
                setMapState({
                    "SharedStateProvider.useCallback[importRestaurantData]": (prev)=>({
                            ...prev,
                            restaurants: parsed.restaurants || [],
                            demographics: parsed.demographics || [],
                            marketAnalyses: parsed.marketAnalyses || [],
                            researchFilters: parsed.researchFilters || prev.researchFilters
                        })
                }["SharedStateProvider.useCallback[importRestaurantData]"]);
                triggerSync();
            } catch (error) {
                console.error('Failed to import restaurant data:', error);
            }
        }
    }["SharedStateProvider.useCallback[importRestaurantData]"], [
        triggerSync
    ]);
    const generateMarketReport = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[generateMarketReport]": async (analysisId)=>{
            await new Promise({
                "SharedStateProvider.useCallback[generateMarketReport]": (resolve)=>setTimeout(resolve, 3000)
            }["SharedStateProvider.useCallback[generateMarketReport]"]); // Simulate report generation
            const analysis = mapState.marketAnalyses.find({
                "SharedStateProvider.useCallback[generateMarketReport].analysis": (a)=>a.id === analysisId
            }["SharedStateProvider.useCallback[generateMarketReport].analysis"]);
            if (!analysis) {
                throw new Error('Analysis not found');
            }
            // Mock PDF generation
            const pdfContent = "Market Analysis Report for ".concat(analysis.location.lat, ", ").concat(analysis.location.lng);
            const pdf = new Blob([
                pdfContent
            ], {
                type: 'application/pdf'
            });
            return {
                pdf,
                insights: analysis.insights
            };
        }
    }["SharedStateProvider.useCallback[generateMarketReport]"], [
        mapState.marketAnalyses
    ]);
    // Buffer Radius Management Functions
    const setBufferRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setBufferRadius]": (radius)=>{
            setMapState({
                "SharedStateProvider.useCallback[setBufferRadius]": (prev)=>({
                        ...prev,
                        bufferRadius: Math.max(50, Math.min(10000, radius))
                    })
            }["SharedStateProvider.useCallback[setBufferRadius]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[setBufferRadius]"], [
        triggerSync
    ]);
    const setBufferCenter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setBufferCenter]": (center)=>{
            setMapState({
                "SharedStateProvider.useCallback[setBufferCenter]": (prev)=>({
                        ...prev,
                        bufferCenter: center
                    })
            }["SharedStateProvider.useCallback[setBufferCenter]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[setBufferCenter]"], [
        triggerSync
    ]);
    const toggleBufferRadius = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[toggleBufferRadius]": ()=>{
            setMapState({
                "SharedStateProvider.useCallback[toggleBufferRadius]": (prev)=>({
                        ...prev,
                        showBufferRadius: !prev.showBufferRadius,
                        // If enabling and no center is set, use map center
                        bufferCenter: !prev.showBufferRadius && !prev.bufferCenter ? {
                            lat: prev.center.lat,
                            lng: prev.center.lng
                        } : prev.bufferCenter
                    })
            }["SharedStateProvider.useCallback[toggleBufferRadius]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[toggleBufferRadius]"], [
        triggerSync
    ]);
    const setBufferOpacity = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "SharedStateProvider.useCallback[setBufferOpacity]": (opacity)=>{
            setMapState({
                "SharedStateProvider.useCallback[setBufferOpacity]": (prev)=>({
                        ...prev,
                        bufferOpacity: Math.max(0, Math.min(1, opacity))
                    })
            }["SharedStateProvider.useCallback[setBufferOpacity]"]);
            triggerSync();
        }
    }["SharedStateProvider.useCallback[setBufferOpacity]"], [
        triggerSync
    ]);
    // Cleanup
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "SharedStateProvider.useEffect": ()=>{
            return ({
                "SharedStateProvider.useEffect": ()=>{
                    if (syncTimeoutRef.current) {
                        clearTimeout(syncTimeoutRef.current);
                    }
                }
            })["SharedStateProvider.useEffect"];
        }
    }["SharedStateProvider.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SharedStateContext.Provider, {
        value: {
            mapState,
            updateZoom,
            updateCenter,
            updateBounds,
            addMarker,
            updateMarker,
            removeMarker,
            selectMarker,
            clearMarkers,
            bulkAddMarkers,
            addLayer,
            updateLayer,
            removeLayer,
            toggleLayer,
            setMode,
            setActiveMarkerType,
            executeCommand,
            registerComponent,
            generateComponent,
            // Restaurant Research Functions
            addRestaurant,
            updateRestaurant,
            removeRestaurant,
            selectRestaurant,
            getRestaurantsByType,
            getRestaurantsByCuisine,
            getCompetitors,
            // Demographic Analysis
            addDemographicData,
            updateDemographicData,
            removeDemographicData,
            selectDemographic,
            getDemographicsInRadius,
            // Market Analysis
            conductMarketAnalysis,
            updateMarketAnalysis,
            removeMarketAnalysis,
            getLatestAnalysis,
            // Research Filters
            updateResearchFilters,
            resetResearchFilters,
            // AI-Powered Insights
            generateLocationInsights,
            generateCompetitorAnalysis,
            generateRevenueProjection,
            generateOptimalPricing,
            // Data Export/Import
            exportRestaurantData,
            importRestaurantData,
            generateMarketReport,
            undo,
            redo,
            canUndo,
            canRedo,
            clearHistory,
            enableRealTime,
            disableRealTime,
            forceSync,
            setSyncing,
            getMarkersByType,
            getMarkersInBounds,
            exportState,
            importState,
            // Buffer Radius Management
            setBufferRadius,
            setBufferCenter,
            toggleBufferRadius,
            setBufferOpacity
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/shared/SharedStateProvider.tsx",
        lineNumber: 1593,
        columnNumber: 5
    }, this);
}
_s(SharedStateProvider, "ajbka/MJdpPSMj1SiJJwPB90MAo=");
_c = SharedStateProvider;
function useSharedState() {
    _s1();
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useContext"])(SharedStateContext);
    if (context === undefined) {
        throw new Error("useSharedState must be used within a SharedStateProvider");
    }
    return context;
}
_s1(useSharedState, "b9L3QQ+jgeyIrH0NfHrJ8nn7VMU=");
var _c;
__turbopack_context__.k.register(_c, "SharedStateProvider");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'tailwind-merge'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
function cn() {
    for(var _len = arguments.length, inputs = new Array(_len), _key = 0; _key < _len; _key++){
        inputs[_key] = arguments[_key];
    }
    return twMerge((0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/ui/button.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Button",
    ()=>Button,
    "buttonVariants",
    ()=>buttonVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/@radix-ui/react-slot/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
;
;
const buttonVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50", {
    variants: {
        variant: {
            default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
            destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
            outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
            secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
            ghost: "hover:bg-accent hover:text-accent-foreground",
            link: "text-primary underline-offset-4 hover:underline"
        },
        size: {
            default: "h-9 px-4 py-2",
            sm: "h-8 rounded-md px-3 text-xs",
            lg: "h-10 rounded-md px-8",
            icon: "h-9 w-9"
        }
    },
    defaultVariants: {
        variant: "default",
        size: "default"
    }
});
const Button = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, variant, size, asChild = false, ...props } = param;
    const Comp = asChild ? __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f40$radix$2d$ui$2f$react$2d$slot$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Slot"] : "button";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Comp, {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(buttonVariants({
            variant,
            size,
            className
        })),
        ref: ref,
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/button.tsx",
        lineNumber: 47,
        columnNumber: 7
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Button;
Button.displayName = "Button";
;
var _c, _c1;
__turbopack_context__.k.register(_c, "Button$React.forwardRef");
__turbopack_context__.k.register(_c1, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/ui/card.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Card",
    ()=>Card,
    "CardContent",
    ()=>CardContent,
    "CardDescription",
    ()=>CardDescription,
    "CardFooter",
    ()=>CardFooter,
    "CardHeader",
    ()=>CardHeader,
    "CardTitle",
    ()=>CardTitle
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const Card = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("rounded-xl border bg-card text-card-foreground shadow", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 9,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c1 = Card;
Card.displayName = "Card";
const CardHeader = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c2 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("flex flex-col space-y-1.5 p-6", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 24,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c3 = CardHeader;
CardHeader.displayName = "CardHeader";
const CardTitle = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c4 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("font-semibold leading-none tracking-tight", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 36,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c5 = CardTitle;
CardTitle.displayName = "CardTitle";
const CardDescription = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c6 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("text-sm text-muted-foreground", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 48,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c7 = CardDescription;
CardDescription.displayName = "CardDescription";
const CardContent = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c8 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])("p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 60,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c9 = CardContent;
CardContent.displayName = "CardContent";
const CardFooter = /*#__PURE__*/ __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["forwardRef"](_c10 = (param, ref)=>{
    let { className, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: ref,
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(" flex items-center p-6 pt-0", className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/card.tsx",
        lineNumber: 68,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
});
_c11 = CardFooter;
CardFooter.displayName = "CardFooter";
;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10, _c11;
__turbopack_context__.k.register(_c, "Card$React.forwardRef");
__turbopack_context__.k.register(_c1, "Card");
__turbopack_context__.k.register(_c2, "CardHeader$React.forwardRef");
__turbopack_context__.k.register(_c3, "CardHeader");
__turbopack_context__.k.register(_c4, "CardTitle$React.forwardRef");
__turbopack_context__.k.register(_c5, "CardTitle");
__turbopack_context__.k.register(_c6, "CardDescription$React.forwardRef");
__turbopack_context__.k.register(_c7, "CardDescription");
__turbopack_context__.k.register(_c8, "CardContent$React.forwardRef");
__turbopack_context__.k.register(_c9, "CardContent");
__turbopack_context__.k.register(_c10, "CardFooter$React.forwardRef");
__turbopack_context__.k.register(_c11, "CardFooter");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge,
    "badgeVariants",
    ()=>badgeVariants
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/class-variance-authority/dist/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/lib/utils.ts [app-client] (ecmascript)");
;
;
;
const badgeVariants = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$class$2d$variance$2d$authority$2f$dist$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cva"])("inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", {
    variants: {
        variant: {
            default: "border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80",
            secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
            destructive: "border-transparent bg-destructive text-destructive-foreground shadow hover:bg-destructive/80",
            outline: "text-foreground"
        }
    },
    defaultVariants: {
        variant: "default"
    }
});
function Badge(param) {
    let { className, variant, ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])(badgeVariants({
            variant
        }), className),
        ...props
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/ui/badge.tsx",
        lineNumber: 32,
        columnNumber: 5
    }, this);
}
_c = Badge;
;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/landing/LandingPage.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/navigation.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/button.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/card.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/badge.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chevron-right.js [app-client] (ecmascript) <export default as ChevronRight>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/chart-column.js [app-client] (ecmascript) <export default as BarChart3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/trending-up.js [app-client] (ecmascript) <export default as TrendingUp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/users.js [app-client] (ecmascript) <export default as Users>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/map-pin.js [app-client] (ecmascript) <export default as MapPin>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/message-square.js [app-client] (ecmascript) <export default as MessageSquare>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/zap.js [app-client] (ecmascript) <export default as Zap>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/brain.js [app-client] (ecmascript) <export default as Brain>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/building-2.js [app-client] (ecmascript) <export default as Building2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/coffee.js [app-client] (ecmascript) <export default as Coffee>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/utensils.js [app-client] (ecmascript) <export default as Utensils>");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__ = __turbopack_context__.i("[project]/frontend/node_modules/lucide-react/dist/esm/icons/file-text.js [app-client] (ecmascript) <export default as FileText>");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const LandingPage = (param)=>{
    let { onNavigateToResearch, onNavigateToChat } = param;
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [hoveredCard, setHoveredCard] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const workspaceTemplates = [
        {
            id: "market-research",
            title: "MarketMapper AI",
            subtitle: "Deep Market Research Report",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"],
            description: "Comprehensive market analysis with AI-powered insights",
            features: [
                "Competitor Analysis",
                "Market Trends",
                "Consumer Behavior",
                "Growth Projections"
            ],
            onClick: onNavigateToResearch
        },
        {
            id: "culinary-compass",
            title: "BiteBase Intelligence",
            subtitle: "Restaurant Intelligence Chat",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$message$2d$square$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MessageSquare$3e$__["MessageSquare"],
            description: "Interactive AI assistant for restaurant analytics",
            features: [
                "Real-time Analytics",
                "Menu Optimization",
                "Customer Insights",
                "Performance Tracking"
            ],
            onClick: onNavigateToChat
        },
        {
            id: "location-intelligence",
            title: "Location Intelligence",
            subtitle: "Site Selection Analysis",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$map$2d$pin$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MapPin$3e$__["MapPin"],
            description: "AI-powered location analysis for optimal restaurant placement",
            features: [
                "Demographic Analysis",
                "Foot Traffic",
                "Competition Mapping",
                "Revenue Forecasting"
            ],
            onClick: onNavigateToResearch
        },
        {
            id: "customer-insights",
            title: "Customer Intelligence",
            subtitle: "Behavioral Analytics",
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$users$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Users$3e$__["Users"],
            description: "Deep customer behavior analysis and segmentation",
            features: [
                "Customer Segmentation",
                "Preference Analysis",
                "Loyalty Tracking",
                "Churn Prediction"
            ],
            onClick: onNavigateToChat
        }
    ];
    const quickActions = [
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$building$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Building2$3e$__["Building2"],
            label: "Analyze restaurant market potential",
            action: onNavigateToResearch
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$trending$2d$up$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__TrendingUp$3e$__["TrendingUp"],
            label: "Generate competitive analysis report",
            action: onNavigateToResearch
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$coffee$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Coffee$3e$__["Coffee"],
            label: "Optimize menu pricing strategy",
            action: ()=>onNavigateToChat("Optimize menu pricing strategy for my restaurant. Analyze current market trends and provide recommendations.")
        },
        {
            icon: __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$utensils$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Utensils$3e$__["Utensils"],
            label: "Forecast customer demand patterns",
            action: ()=>onNavigateToChat("Forecast customer demand patterns for my restaurant. Analyze seasonal trends and peak hours.")
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen bg-white",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "border-b border-gray-200 bg-white",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "max-w-7xl mx-auto px-6 py-4",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-between",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center space-x-3",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: "https://www.gstatic.com/monospace/250314/icon-192.png",
                                            alt: "BiteBase Studio",
                                            className: "w-8 h-8"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 107,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                            className: "text-xl font-semibold text-gray-900",
                                            children: "BiteBase Studio"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 112,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                            variant: "secondary",
                                            className: "text-xs bg-orange-100 text-orange-800 border-orange-200",
                                            children: "preview"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 113,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                    lineNumber: 106,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 105,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center space-x-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        onClick: ()=>router.push('/reports'),
                                        className: "flex items-center space-x-2",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$file$2d$text$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__FileText$3e$__["FileText"], {
                                                className: "h-4 w-4"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                lineNumber: 125,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Reports Dashboard"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                lineNumber: 126,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 119,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        className: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                                        children: "Documentation"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 128,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "ghost",
                                        size: "sm",
                                        className: "text-gray-600 hover:text-gray-900 hover:bg-gray-100",
                                        children: "Support"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 131,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "text-xs font-medium text-white",
                                            children: "K"
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 135,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 134,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 118,
                                columnNumber: 13
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                        lineNumber: 104,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                    lineNumber: 103,
                    columnNumber: 9
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                lineNumber: 102,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "max-w-7xl mx-auto px-6 py-12",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-12",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-6",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-3xl font-light text-gray-900 mb-2 block",
                                    children: "Hello, Khiw"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                    lineNumber: 147,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-lg text-gray-600",
                                    children: "Welcome to your restaurant intelligence platform"
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                    lineNumber: 148,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                            lineNumber: 146,
                            columnNumber: 11
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                        lineNumber: 145,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-gray-900 mb-6",
                                children: "Start with AI Intelligence"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 154,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                className: "bg-white border-gray-200 shadow-sm",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                    className: "p-8",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4 mb-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$brain$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Brain$3e$__["Brain"], {
                                                        className: "w-6 h-6 text-white"
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                        lineNumber: 161,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 160,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            className: "text-lg font-medium text-gray-900",
                                                            children: "BiteBase AI Assistant"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 164,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "text-gray-600",
                                                            children: "Get instant insights about your restaurant business"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 165,
                                                            columnNumber: 19
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 163,
                                                    columnNumber: 17
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 159,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "relative",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "border border-gray-200 rounded-lg bg-gray-50 p-4 mb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-600 text-sm",
                                                            children: 'Try: "Analyze coffee shop market in downtown Seattle" or "Generate customer segmentation report"'
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 172,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                            onClick: ()=>onNavigateToChat(),
                                                            className: "bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white",
                                                            children: [
                                                                "Start Chat",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                                    className: "w-4 h-4 ml-2"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                    lineNumber: 180,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 175,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 171,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                lineNumber: 170,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 169,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "grid grid-cols-1 md:grid-cols-2 gap-4",
                                            children: quickActions.map((action, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                                    variant: "ghost",
                                                    className: "justify-start h-auto p-4 text-left border border-gray-200 hover:border-orange-300 bg-white hover:bg-orange-50",
                                                    onClick: action.action,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(action.icon, {
                                                            className: "w-5 h-5 mr-3 text-orange-600"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 195,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-900",
                                                            children: action.label
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 196,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, index, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 189,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 187,
                                            columnNumber: 15
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                    lineNumber: 158,
                                    columnNumber: 13
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 157,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                        lineNumber: 153,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mb-16",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center justify-between mb-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        className: "text-2xl font-semibold text-gray-900",
                                        children: "Intelligence Workspaces"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 207,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$button$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Button"], {
                                        variant: "outline",
                                        size: "sm",
                                        className: "border-gray-300 text-gray-700 hover:bg-gray-50",
                                        children: "View All Templates"
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 208,
                                        columnNumber: 13
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 206,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 lg:grid-cols-2 gap-6",
                                children: workspaceTemplates.map((template)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "bg-white border-gray-200 shadow-sm cursor-pointer transition-all duration-300 hover:shadow-md hover:border-orange-300 ".concat(hoveredCard === template.id ? "transform scale-[1.02] shadow-lg border-orange-400" : ""),
                                        onMouseEnter: ()=>setHoveredCard(template.id),
                                        onMouseLeave: ()=>setHoveredCard(null),
                                        onClick: ()=>template.onClick(),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardHeader"], {
                                                className: "pb-4",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-start justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex items-center space-x-3",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    className: "p-2 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg",
                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(template.icon, {
                                                                        className: "w-6 h-6 text-white"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                        lineNumber: 228,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                    lineNumber: 227,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardTitle"], {
                                                                            className: "text-lg text-gray-900",
                                                                            children: template.title
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                            lineNumber: 231,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                            className: "text-sm text-gray-600",
                                                                            children: template.subtitle
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                            lineNumber: 232,
                                                                            columnNumber: 25
                                                                        }, ("TURBOPACK compile-time value", void 0))
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                    lineNumber: 230,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 226,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$right$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronRight$3e$__["ChevronRight"], {
                                                            className: "w-5 h-5 text-gray-400"
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 235,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 225,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                lineNumber: 224,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        className: "text-gray-700 mb-4",
                                                        children: template.description
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                        lineNumber: 239,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "grid grid-cols-2 gap-2",
                                                        children: template.features.map((feature, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex items-center space-x-2",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$zap$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Zap$3e$__["Zap"], {
                                                                        className: "w-3 h-3 text-orange-600"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                        lineNumber: 243,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "text-xs text-gray-600",
                                                                        children: feature
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                        lineNumber: 244,
                                                                        columnNumber: 25
                                                                    }, ("TURBOPACK compile-time value", void 0))
                                                                ]
                                                            }, index, true, {
                                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                lineNumber: 242,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0)))
                                                    }, void 0, false, {
                                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                        lineNumber: 240,
                                                        columnNumber: 19
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                lineNumber: 238,
                                                columnNumber: 17
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, template.id, true, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 215,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 213,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                        lineNumber: 205,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                className: "text-2xl font-semibold text-gray-900 mb-6",
                                children: "Recent Intelligence Reports"
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 256,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "grid grid-cols-1 md:grid-cols-3 gap-6",
                                children: [
                                    {
                                        title: "Seattle Coffee Market Analysis",
                                        subtitle: "market-analysis-001",
                                        status: "Completed",
                                        updated: "2 hours ago"
                                    },
                                    {
                                        title: "Customer Behavior Study",
                                        subtitle: "customer-insights-002",
                                        status: "In Progress",
                                        updated: "5 hours ago"
                                    },
                                    {
                                        title: "Location Intelligence Report",
                                        subtitle: "location-study-003",
                                        status: "Completed",
                                        updated: "1 day ago"
                                    }
                                ].map((workspace, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Card"], {
                                        className: "bg-white border-gray-200 shadow-sm cursor-pointer hover:shadow-md hover:border-orange-300 transition-all",
                                        onClick: ()=>workspace.status === "Completed" ? onNavigateToResearch() : onNavigateToChat(),
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$card$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["CardContent"], {
                                            className: "p-6",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3 mb-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-10 h-10 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chart$2d$column$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BarChart3$3e$__["BarChart3"], {
                                                                className: "w-5 h-5 text-white"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                lineNumber: 286,
                                                                columnNumber: 23
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 285,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "flex-1",
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                                    className: "text-gray-900 font-medium",
                                                                    children: workspace.title
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                    lineNumber: 289,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-gray-600 text-sm",
                                                                    children: workspace.subtitle
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                                    lineNumber: 290,
                                                                    columnNumber: 23
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 288,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 284,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center justify-between",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                            variant: workspace.status === "Completed" ? "default" : "secondary",
                                                            className: "text-xs ".concat(workspace.status === "Completed" ? "bg-green-100 text-green-800 border-green-200" : "bg-orange-100 text-orange-800 border-orange-200"),
                                                            children: workspace.status
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 294,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            className: "text-gray-500 text-xs",
                                                            children: workspace.updated
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                            lineNumber: 300,
                                                            columnNumber: 21
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                                    lineNumber: 293,
                                                    columnNumber: 19
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                            lineNumber: 283,
                                            columnNumber: 17
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, index, false, {
                                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                        lineNumber: 278,
                                        columnNumber: 15
                                    }, ("TURBOPACK compile-time value", void 0)))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                                lineNumber: 257,
                                columnNumber: 11
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                        lineNumber: 255,
                        columnNumber: 9
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
                lineNumber: 143,
                columnNumber: 7
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/landing/LandingPage.tsx",
        lineNumber: 100,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(LandingPage, "90mqkxDNbRO8oTkyI6RRGYrwPsA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = LandingPage;
const __TURBOPACK__default__export__ = LandingPage;
var _c;
__turbopack_context__.k.register(_c, "LandingPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/ui/loading-spinner.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "LoadingSpinner",
    ()=>LoadingSpinner
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const LoadingSpinner = ()=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        className: "animate-spin h-5 w-5 text-gray-500",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "none",
        viewBox: "0 0 24 24",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                className: "opacity-25",
                cx: "12",
                cy: "12",
                r: "10",
                stroke: "currentColor",
                strokeWidth: "4"
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/ui/loading-spinner.tsx",
                lineNumber: 8,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                className: "opacity-75",
                fill: "currentColor",
                d: "M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            }, void 0, false, {
                fileName: "[project]/frontend/src/components/ui/loading-spinner.tsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/frontend/src/components/ui/loading-spinner.tsx",
        lineNumber: 2,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = LoadingSpinner;
var _c;
__turbopack_context__.k.register(_c, "LoadingSpinner");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/frontend/src/components/landing/StudioApp.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/frontend/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$landing$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/landing/LandingPage.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/frontend/src/components/ui/loading-spinner.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// Lazy load heavy components to improve initial load time
const LazyResearchWorkflow = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/frontend/src/components/landing/ResearchWorkflow.tsx [app-client] (ecmascript, async loader)"));
_c = LazyResearchWorkflow;
const LazyChatInterface = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>__turbopack_context__.A("[project]/frontend/src/components/chat/ChatInterface.tsx [app-client] (ecmascript, async loader)"));
_c1 = LazyChatInterface;
// Use lightweight map in development, full map in production
const LazyMapComponent = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["lazy"])(()=>("TURBOPACK compile-time truthy", 1) ? __turbopack_context__.A("[project]/frontend/src/components/map/DevMapPlaceholder.tsx [app-client] (ecmascript, async loader)") : "TURBOPACK unreachable");
_c2 = LazyMapComponent;
const StudioApp = ()=>{
    _s();
    const [currentView, setCurrentView] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("landing");
    const [initialChatMessage, setInitialChatMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const navigateToResearch = ()=>{
        setInitialChatMessage(""); // Clear any initial message
        setCurrentView("research");
    };
    const navigateToChat = (message)=>{
        if (message) {
            setInitialChatMessage(message);
        }
        setCurrentView("chat");
    };
    const navigateToLanding = ()=>{
        setInitialChatMessage(""); // Clear any initial message
        setCurrentView("landing");
    };
    const renderCurrentView = ()=>{
        switch(currentView){
            case "landing":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$landing$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onNavigateToResearch: navigateToResearch,
                    onNavigateToChat: navigateToChat
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                    lineNumber: 45,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "research":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                    fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center justify-center min-h-screen",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                    lineNumber: 55,
                                    columnNumber: 17
                                }, void 0),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    className: "mt-2 text-gray-600",
                                    children: "Loading Research Workspace..."
                                }, void 0, false, {
                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                    lineNumber: 56,
                                    columnNumber: 17
                                }, void 0)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                            lineNumber: 54,
                            columnNumber: 15
                        }, void 0)
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                        lineNumber: 53,
                        columnNumber: 13
                    }, void 0),
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyResearchWorkflow, {
                        onNavigateBack: navigateToLanding,
                        onNavigateToChat: navigateToChat
                    }, void 0, false, {
                        fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                        lineNumber: 60,
                        columnNumber: 13
                    }, ("TURBOPACK compile-time value", void 0))
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                    lineNumber: 52,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            case "chat":
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "min-h-screen bg-white",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "border-b border-gray-200 bg-white",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "max-w-7xl mx-auto px-6 py-4",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "flex items-center justify-between",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    onClick: navigateToLanding,
                                                    className: "text-gray-600 hover:text-gray-900 hover:bg-gray-100 px-2 py-1 rounded flex items-center text-sm",
                                                    children: "← Back to Studio"
                                                }, void 0, false, {
                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                    lineNumber: 74,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "flex items-center space-x-3",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "w-8 h-8 bg-gradient-to-r from-orange-500 to-red-600 rounded-lg flex items-center justify-center",
                                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                className: "text-white text-sm",
                                                                children: "💬"
                                                            }, void 0, false, {
                                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                                lineNumber: 82,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0))
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 81,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0)),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                                    className: "text-lg font-semibold text-gray-900",
                                                                    children: "BiteBase Intelligence"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                                    lineNumber: 85,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0)),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                    className: "text-sm text-gray-600",
                                                                    children: "Restaurant Intelligence Chat with Map"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                                    lineNumber: 86,
                                                                    columnNumber: 25
                                                                }, ("TURBOPACK compile-time value", void 0))
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 84,
                                                            columnNumber: 23
                                                        }, ("TURBOPACK compile-time value", void 0))
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                    lineNumber: 80,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                            lineNumber: 73,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "flex items-center space-x-4",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: navigateToResearch,
                                                className: "text-gray-600 hover:text-gray-900 border border-gray-300 hover:border-orange-300 hover:bg-orange-50 px-3 py-1 rounded text-sm",
                                                children: "Switch to Research"
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                lineNumber: 91,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                            lineNumber: 90,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                    lineNumber: 72,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            }, void 0, false, {
                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                lineNumber: 71,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0)),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "h-[calc(100vh-80px)] flex flex-col max-w-full mx-auto px-2 sm:px-3 overflow-hidden bg-gray-50",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex-1 grid grid-cols-1 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4 min-h-0 overflow-hidden p-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-2 min-h-0 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center bg-gray-100 rounded-lg",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 110,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-sm text-gray-600",
                                                            children: "Loading Map..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 111,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                    lineNumber: 109,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                lineNumber: 108,
                                                columnNumber: 21
                                            }, void 0),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyMapComponent, {}, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                lineNumber: 115,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                            lineNumber: 107,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                        lineNumber: 106,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0)),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "lg:col-span-1 min-h-0 overflow-hidden",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Suspense"], {
                                            fallback: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "w-full h-full flex items-center justify-center bg-white rounded-lg border",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "text-center",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$ui$2f$loading$2d$spinner$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["LoadingSpinner"], {}, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 124,
                                                            columnNumber: 25
                                                        }, void 0),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "mt-2 text-sm text-gray-600",
                                                            children: "Loading Chat..."
                                                        }, void 0, false, {
                                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                            lineNumber: 125,
                                                            columnNumber: 25
                                                        }, void 0)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                    lineNumber: 123,
                                                    columnNumber: 23
                                                }, void 0)
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                lineNumber: 122,
                                                columnNumber: 21
                                            }, void 0),
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(LazyChatInterface, {
                                                initialMessage: initialChatMessage
                                            }, void 0, false, {
                                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                                lineNumber: 129,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                            lineNumber: 121,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    }, void 0, false, {
                                        fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                        lineNumber: 120,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                ]
                            }, void 0, true, {
                                fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                                lineNumber: 104,
                                columnNumber: 15
                            }, ("TURBOPACK compile-time value", void 0))
                        }, void 0, false, {
                            fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                            lineNumber: 103,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    ]
                }, void 0, true, {
                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                    lineNumber: 68,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
            default:
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$src$2f$components$2f$landing$2f$LandingPage$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                    onNavigateToResearch: navigateToResearch,
                    onNavigateToChat: navigateToChat
                }, void 0, false, {
                    fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
                    lineNumber: 138,
                    columnNumber: 11
                }, ("TURBOPACK compile-time value", void 0));
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$frontend$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "min-h-screen",
        children: renderCurrentView()
    }, void 0, false, {
        fileName: "[project]/frontend/src/components/landing/StudioApp.tsx",
        lineNumber: 146,
        columnNumber: 10
    }, ("TURBOPACK compile-time value", void 0));
};
_s(StudioApp, "Cr8ykxj6fw20+KfuzDerjKIsIQo=");
_c3 = StudioApp;
const __TURBOPACK__default__export__ = StudioApp;
var _c, _c1, _c2, _c3;
__turbopack_context__.k.register(_c, "LazyResearchWorkflow");
__turbopack_context__.k.register(_c1, "LazyChatInterface");
__turbopack_context__.k.register(_c2, "LazyMapComponent");
__turbopack_context__.k.register(_c3, "StudioApp");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=frontend_src_68af33f9._.js.map