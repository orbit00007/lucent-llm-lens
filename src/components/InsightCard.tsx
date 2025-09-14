import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Shield, Target, Zap, DollarSign, Users } from "lucide-react";
import { cn } from "@/lib/utils";

interface InsightCardProps {
  title: string;
  value: string;
  score?: number;
  trend: "up" | "down" | "stable" | "emerging";
  change?: string;
  description: string;
  icon: string;
  priority: "low" | "medium" | "high" | "critical";
  confidence?: number;
}

const iconMap = {
  performance: Target,
  competition: Users,
  privacy: Shield,
  ai: Zap,
  monetization: DollarSign,
} as const;

const trendConfig = {
  up: { icon: TrendingUp, color: "text-success", bg: "bg-success-light" },
  down: { icon: TrendingDown, color: "text-destructive", bg: "bg-destructive/10" },
  stable: { icon: Minus, color: "text-muted-foreground", bg: "bg-muted" },
  emerging: { icon: TrendingUp, color: "text-info", bg: "bg-info-light" },
};

const priorityConfig = {
  low: "bg-muted text-muted-foreground",
  medium: "bg-warning-light text-warning",
  high: "bg-info-light text-info",
  critical: "bg-destructive/10 text-destructive",
};

export function InsightCard({ 
  title, 
  value, 
  score, 
  trend, 
  change, 
  description, 
  icon, 
  priority, 
  confidence 
}: InsightCardProps) {
  const IconComponent = iconMap[icon as keyof typeof iconMap] || Target;
  const TrendIcon = trendConfig[trend].icon;

  return (
    <Card className="relative overflow-hidden transition-all duration-200 hover:shadow-medium border-0 bg-gradient-to-br from-card to-card/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="rounded-lg bg-primary/10 p-2">
              <IconComponent className="h-5 w-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {title}
              </CardTitle>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xl font-bold text-foreground">{value}</span>
                {score && (
                  <Badge variant="outline" className="text-xs">
                    {score}/100
                  </Badge>
                )}
              </div>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <Badge className={cn("text-xs", priorityConfig[priority])}>
              {priority}
            </Badge>
            <div className={cn(
              "flex items-center gap-1 rounded-full px-2 py-1 text-xs",
              trendConfig[trend].bg
            )}>
              <TrendIcon className={cn("h-3 w-3", trendConfig[trend].color)} />
              {change && (
                <span className={trendConfig[trend].color}>{change}</span>
              )}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>
        {confidence && (
          <div className="mt-3 flex items-center gap-2">
            <span className="text-xs text-muted-foreground">Confidence:</span>
            <div className="flex-1 bg-muted rounded-full h-1.5">
              <div 
                className="bg-primary rounded-full h-1.5 transition-all duration-300"
                style={{ width: `${confidence * 100}%` }}
              />
            </div>
            <span className="text-xs font-medium">{Math.round(confidence * 100)}%</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}