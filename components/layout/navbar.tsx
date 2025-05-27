'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Sparkles, Sun, Moon, Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        isScrolled 
          ? 'bg-background/80 backdrop-blur-md shadow-sm py-3' 
          : 'bg-transparent py-5'
      )}
    >
      <div className="container mx-auto px-4">
        <nav className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Sparkles className="h-6 w-6 text-primary mr-2" />
            <span className="font-bold text-xl">GlowAnalysis</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLink href="/" active={pathname === '/'}>Home</NavLink>
            <NavLink href="/features" active={pathname === '/features'}>Features</NavLink>
            <NavLink href="/pricing" active={pathname === '/pricing'}>Pricing</NavLink>
            <NavLink href="/about" active={pathname === '/about'}>About</NavLink>
            <NavLink href="/contact" active={pathname === '/contact'}>Contact</NavLink>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Link href="/login">
              <Button variant="outline" className="rounded-full">Sign In</Button>
            </Link>
            <Link href="/register">
              <Button className="rounded-full">Sign Up</Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex flex-col space-y-4">
              <MobileNavLink href="/" active={pathname === '/'} onClick={() => setIsMobileMenuOpen(false)}>
                Home
              </MobileNavLink>
              <MobileNavLink href="/features" active={pathname === '/features'} onClick={() => setIsMobileMenuOpen(false)}>
                Features
              </MobileNavLink>
              <MobileNavLink href="/pricing" active={pathname === '/pricing'} onClick={() => setIsMobileMenuOpen(false)}>
                Pricing
              </MobileNavLink>
              <MobileNavLink href="/about" active={pathname === '/about'} onClick={() => setIsMobileMenuOpen(false)}>
                About
              </MobileNavLink>
              <MobileNavLink href="/contact" active={pathname === '/contact'} onClick={() => setIsMobileMenuOpen(false)}>
                Contact
              </MobileNavLink>
              <div className="pt-2 flex flex-col space-y-2">
                <Link href="/login">
                  <Button variant="outline" className="w-full rounded-full">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button className="w-full rounded-full">Sign Up</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

function NavLink({ href, active, children }: { href: string; active: boolean; children: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className={cn(
        'px-4 py-2 rounded-full text-sm font-medium transition-colors',
        active 
          ? 'text-primary' 
          : 'text-foreground/70 hover:text-foreground hover:bg-secondary'
      )}
    >
      {children}
    </Link>
  );
}

function MobileNavLink({ 
  href, 
  active, 
  onClick, 
  children 
}: { 
  href: string; 
  active: boolean; 
  onClick: () => void; 
  children: React.ReactNode 
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-lg text-base font-medium transition-colors',
        active 
          ? 'text-primary bg-secondary' 
          : 'text-foreground/70 hover:text-foreground hover:bg-secondary/50'
      )}
    >
      {children}
    </Link>
  );
}