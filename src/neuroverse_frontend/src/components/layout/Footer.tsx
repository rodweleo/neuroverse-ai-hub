
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Cpu, Mail, Send } from 'lucide-react';
import { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter submission
    console.log('Newsletter signup:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-br from-black via-purple-950/20 to-blue-950/20 border-t border-neon-blue/20">
      {/* Cosmic background effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-neon-blue/5 via-neon-purple/5 to-acid-green/5"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,rgba(0,240,255,0.1),transparent_50%)] opacity-50"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(155,93,229,0.1),transparent_50%)] opacity-50"></div>

      <div className="container relative z-10 py-16">
        {/* Newsletter Section */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-orbitron font-bold holographic-text mb-4">
            Receive transmissions
          </h2>
          <p className="text-muted-foreground mb-8">
            Unsubscribe at any time. <Link to="/privacy" className="text-neon-blue hover:underline">Privacy policy</Link>
          </p>
          <form onSubmit={handleNewsletterSubmit} className="flex max-w-md mx-auto gap-2">
            <div className="relative flex-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-black/30 border-neon-blue/30 focus:border-neon-blue text-white placeholder:text-muted-foreground"
                required
              />
            </div>
            <Button type="submit" className="bg-neon-blue/80 hover:bg-neon-blue text-black">
              <Send className="h-4 w-4" />
            </Button>
          </form>
        </div>

        {/* Footer Links */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 mb-6">
              <Cpu className="h-8 w-8 text-neon-blue animate-pulse" />
              <span className="font-orbitron text-xl font-bold holographic-text">
                NeuroVerse
              </span>
            </Link>
          </div>

          {/* Products & Solutions */}
          <div>
            <h3 className="font-semibold text-white mb-4">Products & Solutions</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/marketplace" className="hover:text-neon-blue transition-colors">AI Marketplace</Link></li>
              <li><Link to="/deploy" className="hover:text-neon-blue transition-colors">Agent Deployment</Link></li>
              <li><Link to="/dashboard" className="hover:text-neon-blue transition-colors">Analytics Dashboard</Link></li>
            </ul>
          </div>

          {/* Community
          <div>
            <h3 className="font-semibold text-white mb-4">Community</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/ecosystem" className="hover:text-neon-blue transition-colors">Ecosystem</Link></li>
              <li><Link to="/grants" className="hover:text-neon-blue transition-colors">Grants Program</Link></li>
              <li><Link to="/events" className="hover:text-neon-blue transition-colors">Events</Link></li>
              <li><Link to="/blog" className="hover:text-neon-blue transition-colors">Blog</Link></li>
              <li><Link to="/press" className="hover:text-neon-blue transition-colors">Press Kit</Link></li>
            </ul>
          </div> */}
        </div>

        {/* Bottom Section */}
        <div className="text-sm text-muted-foreground text-center border-t border-neon-blue/20 pt-8 py-4">
          <p>NeuroVerse is a decentralized AI marketplace built on ICP blockchain.</p>
        </div>
      </div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1 h-1 bg-neon-blue rounded-full animate-pulse opacity-60"></div>
        <div className="absolute top-3/4 right-1/3 w-1 h-1 bg-neon-purple rounded-full animate-pulse opacity-40 animation-delay-1000"></div>
        <div className="absolute bottom-1/3 left-2/3 w-1 h-1 bg-acid-green rounded-full animate-pulse opacity-50 animation-delay-2000"></div>
      </div>
    </footer>
  );
};

export default Footer;
