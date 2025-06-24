
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import AuthBtn from "@/components/auth/auth-btn";

const Header = () => {

  return (
    <header className="sticky top-0 z-50 w-full glassmorphic">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.png" alt="NeuroVerse" className="size-14 rounded-full" />
          <span className="font-orbitron text-2xl font-bold holographic-text">
            NeuroVerse
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/">Home</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/marketplace">Marketplace</Link>
          </Button>
        </nav>
        <nav className="flex items-center gap-4">
          <Button variant="ghost" asChild>
            <Link to="/deploy">Deploy Your Agent</Link>
          </Button>
          <AuthBtn />
        </nav>
      </div>
    </header>
  );
};

export default Header;
