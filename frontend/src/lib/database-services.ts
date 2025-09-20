import { prisma } from './database';
import type {
  User,
  Session,
  MarketReport,
  DeliveryMarketAnalysis,
  CustomerBehaviorAnalysis,
  PropertyMarketAnalysis,
  AccommodationDensityAnalysis,
  TouristFlowAnalysis,
  ChatSession,
  ChatMessage,
  AgentExecution,
  AgentMetrics,
  MarketDataCache,
  CompetitorData,
  MarketTrend,
  AnalysisType,
  ReportStatus,
  MessageRole,
  AgentStatus
} from '../generated/prisma';

export class UserService {
  static async create(data: { email: string; name?: string; avatar?: string }) {
    return prisma.user.create({
      data: {
        ...data,
        id: undefined, // Let Prisma generate the CUID
      },
    });
  }

  static async findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
      include: {
        sessions: true,
        reports: true,
        chatSessions: true,
      },
    });
  }

  static async findById(id: string) {
    return prisma.user.findUnique({
      where: { id },
      include: {
        sessions: true,
        reports: true,
        chatSessions: true,
      },
    });
  }

  static async update(id: string, data: any) {
    return prisma.user.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.user.delete({
      where: { id },
    });
  }

  static async list(page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.user.count(),
    ]);

    return {
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }
}

export class SessionService {
  static async create(data: { userId: string; sessionId: string; data?: any; expiresAt: Date }) {
    return prisma.session.create({
      data,
    });
  }

  static async findBySessionId(sessionId: string) {
    return prisma.session.findUnique({
      where: { sessionId },
      include: { user: true },
    });
  }

  static async update(sessionId: string, data: any) {
    return prisma.session.update({
      where: { sessionId },
      data,
    });
  }

  static async delete(sessionId: string) {
    return prisma.session.delete({
      where: { sessionId },
    });
  }

  static async cleanExpired() {
    return prisma.session.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }
}

export class MarketReportService {
  static async create(data: {
    title: string;
    description?: string;
    region: string;
    analysisType: AnalysisType;
    userId: string;
    data?: any;
    insights?: string[];
    recommendations?: string[];
    metadata?: any;
  }) {
    return prisma.marketReport.create({
      data: {
        ...data,
        status: 'PENDING',
      },
    });
  }

  static async findById(id: string) {
    return prisma.marketReport.findUnique({
      where: { id },
      include: {
        user: true,
        deliveryMarket: true,
        customerBehavior: true,
        propertyMarket: true,
        accommodationDensity: true,
        touristFlow: true,
      },
    });
  }

