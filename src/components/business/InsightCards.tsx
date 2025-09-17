import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, 
  TrendingDown, 
  Minus, 
  Activity,
  Search,
  Shield,
  DollarSign,
  Bot,
  Users
} from "lucide-react";

interface InsightCard {
  title: string;
  value: string;
  trend?: string;
  description?: string;
  icon?: string;
}

interface InsightCardsProps {
  cards: InsightCard[];
}

export function InsightCards({ cards }: InsightCardsProps) {
  const getIcon = (title: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      "Market Performance": <Activity className="w-6 h-6" />,
      "Competition Level": <Users className="w-6 h-6" />,
      "Privacy Sentiment": <Shield className="w-6 h-6" />,
      "Monetization and Ad Pricing": <DollarSign className="w-6 h-6" />,
      "AI Features Availability": <Bot className="w-6 h-6" />,
    };
    return iconMap[title] || <Search className="w-6 h-6" />;
  };

  const getTrendIcon = (trend?: string) => {
    if (!trend) return <Minus className="w-4 h-4 text-muted-foreground" />;
    
    switch (trend.toLowerCase()) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-success" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-destructive" />;
      case 'stable':
        return <Minus className="w-4 h-4 text-warning" />;
      case 'emerging':
        return <TrendingUp className="w-4 h-4 text-primary" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  const getTrendColor = (trend?: string) => {
    switch (trend?.toLowerCase()) {
      case 'up':
        return 'bg-success-light text-success border-success/20';
      case 'down':
        return 'bg-destructive-light text-destructive border-destructive/20';
      case 'stable':
        return 'bg-warning-light text-warning border-warning/20';
      case 'emerging':
        return 'bg-primary/10 text-primary border-primary/20';
      default:
        return 'bg-muted text-muted-foreground border-border';
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Key Business Insights</h2>
        <p className="text-muted-foreground">Critical metrics and performance indicators from AI platform analysis</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <Card key={index} className="shadow-card hover:shadow-elevated transition-all duration-300 border-card-border bg-gradient-card group hover:scale-105">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                  {getIcon(card.title)}
                </div>
                <Badge className={`${getTrendColor(card.trend)} border`}>
                  <div className="flex items-center gap-1">
                    {getTrendIcon(card.trend)}
                    <span className="text-xs font-medium capitalize">{card.trend || 'Stable'}</span>
                  </div>
                </Badge>
              </div>
              <CardTitle className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                {card.title}
              </CardTitle>
            </CardHeader>
            
            <CardContent>
              <div className="mb-4">
                <div className="text-2xl font-bold text-foreground mb-1">{card.value}</div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {card.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}