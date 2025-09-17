import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock,
  TrendingUp,
  Users,
  Shield,
  DollarSign,
  FileText
} from "lucide-react";

interface RecommendedAction {
  category: string;
  priority: string;
  action: string;
  impact?: string;
  effort?: string;
}

interface ActionRecommendationsProps {
  actions: RecommendedAction[];
}

export function ActionRecommendations({ actions }: ActionRecommendationsProps) {
  const getCategoryIcon = (category: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Privacy and Trust": <Shield className="w-5 h-5" />,
      "Product and Feature Adoption": <TrendingUp className="w-5 h-5" />,
      "Ads and Monetization": <DollarSign className="w-5 h-5" />,
      "Support and Documentation": <FileText className="w-5 h-5" />,
      "SEO and Content": <Users className="w-5 h-5" />,
    };
    return iconMap[category] || <CheckCircle2 className="w-5 h-5" />;
  };

  const getPriorityStyle = (priority: string) => {
    switch (priority.toLowerCase()) {
      case 'high':
        return {
          badge: 'bg-destructive-light text-destructive border-destructive/20',
          icon: <AlertTriangle className="w-4 h-4" />,
          card: 'border-l-4 border-l-destructive bg-destructive-light/30'
        };
      case 'medium':
        return {
          badge: 'bg-warning-light text-warning border-warning/20',
          icon: <Clock className="w-4 h-4" />,
          card: 'border-l-4 border-l-warning bg-warning-light/30'
        };
      case 'low':
        return {
          badge: 'bg-success-light text-success border-success/20',
          icon: <CheckCircle2 className="w-4 h-4" />,
          card: 'border-l-4 border-l-success bg-success-light/30'
        };
      default:
        return {
          badge: 'bg-muted text-muted-foreground border-border',
          icon: <CheckCircle2 className="w-4 h-4" />,
          card: 'border-l-4 border-l-muted'
        };
    }
  };

  const getEffortStyle = (effort?: string) => {
    switch (effort?.toLowerCase()) {
      case 'high':
        return 'bg-destructive/10 text-destructive';
      case 'medium':
        return 'bg-warning/10 text-warning';
      case 'low':
        return 'bg-success/10 text-success';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Strategic Recommendations</h2>
        <p className="text-muted-foreground">Actionable insights to improve AI platform visibility and performance</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {actions.map((action, index) => {
          const priorityStyle = getPriorityStyle(action.priority);
          
          return (
            <Card 
              key={index} 
              className={`shadow-card hover:shadow-elevated transition-all duration-300 border-card-border group ${priorityStyle.card}`}
            >
              <CardHeader className="pb-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                      {getCategoryIcon(action.category)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-foreground">
                        {action.category}
                      </CardTitle>
                    </div>
                  </div>
                  <Badge className={`${priorityStyle.badge} border flex items-center gap-1`}>
                    {priorityStyle.icon}
                    <span className="text-xs font-semibold capitalize">{action.priority}</span>
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-foreground leading-relaxed font-medium">
                  {action.action}
                </p>
                
                {action.impact && (
                  <div className="space-y-2">
                    <div className="text-sm">
                      <span className="font-semibold text-foreground">Expected Impact:</span>
                      <p className="text-muted-foreground mt-1">{action.impact}</p>
                    </div>
                  </div>
                )}
                
                {action.effort && (
                  <div className="flex items-center justify-between pt-2 border-t border-border/50">
                    <span className="text-sm font-medium text-muted-foreground">Implementation Effort</span>
                    <Badge className={`${getEffortStyle(action.effort)} text-xs font-medium capitalize`}>
                      {action.effort}
                    </Badge>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}