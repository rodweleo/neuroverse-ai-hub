
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAuthModal from '@/hooks/use-auth-modal';
import { useAuth } from '@/contexts/use-auth-client';

const Header = () => {
  const authModal = useAuthModal()
  const { principal, isAuthenticated } = useAuth()
  console.log(isAuthenticated)

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
            <Link to="/agents">My Agents</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/dashboard">Dashboard</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/deploy">Deploy Agent</Link>
          </Button>
          <Button className="bg-neon-purple/80 text-white hover:bg-neon-purple font-bold"
            onClick={() => authModal.setOpen(true)}
          >
            Connect / Create Wallet
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
