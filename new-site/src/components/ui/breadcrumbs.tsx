import { ChevronRight, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface BreadcrumbItem {
  name: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className={cn('flex items-center space-x-1 text-sm text-muted-foreground', className)}>
      <Link 
        to="/" 
        className="flex items-center hover:text-foreground transition-colors"
        aria-label="Главная"
      >
        <Home className="h-4 w-4" />
      </Link>
      
      {items.map((item, index) => (
        <div key={index} className="flex items-center space-x-1">
          <ChevronRight className="h-4 w-4" />
          {item.href && index < items.length - 1 ? (
            <Link 
              to={item.href}
              className="hover:text-foreground transition-colors"
            >
              {item.name}
            </Link>
          ) : (
            <span className="text-foreground font-medium" aria-current="page">
              {item.name}
            </span>
          )}
        </div>
      ))}
    </nav>
  );
}