import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, BookOpen, HelpCircle, PieChart, Settings, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Dashboard', href: '/', icon: Clock },
  { name: 'Students', href: '/students', icon: Users },
  { name: 'Chapter', href: '/chapter', icon: BookOpen },
  { name: 'Help', href: '/help', icon: HelpCircle },
  { name: 'Reports', href: '/reports', icon: PieChart },
  { name: 'Settings', href: '/settings', icon: Settings },
];

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        className="lg:hidden fixed top-4 left-4 z-50"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-5 w-5" />
      </Button>
      <div className={cn(
        "fixed inset-y-0 left-0 z-40 w-[240px] transform transition-transform duration-200 ease-in-out lg:relative lg:transform-none",
        isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        "flex h-full flex-col border-r bg-gray-50/40"
      )}>
        <div className="p-6">
          <img src="/logo.svg" alt="Quyl" className="h-8" />
        </div>
        <nav className="flex-1 space-y-1 px-3">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100',
                location.pathname === item.href && 'bg-gray-100 text-gray-900'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}