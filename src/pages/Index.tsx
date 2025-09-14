import { ProfessionalAnalytics } from "@/components/ProfessionalAnalytics";
import originalData from "@/data/enhanced-analytics.json";

export default function Index() {
  return <ProfessionalAnalytics data={originalData as any} />;
}