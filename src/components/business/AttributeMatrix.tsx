import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BarChart3, Target } from "lucide-react";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer
} from "recharts";

interface AttributeItem {
  attribute: string;
  value: string;
  frequency: number;
  importance: string;
}

interface AttributeMatrixProps {
  attributes: AttributeItem[];
}

export function AttributeMatrix({ attributes }: AttributeMatrixProps) {
  const getSentiment = (value: string): "positive" | "neutral" | "negative" => {
    const v = value.toLowerCase();
    if (v.includes("high") || v.includes("fast") || v.includes("extensive") || v.includes("advanced")) {
      return "positive";
    }
    if (v.includes("complex") || v.includes("concerns") || v.includes("limited") || v.includes("emerging")) {
      return "negative";
    }
    return "neutral";
  };

  const getSentimentStyle = (sentiment: string) => {
    switch (sentiment) {
      case "positive":
        return "bg-success-light text-success border-success/20";
      case "negative":
        return "bg-warning-light text-warning border-warning/20";
      default:
        return "bg-muted text-muted-foreground border-border";
    }
  };

  const getImportanceStyle = (importance: string) => {
    switch (importance.toLowerCase()) {
      case 'high':
        return "bg-destructive-light text-destructive border-destructive/20";
      case 'medium':
        return "bg-warning-light text-warning border-warning/20";
      default:
        return "bg-success-light text-success border-success/20";
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Brand Attribute Analysis</h2>
        <p className="text-muted-foreground">Key attributes and their perception across AI platforms</p>
      </div>

      <div className="flex flex-col gap-8">
        {/* Radar Chart */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-primary" />
              Attribute Frequency Matrix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={attributes} margin={{ top: 20, right: 80, bottom: 20, left: 80 }}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis 
                  dataKey="attribute" 
                  tick={{ fontSize: 12, fill: 'hsl(var(--foreground))' }}
                  className="text-xs"
                />
                <PolarRadiusAxis 
                  angle={90} 
                  domain={[0, 'dataMax']} 
                  tick={{ fontSize: 10, fill: 'hsl(var(--muted-foreground))' }}
                />
                <Radar
                  name="Frequency"
                  dataKey="frequency"
                  stroke="hsl(var(--primary))"
                  fill="hsl(var(--primary))"
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Attribute List */}
        <Card className="shadow-card border-card-border">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              Detailed Attribute Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              {attributes.map((attr, index) => {
                const sentiment = getSentiment(attr.value);
                return (
                  <div 
                    key={index}
                    className="p-4 rounded-lg border border-border bg-gradient-card hover:shadow-card transition-all duration-200"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="font-semibold text-foreground text-sm">{attr.attribute}</h3>
                      <div className="flex gap-2 items-center">
                        <Badge className={`${getImportanceStyle(attr.importance)} text-xs border`}>
                          {attr.importance}
                        </Badge>
                        <Badge variant="secondary" className="text-xs font-mono flex items-center gap-1">
                          <span className="font-normal">Mentions:</span>
                          <span className="font-mono">{attr.frequency}</span>
                          <span className="inline-block h-1 bg-primary rounded-full" style={{ width: `${attr.frequency * 6}px` }}></span>
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground text-sm mb-3 italic leading-relaxed">
                      "{attr.value}"
                    </p>
                    
                    <div className="flex justify-between items-center">
                      <Badge className={`${getSentimentStyle(sentiment)} text-xs border`}>
                        {sentiment === 'positive' ? '✓ Positive' : sentiment === 'negative' ? '⚠ Needs Attention' : '● Neutral'}
                      </Badge>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