  static async findByUserId(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      prisma.marketReport.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          deliveryMarket: true,
          customerBehavior: true,
          propertyMarket: true,
          accommodationDensity: true,
          touristFlow: true,
        },
      }),
      prisma.marketReport.count({ where: { userId } }),
    ]);

    return {
      reports,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async update(id: string, data: any) {
    return prisma.marketReport.update({
      where: { id },
      data,
    });
  }

  static async updateStatus(id: string, status: ReportStatus) {
    return prisma.marketReport.update({
      where: { id },
      data: { status, updatedAt: new Date() },
    });
  }

  static async delete(id: string) {
    return prisma.marketReport.delete({
      where: { id },
    });
  }

  static async findByAnalysisType(analysisType: AnalysisType, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      prisma.marketReport.findMany({
        where: { analysisType },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.marketReport.count({ where: { analysisType } }),
    ]);

    return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async findByRegion(region: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [reports, total] = await Promise.all([
      prisma.marketReport.findMany({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.marketReport.count({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return { reports, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }
}

export class DeliveryMarketAnalysisService {
  static async create(data: {
    reportId: string;
    analysisType: string;
    region: string;
    businessType?: string;
    orderVolume?: string;
    data: any;
    insights?: string[];
    recommendations?: string[];
  }) {
    return prisma.deliveryMarketAnalysis.create({
      data,
    });
  }

  static async findByReportId(reportId: string) {
    return prisma.deliveryMarketAnalysis.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.deliveryMarketAnalysis.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.deliveryMarketAnalysis.delete({
      where: { id },
    });
  }
}

export class CustomerBehaviorAnalysisService {
  static async create(data: {
    reportId: string;
    analysisType: string;
    region: string;
    customerSegment?: string;
    cuisineType?: string;
    timeframe: string;
    behaviorData: any;
    insights?: string[];
    recommendations?: string[];
  }) {
    return prisma.customerBehaviorAnalysis.create({
      data,
    });
  }

  static async findByReportId(reportId: string) {
    return prisma.customerBehaviorAnalysis.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.customerBehaviorAnalysis.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.customerBehaviorAnalysis.delete({
      where: { id },
    });
  }
}

export class PropertyMarketAnalysisService {
  static async create(data: {
    reportId: string;
    analysisType: string;
    propertyType: string;
    location: string;
    region: string;
    sizeRange?: string;
    budget?: string;
    data: any;
    insights?: string[];
    recommendations?: string[];
  }) {
    return prisma.propertyMarketAnalysis.create({
      data,
    });
  }

  static async findByReportId(reportId: string) {
    return prisma.propertyMarketAnalysis.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.propertyMarketAnalysis.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.propertyMarketAnalysis.delete({
      where: { id },
    });
  }
}

export class AccommodationDensityAnalysisService {
  static async create(data: {
    reportId: string;
    analysisType: string;
    location: string;
    region: string;
    radius?: number;
    accommodationType?: string;
    densityData: any;
    insights?: string[];
    recommendations?: string[];
  }) {
    return prisma.accommodationDensityAnalysis.create({
      data,
    });
  }

  static async findByReportId(reportId: string) {
    return prisma.accommodationDensityAnalysis.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.accommodationDensityAnalysis.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.accommodationDensityAnalysis.delete({
      where: { id },
    });
  }
}

export class TouristFlowAnalysisService {
  static async create(data: {
    reportId: string;
    analysisType: string;
    location: string;
    region: string;
    timeframe: string;
    visitorType?: string;
    flowData: any;
    insights?: string[];
    recommendations?: string[];
  }) {
    return prisma.touristFlowAnalysis.create({
      data,
    });
  }

  static async findByReportId(reportId: string) {
    return prisma.touristFlowAnalysis.findMany({
      where: { reportId },
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.touristFlowAnalysis.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.touristFlowAnalysis.delete({
      where: { id },
    });
  }
}

export class ChatSessionService {
  static async create(data: {
    userId: string;
    title?: string;
    sessionId: string;
    metadata?: any;
  }) {
    return prisma.chatSession.create({
      data,
    });
  }

  static async findBySessionId(sessionId: string) {
    return prisma.chatSession.findUnique({
      where: { sessionId },
      include: {
        user: true,
        messages: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });
  }

  static async findByUserId(userId: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [sessions, total] = await Promise.all([
      prisma.chatSession.findMany({
        where: { userId },
        skip,
        take: limit,
        orderBy: { updatedAt: 'desc' },
        include: {
          messages: {
            take: 1,
            orderBy: { timestamp: 'desc' },
          },
        },
      }),
      prisma.chatSession.count({ where: { userId } }),
    ]);

    return {
      sessions,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    };
  }

  static async update(sessionId: string, data: any) {
    return prisma.chatSession.update({
      where: { sessionId },
      data: { ...data, updatedAt: new Date() },
    });
  }

  static async delete(sessionId: string) {
    return prisma.chatSession.delete({
      where: { sessionId },
    });
  }
}

export class ChatMessageService {
  static async create(data: {
    sessionId: string;
    role: MessageRole;
    content: string;
    metadata?: any;
    toolCalls?: any;
    attachments?: any;
  }) {
    return prisma.chatMessage.create({
      data,
    });
  }

  static async findBySessionId(sessionId: string, page = 1, limit = 50) {
    const skip = (page - 1) * limit;
    return prisma.chatMessage.findMany({
      where: { sessionId },
      skip,
      take: limit,
      orderBy: { timestamp: 'asc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.chatMessage.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.chatMessage.delete({
      where: { id },
    });
  }

  static async deleteBySessionId(sessionId: string) {
    return prisma.chatMessage.deleteMany({
      where: { sessionId },
    });
  }
}

export class AgentExecutionService {
  static async create(data: {
    sessionId?: string;
    agentType: string;
    task: string;
    status?: AgentStatus;
    metadata?: any;
  }) {
    return prisma.agentExecution.create({
      data: {
        ...data,
        status: data.status || 'RUNNING',
      },
    });
  }

  static async findById(id: string) {
    return prisma.agentExecution.findUnique({
      where: { id },
    });
  }

  static async updateStatus(id: string, status: AgentStatus, result?: any, error?: string) {
    const updateData: any = {
      status,
      metadata: result ? { result } : undefined,
      error,
    };

    if (status === 'COMPLETED' || status === 'FAILED' || status === 'CANCELLED') {
      updateData.endTime = new Date();

      const execution = await prisma.agentExecution.findUnique({
        where: { id },
        select: { startTime: true },
      });

      if (execution) {
        updateData.duration = Math.floor((Date.now() - execution.startTime.getTime()) / 1000);
      }
    }

    return prisma.agentExecution.update({
      where: { id },
      data: updateData,
    });
  }

  static async findBySessionId(sessionId: string) {
    return prisma.agentExecution.findMany({
      where: { sessionId },
      orderBy: { startTime: 'desc' },
    });
  }

  static async findByAgentType(agentType: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [executions, total] = await Promise.all([
      prisma.agentExecution.findMany({
        where: { agentType },
        skip,
        take: limit,
        orderBy: { startTime: 'desc' },
      }),
      prisma.agentExecution.count({ where: { agentType } }),
    ]);

    return { executions, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }
}

export class AgentMetricsService {
  static async upsert(data: {
    agentType: string;
    operationType: string;
    successCount?: number;
    failureCount?: number;
    averageDuration?: number;
    lastExecution?: Date;
  }) {
    return prisma.agentMetrics.upsert({
      where: {
        agentType_operationType: {
          agentType: data.agentType,
          operationType: data.operationType,
        },
      },
      update: {
        ...data,
        updatedAt: new Date(),
      },
      create: {
        ...data,
        successCount: data.successCount || 0,
        failureCount: data.failureCount || 0,
      },
    });
  }

  static async incrementSuccess(agentType: string, operationType: string, duration?: number) {
    const existing = await prisma.agentMetrics.findUnique({
      where: {
        agentType_operationType: {
          agentType,
          operationType,
        },
      },
    });

    let averageDuration = duration;
    if (existing && existing.averageDuration && duration) {
      const totalExecutions = existing.successCount + existing.failureCount;
      averageDuration = ((existing.averageDuration * totalExecutions) + duration) / (totalExecutions + 1);
    }

    return this.upsert({
      agentType,
      operationType,
      successCount: (existing?.successCount || 0) + 1,
      failureCount: existing?.failureCount || 0,
      averageDuration,
      lastExecution: new Date(),
    });
  }

  static async incrementFailure(agentType: string, operationType: string) {
    const existing = await prisma.agentMetrics.findUnique({
      where: {
        agentType_operationType: {
          agentType,
          operationType,
        },
      },
    });

    return this.upsert({
      agentType,
      operationType,
      successCount: existing?.successCount || 0,
      failureCount: (existing?.failureCount || 0) + 1,
      lastExecution: new Date(),
    });
  }

  static async findByAgentType(agentType: string) {
    return prisma.agentMetrics.findMany({
      where: { agentType },
      orderBy: { operationType: 'asc' },
    });
  }

  static async getOverallMetrics() {
    return prisma.agentMetrics.findMany({
      orderBy: [
        { agentType: 'asc' },
        { operationType: 'asc' },
      ],
    });
  }
}

export class MarketDataCacheService {
  static async set(cacheKey: string, data: any, expiresAt: Date) {
    return prisma.marketDataCache.upsert({
      where: { cacheKey },
      update: {
        data,
        expiresAt,
      },
      create: {
        cacheKey,
        data,
        expiresAt,
      },
    });
  }

  static async get(cacheKey: string) {
    const cached = await prisma.marketDataCache.findUnique({
      where: { cacheKey },
    });

    if (!cached) return null;

    if (cached.expiresAt < new Date()) {
      await this.delete(cacheKey);
      return null;
    }

    return cached.data;
  }

  static async delete(cacheKey: string) {
    return prisma.marketDataCache.delete({
      where: { cacheKey },
    });
  }

  static async cleanExpired() {
    return prisma.marketDataCache.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  static async clear() {
    return prisma.marketDataCache.deleteMany({});
  }
}

export class CompetitorDataService {
  static async create(data: {
    name: string;
    location: any;
    region: string;
    cuisineType: string[];
    priceRange: string;
    rating?: number;
    reviewCount?: number;
    data: any;
  }) {
    return prisma.competitorData.create({
      data,
    });
  }

  static async findByRegion(region: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [competitors, total] = await Promise.all([
      prisma.competitorData.findMany({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
        orderBy: { lastUpdated: 'desc' },
      }),
      prisma.competitorData.count({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return { competitors, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async findByCuisineType(cuisineType: string, region?: string) {
    const where: any = {
      cuisineType: {
        has: cuisineType,
      },
    };

    if (region) {
      where.region = {
        contains: region,
        mode: 'insensitive',
      };
    }

    return prisma.competitorData.findMany({
      where,
      orderBy: { rating: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.competitorData.update({
      where: { id },
      data: { ...data, lastUpdated: new Date() },
    });
  }

  static async delete(id: string) {
    return prisma.competitorData.delete({
      where: { id },
    });
  }
}

export class MarketTrendService {
  static async create(data: {
    region: string;
    category: string;
    trend: string;
    value: number;
    unit?: string;
    period: string;
    source?: string;
    confidence?: number;
  }) {
    return prisma.marketTrend.create({
      data,
    });
  }

  static async findByRegionAndCategory(region: string, category: string, page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    const [trends, total] = await Promise.all([
      prisma.marketTrend.findMany({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
          category: {
            contains: category,
            mode: 'insensitive',
          },
        },
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.marketTrend.count({
        where: {
          region: {
            contains: region,
            mode: 'insensitive',
          },
          category: {
            contains: category,
            mode: 'insensitive',
          },
        },
      }),
    ]);

    return { trends, pagination: { page, limit, total, pages: Math.ceil(total / limit) } };
  }

  static async findLatestTrends(region?: string, limit = 20) {
    const where = region
      ? {
          region: {
            contains: region,
            mode: 'insensitive' as const,
          },
        }
      : {};

    return prisma.marketTrend.findMany({
      where,
      take: limit,
      orderBy: { createdAt: 'desc' },
    });
  }

  static async update(id: string, data: any) {
    return prisma.marketTrend.update({
      where: { id },
      data,
    });
  }

  static async delete(id: string) {
    return prisma.marketTrend.delete({
      where: { id },
    });
  }
}

// Export all services as a grouped object for easier imports
export const DatabaseServices = {
  User: UserService,
  Session: SessionService,
  MarketReport: MarketReportService,
  DeliveryMarketAnalysis: DeliveryMarketAnalysisService,
  CustomerBehaviorAnalysis: CustomerBehaviorAnalysisService,
  PropertyMarketAnalysis: PropertyMarketAnalysisService,
  AccommodationDensityAnalysis: AccommodationDensityAnalysisService,
  TouristFlowAnalysis: TouristFlowAnalysisService,
  ChatSession: ChatSessionService,
  ChatMessage: ChatMessageService,
  AgentExecution: AgentExecutionService,
  AgentMetrics: AgentMetricsService,
  MarketDataCache: MarketDataCacheService,
  CompetitorData: CompetitorDataService,
  MarketTrend: MarketTrendService,
};

export default DatabaseServices;