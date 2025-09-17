import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export function CompetitorAnalysis() {
  return (
    <section className="mb-12">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-foreground mb-2">Fold 3 - Competitor Analysis</h2>
        <p className="text-muted-foreground">Brand performance comparison and competitive positioning</p>
      </div>

      <Card className="shadow-card border-card-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-warning" />
            Data Limitation Notice
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-12">
            <div className="bg-muted/30 border border-border rounded-lg p-8">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Competitor Analysis Cannot Be Generated
              </h3>
              <p className="text-muted-foreground mb-4">
                This section requires competitor brand data including:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1 max-w-md mx-auto text-left">
                <li>• Brand names and competitor identification</li>
                <li>• Keywords/prompts associated with each brand</li>
                <li>• Visibility count per competitor</li>
                <li>• Brand sentiment comparison metrics</li>
              </ul>
              <p className="text-xs text-muted-foreground mt-4 italic">
                "This thing can't be made from the mock data"
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}