import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Eye, MessageSquare } from "lucide-react";

interface InsightCard {
  title: string;
  value: string;
  trend?: string;
  description?: string;
}

interface SourceItem {
  source: string;
  frequency: number;
  relevance_score: number;
  url: string;
}

interface OverallInsightsProps {
  insightCards: InsightCard[];
  sources: SourceItem[];
}

export function OverallInsights({ insightCards, sources }: OverallInsightsProps) {
  // Derive AI Visibility from Market Performance
  const marketPerformance = insightCards.find(card => card.title === "Market Performance");
  const aiVisibility = marketPerformance?.value === "Dominant" ? "High" : 
                      marketPerformance?.value === "Strong" ? "Medium" : "Low";

  // Derive Sentiment from Privacy Sentiment
  const privacySentiment = insightCards.find(card => card.title === "Privacy Sentiment");
  const overallSentiment = privacySentiment?.value.includes("Concerns") ? "Negative" : 
                          privacySentiment?.value.includes("Positive") ? "Positive" : "Neutral";

  // Derive Brand Mentions from total source frequency
  const totalMentions = sources.reduce((sum, source) => sum + source.frequency, 0);
  const brandMentions = totalMentions > 50 ? "High" : totalMentions > 20 ? "Medium" : "Low";

  const getVisibilityColor = (level: string) => {
    switch (level) {
      case "High": return "text-success border-success/20 bg-success-light";
      case "Medium": return "text-warning border-warning/20 bg-warning-light";
      default: return "text-destructive border-destructive/20 bg-destructive-light";
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case "Positive": return "text-success border-success/20 bg-success-light";
      case "Neutral": return "text-warning border-warning/20 bg-warning-light";
      default: return "text-destructive border-destructive/20 bg-destructive-light";
    }
  };

  const getMentionsColor = (level: string) => {
    switch (level) {
      case "High": return "text-success border-success/20 bg-success-light";
      case "Medium": return "text-warning border-warning/20 bg-warning-light";
      default: return "text-destructive border-destructive/20 bg-destructive-light";
    }
  };

  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Fold 1 - Overall Insights</h2>
        <p className="text-muted-foreground">Key performance indicators derived from available data</p>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        <Card className="shadow-card border-card-border hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <Eye className="w-5 h-5 text-primary" />
              AI Visibility
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Badge className={`${getVisibilityColor(aiVisibility)} border text-sm font-semibold px-3 py-1`}>
                {aiVisibility}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Based on market performance: {marketPerformance?.value}
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card-border hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <MessageSquare className="w-5 h-5 text-primary" />
              Sentiment
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Badge className={`${getSentimentColor(overallSentiment)} border text-sm font-semibold px-3 py-1`}>
                {overallSentiment}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Based on privacy sentiment analysis
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="shadow-card border-card-border hover:scale-105 transition-transform duration-200 cursor-pointer">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 text-lg">
              <TrendingUp className="w-5 h-5 text-primary" />
              Brand Mentions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-3">
              <Badge className={`${getMentionsColor(brandMentions)} border text-sm font-semibold px-3 py-1`}>
                {brandMentions}
              </Badge>
              <p className="text-xs text-muted-foreground">
                Total mentions across sources: {totalMentions}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}