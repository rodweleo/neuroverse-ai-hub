
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import useAuthModal from '@/hooks/use-auth-modal';
import useAccountModal from '@/hooks/use-account-modal';
import { useAuth } from '@/contexts/use-auth-client';
import { CircleUserRound } from "lucide-react"

const Header = () => {
  const authModal = useAuthModal()
  const accountModal = useAccountModal()
  const { principal } = useAuth()

  const principalString = principal?.toString()

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
          {
            principal ? <Button className="bg-neon-purple/80 text-white hover:bg-neon-purple font-bold flex items-center gap-2" onClick={() => accountModal.setOpen(true)}>
              <CircleUserRound />
              <span>{principalString.slice(0, 8) + "..." + principalString.slice(principalString.length - 8, principalString.length)}</span>
            </Button>
              :
              <Button className="bg-neon-purple/80 text-white hover:bg-neon-purple font-bold"
                onClick={() => authModal.setOpen(true)}
              >
                Connect / Create Wallet
              </Button>
          }
        </nav>
      </div>
    </header>
  );
};

export default Header;
