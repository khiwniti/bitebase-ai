-- CreateEnum
CREATE TYPE "public"."AnalysisType" AS ENUM ('DELIVERY_MARKET', 'CUSTOMER_BEHAVIOR', 'PROPERTY_MARKET', 'ACCOMMODATION_DENSITY', 'TOURIST_FLOW', 'COMPETITOR_ANALYSIS', 'MARKET_GAPS', 'HOTSPOT_ANALYSIS');

-- CreateEnum
CREATE TYPE "public"."ReportStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'FAILED', 'ARCHIVED');

-- CreateEnum
CREATE TYPE "public"."MessageRole" AS ENUM ('USER', 'ASSISTANT', 'SYSTEM', 'TOOL');

-- CreateEnum
CREATE TYPE "public"."AgentStatus" AS ENUM ('PENDING', 'RUNNING', 'COMPLETED', 'FAILED', 'CANCELLED');

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT,
    "avatar" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "data" JSONB,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."market_reports" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "region" TEXT NOT NULL,
    "analysisType" "public"."AnalysisType" NOT NULL,
    "status" "public"."ReportStatus" NOT NULL DEFAULT 'PENDING',
    "data" JSONB,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "market_reports_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."delivery_market_analysis" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "businessType" TEXT,
    "orderVolume" TEXT,
    "data" JSONB NOT NULL,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "delivery_market_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."customer_behavior_analysis" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "customerSegment" TEXT,
    "cuisineType" TEXT,
    "timeframe" TEXT NOT NULL,
    "behaviorData" JSONB NOT NULL,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "customer_behavior_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."property_market_analysis" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "propertyType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "sizeRange" TEXT,
    "budget" TEXT,
    "data" JSONB NOT NULL,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "property_market_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."accommodation_density_analysis" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "radius" DOUBLE PRECISION,
    "accommodationType" TEXT,
    "densityData" JSONB NOT NULL,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "accommodation_density_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tourist_flow_analysis" (
    "id" TEXT NOT NULL,
    "reportId" TEXT NOT NULL,
    "analysisType" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "timeframe" TEXT NOT NULL,
    "visitorType" TEXT,
    "flowData" JSONB NOT NULL,
    "insights" TEXT[],
    "recommendations" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "tourist_flow_analysis_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_sessions" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "title" TEXT,
    "sessionId" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "chat_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."chat_messages" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "role" "public"."MessageRole" NOT NULL,
    "content" TEXT NOT NULL,
    "metadata" JSONB,
    "toolCalls" JSONB,
    "attachments" JSONB,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "chat_messages_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agent_executions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT,
    "agentType" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "status" "public"."AgentStatus" NOT NULL DEFAULT 'RUNNING',
    "startTime" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endTime" TIMESTAMP(3),
    "duration" INTEGER,
    "result" JSONB,
    "error" TEXT,
    "metadata" JSONB,

    CONSTRAINT "agent_executions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."agent_metrics" (
    "id" TEXT NOT NULL,
    "agentType" TEXT NOT NULL,
    "operationType" TEXT NOT NULL,
    "successCount" INTEGER NOT NULL DEFAULT 0,
    "failureCount" INTEGER NOT NULL DEFAULT 0,
    "averageDuration" DOUBLE PRECISION,
    "lastExecution" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "agent_metrics_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."market_data_cache" (
    "id" TEXT NOT NULL,
    "cacheKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "market_data_cache_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."competitor_data" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "location" JSONB NOT NULL,
    "region" TEXT NOT NULL,
    "cuisineType" TEXT[],
    "priceRange" TEXT NOT NULL,
    "rating" DOUBLE PRECISION,
    "reviewCount" INTEGER,
    "data" JSONB NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "competitor_data_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."market_trends" (
    "id" TEXT NOT NULL,
    "region" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "trend" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "unit" TEXT,
    "period" TEXT NOT NULL,
    "source" TEXT,
    "confidence" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "market_trends_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "sessions_sessionId_key" ON "public"."sessions"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "chat_sessions_sessionId_key" ON "public"."chat_sessions"("sessionId");

-- CreateIndex
CREATE UNIQUE INDEX "agent_metrics_agentType_operationType_key" ON "public"."agent_metrics"("agentType", "operationType");

-- CreateIndex
CREATE UNIQUE INDEX "market_data_cache_cacheKey_key" ON "public"."market_data_cache"("cacheKey");

-- AddForeignKey
ALTER TABLE "public"."sessions" ADD CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."market_reports" ADD CONSTRAINT "market_reports_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."delivery_market_analysis" ADD CONSTRAINT "delivery_market_analysis_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."market_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."customer_behavior_analysis" ADD CONSTRAINT "customer_behavior_analysis_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."market_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."property_market_analysis" ADD CONSTRAINT "property_market_analysis_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."market_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."accommodation_density_analysis" ADD CONSTRAINT "accommodation_density_analysis_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."market_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tourist_flow_analysis" ADD CONSTRAINT "tourist_flow_analysis_reportId_fkey" FOREIGN KEY ("reportId") REFERENCES "public"."market_reports"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_sessions" ADD CONSTRAINT "chat_sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."chat_messages" ADD CONSTRAINT "chat_messages_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "public"."chat_sessions"("id") ON DELETE CASCADE ON UPDATE CASCADE;
