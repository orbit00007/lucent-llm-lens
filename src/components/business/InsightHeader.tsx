import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Activity } from "lucide-react";

interface InsightHeaderProps {
  id: string;
  type: string;
  status: string;
  createdAt?: string;
  updatedAt?: string;
}

export function InsightHeader({ id, type, status, createdAt, updatedAt }: InsightHeaderProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return dateString;
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-gradient-hero text-white rounded-2xl p-8 shadow-floating mb-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-4xl font-bold mb-2">AI Visibility Analysis</h1>
            <p className="text-white/90 text-lg">Comprehensive Brand Intelligence Report</p>
          </div>
          <Badge 
            variant={status === 'completed' ? 'default' : 'secondary'}
            className="px-4 py-2 text-sm font-semibold bg-white/20 text-white border-white/30"
          >
            <Activity className="w-4 h-4 mr-2" />
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center text-white/80 mb-1">
              <Clock className="w-4 h-4 mr-2" />
              Analysis ID
            </div>
            <div className="font-mono text-white font-medium">{id}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center text-white/80 mb-1">
              <Calendar className="w-4 h-4 mr-2" />
              Created
            </div>
            <div className="font-medium text-white">{formatDate(createdAt)}</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20">
            <div className="flex items-center text-white/80 mb-1">
              <Activity className="w-4 h-4 mr-2" />
              Type
            </div>
            <div className="font-medium text-white capitalize">{type} Analysis</div>
          </div>
        </div>
      </div>
    </div>
  );
}