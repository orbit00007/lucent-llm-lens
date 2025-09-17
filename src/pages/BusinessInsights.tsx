import { InsightHeader } from "@/components/business/InsightHeader";
import { OverallInsights } from "@/components/business/OverallInsights";
import { EnhancedSourceAnalysis } from "@/components/business/EnhancedSourceAnalysis";
import { CompetitorAnalysis } from "@/components/business/CompetitorAnalysis";
import { ContentImpact } from "@/components/business/ContentImpact";
import { EnhancedRecommendations } from "@/components/business/EnhancedRecommendations";
import analyticsData from "@/data/mockInsights.json";

// Types
interface InsightCard {
  title: string;
  value: string;
  trend?: string;
  description?: string;
  icon?: string;
}

interface RecommendedAction {
  category: string;
  priority: string;
  action: string;
  impact?: string;
  effort?: string;
}

interface DrilldownQuery {
  query: string;
  performance_score?: number;
  search_volume?: string;
  competition?: string;
}

interface SourceItem {
  source: string;
  frequency: number;
  relevance_score: number;
  url: string;
}

interface AttributeItem {
  attribute: string;
  value: string;
  frequency: number;
  importance: string;
}

interface Drilldowns {
  query_explorer: DrilldownQuery[];
  sources_list: SourceItem[];
  attributes_matrix: AttributeItem[];
}

interface Analytics {
  insight_cards: InsightCard[];
  recommended_actions: RecommendedAction[];
  drilldowns: Drilldowns;
}

interface AnalyticsData {
  id: string;
  type: string;
  status: string;
  analytics: Analytics;
  created_at?: string;
  updated_at?: string;
}

const BusinessInsights = () => {
  const data = analyticsData as AnalyticsData;
  
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation Bar */}
      <nav className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">AI</span>
              </div>
              <span className="font-bold text-xl text-foreground">Brand Intelligence</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Professional Analytics Suite
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <InsightHeader
          id={data.id}
          type={data.type}
          status={data.status}
          createdAt={data.created_at}
          updatedAt={data.updated_at}
        />

        {/* Fold 1 - Overall Insights */}
        <OverallInsights 
          insightCards={data.analytics.insight_cards}
          sources={data.analytics.drilldowns.sources_list}
        />

        {/* Fold 2 - Source Analysis */}
        <EnhancedSourceAnalysis sources={data.analytics.drilldowns.sources_list} />

        {/* Fold 3 - Competitor Analysis */}
        <CompetitorAnalysis />

        {/* Fold 4 - Content Impact */}
        <ContentImpact attributes={data.analytics.drilldowns.attributes_matrix} />

        {/* Fold 5 - Recommendations */}
        <EnhancedRecommendations actions={data.analytics.recommended_actions} />
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-card/50 mt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-gradient-primary rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-xs">AI</span>
              </div>
              <span className="text-sm text-muted-foreground">
                AI Brand Intelligence Platform • Professional Analytics Suite
              </span>
            </div>
            <div className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} Business Insights Analytics
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default BusinessInsights;