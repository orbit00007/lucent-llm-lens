import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Target, TrendingUp, AlertTriangle, CheckCircle2, Clock } from "lucide-react";

interface RecommendedAction {
  category: string;
  priority: string;
  action: string;
  impact?: string;
  effort?: string;
}

interface EnhancedRecommendationsProps {
  actions: RecommendedAction[];
}

export function EnhancedRecommendations({ actions }: EnhancedRecommendationsProps) {
  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "high":
        return <AlertTriangle className="w-4 h-4 text-destructive" />;
      case "medium":
        return <Clock className="w-4 h-4 text-warning" />;
      default:
        return <CheckCircle2 className="w-4 h-4 text-success" />;
    }
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-destructive-light text-destructive border-destructive/20";
      case "medium":
        return "bg-warning-light text-warning border-warning/20";
      default:
        return "bg-success-light text-success border-success/20";
    }
  };

  const getEffortStyle = (effort: string) => {
    switch (effort) {
      case "high":
        return "bg-destructive-light text-destructive border-destructive/20";
      case "medium":
        return "bg-warning-light text-warning border-warning/20";
      default:
        return "bg-success-light text-success border-success/20";
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Fold 5 - Recommendations</h2>
        <p className="text-muted-foreground">Strategic actions to improve AI search visibility and brand performance</p>
      </div>

      <div className="grid gap-6">
        {actions.map((action, index) => (
          <Card key={index} className="shadow-card border-card-border hover:shadow-card-hover transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between gap-4">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Target className="w-5 h-5 text-primary" />
                  {action.category}
                </CardTitle>
                <div className="flex items-center gap-2 flex-shrink-0">
                  {getPriorityIcon(action.priority)}
                  <Badge className={`${getPriorityStyle(action.priority)} border text-xs font-semibold`}>
                    {action.priority.charAt(0).toUpperCase() + action.priority.slice(1)} Priority
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-foreground leading-relaxed">{action.action}</p>
                
                {(action.impact || action.effort) && (
                  <div className="flex flex-wrap gap-4 pt-2 border-t border-border">
                    {action.impact && (
                      <div className="flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-success" />
                        <span className="text-sm text-muted-foreground">Impact:</span>
                        <span className="text-sm font-medium">{action.impact}</span>
                      </div>
                    )}
                    
                    {action.effort && (
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm text-muted-foreground">Effort:</span>
                        <Badge className={`${getEffortStyle(action.effort)} border text-xs`}>
                          {action.effort.charAt(0).toUpperCase() + action.effort.slice(1)}
                        </Badge>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-muted/30 border border-border rounded-lg">
        <p className="text-sm text-muted-foreground text-center">
          <span className="font-semibold">Note:</span> All recommendations are tied back to improving AI search visibility 
          and not focused on general product improvements or customer acquisition features.
        </p>
      </div>
    </section>
  );
}