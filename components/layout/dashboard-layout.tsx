'use client';

import { ReactNode } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { 
  Sparkles, 
  Home, 
  Camera, 
  CreditCard, 
  FileText, 
  Settings, 
  LogOut,
  Menu,
  X
} from 'lucide-react';
import { useState } from 'react';
import { 
  Sheet,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const pathname = usePathname();
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'Upload Photo', href: '/upload', icon: Camera },
    { name: 'Payment', href: '/payment', icon: CreditCard },
    { name: 'Results', href: '/pdf', icon: FileText },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mobile Header */}
      <header className="md:hidden border-b border-border px-4 py-3 flex items-center justify-between bg-background">
        <Link href="/dashboard" className="flex items-center">
          <Sparkles className="h-5 w-5 text-primary mr-2" />
          <span className="font-bold">GlowAnalysis</span>
        </Link>
        
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>
          
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[250px]">
              <div className="flex flex-col h-full">
                <div className="flex items-center py-4">
                  <Sparkles className="h-5 w-5 text-primary mr-2" />
                  <span className="font-bold">GlowAnalysis</span>
                </div>
                
                <nav className="flex-1 space-y-1 mt-4">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        "flex items-center px-3 py-3 text-sm font-medium rounded-md",
                        pathname === item.href
                          ? "bg-primary/10 text-primary"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                      onClick={() => setOpen(false)}
                    >
                      <item.icon className="h-5 w-5 mr-3" />
                      {item.name}
                    </Link>
                  ))}
                </nav>
                
                <div className="py-4">
                  <Button 
                    variant="outline" 
                    className="w-full justify-start"
                    onClick={handleSignOut}
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    Sign Out
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <aside className="hidden md:flex md:w-64 md:flex-col border-r border-border bg-card">
          <div className="flex-1 flex flex-col min-h-0">
            <div className="flex items-center h-16 px-4 border-b border-border">
              <Link href="/dashboard" className="flex items-center">
                <Sparkles className="h-6 w-6 text-primary mr-2" />
                <span className="font-bold text-xl">GlowAnalysis</span>
              </Link>
            </div>
            <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
              <nav className="flex-1 px-3 space-y-2">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={cn(
                      "flex items-center px-3 py-3 text-sm font-medium rounded-md",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <item.icon className="h-5 w-5 mr-3" />
                    {item.name}
                  </Link>
                ))}
              </nav>
            </div>
            <div className="p-4 border-t border-border">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-medium">Theme</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                </Button>
              </div>
              <Button 
                variant="outline" 
                className="w-full justify-start"
                onClick={handleSignOut}
              >
                <LogOut className="h-5 w-5 mr-2" />
                Sign Out
              </Button>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}