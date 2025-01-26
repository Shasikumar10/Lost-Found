import { Link } from 'react-router-dom';
import { Search, PlusCircle, User, Search as BookSearch } from 'lucide-react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';

export default function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <BookSearch className="w-8 h-8 text-blue-600" />
            <div>
              <div className="text-xl font-bold text-blue-600">KLH</div>
              <div className="text-xs text-gray-500 -mt-1">Lost and Found</div>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm">
              <Search className="w-4 h-4 mr-2" />
              Search
            </Button>

            {user ? (
              <>
                <Link to="/report">
                  <Button variant="primary" size="sm">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    Report Item
                  </Button>
                </Link>
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <Link to="/auth">
                <Button variant="primary" size="sm">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}