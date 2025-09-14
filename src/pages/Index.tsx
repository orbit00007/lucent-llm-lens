import { useState, useEffect } from "react";
import { AnalyticsResults } from "@/components/AnalyticsResults";
import analyticsData from "@/data/enhanced-analytics.json";

const Index = () => {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    // Simulate loading the analytics data
    setData(analyticsData);
  }, []);

  if (!data) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  return <AnalyticsResults data={data} />;
};

export default Index;
