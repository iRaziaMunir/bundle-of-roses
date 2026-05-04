import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDialog from "../../components/admin/AdminDialog";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminTableCard from "../../components/admin/AdminTableCard";
import {
  adjustAdminProductInventoryThunk,
  loadAdminProducts,
  resetMutationState,
  selectAdminProductsItems,
  selectAdminProductsMutationError,
  selectAdminProductsMutationStatus,
  selectAdminProductsStatus,
} from "../../redux/Slices/adminProductsSlice";

export default function AdminInventory() {
  const dispatch = useDispatch();

  const products = useSelector(selectAdminProductsItems);
  const listStatus = useSelector(selectAdminProductsStatus);

  const mutationStatus = useSelector(selectAdminProductsMutationStatus);
  const mutationError = useSelector(selectAdminProductsMutationError);

  const [formError, setFormError] = useState(null);
  const [successAlertOpen, setSuccessAlertOpen] = useState(false);

  const productOptions = useMemo(() => {
    return (products || [])
      .slice()
      .sort((a, b) => (a.title || "").localeCompare(b.title || ""))
      .map((p) => ({ id: p._id, title: p.title, status: p.status, quantity: p.quantity ?? 0 }));
  }, [products]);

  const [form, setForm] = useState({
    productId: "",
    type: "set", // set | increment | decrement
    value: "",
    reason: "",
    note: "",
  });

  const selectedProduct = useMemo(() => {
    return (products || []).find((p) => String(p._id) === String(form.productId)) || null;
  }, [products, form.productId]);

  useEffect(() => {
    dispatch(loadAdminProducts({}));
  }, [dispatch]);

  async function onAdjustSubmit(e) {
    e.preventDefault();
    setFormError(null);

    if (!form.productId) return setFormError("Pick a product.");

    const type = form.type;
    const raw = String(form.value ?? "").trim();
    if (!raw) return setFormError(type === "set" ? "Enter a quantity to set." : "Enter a quantity to adjust by.");

    const num = Number(raw);
    if (!Number.isFinite(num) || !Number.isInteger(num)) return setFormError("Value must be a whole number.");
    if (num < 0) return setFormError("Value must be 0 or greater.");
    if (type !== "set" && num === 0) return setFormError("Value must be greater than 0.");

    const payload =
      type === "set"
        ? { type, quantity: num, reason: form.reason, note: form.note }
        : { type, delta: num, reason: form.reason, note: form.note };

    try {
      await dispatch(adjustAdminProductInventoryThunk({ productId: form.productId, payload })).unwrap();
      setSuccessAlertOpen(true);
      dispatch(resetMutationState());
      setForm((prev) => ({ ...prev, value: "", reason: "", note: "" }));
    } catch {
      // handled by mutationError
    }
  }

  const rows = (products || []).map((p) => {
    const qty = p.quantity ?? 0;
    const statusLabel = p.status === "active" ? "Active" : p.status === "draft" ? "Draft" : "Archived";
    const stockLabel = qty <= 0 ? "Out" : qty <= 5 ? "Low" : "Healthy";

    return {
      id: p._id,
      product: p.title,
      quantity: qty,
      stock: stockLabel,
      status: statusLabel,
      actions: (
        <button
          type="button"
          className="rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-3 py-1 text-xs font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
          onClick={() => setForm((prev) => ({ ...prev, productId: String(p._id) }))}
        >
          Adjust
        </button>
      ),
    };
  });

  return (
    <div className="grid gap-6">
      <AdminDialog
        open={successAlertOpen}
        title="Inventory updated"
        message="Stock was adjusted successfully."
        confirmText="OK"
        onConfirm={() => setSuccessAlertOpen(false)}
      />

      <AdminSectionHeader
        eyebrow="Stock Control"
        title="Inventory"
        description="Monitor product stock levels and adjust quantities as needed."
      />

      <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
        <AdminTableCard
          title="Inventory"
          description="Product-level stock. Use Adjust to set or change quantity."
          columns={[
            { key: "product", label: "Product" },
            { key: "quantity", label: "Quantity" },
            { key: "stock", label: "Stock", type: "status" },
            { key: "status", label: "Status", type: "status" },
            { key: "actions", label: "Actions" },
          ]}
          rows={rows}
        />

        <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <h3 className="text-xl font-semibold tracking-tight text-[#1d1a1a]">Adjust stock</h3>
          <p className="mt-1 text-sm text-gray-500">Pick a product and apply a stock change.</p>

          {listStatus === "loading" ? <p className="mt-4 text-sm text-gray-500">Loading products…</p> : null}

          {selectedProduct ? (
            <div className="mt-4 rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] p-4 text-sm text-gray-700">
              <p className="font-medium text-[#1d1a1a]">{selectedProduct.title}</p>
              <div className="mt-2 grid grid-cols-2 gap-3 text-xs text-gray-600">
                <div>
                  <p className="uppercase tracking-[0.24em] text-gray-400">Current quantity</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">{selectedProduct.quantity ?? 0}</p>
                </div>
                <div>
                  <p className="uppercase tracking-[0.24em] text-gray-400">Status</p>
                  <p className="mt-1 text-sm font-medium text-gray-800">{selectedProduct.status}</p>
                </div>
              </div>
            </div>
          ) : null}

          {formError ? <p className="mt-4 text-sm font-medium text-[#8b4259]">{formError}</p> : null}
          {mutationStatus === "failed" && mutationError ? (
            <p className="mt-2 text-sm font-medium text-[#8b4259]">{mutationError}</p>
          ) : null}

          <form className="mt-5 grid gap-4" onSubmit={onAdjustSubmit}>
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Product</label>
              <select
                value={form.productId}
                onChange={(e) => setForm((prev) => ({ ...prev, productId: e.target.value }))}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              >
                <option value="">Select a product</option>
                {productOptions.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Adjustment</label>
                <select
                  value={form.type}
                  onChange={(e) => setForm((prev) => ({ ...prev, type: e.target.value, value: "" }))}
                  className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
                >
                  <option value="set">Set quantity</option>
                  <option value="increment">Increase by</option>
                  <option value="decrement">Decrease by</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-xs uppercase tracking-[0.24em] text-gray-400">
                  {form.type === "set" ? "Quantity" : "Delta"}
                </label>
                <input
                  inputMode="numeric"
                  value={form.value}
                  onChange={(e) => setForm((prev) => ({ ...prev, value: e.target.value }))}
                  placeholder={form.type === "set" ? "e.g. 20" : "e.g. 5"}
                  className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
                />
              </div>
            </div>

            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Reason (optional)</label>
              <input
                value={form.reason}
                onChange={(e) => setForm((prev) => ({ ...prev, reason: e.target.value }))}
                placeholder="e.g. stock count, damaged, restock"
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              />
            </div>

            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Note (optional)</label>
              <textarea
                value={form.note}
                onChange={(e) => setForm((prev) => ({ ...prev, note: e.target.value }))}
                rows={3}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={mutationStatus === "loading"}
              className="rounded-full bg-[#1e1d22] px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)] disabled:opacity-60"
            >
              {mutationStatus === "loading" ? "Updating…" : "Apply adjustment"}
            </button>
          </form>
        </section>
      </section>
    </div>
  );
}
