import { ProfessionalAnalytics } from "@/components/ProfessionalAnalytics";
import analyticsData from "@/data/enhanced-analytics.json";

export default function Index() {
  return <ProfessionalAnalytics data={analyticsData as any} />;
}