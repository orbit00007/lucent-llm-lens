import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="max-w-md mx-auto text-center p-8">
        <div className="mb-8">
          <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-6xl font-bold text-foreground mb-4">404</h1>
          <h2 className="text-2xl font-semibold text-foreground mb-2">Page Not Found</h2>
          <p className="text-muted-foreground mb-8">
            The analytics page you're looking for doesn't exist or has been moved.
          </p>
        </div>
        
        <Button 
          onClick={() => window.location.href = "/"} 
          className="bg-gradient-primary hover:opacity-90 text-white font-semibold px-6 py-3 shadow-primary"
        >
          <Home className="w-4 h-4 mr-2" />
          Return to Analytics Dashboard
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
