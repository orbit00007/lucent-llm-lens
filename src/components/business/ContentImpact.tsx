import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp } from "lucide-react";

interface AttributeItem {
  attribute: string;
  value: string;
  frequency: number;
  importance: string;
}

interface ContentImpactProps {
  attributes: AttributeItem[];
}

export function ContentImpact({ attributes }: ContentImpactProps) {
  const getImportanceBadge = (importance: string) => {
    switch (importance) {
      case 'high':
        return <Badge variant="destructive" className="text-xs">High</Badge>;
      case 'medium':
        return <Badge variant="secondary" className="text-xs">Medium</Badge>;
      case 'low':
        return <Badge variant="outline" className="text-xs">Low</Badge>;
      default:
        return <Badge variant="outline" className="text-xs">Unknown</Badge>;
    }
  };

  const getFrequencyColor = (frequency: number) => {
    if (frequency >= 10) return "text-green-600";
    if (frequency >= 7) return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Fold 4 - Content Impact</h2>
        <p className="text-muted-foreground">Attributes matrix analysis and brand visibility insights</p>
      </div>

      <Card className="shadow-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5 text-primary" />
            Attributes Matrix
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Attribute</th>
                  <th className="text-left py-3 px-4 font-semibold text-foreground">Value</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Frequency</th>
                  <th className="text-center py-3 px-4 font-semibold text-foreground">Importance</th>
                </tr>
              </thead>
              <tbody>
                {attributes.map((attr, index) => (
                  <tr key={index} className="border-b border-border/50 hover:scale-[1.01] transition-transform duration-200">
                    <td className="py-3 px-4">
                      <div className="font-medium text-foreground">{attr.attribute}</div>
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-muted-foreground text-sm max-w-xs">
                        {attr.value}
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      <div className="flex items-center justify-center gap-1">
                        <TrendingUp className={`w-4 h-4 ${getFrequencyColor(attr.frequency)}`} />
                        <span className={`font-medium ${getFrequencyColor(attr.frequency)}`}>
                          {attr.frequency}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-center">
                      {getImportanceBadge(attr.importance)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 p-4 bg-muted/20 border border-border rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <div className="font-semibold text-foreground mb-1">High Priority Attributes</div>
                <div className="text-muted-foreground">
                  {attributes.filter(attr => attr.importance === 'high').length} attributes
                </div>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Average Frequency</div>
                <div className="text-muted-foreground">
                  {Math.round(attributes.reduce((sum, attr) => sum + attr.frequency, 0) / attributes.length)} mentions
                </div>
              </div>
              <div>
                <div className="font-semibold text-foreground mb-1">Top Attribute</div>
                <div className="text-muted-foreground">
                  {attributes.reduce((top, attr) => attr.frequency > top.frequency ? attr : top, attributes[0])?.attribute}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}