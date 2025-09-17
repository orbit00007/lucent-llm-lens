import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Globe } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface SourceItem {
  source: string;
  frequency: number;
  relevance_score: number;
  url: string;
}

interface SourceAnalysisProps {
  sources: SourceItem[];
}

export function SourceAnalysis({ sources }: SourceAnalysisProps) {
  const topSources = [...sources].sort((a, b) => b.frequency - a.frequency);

  const getSentiment = (source: string): "positive" | "neutral" | "negative" => {
    if (source.includes("google.com")) return "positive";
    if (["duckduckgo", "bing", "yahoo"].some((s) => source.includes(s))) return "negative";
    return "neutral";
  };

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-success-light text-success border-success/20";
      case "negative":
        return "bg-destructive-light text-destructive border-destructive/20";
      default:
        return "bg-warning-light text-warning border-warning/20";
    }
  };

  const getBarColor = (index: number) => {
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    return colors[index % colors.length];
  };

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url.replace('https://', '').replace('www.', '').split('/')[0];
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Source Intelligence</h2>
        <p className="text-muted-foreground">Analysis of information sources and their authority across AI platforms</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Chart */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Source Frequency Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={topSources} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="source" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                  tickFormatter={(value) => extractDomain(value)}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [value, 'Appearance Count']}
                  labelFormatter={(label) => extractDomain(label)}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="frequency" radius={[4, 4, 0, 0]}>
                  {topSources.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Table */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle>Source Performance Matrix</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-foreground">Source</th>
                    <th className="text-center py-3 px-2 font-semibold text-foreground">Appearance Count</th>
                    <th className="text-center py-3 px-2 font-semibold text-foreground">Score</th>
                    <th className="text-center py-3 px-2 font-semibold text-foreground">Sentiment</th>
                  </tr>
                </thead>
                <tbody>
                  {topSources.map((source, index) => {
                    const sentiment = getSentiment(source.source);
                    return (
                      <tr key={index} className="border-b border-border/50 hover:scale-[1.01] transition-transform duration-200">
                        <td className="py-3 px-2">
                          <a 
                            href={source.url} 
                            target="_blank" 
                            rel="noreferrer"
                            className="flex items-center gap-2 text-primary hover:text-primary-dark transition-colors group"
                          >
                            <span className="truncate max-w-[180px]">{extractDomain(source.source)}</span>
                            <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                          </a>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge variant="secondary" className="font-mono text-xs">
                            {source.frequency}
                          </Badge>
                        </td>
                        <td className="text-center py-3 px-2">
                          <span className="font-mono text-sm">{source.relevance_score}</span>
                        </td>
                        <td className="text-center py-3 px-2">
                          <Badge className={`${getSentimentStyle(sentiment)} border text-xs`}>
                            {sentiment.charAt(0).toUpperCase() + sentiment.slice(1)}
                          </Badge>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
