import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity,
  Users,
  Shield,
  Bot,
  Eye,
  MessageSquare
} from "lucide-react";
import analyticsData from "@/data/newmockdata.json";

export function ProfessionalAnalytics() {
  const [activeTab, setActiveTab] = useState("overview");

  // Transform the new data structure
  const transformedData = useMemo(() => {
    const fold1 = analyticsData["Fold 1 - Overall Insights"];
    const fold2 = analyticsData["Fold 2 - Source Performance Analysis"];
    const fold3 = analyticsData["Fold 3 - Competitor Analysis"];
    const fold4 = analyticsData["Fold 4 - Content Impact"];
    const fold5 = analyticsData["Fold 5 - Recommended Actions"];

    return {
      insight_cards: [
        {
          title: "AI Visibility",
          value: fold1.ai_visibility,
          trend: fold1.ai_visibility === "High" ? "up" : "stable",
          description: fold1.ai_sentiment_label,
          icon: "visibility"
        },
        {
          title: "Brand Mentions",
          value: fold1.brand_mentions.count.toLocaleString(),
          trend: fold1.brand_mentions.level === "High" ? "up" : "stable",
          description: `${fold1.brand_mentions.level} volume for ${analyticsData.brand_name}`,
          icon: "mentions"
        },
        {
          title: "AI Sentiment",
          value: fold1.ai_sentiment,
          trend: fold1.ai_sentiment === "Positive" ? "up" : fold1.ai_sentiment === "Negative" ? "down" : "stable",
          description: fold1.ai_sentiment_summary.ai_insight_label,
          icon: "sentiment"
        },
        {
          title: "Market Position",
          value: `#${fold3.competitors.find(c => c.brand_name === analyticsData.brand_name)?.rank_position || 1}`,
          trend: "up",
          description: `Leading position in ${analyticsData.analysis_keywords[0]} market`,
          icon: "competition"
        }
      ],
      sentiment_data: [
        { 
          name: 'Positive', 
          value: fold1.ai_sentiment_summary.positive.percentage || Math.round((fold1.ai_sentiment_summary.positive.count / (fold1.ai_sentiment_summary.positive.count + fold1.ai_sentiment_summary.neutral.count + fold1.ai_sentiment_summary.negative.count)) * 100), 
          color: '#22c55e' 
        },
        { 
          name: 'Neutral', 
          value: fold1.ai_sentiment_summary.neutral.percentage || Math.round((fold1.ai_sentiment_summary.neutral.count / (fold1.ai_sentiment_summary.positive.count + fold1.ai_sentiment_summary.neutral.count + fold1.ai_sentiment_summary.negative.count)) * 100), 
          color: '#64748b' 
        },
        { 
          name: 'Negative', 
          value: fold1.ai_sentiment_summary.negative.percentage || Math.round((fold1.ai_sentiment_summary.negative.count / (fold1.ai_sentiment_summary.positive.count + fold1.ai_sentiment_summary.neutral.count + fold1.ai_sentiment_summary.negative.count)) * 100), 
          color: '#ef4444' 
        }
      ],
      competitors: fold3.competitors.map(comp => ({
        name: comp.brand_name,
        visibility_count: comp.visibility_count,
        keyword: comp.keyword,
        rank_position: comp.rank_position || 0,
        sentiment: fold3.competitor_sentiment.find(cs => cs.brand_name === comp.brand_name)?.sentiment_summary || "Neutral",
        key_phrases: fold3.competitor_sentiment.find(cs => cs.brand_name === comp.brand_name)?.key_phrases || [],
        sentiment_score: fold3.competitor_sentiment.find(cs => cs.brand_name === comp.brand_name)?.overall_sentiment_score || 0
      })),
      sources: fold2.sources.map(source => ({
        ...source,
        domain: source.domain || source.source.replace('https://', '').replace('http://', '').split('/')[0],
        category: source.source_category || 'Other'
      })),
      categories: fold4.categories,
      attributes: fold4.attributes_matrix,
      recommendations: fold5.recommended_actions
    };
  }, []);

  const getIcon = (iconType: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "visibility": <Eye className="w-5 h-5" />,
      "mentions": <MessageSquare className="w-5 h-5" />,
      "sentiment": <Activity className="w-5 h-5" />,
      "competition": <Users className="w-5 h-5" />,
      "privacy": <Shield className="w-5 h-5" />,
      "ai": <Bot className="w-5 h-5" />
    };
    return iconMap[iconType] || <Activity className="w-5 h-5" />;
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning/10 text-warning border-warning/20';
      case 'low':
        return 'bg-success/10 text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment.toLowerCase()) {
      case 'positive':
      case 'highly positive':
        return 'bg-success/10 text-success border-success/20';
      case 'negative':
        return 'bg-destructive/10 text-destructive border-destructive/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const competitorChartData = transformedData.competitors.map(comp => ({
    name: comp.name,
    visibility: comp.visibility_count
  }));

  const attributesChartData = transformedData.attributes.map(attr => ({
    name: attr.attribute,
    frequency: attr.frequency
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">{analyticsData.brand_name} - Brand Intelligence Analytics</h1>
              <p className="text-muted-foreground mt-1">Professional analysis report • {analyticsData.id} • Keywords: {analyticsData.analysis_keywords.join(", ")}</p>
            </div>
            <Badge variant="secondary" className="bg-success/10 text-success border-success/20">
              {analyticsData.status.charAt(0).toUpperCase() + analyticsData.status.slice(1)}
            </Badge>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-6 bg-muted/30">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="sentiment">Sentiment</TabsTrigger>
            <TabsTrigger value="competitors">Competitors</TabsTrigger>
            <TabsTrigger value="sources">Sources</TabsTrigger>
            <TabsTrigger value="attributes">Attributes</TabsTrigger>
            <TabsTrigger value="actions">Actions</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transformedData.insight_cards.map((card, index) => (
                <Card key={index} className="border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {getIcon(card.icon)}
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
              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Sentiment Distribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={transformedData.sentiment_data}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({name, value}) => `${name}: ${value}%`}
                        >
                          {transformedData.sentiment_data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-border/50">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">Top Competitors by Visibility</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={competitorChartData.slice(0, 5)}>
                        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                        <XAxis 
                          dataKey="name" 
                          stroke="hsl(var(--muted-foreground))"
                          tick={{ fontSize: 12 }}
                        />
                        <YAxis stroke="hsl(var(--muted-foreground))" />
                        <Tooltip 
                          contentStyle={{ 
                            backgroundColor: 'hsl(var(--card))',
                            border: '1px solid hsl(var(--border))',
                            borderRadius: '8px'
                          }}
                        />
                        <Bar dataKey="visibility" fill="hsl(var(--primary))" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Sentiment Tab */}
          <TabsContent value="sentiment" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Detailed Sentiment Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  {transformedData.sentiment_data.map((item, index) => (
                    <div key={index} className="text-center p-4 rounded-lg border border-border/50">
                      <div className="text-2xl font-bold" style={{ color: item.color }}>
                        {item.value}%
                      </div>
                      <div className="text-sm text-muted-foreground">{item.name}</div>
                    </div>
                  ))}
                </div>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={transformedData.sentiment_data}
                        cx="50%"
                        cy="50%"
                        outerRadius={100}
                        dataKey="value"
                        label={({name, value}) => `${name}: ${value}%`}
                      >
                        {transformedData.sentiment_data.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Competitors Tab */}
          <TabsContent value="competitors" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Competitor Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transformedData.competitors.map((competitor, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50 space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="font-semibold text-foreground">{competitor.name}</h4>
                            {competitor.rank_position && (
                              <Badge variant="outline" className="text-xs">#{competitor.rank_position}</Badge>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground">{competitor.keyword}</p>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-semibold text-foreground">{competitor.visibility_count.toLocaleString()}</div>
                            <div className="text-xs text-muted-foreground">Visibility Count</div>
                          </div>
                          <Badge className={getSentimentColor(competitor.sentiment)}>
                            {competitor.sentiment}
                          </Badge>
                        </div>
                      </div>
                      {competitor.key_phrases && competitor.key_phrases.length > 0 && (
                        <div>
                          <div className="text-xs text-muted-foreground mb-1">Key phrases:</div>
                          <div className="flex flex-wrap gap-1">
                            {competitor.key_phrases.slice(0, 3).map((phrase, phraseIndex) => (
                              <Badge key={phraseIndex} variant="outline" className="text-xs">
                                {phrase}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      )}
                      {competitor.sentiment_score > 0 && (
                        <div className="text-xs text-muted-foreground">
                          Sentiment Score: {competitor.sentiment_score}/10
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Sources Tab */}
          <TabsContent value="sources" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Source Performance Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transformedData.sources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 rounded-lg border border-border/50">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground">{source.domain}</h4>
                        <p className="text-sm text-muted-foreground">{source.source}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">{source.category}</Badge>
                          <span className="text-xs text-muted-foreground">Relevance: {source.relevance_score}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-semibold text-foreground">{source.frequency}</div>
                          <div className="text-xs text-muted-foreground">Citations</div>
                        </div>
                        <Badge className={getSentimentColor(source.sentiment)}>
                          {source.sentiment}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Content Categories</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {transformedData.categories.map((category, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{category.category_name}</h4>
                        <Badge className={category.visibility_level === "High" ? "bg-success/10 text-success" : "bg-muted"}>
                          {category.visibility_level}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mb-2">
                        Total mentions: {category.total_mentions}
                      </div>
                      <div className="space-y-1">
                        {category.top_brands.slice(0, 3).map((brand, brandIndex) => (
                          <div key={brandIndex} className="flex justify-between text-xs">
                            <span>{brand.brand}</span>
                            <span className="text-muted-foreground">{brand.mentions}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Attributes Tab */}
          <TabsContent value="attributes" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Attribute Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-64 mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={attributesChartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                      <XAxis 
                        dataKey="name" 
                        stroke="hsl(var(--muted-foreground))"
                        tick={{ fontSize: 12 }}
                      />
                      <YAxis stroke="hsl(var(--muted-foreground))" />
                      <Tooltip 
                        contentStyle={{ 
                          backgroundColor: 'hsl(var(--card))',
                          border: '1px solid hsl(var(--border))',
                          borderRadius: '8px'
                        }}
                      />
                      <Bar dataKey="frequency" fill="hsl(var(--primary))" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  {transformedData.attributes.map((attr, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold text-foreground">{attr.attribute}</h4>
                        <Badge className={getPriorityColor(attr.importance)}>
                          {attr.importance}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{attr.value}</p>
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Frequency: {attr.frequency.toLocaleString()} mentions</span>
                        {attr.tesla_position && (
                          <Badge variant="outline" className="text-xs">
                            Tesla: {attr.tesla_position}
                          </Badge>
                        )}
                      </div>
                      {attr.competitor_average && (
                        <div className="text-xs text-muted-foreground mt-1">
                          Competitor avg: {attr.competitor_average.toLocaleString()}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Actions Tab */}
          <TabsContent value="actions" className="space-y-6">
            <Card className="border-border/50">
              <CardHeader>
                <CardTitle className="text-lg font-semibold">Recommended Actions</CardTitle>
              </CardHeader>
               <CardContent>
                <div className="space-y-4">
                  {transformedData.recommendations.map((action, index) => (
                    <div key={index} className="p-4 rounded-lg border border-border/50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-foreground">{action.category}</h4>
                            <Badge className={getPriorityColor(action.priority)}>
                              {action.priority} Priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm text-foreground mb-3">{action.action}</p>
                      <div className="space-y-2">
                        <div className="text-sm">
                          <span className="font-medium text-muted-foreground">Impact: </span>
                          <span className="text-foreground">{action.impact}</span>
                        </div>
                        <div className="flex items-center gap-4 text-sm">
                          <div>
                            <span className="font-medium text-muted-foreground">Effort: </span>
                            <Badge variant="outline" className="text-xs">
                              {action.effort}
                            </Badge>
                          </div>
                          {action.expected_visibility_increase && (
                            <div>
                              <span className="font-medium text-muted-foreground">Expected Increase: </span>
                              <Badge variant="outline" className="text-xs text-success">
                                {action.expected_visibility_increase}
                              </Badge>
                            </div>
                          )}
                        </div>
                        {action.target_sources && action.target_sources.length > 0 && (
                          <div className="text-sm">
                            <span className="font-medium text-muted-foreground">Target Sources: </span>
                            <div className="flex flex-wrap gap-1 mt-1">
                              {action.target_sources.map((source, sourceIndex) => (
                                <Badge key={sourceIndex} variant="outline" className="text-xs">
                                  {source}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {analyticsData["Fold 5 - Recommended Actions"].visibility_forecast && (
                  <Card className="mt-6 border-border/50">
                    <CardHeader>
                      <CardTitle className="text-lg font-semibold">Visibility Forecast</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-foreground">
                            {analyticsData["Fold 5 - Recommended Actions"].visibility_forecast.current_score}
                          </div>
                          <div className="text-sm text-muted-foreground">Current Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-success">
                            {analyticsData["Fold 5 - Recommended Actions"].visibility_forecast.potential_score}
                          </div>
                          <div className="text-sm text-muted-foreground">Potential Score</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">
                            {analyticsData["Fold 5 - Recommended Actions"].visibility_forecast.timeline}
                          </div>
                          <div className="text-sm text-muted-foreground">Timeline</div>
                        </div>
                        <div className="text-center">
                          <div className="text-lg font-semibold text-foreground">
                            {analyticsData["Fold 5 - Recommended Actions"].visibility_forecast.confidence}
                          </div>
                          <div className="text-sm text-muted-foreground">Confidence</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}