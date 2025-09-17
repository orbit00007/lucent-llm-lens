import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { 
  TrendingUp, TrendingDown, Eye, Heart, MessageSquare, Users, 
  Award, Target, Zap, Shield, Star, AlertTriangle, CheckCircle,
  ExternalLink, Globe, BarChart3, ArrowUp, ArrowDown, Minus, 
  Activity, Crown, Car, Cpu, Brain
} from 'lucide-react';
import analyticsData from '../data/newmockdata.json';

const ProfessionalAnalytics: React.FC = () => {
  const transformedData = useMemo(() => {
    const data = analyticsData as any;
    
    // Transform overall insights
    const overallInsights = data.overall_insights;
    const insightCards = [
      {
        title: "AI Visibility",
        value: overallInsights?.ai_visibility || "High",
        trend: "up",
        description: overallInsights?.ai_sentiment_label || ""
      },
      {
        title: "Brand Mentions", 
        value: overallInsights?.brand_mentions?.count?.toLocaleString() || "0",
        trend: "up",
        description: `${overallInsights?.brand_mentions?.level || "High"} engagement level`
      },
      {
        title: "Sentiment Score",
        value: overallInsights?.ai_sentiment_summary?.positive?.count ? 
          `${Math.round((overallInsights.ai_sentiment_summary.positive.count / 
            (overallInsights.ai_sentiment_summary.positive.count + 
             overallInsights.ai_sentiment_summary.neutral.count + 
             overallInsights.ai_sentiment_summary.negative.count)) * 100)}%` : "0%",
        trend: "up", 
        description: overallInsights?.ai_sentiment_summary?.most_prominent_sentiment || "Positive"
      }
    ];

    const sentimentData = overallInsights?.ai_sentiment_summary ? [
      { name: 'Positive', value: overallInsights.ai_sentiment_summary.positive.count, color: '#10b981' },
      { name: 'Neutral', value: overallInsights.ai_sentiment_summary.neutral.count, color: '#6b7280' },
      { name: 'Negative', value: overallInsights.ai_sentiment_summary.negative.count, color: '#ef4444' }
    ] : [];

    // Transform source performance analysis
    const sourceAnalysis = data.source_performance_analysis;
    const sources = sourceAnalysis?.sources || [];

    // Transform competitor analysis
    const competitorAnalysis = data.competitor_analysis;
    const competitorPositions = competitorAnalysis?.competitor_positions || [];

    // Transform content impact
    const contentImpact = data.content_impact;
    const contentCategories = contentImpact?.categories || [];
    const attributes = contentImpact?.attributes_matrix || [];

    // Transform recommended actions
    const recommendedActions = data.recommended_actions?.recommended_actions || [];

    return {
      insightCards,
      sentimentData,
      sources,
      competitorPositions,
      contentCategories,
      attributes, 
      recommendedActions
    };
  }, []);

  // Utility functions
  const getIcon = (iconType: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "visibility": <Eye className="w-5 h-5" />,
      "mentions": <MessageSquare className="w-5 h-5" />,
      "sentiment": <Heart className="w-5 h-5" />,
      "competition": <Users className="w-5 h-5" />,
      "privacy": <Shield className="w-5 h-5" />,
      "ai": <Brain className="w-5 h-5" />
    };
    return iconMap[iconType] || <Activity className="w-5 h-5" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <Minus className="w-4 h-4 text-gray-400" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'text-red-700 bg-red-50 border-red-200';
      case 'medium':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'low':
        return 'text-green-700 bg-green-50 border-green-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'negative':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  // Prepare chart data for competitor analysis
  const competitorChartData = transformedData.competitorPositions.flatMap(pos => 
    pos.top_competitors.map(comp => ({
      name: comp.brand_name,
      keyword: pos.keyword,
      visibility: comp.visibility_count,
      rank: comp.rank
    }))
  );

  const attributesChartData = transformedData.attributes.map(attr => ({
    name: attr.attribute,
    frequency: attr.frequency
  }));

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-muted/20">
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {analyticsData.brand_name} Brand Intelligence Analytics
              </h1>
              <p className="text-muted-foreground mt-2">
                Analysis Keywords: {analyticsData.analysis_keywords?.join(', ')}
              </p>
              <p className="text-sm text-muted-foreground">
                Website: <a href={analyticsData.brand_website} target="_blank" rel="noopener noreferrer" 
                           className="text-primary hover:underline">{analyticsData.brand_website}</a>
              </p>
            </div>
            <div className="text-right">
              <Badge variant="secondary" className="mb-2">
                {analyticsData.status === 'completed' ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    Completed
                  </>
                ) : (
                  <>
                    <Activity className="w-3 h-3 mr-1" />
                    {analyticsData.status}
                  </>
                )}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Updated: {new Date(analyticsData.updated_at).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {transformedData.insightCards.map((card, index) => (
                <Card key={index} className="shadow-card border-card-border">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(card.title.toLowerCase().replace(' ', '_'))}
                      </div>
                      {getTrendIcon(card.trend)}
                    </div>
                    <div className="space-y-2">
                      <h3 className="font-semibold text-foreground">{card.title}</h3>
                      <div className="text-2xl font-bold text-foreground">{card.value}</div>
                      <p className="text-sm text-muted-foreground">{card.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="shadow-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-primary" />
                    Sentiment Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={transformedData.sentimentData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}`}
                      >
                        {transformedData.sentimentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="shadow-card border-card-border">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Competitor Visibility
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={competitorChartData.slice(0, 6)}>
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis dataKey="name" className="text-xs" />
                      <YAxis className="text-xs" />
                      <Tooltip 
                        contentStyle={{
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="visibility" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sentiment" className="space-y-6">
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Heart className="w-5 h-5 text-primary" />
                  Detailed Sentiment Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {transformedData.sentimentData.map((item, index) => (
                    <div key={index} className="text-center p-6 rounded-lg bg-muted/30">
                      <div className="text-3xl font-bold mb-2" style={{ color: item.color }}>
                        {item.value.toLocaleString()}
                      </div>
                      <div className="text-sm text-muted-foreground font-medium">{item.name}</div>
                    </div>
                  ))}
                </div>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={transformedData.sentimentData}
                      cx="50%"
                      cy="50%"
                      outerRadius={120}
                      dataKey="value"
                      label={({name, value, percent}) => `${name}: ${(percent * 100).toFixed(1)}%`}
                    >
                      {transformedData.sentimentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="competitors" className="space-y-6">
            <div className="space-y-6">
              {transformedData.competitorPositions.map((position, index) => (
                <Card key={position.keyword} className="shadow-card border-card-border">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {position.keyword === 'self driving' && <Brain className="w-5 h-5 text-primary" />}
                      {position.keyword === 'comfort' && <Heart className="w-5 h-5 text-accent" />}
                      {position.keyword === 'technology' && <Cpu className="w-5 h-5 text-secondary" />}
                      Keyword: "{position.keyword}"
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {position.top_competitors.map((competitor, compIndex) => (
                        <div key={competitor.brand_name} 
                             className={`p-4 rounded-lg border ${
                               competitor.rank === 1 ? 'bg-primary/5 border-primary' :
                               competitor.rank === 2 ? 'bg-accent/5 border-accent' :
                               'bg-muted/30 border-border'
                             }`}>
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              {competitor.rank === 1 && <Crown className="w-4 h-4 text-primary" />}
                              <Badge variant="outline" className="text-xs">
                                #{competitor.rank}
                              </Badge>
                              <span className="font-medium text-sm">{competitor.brand_name}</span>
                            </div>
                            <Badge className={getSentimentColor(competitor.sentiment)}>
                              {competitor.sentiment}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Visibility: {competitor.visibility_count.toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sources" className="space-y-6">
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  Source Performance Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium">Source</th>
                        <th className="text-left py-3 px-4 font-medium">Frequency</th>
                        <th className="text-left py-3 px-4 font-medium">Relevance Score</th>
                        <th className="text-left py-3 px-4 font-medium">Sentiment</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transformedData.sources.map((source, index) => (
                        <tr key={index} className="border-b border-border/50">
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4 text-muted-foreground" />
                              <a href={source.source} target="_blank" rel="noopener noreferrer" 
                                 className="text-primary hover:underline text-sm">
                                {new URL(source.source).hostname}
                              </a>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge variant="secondary">{source.frequency}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-2">
                              <div className="w-16 bg-muted rounded-full h-2">
                                <div 
                                  className="bg-primary h-2 rounded-full" 
                                  style={{ width: `${source.relevance_score * 100}%` }}
                                />
                              </div>
                              <span className="text-xs text-muted-foreground">
                                {(source.relevance_score * 100).toFixed(0)}%
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getSentimentColor(source.sentiment)}>
                              {source.sentiment}
                            </Badge>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <h3 className="col-span-full text-xl font-semibold mb-4">Content Categories Performance</h3>
              {transformedData.contentCategories.map((category, index) => (
                <Card key={index} className="shadow-card border-card-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{category.category_name}</CardTitle>
                    <Badge className={`w-fit ${
                      category.visibility_level === 'High' ? 'bg-green-500/10 text-green-700 border-green-200' :
                      category.visibility_level === 'Medium' ? 'bg-yellow-500/10 text-yellow-700 border-yellow-200' :
                      'bg-red-500/10 text-red-700 border-red-200'
                    }`}>
                      {category.visibility_level} Visibility
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-muted-foreground">
                        Brand Position: #{category.brand_position}
                      </p>
                      <div className="space-y-1">
                        <p className="text-sm font-medium">Top Brands:</p>
                        {category.top_brands?.slice(0, 3).map((brand, brandIndex) => (
                          <div key={brandIndex} className="flex justify-between items-center text-sm">
                            <span className={brand === 'Tesla' ? 'font-medium text-primary' : ''}>
                              {brand}
                            </span>
                            <Badge variant="secondary" className="text-xs">
                              #{brandIndex + 1}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="attributes" className="space-y-6">
            <Card className="shadow-card border-card-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="w-5 h-5 text-primary" />
                  Attribute Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={attributesChartData}>
                    <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                    <XAxis dataKey="name" className="text-xs" />
                    <YAxis className="text-xs" />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: 'hsl(var(--card))',
                        border: '1px solid hsl(var(--border))',
                        borderRadius: '8px'
                      }}
                    />
                    <Bar dataKey="frequency" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {transformedData.attributes.map((attribute, index) => (
                <Card key={index} className="shadow-card border-card-border">
                  <CardHeader>
                    <CardTitle className="text-lg">{attribute.attribute}</CardTitle>
                    <Badge className={`w-fit ${
                      attribute.importance === 'High' ? 'bg-green-500/10 text-green-700 border-green-200' :
                      attribute.importance === 'Medium' ? 'bg-yellow-500/10 text-yellow-700 border-yellow-200' :
                      'bg-red-500/10 text-red-700 border-red-200'
                    }`}>
                      {attribute.importance} Importance
                    </Badge>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{attribute.value}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Frequency:</span>
                      <Badge variant="secondary">{attribute.frequency.toLocaleString()}</Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="actions" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {transformedData.recommendedActions.map((action, index) => (
                <Card key={index} className="shadow-card border-card-border">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{action.category}</CardTitle>
                        <Badge className={getPriorityColor(action.priority)} variant="outline">
                          {action.priority === 'High' && <AlertTriangle className="w-3 h-3 mr-1" />}
                          {action.priority === 'Medium' && <Target className="w-3 h-3 mr-1" />}
                          {action.priority === 'Low' && <CheckCircle className="w-3 h-3 mr-1" />}
                          {action.priority} Priority
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{action.action}</p>
                    
                    <div className="space-y-3">
                      {action.impact && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Expected Impact:</p>
                          <p className="text-sm text-muted-foreground">{action.impact}</p>
                        </div>
                      )}
                      
                      {action.effort && (
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Effort Required:</p>
                          <Badge variant="secondary" className="text-xs">
                            {action.effort}
                          </Badge>
                        </div>
                      )}
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
};

export default ProfessionalAnalytics;