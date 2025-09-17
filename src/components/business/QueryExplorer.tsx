import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, BarChart2 } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from "recharts";

interface DrilldownQuery {
  query: string;
  performance_score?: number;
  search_volume?: string;
  competition?: string;
}

interface QueryExplorerProps {
  queries: DrilldownQuery[];
}

export function QueryExplorer({ queries }: QueryExplorerProps) {
  const getVolumeScore = (volume?: string) => {
    switch (volume?.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const getCompetitionScore = (competition?: string) => {
    switch (competition?.toLowerCase()) {
      case 'high': return 3;
      case 'medium': return 2;
      case 'low': return 1;
      default: return 0;
    }
  };

  const chartData = queries.map((query, index) => ({
    name: `Query ${index + 1}`,
    query: query.query,
    performance: query.performance_score || 0,
    competition: getCompetitionScore(query.competition),
    volume: getVolumeScore(query.search_volume),
    search_volume: query.search_volume,
    competition_level: query.competition
  }));

  const getVolumeStyle = (volume?: string) => {
    switch (volume?.toLowerCase()) {
      case 'high':
        return 'bg-success-light text-success border-success/20';
      case 'medium':
        return 'bg-warning-light text-warning border-warning/20';
      case 'low':
        return 'bg-muted text-muted-foreground border-border';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getCompetitionStyle = (competition?: string) => {
    switch (competition?.toLowerCase()) {
      case 'high':
        return 'bg-destructive-light text-destructive border-destructive/20';
      case 'medium':
        return 'bg-warning-light text-warning border-warning/20';
      case 'low':
        return 'bg-success-light text-success border-success/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 4) return 'hsl(var(--success))'; // Success green
    if (score >= 3) return 'hsl(var(--primary))'; // Primary blue
    if (score >= 1) return 'hsl(var(--warning))'; // Warning amber
    return 'hsl(var(--muted-foreground))'; // Muted gray
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Query Performance Analysis</h2>
        <p className="text-muted-foreground">Deep dive into search query performance and competitive landscape</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Bar Chart */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart2 className="w-5 h-5 text-primary" />
              Performance vs Competition Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={380}>
              <BarChart data={chartData} margin={{ top: 20, right: 30, bottom: 40, left: 20 }}>
                <XAxis 
                  dataKey="name"
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                />
                <YAxis 
                  domain={[0, 5]}
                  tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                  axisLine={{ stroke: 'hsl(var(--border))' }}
                  tickLine={{ stroke: 'hsl(var(--border))' }}
                  label={{ value: 'Performance Score', angle: -90, position: 'insideLeft' }}
                />
                <Tooltip 
                  cursor={{ fill: 'hsl(var(--muted) / 0.1)' }}
                  content={({ active, payload }) => {
                    if (active && payload && payload[0]) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-card border border-border rounded-lg p-4 shadow-floating max-w-xs">
                          <p className="font-semibold mb-2 text-sm text-foreground break-words">{data.query}</p>
                          <div className="space-y-1 text-xs text-muted-foreground">
                            <div className="flex justify-between gap-4">
                              <span>Performance:</span>
                              <span className="font-mono">{data.performance}/5</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>User Interest:</span>
                              <span className="font-mono">{data.search_volume}</span>
                            </div>
                            <div className="flex justify-between gap-4">
                              <span>Competition:</span>
                              <span className="font-mono">{data.competition_level}</span>
                            </div>
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar 
                  dataKey="performance" 
                  radius={[4, 4, 0, 0]}
                >
                  {chartData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={getPerformanceColor(entry.performance)}
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Query Table */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Search className="w-5 h-5 text-primary" />
              Query Performance Details
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-hidden rounded-lg border border-border">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-3 font-semibold text-sm text-foreground">Query</th>
                    <th className="text-center p-3 font-semibold text-sm text-foreground">Performance</th>
                    <th className="text-center p-3 font-semibold text-sm text-foreground">User Interest</th>
                    <th className="text-center p-3 font-semibold text-sm text-foreground">Competition</th>
                  </tr>
                </thead>
                <tbody>
                  {queries.map((query, index) => (
                    <tr 
                      key={index}
                      className="border-t border-border hover:scale-[1.01] transition-transform duration-200"
                    >
                      <td className="p-3 text-sm text-foreground leading-relaxed max-w-md">
                        {query.query}
                      </td>
                      <td className="p-3 text-center">
                        <Badge 
                          variant="secondary" 
                          className={`text-xs font-mono ${
                            (query.performance_score || 0) >= 4 ? 'bg-success-light text-success' :
                            (query.performance_score || 0) >= 3 ? 'bg-primary/10 text-primary' :
                            (query.performance_score || 0) >= 1 ? 'bg-warning-light text-warning' :
                            'bg-muted text-muted-foreground'
                          }`}
                        >
                          {query.performance_score || 0}/5
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={`${getVolumeStyle(query.search_volume)} text-xs border`}>
                          {query.search_volume || 'Unknown'}
                        </Badge>
                      </td>
                      <td className="p-3 text-center">
                        <Badge className={`${getCompetitionStyle(query.competition)} text-xs border`}>
                          {query.competition || 'Unknown'}
                        </Badge>
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
