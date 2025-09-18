import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Logo } from '../ui/Logo';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Главная', href: '/' },
  { name: 'Услуги', href: '/services' },
  { name: 'Кейсы', href: '/cases' },
  { name: 'О нас', href: '/about' },
  { name: 'Контакты', href: '/contacts' },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      {/* Top Bar */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Phone className="h-3 w-3" />
                <span>+7(903)335-45-35</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-3 w-3" />
                <span>specalp@ya.ru</span>
              </div>
            </div>
            <div className="hidden md:block">
              <span className="font-intro text-xs uppercase tracking-wide">
                ...Extend the Life of Metal...
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Logo variant="light" size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-primary',
                  isActive(item.href)
                    ? 'text-primary font-semibold'
                    : 'text-foreground/80'
                )}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button asChild className="font-intro">
              <Link to="/contacts">Получить консультацию</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    isActive(item.href)
                      ? 'text-primary font-semibold'
                      : 'text-foreground/80'
                  )}
                >
                  {item.name}
                </Link>
              ))}
              <Button asChild className="mt-4 font-intro">
                <Link to="/contacts" onClick={() => setMobileMenuOpen(false)}>
                  Получить консультацию
                </Link>
              </Button>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}