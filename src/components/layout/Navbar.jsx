import { useState } from "react";
import { Menu, X, Search, ShoppingBag, User } from "lucide-react";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    "Home",
    "Flowers",
    "Collections",
    "Best Sellers",
    "Mother's Day",
  ];

  return (
    <header className="w-full lg:border-b border-gray-200 bg-[#f7f4f4] sticky top-0 z-50">
      <div className="max-w-8xl mx-auto px-4 lg:px-8">
        
        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">
          
          {/* Left - Mobile Menu */}
          <div className="lg:hidden">
            <button onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="text-xl tracking-widest font-semibold text-center lg:text-left flex-1 lg:flex-none">
            THE MILLION ROSES<sup>"</sup>
          </div>

          {/* Desktop Menu */}
          <nav className="hidden lg:flex space-x-8 text-sm tracking-widest">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="/"
                className="hover:text-gray-500 transition"
              >
                {link}
              </a>
            ))}
          </nav>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <User size={20} className="hidden lg:block cursor-pointer" />
            <Search size={20} className="cursor-pointer" />
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden overflow-hidden transition-all duration-300 ${
            isOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="flex flex-col space-y-5 text-sm">
            {navLinks.map((link, index) => (
              <a
                key={index}
                href="/"
                className="border-b border-gray-200 pb-4 hover:text-gray-500"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

      </div>
    </header>
  );
};

export default Navbar;