import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminStatCard from "../../components/admin/AdminStatCard";
import AdminTableCard from "../../components/admin/AdminTableCard";
import { adminOrders, adminStats, recentAdminActivity } from "../../data/adminMockData";

export default function AdminDashboard() {
  return (
    <div className="grid gap-6">
      <AdminSectionHeader
        eyebrow="Operations"
        title="Store overview"
        description="Track live store performance, keep an eye on orders, and spot inventory issues before they affect the customer experience."
        actionLabel="Export Report"
      />

      <section className="grid gap-4 xl:grid-cols-[1.55fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          {adminStats.map((item) => (
            <AdminStatCard key={item.label} {...item} />
          ))}
        </div>

        <article className="rounded-[28px] border border-[#eadfdf] bg-white/90 p-5 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <div className="flex items-center justify-between">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7f7f]">Calendar</p>
            <p className="text-sm text-gray-500">Apr 2026</p>
          </div>
          <div className="mt-4 grid grid-cols-7 gap-2 text-center text-xs text-gray-500">
            {["S", "M", "T", "W", "T", "F", "S"].map((day) => (
              <div key={day} className="py-2">{day}</div>
            ))}
            {Array.from({ length: 30 }, (_, index) => {
              const day = index + 1;
              const highlighted = [6, 12, 18, 24, 28].includes(day);
              return (
                <div
                  key={day}
                  className={[
                    "rounded-2xl py-3 text-sm font-medium",
                    highlighted ? "bg-[#f7dce3] text-[#8b4259]" : "bg-[#faf6f2] text-[#5b5252]",
                  ].join(" ")}
                >
                  {day}
                </div>
              );
            })}
          </div>
        </article>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <div className="grid gap-6">
          <article className="rounded-[30px] border border-[#eadfdf] bg-[linear-gradient(135deg,#2f2730_0%,#4d3942_100%)] p-6 text-white shadow-[0_22px_55px_rgba(50,24,32,0.22)]">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-[0.35em] text-white/55">This week income</p>
                <h3 className="mt-3 text-4xl font-semibold">$ 1250</h3>
                <p className="mt-3 max-w-sm text-sm leading-6 text-white/70">
                  Revenue is trending upward thanks to stronger conversion on premium rose box categories.
                </p>
              </div>
              <button className="rounded-full bg-white/12 px-4 py-2 text-xs uppercase tracking-[0.22em] text-white/80 ring-1 ring-white/10">
                View Monthly
              </button>
            </div>

            <div className="mt-6 grid h-52 grid-cols-7 items-end gap-3 rounded-[24px] bg-white/6 p-4">
              {[30, 45, 36, 72, 40, 54, 28, 18, 32, 58, 64, 22, 40, 53, 10, 26, 44, 60, 38, 21, 49, 25, 35, 42, 30, 18, 28, 52].map(
                (value, index) => (
                  <div key={`${index}-${value}`} className="flex h-full items-end justify-center">
                    <div
                      className={
                        index % 3 === 0
                          ? "w-3 rounded-full bg-[#f3c6d4]"
                          : index % 3 === 1
                            ? "w-3 rounded-full bg-[#f6e7a8]"
                            : "w-3 rounded-full bg-[#d7b4be]"
                      }
                      style={{ height: `${value}%` }}
                    />
                  </div>
                )
              )}
            </div>
          </article>

          <AdminTableCard
            title="Recent orders"
            description="A quick operational view of the newest transactions."
            columns={[
              { key: "id", label: "Order" },
              { key: "customer", label: "Customer" },
              { key: "total", label: "Total" },
              { key: "payment", label: "Payment", type: "status" },
              { key: "fulfillment", label: "Fulfillment", type: "status" },
            ]}
            rows={adminOrders}
          />
        </div>

        <div className="grid gap-6">
          <article className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
            <p className="text-[11px] uppercase tracking-[0.32em] text-[#8f7f7f]">Priority</p>
            <h3 className="mt-3 text-2xl font-semibold tracking-tight text-[#1e1d22]">Restock low inventory</h3>
            <p className="mt-3 text-sm leading-6 text-gray-600">
              Classic Black Superdome Box and Supreme Black Box variants need attention before the next campaign goes live.
            </p>
            <button className="mt-5 rounded-full bg-[#1e1d22] px-4 py-2.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)]">
              Review Stock
            </button>
          </article>

          <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-xl font-semibold tracking-tight md:text-2xl">Recent activity</h3>
              <span className="text-xs uppercase tracking-[0.24em] text-gray-400">{recentAdminActivity.length} events</span>
            </div>
            <div className="mt-5 space-y-4">
              {recentAdminActivity.map((item) => (
                <article
                  key={item.id}
                  className="rounded-[24px] border border-[#f0e6e6] bg-[#fcf9f6] p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                >
                  <div className="flex items-center justify-between gap-3">
                    <h4 className="font-medium text-[#1e1d22]">{item.title}</h4>
                    <span className="text-[11px] uppercase tracking-[0.2em] text-gray-500">{item.time}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{item.detail}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
}
