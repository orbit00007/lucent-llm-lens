import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { InsightCard } from "./InsightCard";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from "recharts";
import { Download, ExternalLink, AlertTriangle, TrendingUp, Users, Target, MessageSquare } from "lucide-react";
import { cn } from "@/lib/utils";

interface AnalyticsData {
  id: string;
  brand: string;
  analysis_date: string;
  confidence_score: number;
  analytics: {
    executive_summary: {
      geo_score: number;
      geo_trend: string;
      brand_mentions: number;
      brand_mentions_trend: string;
      share_of_voice: string;
      share_of_voice_trend: string;
      overall_sentiment: string;
      sentiment_distribution: {
        positive: number;
        neutral: number;
        negative: number;
      };
    };
    insight_cards: Array<{
      title: string;
      value: string;
      score?: number;
      trend: "up" | "down" | "stable" | "emerging";
      change?: string;
      description: string;
      icon: string;
      priority: "low" | "medium" | "high" | "critical";
      confidence?: number;
    }>;
    competitors: Array<{
      name: string;
      market_share: string;
      sentiment_score: number;
      mentions: number;
      strengths: string[];
      weaknesses: string[];
      trend: string;
    }>;
    audience_segments: Array<{
      segment: string;
      size: string;
      sentiment: string;
      top_queries: string[];
      concerns: string[];
      opportunities: string[];
    }>;
    ai_visibility: {
      overall_score: number;
      platform_breakdown: Array<{
        platform: string;
        score: number;
        mentions: number;
        sentiment: string;
        target_achievement: string;
        trending: string;
      }>;
      query_performance: Array<{
        query: string;
        platforms_mentioned: number;
        average_position: number;
        sentiment: string;
        performance_score: number;
      }>;
    };
    content_gaps: Array<{
      type: string;
      title: string;
      description: string;
      impact: string;
      effort: string;
      priority: string;
    }>;
    risks_opportunities: {
      risks: Array<{
        type: string;
        title: string;
        description: string;
        probability: string;
        impact: string;
        timeframe: string;
      }>;
      opportunities: Array<{
        type: string;
        title: string;
        description: string;
        impact: string;
        effort: string;
        timeframe: string;
      }>;
    };
    trendlines: {
      search_volume_6_months: number[];
      sentiment_score_6_months: number[];
      ai_mentions_6_months: number[];
      competitor_mentions_6_months: number[];
    };
    evidence_snippets: Array<{
      quote: string;
      source: string;
      date: string;
      url: string;
      sentiment: string;
      platform: string;
      confidence: number;
    }>;
    recommended_actions: Array<{
      category: string;
      priority: string;
      action: string;
      impact: string;
      effort: string;
      timeframe: string;
      kpis: string[];
    }>;
    drilldowns: {
      query_explorer: Array<{
        query: string;
        performance_score: number;
        search_volume: string;
        competition: string;
        ai_platforms_mentioned: number;
        average_position: number;
        sentiment: string;
      }>;
      sources_list: Array<{
        source: string;
        frequency: number;
        relevance_score: number;
        sentiment: string;
        url: string;
      }>;
      attributes_matrix: Array<{
        attribute: string;
        value: string;
        frequency: number;
        importance: string;
        sentiment: string;
        trend: string;
      }>;
    };
  };
}

interface AnalyticsResultsProps {
  data: AnalyticsData;
}

const COLORS = {
  primary: "hsl(var(--chart-1))",
  success: "hsl(var(--chart-2))",
  warning: "hsl(var(--chart-3))",
  info: "hsl(var(--chart-4))",
  secondary: "hsl(var(--chart-5))",
  accent: "hsl(var(--chart-6))",
  muted: "hsl(var(--chart-7))",
  neutral: "hsl(var(--chart-8))",
};

