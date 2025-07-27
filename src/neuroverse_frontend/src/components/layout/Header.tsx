import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import AuthBtn from "@/components/auth/auth-btn";
import Navigation from "./Navigation";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const isMobile = useIsMobile();
  return (
    <header className="sticky top-0 z-50 w-full bg-black/50 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <span className="font-orbitron text-xl font-bold holographic-text">
            NeuroVerse
          </span>
        </Link>
        <Navigation />
        {!isMobile && (
          <nav className="flex items-center gap-4">
            <Button variant="ghost" asChild>
              <Link to="/deploy">Deploy Your Agent</Link>
            </Button>
            <AuthBtn />
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;
