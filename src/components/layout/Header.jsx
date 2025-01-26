import { Link } from 'react-router-dom';
import { useCart } from '../../stores/cartStore';
import logoImage from '../../assets/images/logo.png';

export default function Header() {
  const cartCount = useCart(state => state.items.length);

  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold">
            <img 
              src={logoImage}
              alt="Knitting With Calm Logo" 
              className="h-8"
            />
          </Link>
          
          <div className="hidden md:flex space-x-6">
            <Link to="/bundles" className="text-gray-700 hover:text-gray-900">Bundles</Link>
            <Link to="/tutorials" className="text-gray-700 hover:text-gray-900">Tutorials</Link>
            <Link to="/blog" className="text-gray-700 hover:text-gray-900">Blog</Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link to="/cart" className="text-gray-700 hover:text-gray-900">
              Cart ({cartCount})
            </Link>
            <Link to="/account" className="text-gray-700 hover:text-gray-900">
              Account
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}