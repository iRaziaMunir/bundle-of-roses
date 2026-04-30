function statusClass(value = "") {
  const normalized = value.toLowerCase();
  if (["active", "paid", "healthy", "processing"].includes(normalized)) {
    return "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100";
  }
  if (["pending", "draft", "low", "unfulfilled"].includes(normalized)) {
    return "bg-amber-50 text-amber-700 ring-1 ring-amber-100";
  }
  if (["hidden", "disabled", "out", "shipped"].includes(normalized)) {
    return "bg-slate-100 text-slate-700 ring-1 ring-slate-200";
  }
  return "bg-rose-50 text-rose-700 ring-1 ring-rose-100";
}

export default function AdminTableCard({ title, description, columns, rows }) {
  return (
    <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
      <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
        <div>
          <h3 className="text-xl font-semibold tracking-tight md:text-2xl">{title}</h3>
          {description ? <p className="mt-1 text-sm leading-6 text-gray-500">{description}</p> : null}
        </div>
        <div className="text-xs uppercase tracking-[0.24em] text-gray-400">{rows.length} records</div>
      </div>

      <div className="overflow-x-auto rounded-[24px] border border-[#efe5e5] bg-[#fcfaf8]">
        <table className="min-w-full divide-y divide-black/5">
          <thead>
            <tr className="bg-[#f7f1ee]">
              {columns.map((column) => (
                <th key={column.key} className="px-4 py-4 text-left text-[11px] font-semibold uppercase tracking-[0.24em] text-gray-500">
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-black/5">
            {rows.map((row) => (
              <tr key={row.id} className="transition hover:bg-[#fdf8f5]">
                {columns.map((column) => {
                  const value = row[column.key];
                  const isStatus = column.type === "status";

                  return (
                    <td key={column.key} className="px-4 py-4 text-sm text-gray-700">
                      {isStatus ? (
                        <span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${statusClass(String(value))}`}>{value}</span>
                      ) : (
                        <span className="font-medium text-gray-700">{value}</span>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
