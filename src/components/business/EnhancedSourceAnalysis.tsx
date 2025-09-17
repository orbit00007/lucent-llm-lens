import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, BarChart3 } from "lucide-react";
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

interface EnhancedSourceAnalysisProps {
  sources: SourceItem[];
}

export function EnhancedSourceAnalysis({ sources }: EnhancedSourceAnalysisProps) {
  const topSources = [...sources].sort((a, b) => b.frequency - a.frequency);

  const extractDomain = (url: string) => {
    try {
      return new URL(url).hostname.replace('www.', '');
    } catch {
      return url.replace('https://', '').replace('www.', '').split('/')[0];
    }
  };

  const getBarColor = (index: number) => {
    const colors = ['hsl(var(--chart-1))', 'hsl(var(--chart-2))', 'hsl(var(--chart-3))', 'hsl(var(--chart-4))', 'hsl(var(--chart-5))'];
    return colors[index % colors.length];
  };

  // Add data labels for the chart
  const chartData = topSources.map(source => ({
    ...source,
    domain: extractDomain(source.source),
    displayFrequency: source.frequency
  }));

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Fold 2 - Source Analysis</h2>
        <p className="text-muted-foreground">Source Intelligence Data - Citation frequency across all results</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Enhanced Chart with Data Labels */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Source Citation Frequency
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={320}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                <XAxis 
                  dataKey="domain" 
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip 
                  formatter={(value, name) => [value, 'Citations']}
                  labelFormatter={(label) => `Source: ${label}`}
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px'
                  }}
                />
                <Bar 
                  dataKey="frequency" 
                  radius={[4, 4, 0, 0]}
                  label={{ 
                    position: 'top', 
                    fontSize: 12, 
                    fill: 'hsl(var(--foreground))',
                    formatter: (value: number) => value
                  }}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={getBarColor(index)} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Enhanced Table */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary" />
              Detailed Source Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 px-2 font-semibold text-foreground">Source</th>
                    <th className="text-center py-3 px-2 font-semibold text-foreground">Citations</th>
                    <th className="text-center py-3 px-2 font-semibold text-foreground">Relevance</th>
                  </tr>
                </thead>
                <tbody>
                  {topSources.map((source, index) => (
                    <tr key={index} className="border-b border-border/50 hover:scale-[1.01] transition-transform duration-200">
                      <td className="py-3 px-2">
                        <div className="flex flex-col gap-1">
                          <span className="font-medium text-sm">{extractDomain(source.source)}</span>
                          <span className="text-xs text-muted-foreground truncate max-w-[150px]">
                            {source.source}
                          </span>
                        </div>
                      </td>
                      <td className="text-center py-3 px-2">
                        <Badge variant="secondary" className="font-mono text-sm px-3 py-1">
                          {source.frequency}
                        </Badge>
                      </td>
                      <td className="text-center py-3 px-2">
                        <div className="flex items-center justify-center">
                          <div className="w-12 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all"
                              style={{ width: `${(source.relevance_score / 10) * 100}%` }}
                            />
                          </div>
                          <span className="ml-2 text-xs font-mono">{source.relevance_score}</span>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}