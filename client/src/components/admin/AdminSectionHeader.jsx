export default function AdminSectionHeader({ eyebrow, title, description, actionLabel, onAction }) {
  return (
    <div className="flex flex-col gap-5 rounded-[28px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)] md:flex-row md:items-center md:justify-between">
      <div className="max-w-3xl">
        {eyebrow ? <p className="text-[11px] uppercase tracking-[0.35em] text-[#8f7f7f]">{eyebrow}</p> : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#1d1a1a] md:text-[2rem]">{title}</h2>
        {description ? <p className="mt-2 text-sm leading-6 text-gray-600 md:text-[15px]">{description}</p> : null}
      </div>

      {actionLabel ? (
        <button
          type="button"
          onClick={onAction}
          className="rounded-full bg-[#1e1d22] px-6 py-3 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)] transition hover:-translate-y-0.5"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
