import Link from 'next/link';
import { Facebook, Twitter, Instagram } from 'lucide-react';
import { Icons } from '@/components/icons';

export function Footer() {
  return (
    <footer className="bg-transparent backdrop-blur-sm border-t border-white/10 mt-16 shadow-[0_-5px_25px_-5px_rgba(0,0,0,0.5)]">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex items-center justify-center md:justify-start">
            <Icons.logo width={100} height={27} />
          </div>
          <div className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} Be On Trip. Todos los derechos reservados.
          </div>
          <div className="flex items-center justify-center md:justify-end space-x-6">
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Facebook className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary transition-colors">
              <Instagram className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
