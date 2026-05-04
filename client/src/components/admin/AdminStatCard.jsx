const toneMap = {
  emerald: "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100",
  blue: "bg-[#f3e9ed] text-[#8b4259] ring-1 ring-[#ead4db]",
  amber: "bg-amber-50 text-amber-700 ring-1 ring-amber-100",
  rose: "bg-[#f9dfe6] text-[#8b4259] ring-1 ring-[#f1ccd7]",
};

export default function AdminStatCard({ label, value, change, tone = "blue" }) {
  return (
    <article className="group rounded-[28px] border border-[#eadfdf] bg-white/90 p-5 shadow-[0_14px_35px_rgba(42,26,26,0.06)] transition duration-200 hover:-translate-y-1 hover:shadow-[0_20px_45px_rgba(42,26,26,0.1)]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium text-gray-500">{label}</p>
        <div className="h-10 w-10 rounded-2xl bg-[#f8f1ee] shadow-inner" />
      </div>
      <div className="mt-6 flex items-end justify-between gap-4">
        <h3 className="text-3xl font-semibold tracking-tight text-[#1e1d22] md:text-4xl">{value}</h3>
        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${toneMap[tone] || toneMap.blue}`}>{change}</span>
      </div>
    </article>
  );
}
