import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

const PageLoader = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const prevPathRef = useRef(location.pathname);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (location.pathname !== prevPathRef.current) {
      prevPathRef.current = location.pathname;
      setLoading(true);
      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => setLoading(false), 2000);
    }
  }, [location.pathname]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-12 h-12">
            <div className="absolute inset-0 rounded-full border-4 border-muted" />
            <div className="absolute inset-0 rounded-full border-4 border-t-primary animate-spin" />
          </div>
          <p className="text-sm text-muted-foreground font-medium animate-pulse">
            Carregando...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageLoader;
