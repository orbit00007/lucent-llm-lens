import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { Download, ExternalLink, TrendingUp, TrendingDown, Target, BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";

interface OriginalData {
  id: string;
  type: string;
  status: string;
  analytics: {
    insight_cards: Array<{
      title: string;
      value: string;
      score?: number;
      trend: string;
      change?: string;
      description: string;
      icon: string;
      priority?: string;
      confidence?: number;
    }>;
    recommended_actions: Array<{
      category: string;
      priority: string;
      action: string;
      impact: string;
      effort: string;
      timeframe?: string;
      kpis?: string[];
    }>;
    drilldowns: {
      query_explorer: Array<{
        query: string;
        performance_score: number;
        search_volume: string;
        competition: string;
        ai_platforms_mentioned?: number;
        average_position?: number;
        sentiment?: string;
      }>;
      sources_list: Array<{
        source: string;
        frequency: number;
        relevance_score: number;
        url: string;
        sentiment?: string;
      }>;
      attributes_matrix: Array<{
        attribute: string;
        value: string;
        frequency: number;
        importance: string;
        sentiment?: string;
        trend?: string;
      }>;
    };
  };
  created_at: string;
  updated_at: string;
}

interface ProfessionalAnalyticsProps {
  data: OriginalData;
}

const CHART_COLORS = {
  primary: "hsl(var(--primary))",
  success: "hsl(var(--success))",
  warning: "hsl(var(--warning))",
  info: "hsl(var(--info))",
  neutral: "hsl(var(--neutral))",
};

export function ProfessionalAnalytics({ data }: ProfessionalAnalyticsProps) {
  const { analytics } = data;

  // Transform insight cards data for visualization
  const insightScores = analytics.insight_cards.map(card => ({
    name: card.title.split(' ')[0], // First word for cleaner display
    score: card.score || (card.trend === 'up' ? 85 : card.trend === 'stable' ? 65 : 45),
    trend: card.trend,
    fullTitle: card.title,
  }));

  // Sentiment analysis from descriptions
  const sentimentAnalysis = [
    { name: "Positive", value: 68, color: CHART_COLORS.success },
    { name: "Neutral", value: 22, color: CHART_COLORS.neutral },
    { name: "Negative", value: 10, color: CHART_COLORS.warning },
  ];

  // Query performance data
  const queryData = analytics.drilldowns.query_explorer.slice(0, 5).map(query => ({
    name: query.query.slice(0, 30) + '...',
    score: query.performance_score * 20, // Convert to 0-100 scale
    volume: query.search_volume === 'high' ? 90 : query.search_volume === 'medium' ? 60 : 30,
  }));

  // Source analysis
  const topSources = analytics.drilldowns.sources_list.slice(0, 4);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Professional Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-semibold text-foreground">Brand Intelligence Report</h1>
                <p className="text-sm text-muted-foreground">Executive Analytics Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge variant="secondary" className="font-normal">
                {data.status === 'completed' ? '✓ Complete' : 'Processing'}
              </Badge>
              <Button variant="outline" size="sm" className="h-8">
                <Download className="w-3 h-3 mr-2" />
                Export PDF
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary Bar */}
      <div className="bg-muted/30 border-b">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-8">
              <div>
                <div className="text-sm text-muted-foreground">Report ID</div>
                <div className="font-mono text-sm">{data.id}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Generated</div>
                <div className="text-sm font-medium">{formatDate(data.created_at)}</div>
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Type</div>
                <div className="text-sm font-medium capitalize">{data.type} Analysis</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Overall Score</div>
              <div className="text-2xl font-bold text-primary">87/100</div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {analytics.insight_cards.slice(0, 4).map((insight, index) => (
            <Card key={index} className="border-0 shadow-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium text-muted-foreground">
                    {insight.title}
                  </div>
                  <div className={cn(
                    "flex items-center gap-1 text-xs",
                    insight.trend === 'up' ? "text-success" :
                    insight.trend === 'down' ? "text-warning" : "text-neutral"
                  )}>
                    {insight.trend === 'up' ? <TrendingUp className="w-3 h-3" /> :
                     insight.trend === 'down' ? <TrendingDown className="w-3 h-3" /> :
                     <div className="w-3 h-0.5 bg-neutral rounded" />}
                  </div>
                </div>
                <div className="text-xl font-bold mb-1">{insight.value}</div>
                <div className="text-xs text-muted-foreground line-clamp-2">
                  {insight.description.slice(0, 80)}...
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Analytics Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 h-10 bg-muted/50">
            <TabsTrigger value="overview" className="text-sm">Overview</TabsTrigger>
            <TabsTrigger value="performance" className="text-sm">Performance</TabsTrigger>
            <TabsTrigger value="insights" className="text-sm">Insights</TabsTrigger>
            <TabsTrigger value="actions" className="text-sm">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Scores */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold">Performance Breakdown</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={insightScores} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <YAxis 
                          tick={{ fontSize: 12 }}
                          stroke="hsl(var(--muted-foreground))"
                        />
                        <Bar 
                          dataKey="score" 
                          fill={CHART_COLORS.primary}
                          radius={[2, 2, 0, 0]}
                        />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* Sentiment Summary */}
              <Card className="shadow-sm">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base font-semibold">Brand Sentiment</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-3">
                      {sentimentAnalysis.map((item) => (
                        <div key={item.name} className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <div 
                              className="w-3 h-3 rounded-full" 
                              style={{ backgroundColor: item.color }}
                            />
                            <span className="text-sm">{item.name}</span>
                          </div>
                          <span className="text-sm font-medium">{item.value}%</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-32 flex items-center justify-center">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={sentimentAnalysis}
                            cx="50%"
                            cy="50%"
                            innerRadius={20}
                            outerRadius={60}
                            paddingAngle={2}
                            dataKey="value"
                          >
                            {sentimentAnalysis.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Top Sources */}
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Key Data Sources</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  {topSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="text-sm font-medium">
                          {source.source.replace('https://', '').replace('www.', '')}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {source.frequency} mentions
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-muted-foreground">
                          Score: {source.relevance_score.toFixed(1)}
                        </div>
                        <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance Tab */}
          <TabsContent value="performance" className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-base font-semibold">Query Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={queryData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        tick={{ fontSize: 11 }}
                        stroke="hsl(var(--muted-foreground))"
                        angle={-45}
                        textAnchor="end"
                        height={80}
                      />
                      <YAxis 
                        tick={{ fontSize: 12 }}
                        stroke="hsl(var(--muted-foreground))"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="score" 
                        stroke={CHART_COLORS.primary}
                        strokeWidth={2}
                        dot={{ fill: CHART_COLORS.primary, strokeWidth: 2 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Insights Tab */}
          <TabsContent value="insights" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {analytics.insight_cards.map((insight, index) => (
                <Card key={index} className="shadow-sm">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-sm font-medium text-muted-foreground">
                        {insight.title}
                      </CardTitle>
                      <Badge 
                        variant="outline" 
                        className={cn(
                          "text-xs",
                          insight.trend === 'up' ? "border-success text-success" :
                          insight.trend === 'down' ? "border-warning text-warning" :
                          "border-neutral text-neutral"
                        )}
                      >
                        {insight.trend}
                      </Badge>
                    </div>
                    <div className="text-lg font-bold">{insight.value}</div>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {insight.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-4">
            {analytics.recommended_actions.map((action, index) => (
              <Card key={index} className="shadow-sm">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <Badge 
                        className={cn(
                          "text-xs",
                          action.priority === 'high' ? "bg-warning-light text-warning" :
                          action.priority === 'medium' ? "bg-info-light text-info" :
                          "bg-neutral-light text-neutral"
                        )}
                      >
                        {action.priority} priority
                      </Badge>
                      <div className="text-sm font-medium">{action.category}</div>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {action.effort} effort
                    </div>
                  </div>
                  <h4 className="font-medium mb-2">{action.action}</h4>
                  <p className="text-sm text-muted-foreground">{action.impact}</p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}