import { useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Menu,
  Minus,
  Plus,
  Search,
  ShoppingBag,
  User,
  X,
} from "lucide-react";
import { Link } from "react-router";
import SearchOverlay from "./SearchOverlay";
import useSearchResults from "../../hooks/useSearchResults";
import {
  collectionsMobileSections,
  flowersMobileSections,
  mothersDayMobileLinks,
  navLinks,
  searchCollections,
  searchableProducts,
  searchSuggestions,
} from "../../data/navigationData";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeMenu, setActiveMenu] = useState(null);
  const [mobileView, setMobileView] = useState("root");
  const [expandedMobileSections, setExpandedMobileSections] = useState({
    size: false,
    color: false,
    occasion: false,
    specialty: false,
    seasonal: false,
  });
  const closeMenuTimeout = useRef(null);
  const FLOWERS_MENU = "flowers";
  const MOTHERS_DAY_MENU = "mothers-day";

  const searchState = useSearchResults({
    query: searchQuery,
    suggestions: searchSuggestions,
    collections: searchCollections,
    products: searchableProducts,
  });

  const getLinkLabel = (link) => (typeof link === "string" ? link : link.label);
  const getLinkTo = (link) => (typeof link === "string" ? "/" : link.to);

  const closeMobileMenu = () => {
    setIsOpen(false);
    setMobileView("root");
    setExpandedMobileSections({
      size: false,
      color: false,
      occasion: false,
      specialty: false,
      seasonal: false,
    });
  };

  const openSearch = () => {
    setIsOpen(false);
    setMobileView("root");
    setIsSearchOpen(true);
  };

  const closeSearch = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
  };

  const toggleMobileSection = (sectionKey) => {
    setExpandedMobileSections((prev) => ({
      ...prev,
      [sectionKey]: !prev[sectionKey],
    }));
  };

  useEffect(() => {
    if (!isOpen && !isSearchOpen) return;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen, isSearchOpen]);

  useEffect(() => {
    if (!isSearchOpen) return;
    const onEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [isSearchOpen]);

  const openMenu = (menuName) => {
    if (closeMenuTimeout.current) {
      clearTimeout(closeMenuTimeout.current);
      closeMenuTimeout.current = null;
    }
    setActiveMenu(menuName);
  };

  const scheduleMenuClose = () => {
    if (closeMenuTimeout.current) clearTimeout(closeMenuTimeout.current);
    closeMenuTimeout.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <header className="w-full lg:border-b border-gray-200 bg-[#f7f4f4] sticky top-0 z-50">
      <div className="max-w-[1400px] mx-auto px-4 lg:px-8">

        {/* Top Bar */}
        <div className="flex items-center justify-between h-16">

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button onClick={() => (isOpen ? closeMobileMenu() : setIsOpen(true))}>
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="min-w-0 flex-1 lg:flex-none text-center lg:text-left">
            <div className="text-sm sm:text-base lg:text-xl tracking-widest font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
              THE MILLION ROSES<sup>"</sup>
            </div>
          </div>

          {/* Desktop Menu */}
          <div className="hidden lg:block">
            <nav className="flex space-x-8 text-sm tracking-widest">
              {navLinks.map((link, index) => (
                <div
                  key={index}
                  className="relative"
                  onMouseEnter={() => {
                    const linkLabel = getLinkLabel(link);
                    if (linkLabel === "Flowers") openMenu(FLOWERS_MENU);
                    else if (linkLabel === "Mother's Day") openMenu(MOTHERS_DAY_MENU);
                    else openMenu(linkLabel);
                  }}
                  onMouseLeave={
                    getLinkLabel(link) === "Flowers" || getLinkLabel(link) === "Mother's Day"
                      ? scheduleMenuClose
                      : undefined
                  }
                >
                  <Link
                    to={getLinkTo(link)}
                    className={`border-b-2 pb-1 transition-colors ${
                      activeMenu ===
                      (getLinkLabel(link) === "Flowers"
                        ? FLOWERS_MENU
                        : getLinkLabel(link) === "Mother's Day"
                          ? MOTHERS_DAY_MENU
                          : getLinkLabel(link))
                        ? "border-black text-black"
                        : "border-transparent hover:border-black hover:text-black"
                    }`}
                  >
                    {getLinkLabel(link)}
                  </Link>

                  {getLinkLabel(link) === "Mother's Day" && activeMenu === MOTHERS_DAY_MENU && (
                    <div
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-auto min-w-[220px] bg-[#f7f4f4] border border-gray-200 shadow-md z-40"
                      onMouseEnter={() => openMenu(MOTHERS_DAY_MENU)}
                      onMouseLeave={scheduleMenuClose}
                    >
                      <div className="py-5 px-2">
                        <ul className="space-y-3 text-gray-600">
                          {mothersDayMobileLinks.map((item) => (
                            <li key={item.label}>
                              <Link to={item.to} className="hover:text-black transition-colors">
                                {item.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {activeMenu === FLOWERS_MENU && (
              <div
                className="fixed top-16 left-0 right-0 bg-[#f7f4f4] border-t border-gray-200 shadow-md z-40"
                onMouseEnter={() => openMenu(FLOWERS_MENU)}
                onMouseLeave={scheduleMenuClose}
              >
                <div className="max-w-[1400px] mx-auto px-4 lg:px-8 py-12 grid grid-cols-4 gap-16">
                  {/* Column 1 */}
                  <div>
                    <h4 className="text-xs tracking-widest mb-4">SHOP BY SIZE</h4>
                    <ul className="space-y-3 text-gray-600">
                      {flowersMobileSections[0].links.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to} className="hover:text-black transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 2 */}
                  <div>
                    <h4 className="text-xs tracking-widest mb-4">SHOP BY COLOR</h4>
                    <ul className="space-y-3 text-gray-600">
                      {flowersMobileSections[1].links.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to} className="hover:text-black transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Column 3 */}
                  <div>
                    <h4 className="text-xs tracking-widest mb-4">SHOP BY OCCASION</h4>
                    <ul className="space-y-3 text-gray-600">
                      {flowersMobileSections[2].links.map((item) => (
                        <li key={item.label}>
                          <Link to={item.to} className="hover:text-black transition-colors">
                            {item.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Image Section */}
                  <div className="text-center">
                    <img
                      src="https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=800"
                      alt="Baby Hearts"
                      className="w-full h-[260px] object-cover mb-4"
                    />
                    <h4 className="tracking-widest text-sm">BABY HEARTS</h4>
                    <p className="text-xs text-gray-500 mt-2">
                      SMALL IN SIZE, BIG IN SENTIMENT.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Right Icons */}
          <div className="flex items-center space-x-4">
            <User size={20} className="hidden lg:block cursor-pointer" />
            <button aria-label="Open search" onClick={openSearch}>
              <Search size={20} className="cursor-pointer" />
            </button>
            <ShoppingBag size={20} className="cursor-pointer" />
          </div>
        </div>

        {/* Mobile Sidebar */}
        <div
          className={`lg:hidden fixed inset-0 z-[60] transition-opacity duration-300 ${
            isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
          }`}
        >
          <button
            aria-label="Close mobile menu overlay"
            className="absolute inset-0 bg-black/55"
            onClick={closeMobileMenu}
          />

          <div
            className={`relative h-full w-[88%] max-w-[560px] bg-[#f7f4f4] overflow-y-auto transition-transform duration-300 ${
              isOpen ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            <div className="px-8 py-8">
              <button
                aria-label="Close mobile menu"
                className="mb-10"
                onClick={closeMobileMenu}
              >
                <X size={30} className="stroke-[1.5]" />
              </button>

              {mobileView === "root" ? (
                <div className="text-[23px] tracking-[0.35em] uppercase">
                  {navLinks.map((link, index) => {
                    const submenuMap = {
                      Flowers: "flowers",
                      Collections: "collections",
                      "Mother's Day": "mothers-day",
                    };
                    const linkLabel = getLinkLabel(link);
                    const subMenuKey = submenuMap[linkLabel];
                    return (
                      <div key={index} className="border-b border-gray-300 py-8">
                        {subMenuKey ? (
                          <button
                            className="w-full flex items-center justify-between"
                            onClick={() => setMobileView(subMenuKey)}
                          >
                            <span>{linkLabel}</span>
                            <ChevronRight size={24} className="stroke-[1.5]" />
                          </button>
                        ) : (
                          <Link
                            to={getLinkTo(link)}
                            className="block w-full"
                            onClick={closeMobileMenu}
                          >
                            {linkLabel}
                          </Link>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div>
                  <button
                    className="mb-6 inline-flex items-center gap-3 text-[23px] tracking-[0.35em] uppercase text-gray-600"
                    onClick={() => setMobileView("root")}
                  >
                    <ChevronLeft size={22} className="stroke-[1.5]" />
                    <span>
                      {mobileView === "flowers"
                        ? "Flowers"
                        : mobileView === "collections"
                          ? "Collections"
                          : "Mother's Day"}
                    </span>
                  </button>

                  {mobileView === "mothers-day" ? (
                    <div className="border-t border-gray-300">
                      {mothersDayMobileLinks.map((item) => (
                        <Link
                          key={item.label}
                          to={item.to}
                          onClick={closeMobileMenu}
                          className="block border-b border-gray-300 py-10 text-[23px] tracking-[0.3em] uppercase"
                        >
                          {item.label}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div>
                      <div className="space-y-0">
                        {(mobileView === "collections"
                          ? collectionsMobileSections
                          : flowersMobileSections
                        ).map((section) => (
                          <div key={section.key} className="border-t border-gray-300">
                            <button
                              className="w-full flex items-center justify-between py-8 text-[23px] tracking-[0.3em] uppercase"
                              onClick={() => toggleMobileSection(section.key)}
                            >
                              <span>{section.title}</span>
                              {expandedMobileSections[section.key] ? (
                                <Minus size={22} className="stroke-[1.5]" />
                              ) : (
                                <Plus size={22} className="stroke-[1.5]" />
                              )}
                            </button>

                            {expandedMobileSections[section.key] && (
                              <ul className="mb-8 ml-6 border-l border-gray-300 pl-8 space-y-4 text-[20px]">
                                {section.links.map((item) => (
                                  <li key={item.label}>
                                    <Link to={item.to} onClick={closeMobileMenu}>
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8">
                        <img
                          src={
                            mobileView === "collections"
                              ? "https://images.unsplash.com/photo-1616844868137-7ffaf43c2d88?q=80&w=900"
                              : "https://images.unsplash.com/photo-1591886960571-74d43a9d4166?q=80&w=900"
                          }
                          alt={
                            mobileView === "collections"
                              ? "Collections preview"
                              : "Flowers collection"
                          }
                          className="w-full h-auto object-cover"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

      </div>

      <SearchOverlay
        isOpen={isSearchOpen}
        query={searchQuery}
        onQueryChange={setSearchQuery}
        onClose={closeSearch}
        searchState={searchState}
      />
    </header>
  );
};

export default Navbar;