export function AnalyticsResults({ data }: AnalyticsResultsProps) {
  const { analytics } = data;

  // Prepare chart data
  const sentimentData = [
    { name: "Positive", value: analytics.executive_summary.sentiment_distribution.positive, color: COLORS.success },
    { name: "Neutral", value: analytics.executive_summary.sentiment_distribution.neutral, color: COLORS.neutral },
    { name: "Negative", value: analytics.executive_summary.sentiment_distribution.negative, color: COLORS.warning },
  ];

  const visibilityData = analytics.ai_visibility.platform_breakdown.map(platform => ({
    name: platform.platform,
    score: platform.score,
    mentions: platform.mentions,
    target: parseInt(platform.target_achievement),
  }));

  const trendData = analytics.trendlines.search_volume_6_months.map((volume, index) => ({
    month: `Month ${index + 1}`,
    volume,
    sentiment: analytics.trendlines.sentiment_score_6_months[index] * 100,
    ai_mentions: analytics.trendlines.ai_mentions_6_months[index],
  }));

  const competitorData = analytics.competitors.map(comp => ({
    name: comp.name,
    mentions: comp.mentions,
    sentiment: comp.sentiment_score * 100,
    market_share: parseFloat(comp.market_share),
  }));

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20">
      {/* Header */}
      <div className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Target className="w-4 h-4 text-primary-foreground" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">AI Brand Intelligence Platform</h1>
                  <p className="text-sm text-muted-foreground">Professional Analytics Suite</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="bg-success-light text-success border-success/20">
                ✓ Completed
              </Badge>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Report
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-2">AI Visibility Analysis</h2>
              <p className="text-muted-foreground mb-4">
                Comprehensive Brand Intelligence Report for <span className="font-semibold text-foreground">{data.brand}</span>
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-info rounded-full"></div>
                  <span>Analysis ID: {data.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span>Created: {formatDate(data.analysis_date)}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                  <span>Type: Brand Analysis</span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground mb-1">Overall Score</div>
              <div className="text-4xl font-bold text-primary mb-2">
                {analytics.executive_summary.geo_score}
              </div>
              <Badge className="bg-success-light text-success border-success/20">
                {analytics.executive_summary.geo_trend} vs last period
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Executive Summary */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Target className="w-5 h-5 text-primary" />
                <Badge variant="outline" className="text-xs">{analytics.executive_summary.geo_trend}</Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{analytics.executive_summary.geo_score}</div>
              <div className="text-sm text-muted-foreground">GEO Score</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-success/5 to-success/10 border-success/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <MessageSquare className="w-5 h-5 text-success" />
                <Badge variant="outline" className="text-xs">{analytics.executive_summary.brand_mentions_trend}</Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{analytics.executive_summary.brand_mentions}</div>
              <div className="text-sm text-muted-foreground">Brand Mentions</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-info/5 to-info/10 border-info/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <TrendingUp className="w-5 h-5 text-info" />
                <Badge variant="outline" className="text-xs">{analytics.executive_summary.share_of_voice_trend}</Badge>
              </div>
              <div className="text-2xl font-bold mb-1">{analytics.executive_summary.share_of_voice}</div>
              <div className="text-sm text-muted-foreground">Share of Voice</div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-warning/5 to-warning/10 border-warning/20">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <Users className="w-5 h-5 text-warning" />
                <div className="flex gap-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <div className="w-2 h-2 bg-neutral rounded-full"></div>
                  <div className="w-2 h-2 bg-warning rounded-full"></div>
                </div>
              </div>
              <div className="text-2xl font-bold mb-1 capitalize">{analytics.executive_summary.overall_sentiment}</div>
              <div className="text-sm text-muted-foreground">Overall Sentiment</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="insights" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/50">
            <TabsTrigger value="insights">Key Insights</TabsTrigger>
            <TabsTrigger value="visibility">AI Visibility</TabsTrigger>
            <TabsTrigger value="competition">Competition</TabsTrigger>
            <TabsTrigger value="audience">Audience</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Key Business Insights */}
          <TabsContent value="insights" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Key Business Insights</h3>
              <p className="text-muted-foreground mb-6">Critical metrics and performance indicators from AI platform analysis</p>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {analytics.insight_cards.map((insight, index) => (
                  <InsightCard key={index} {...insight} />
                ))}
              </div>
            </div>

            {/* Sentiment Distribution */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  Sentiment Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    {sentimentData.map((item) => (
                      <div key={item.name} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-3 h-3 rounded-full" 
                            style={{ backgroundColor: item.color }}
                          ></div>
                          <span className="text-sm font-medium">{item.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-bold">{item.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={sentimentData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {sentimentData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* AI Visibility */}
          <TabsContent value="visibility" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">AI Search Visibility</h3>
              <p className="text-muted-foreground mb-6">Platform-level breakdown and query performance analysis</p>
            </div>

            {/* Platform Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Platform Performance Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {analytics.ai_visibility.platform_breakdown.map((platform) => (
                    <div key={platform.platform} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <span className="font-medium">{platform.platform}</span>
                          <Badge variant="outline" className="text-xs">
                            {platform.mentions} mentions
                          </Badge>
                          <Badge 
                            className={cn(
                              "text-xs",
                              platform.sentiment === "positive" ? "bg-success-light text-success" :
                              platform.sentiment === "negative" ? "bg-destructive/10 text-destructive" :
                              "bg-muted text-muted-foreground"
                            )}
                          >
                            {platform.sentiment}
                          </Badge>
                        </div>
                        <div className="text-right">
                          <span className="text-lg font-bold">{platform.score}/100</span>
                          <div className="text-xs text-muted-foreground">{platform.target_achievement} to target</div>
                        </div>
                      </div>
                      <Progress value={platform.score} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Query Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Query Performance Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b text-left">
                        <th className="py-3 text-sm font-medium text-muted-foreground">Query</th>
                        <th className="py-3 text-sm font-medium text-muted-foreground">Performance</th>
                        <th className="py-3 text-sm font-medium text-muted-foreground">Position</th>
                        <th className="py-3 text-sm font-medium text-muted-foreground">Platforms</th>
                        <th className="py-3 text-sm font-medium text-muted-foreground">Sentiment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {analytics.ai_visibility.query_performance.map((query, index) => (
                        <tr key={index} className="border-b">
                          <td className="py-4 text-sm max-w-xs">
                            <div className="font-medium truncate">{query.query}</div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center gap-2">
                              <span className="text-sm font-medium">{query.performance_score}%</span>
                              <div className="w-20 bg-muted rounded-full h-1.5">
                                <div 
                                  className="bg-primary rounded-full h-1.5"
                                  style={{ width: `${query.performance_score}%` }}
                                />
                              </div>
                            </div>
                          </td>
                          <td className="py-4 text-sm">{query.average_position.toFixed(1)}</td>
                          <td className="py-4 text-sm">{query.platforms_mentioned}/4</td>
                          <td className="py-4">
                            <Badge 
                              className={cn(
                                "text-xs",
                                query.sentiment === "positive" ? "bg-success-light text-success" :
                                query.sentiment === "negative" ? "bg-destructive/10 text-destructive" :
                                "bg-muted text-muted-foreground"
                              )}
                            >
                              {query.sentiment}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competition Analysis */}
          <TabsContent value="competition" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Competitive Landscape</h3>
              <p className="text-muted-foreground mb-6">Analysis of competitor positioning and market dynamics</p>
            </div>

            {/* Competitor Comparison */}
            <Card>
              <CardHeader>
                <CardTitle>Competitor Performance Matrix</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={competitorData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Bar dataKey="mentions" fill={COLORS.primary} radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                
                <div className="space-y-4">
                  {analytics.competitors.map((competitor, index) => (
                    <Card key={index} className="border-l-4 border-l-primary/20">
                      <CardContent className="p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h4 className="font-semibold">{competitor.name}</h4>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <span>Market Share: {competitor.market_share}</span>
                              <span>Mentions: {competitor.mentions}</span>
                              <Badge variant="outline" className="text-xs">
                                {(competitor.sentiment_score * 100).toFixed(0)}% sentiment
                              </Badge>
                            </div>
                          </div>
                          <Badge 
                            className={cn(
                              "text-xs",
                              competitor.trend === "up" ? "bg-success-light text-success" :
                              competitor.trend === "down" ? "bg-destructive/10 text-destructive" :
                              "bg-muted text-muted-foreground"
                            )}
                          >
                            {competitor.trend}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div>
                            <div className="text-xs font-medium text-success mb-2">Strengths</div>
                            <div className="space-y-1">
                              {competitor.strengths.map((strength, i) => (
                                <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-success rounded-full"></div>
                                  {strength}
                                </div>
                              ))}
                            </div>
                          </div>
                          <div>
                            <div className="text-xs font-medium text-warning mb-2">Weaknesses</div>
                            <div className="space-y-1">
                              {competitor.weaknesses.map((weakness, i) => (
                                <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                                  <div className="w-1.5 h-1.5 bg-warning rounded-full"></div>
                                  {weakness}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audience Segments */}
          <TabsContent value="audience" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Audience Intelligence</h3>
              <p className="text-muted-foreground mb-6">User segment analysis and behavior patterns</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analytics.audience_segments.map((segment, index) => (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-base">{segment.segment}</CardTitle>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline">{segment.size}</Badge>
                        <Badge 
                          className={cn(
                            "text-xs",
                            segment.sentiment === "positive" ? "bg-success-light text-success" :
                            segment.sentiment === "negative" ? "bg-destructive/10 text-destructive" :
                            "bg-warning-light text-warning"
                          )}
                        >
                          {segment.sentiment}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Top Queries</div>
                      <div className="space-y-1">
                        {segment.top_queries.slice(0, 3).map((query, i) => (
                          <div key={i} className="text-xs bg-muted rounded px-2 py-1">
                            {query}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-warning mb-2">Main Concerns</div>
                      <div className="space-y-1">
                        {segment.concerns.slice(0, 2).map((concern, i) => (
                          <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <AlertTriangle className="w-3 h-3 text-warning" />
                            {concern}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <div className="text-xs font-medium text-success mb-2">Opportunities</div>
                      <div className="space-y-1">
                        {segment.opportunities.slice(0, 2).map((opportunity, i) => (
                          <div key={i} className="text-xs text-muted-foreground flex items-center gap-2">
                            <TrendingUp className="w-3 h-3 text-success" />
                            {opportunity}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Trends Analysis */}
          <TabsContent value="trends" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Trend Analysis</h3>
              <p className="text-muted-foreground mb-6">Historical performance and trajectory insights</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>6-Month Performance Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={trendData}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Area 
                        type="monotone" 
                        dataKey="sentiment" 
                        stackId="1" 
                        stroke={COLORS.success} 
                        fill={COLORS.success}
                        fillOpacity={0.3}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="ai_mentions" 
                        stackId="2" 
                        stroke={COLORS.primary} 
                        fill={COLORS.primary}
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* Risk & Opportunity Matrix */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-destructive">Risk Assessment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.risks_opportunities.risks.map((risk, index) => (
                    <div key={index} className="p-3 border-l-4 border-l-destructive/30 bg-destructive/5 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{risk.title}</span>
                        <Badge variant="outline" className="text-xs">{risk.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{risk.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Impact: {risk.impact}</span>
                        <span>•</span>
                        <span>Probability: {risk.probability}</span>
                        <span>•</span>
                        <span>{risk.timeframe}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-base text-success">Opportunities</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {analytics.risks_opportunities.opportunities.map((opportunity, index) => (
                    <div key={index} className="p-3 border-l-4 border-l-success/30 bg-success/5 rounded">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-sm">{opportunity.title}</span>
                        <Badge variant="outline" className="text-xs">{opportunity.type}</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{opportunity.description}</p>
                      <div className="flex items-center gap-2 text-xs">
                        <span>Impact: {opportunity.impact}</span>
                        <span>•</span>
                        <span>Effort: {opportunity.effort}</span>
                        <span>•</span>
                        <span>{opportunity.timeframe}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Strategic Actions */}
          <TabsContent value="actions" className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold mb-4">Strategic Recommendations</h3>
              <p className="text-muted-foreground mb-6">Actionable insights to improve AI platform visibility and performance</p>
            </div>

            <div className="space-y-4">
              {analytics.recommended_actions.map((action, index) => (
                <Card key={index} className={cn(
                  "border-l-4",
                  action.priority === "critical" ? "border-l-destructive bg-destructive/5" :
                  action.priority === "high" ? "border-l-warning bg-warning/5" :
                  action.priority === "medium" ? "border-l-info bg-info/5" :
                  "border-l-muted bg-muted/5"
                )}>
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-semibold">{action.category}</h4>
                          <Badge 
                            className={cn(
                              "text-xs",
                              action.priority === "critical" ? "bg-destructive text-destructive-foreground" :
                              action.priority === "high" ? "bg-warning text-warning-foreground" :
                              action.priority === "medium" ? "bg-info text-info-foreground" :
                              "bg-muted text-muted-foreground"
                            )}
                          >
                            {action.priority} priority
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{action.action}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        <ExternalLink className="w-4 h-4 mr-2" />
                        View Details
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">Expected Impact</div>
                        <div className="text-sm">{action.impact}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">Implementation Effort</div>
                        <div className="text-sm">{action.effort}</div>
                      </div>
                      <div>
                        <div className="text-xs font-medium text-muted-foreground mb-1">Timeline</div>
                        <div className="text-sm">{action.timeframe}</div>
                      </div>
                    </div>

                    <div>
                      <div className="text-xs font-medium text-muted-foreground mb-2">Key Performance Indicators</div>
                      <div className="flex flex-wrap gap-1">
                        {action.kpis.map((kpi, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {kpi}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}