import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-[#1c1c1c] text-sm text-gray-200">
      
      <div className="max-w-[1400px] mx-auto px-6 lg:px-16 py-16">

        {/* TOP SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">

          <div className="space-y-4">
            <h3 className="font-semibold uppercase tracking-wider">The Million Roses</h3>

            <p className="text-xs leading-relaxed text-white">
              Naturally preserved, radiant roses that last at least three years
              of beautiful memories.
            </p>
          </div>

          {/* Shop */}
          <div className="space-y-3">
            <h3 className="font-semibold uppercase tracking-wider">Shop</h3>

            <ul className="space-y-2">
              <li><Link to="#">Best Sellers</Link></li>
              <li><Link to="#">One in a Million</Link></li>
              <li><Link to="#">Single Rose Collection</Link></li>
              <li><Link to="#">Acrylic Collection</Link></li>
              <li><Link to="#">Crystal Collection</Link></li>
              <li><Link to="#">Square Collection</Link></li>
            </ul>
          </div>

          {/* Useful */}
          <div className="space-y-3">
            <h3 className="font-semibold uppercase tracking-wider">Useful</h3>

            <ul className="space-y-2">
              <li><Link to="#">Loyalty Program</Link></li>
              <li><Link to="#">Our Story</Link></li>
              <li><Link to="#">Blog</Link></li>
              <li><Link to="#">For Influencers</Link></li>
              <li><Link to="#">Delivery & Shipping</Link></li>
              <li><Link to="#">FAQ</Link></li>
              <li><Link to="#">Contact</Link></li>
              <li><Link to="#">Sitemap</Link></li>
            </ul>
          </div>

          {/* Customer Care */}
          <div className="space-y-3">
            <h3 className="font-semibold uppercase tracking-wider">Customer Care</h3>

            <p>
              Write us:{" "}
              <a href="mailto:help@themillionroses.com" className="underline">
                help@themillionroses.com
              </a>
            </p>

            <p>
              Call or text us:{" "}
              <a href="tel:4248003600" className="underline">
                424.800.3600
              </a>
            </p>

            <p className="underline cursor-pointer">WhatsApp us</p>
          </div>

          {/* Address */}
          <div className="space-y-3">
            <h3 className="font-semibold uppercase tracking-wider">Address</h3>

            <p>
              TMR USA Inc.
              <br />
              2914 Leonis Blvd
              <br />
              Vernon California 90058
              <br />
              United States
            </p>
          </div>
        </div>

        {/* BOTTOM SECTION */}
        <div className="mt-16 flex flex-col lg:flex-row justify-between items-center gap-6 border-t pt-6">

          {/* Left */}
          <p className="text-xs text-white">
            © 2026 - The Million Roses
          </p>

          {/* Right */}
          <div className="flex items-center gap-6 text-xs">
            <span>United States</span>
            <span>United States (USD $)</span>
            <span>English</span>
          </div>
        </div>

      </div>
    </footer>
  );
}