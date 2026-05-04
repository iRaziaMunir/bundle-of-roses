import {
  Bell,
  Boxes,
  LayoutDashboard,
  PackageSearch,
  Search,
  ShoppingCart,
  SwatchBook,
  Users,
} from "lucide-react";
import { NavLink, Outlet } from "react-router";

const navItems = [
  { to: "/admin", label: "Overview", end: true, icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Boxes },
  { to: "/admin/collections", label: "Collections", icon: SwatchBook },
  { to: "/admin/inventory", label: "Inventory", icon: PackageSearch },
  { to: "/admin/orders", label: "Orders", icon: ShoppingCart },
  { to: "/admin/customers", label: "Customers", icon: Users },
];

function navClassName({ isActive }) {
  return [
    "group flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-200",
    isActive
      ? "bg-[#f7e6ea] text-[#1e1e1e] shadow-[0_12px_26px_rgba(66,20,35,0.12)]"
      : "text-white/70 hover:bg-white/8 hover:text-white",
  ].join(" ");
}

export default function AdminShell() {
  return (
    <div className="min-h-screen bg-[#f7f4f4] text-black">
      <div className="mx-auto max-w-[1500px] p-3 md:p-5">
        <div className="grid min-h-[calc(100vh-24px)] overflow-hidden rounded-[34px] border border-[#eadfdf] bg-[#fcfaf8] shadow-[0_30px_80px_rgba(42,26,26,0.10)] lg:grid-cols-[260px_minmax(0,1fr)]">
          <aside className="bg-[#1e1d22] px-5 py-6 text-white">
            <div className="rounded-[28px] bg-[radial-gradient(circle_at_top,_rgba(255,214,224,0.35),_transparent_55%),linear-gradient(180deg,#2b2930_0%,#1e1d22_100%)] p-5">
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-[linear-gradient(180deg,#ffdbe4_0%,#f3b8c8_100%)] text-3xl font-semibold text-[#4e2636] shadow-[0_14px_30px_rgba(0,0,0,0.22)]">
                BR
              </div>
              <h2 className="mt-5 text-2xl font-semibold">Bundle Of Roses</h2>
              <p className="mt-2 border-b border-white/10 pb-4 text-sm leading-6 text-white/65">
                Admin control center for catalog, orders, inventory, and customer operations.
              </p>
            </div>

            <nav className="mt-6 grid gap-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink key={item.to} to={item.to} end={item.end} className={navClassName}>
                    <span className="flex items-center gap-3">
                      <Icon size={18} className="opacity-85" />
                      <span>{item.label}</span>
                    </span>
                    <span className="text-xs text-inherit/60">•</span>
                  </NavLink>
                );
              })}
            </nav>

            {/* <div className="mt-8 rounded-[24px] border border-white/10 bg-white/6 p-4">
              <p className="text-[11px] uppercase tracking-[0.3em] text-white/45">Brand mood</p>
              <p className="mt-3 text-sm leading-6 text-white/70">
                Soft blush, cream backgrounds, and charcoal accents to stay visually aligned with the storefront.
              </p>
            </div> */}
          </aside>

          <section className="min-w-0 bg-[linear-gradient(180deg,#f9f5f2_0%,#f6f1ee_100%)]">
            <div className="border-b border-[#eadfdf] bg-white/65 px-5 py-4 backdrop-blur md:px-8">
              <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7f7f]">Dashboard</p>
                  <h1 className="mt-1 text-3xl font-semibold tracking-tight text-[#1d1a1a]">Welcome back, Admin</h1>
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <div className="flex items-center gap-3 rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm text-gray-500 shadow-sm sm:min-w-[320px]">
                    <Search size={18} className="text-gray-400" />
                    <input
                      readOnly
                      value="Search products, orders, customers..."
                      className="w-full bg-transparent outline-none placeholder:text-gray-400"
                    />
                  </div>
                  <button className="flex h-12 w-12 items-center justify-center rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] text-[#1e1d22] shadow-sm">
                    <Bell size={18} />
                  </button>
                </div>
              </div>
            </div>

            <main className="min-w-0 p-5 md:p-8">
              <Outlet />
            </main>
          </section>
        </div>
      </div>
    </div>
  );
}
