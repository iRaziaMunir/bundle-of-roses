import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import {
  loadAdminCollections,
  selectAdminCollectionsItems,
  updateAdminCollectionThunk,
} from "../../redux/Slices/adminCollectionsSlice";
import { uploadAdminImage } from "../../api/apiClient";
import {
  createAdminProductThunk,
  loadAdminProducts,
  resetMutationState,
  selectAdminProductsError,
  selectAdminProductsFilters,
  selectAdminProductsItems,
  selectAdminProductsMutationError,
  selectAdminProductsMutationStatus,
  selectAdminProductsStatus,
  updateAdminProductThunk,
} from "../../redux/slices/adminProductsSlice";

const DEFAULT_CURRENCY = "USD";

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const ROSE_COLOR_OPTIONS = ["Red", "Black", "Pink", "White", "Light Pink", "Burgundy", "Purple", "Blue", "Yellow", "Orange","Gold"];
const BOX_COLOR_OPTIONS = ["Beige", "Black", "White", "Pink", "Gold", "Bordeaux"];

const emptyForm = () => ({
  title: "",
  slug: "",
  description: "",
  status: "active",
  collectionId: "",
  roseColor: "Red",
  boxColor: "Beige",
  priceAmount: "190",
  quantity: 10,
  productImage: null,
});

export default function AdminProductForm() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isEdit = Boolean(productId);

  const items = useSelector(selectAdminProductsItems);
  const listStatus = useSelector(selectAdminProductsStatus);
  const listError = useSelector(selectAdminProductsError);
  const filters = useSelector(selectAdminProductsFilters);
  const mutationStatus = useSelector(selectAdminProductsMutationStatus);
  const mutationError = useSelector(selectAdminProductsMutationError);
  const collections = useSelector(selectAdminCollectionsItems);

  const [formError, setFormError] = useState(null);
  const [imageUploading, setImageUploading] = useState(false);
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    dispatch(loadAdminProducts(isEdit ? {} : { status: filters.status || undefined }));
  }, [dispatch, isEdit, filters.status]);

  useEffect(() => {
    dispatch(loadAdminCollections());
  }, [dispatch]);

  useEffect(() => {
    if (!isEdit) {
      setForm(emptyForm());
      setFormError(null);
      setImageUploading(false);
      return;
    }

    if (listStatus !== "succeeded") return;

    const product = (items || []).find((p) => String(p._id) === String(productId));
    if (!product) {
      setFormError("Product not found.");
      return;
    }

    const existingUrl = Array.isArray(product.images) && product.images[0]?.url ? String(product.images[0].url) : null;
    setForm({
      title: product.title || "",
      slug: product.slug || "",
      description: product.description || "",
      status: product.status || "active",
      collectionId: "",
      roseColor: product.roseColor || "Red",
      boxColor: product.boxColor || "Beige",
      priceAmount: product.price?.amount != null ? String(product.price.amount) : "0",
      quantity: product.quantity ?? 0,
      productImage: existingUrl,
    });
    setFormError(null);
  }, [isEdit, productId, items, listStatus]);

  async function onSubmit(e) {
    e.preventDefault();
    setFormError(null);

    const title = form.title.trim();
    if (!title) return setFormError("Title is required.");

    const slugValue = form.slug.trim() ? slugify(form.slug) : slugify(title);
    if (!slugValue) return setFormError("Slug is required.");

    const imageUrl = form.productImage && String(form.productImage).trim();
    if (!imageUrl) return setFormError("Image is required. Choose an image file.");
    if (imageUploading) return;

    const rose = String(form.roseColor || "").trim();
    const box = String(form.boxColor || "").trim();
    if (!rose || !box) return setFormError("Rose color and box color are required.");

    const priceAmount = Number(form.priceAmount);
    const qty = Number(form.quantity);
    if (!Number.isFinite(priceAmount) || priceAmount < 0) return setFormError("Enter a valid price.");
    if (!Number.isFinite(qty) || qty < 0) return setFormError("Enter a valid stock quantity.");

    const payload = {
      title,
      slug: slugValue,
      description: form.description,
      status: form.status,
      images: [{ url: imageUrl, alt: title }],
      roseColor: rose,
      boxColor: box,
      price: { amount: priceAmount, currency: DEFAULT_CURRENCY },
      quantity: qty,
    };

    try {
      let savedProductId = isEdit ? productId : null;
      if (!isEdit) {
        const created = await dispatch(createAdminProductThunk(payload)).unwrap();
        savedProductId = created?._id;
      } else {
        await dispatch(updateAdminProductThunk({ id: productId, payload })).unwrap();
      }

      if (form.collectionId && savedProductId) {
        const target = (collections || []).find((c) => String(c._id) === String(form.collectionId));
        if (target) {
          const existingIds = Array.isArray(target.productIds) ? target.productIds.map(String) : [];
          const nextIds = existingIds.includes(String(savedProductId)) ? existingIds : [...existingIds, String(savedProductId)];
          await dispatch(updateAdminCollectionThunk({ id: target._id, payload: { productIds: nextIds } })).unwrap();
        }
      }

      dispatch(resetMutationState());
      dispatch(loadAdminProducts({ status: filters.status || undefined }));
      navigate("/admin/products");
    } catch (err) {
      const msg =
        (typeof err === "object" && err !== null && typeof err.payload === "string" && err.payload) ||
        (typeof err === "object" && err !== null && err.payload?.message) ||
        (typeof err === "string" ? err : err?.message) ||
        "Failed to save product.";
      setFormError(String(msg));
    }
  }

  function goBack() {
    navigate("/admin/products");
  }

  if (isEdit && listStatus === "loading") {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-[30px] border border-[#eadfdf] bg-white/90 p-8 text-center shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
        <p className="text-sm text-gray-500">Loading product…</p>
      </div>
    );
  }

  if (isEdit && listStatus === "failed") {
    return (
      <div className="mx-auto w-full max-w-2xl rounded-[30px] border border-[#f1ccd7] bg-[#fff7f9] p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
        <p className="text-sm font-medium text-[#8b4259]">{listError}</p>
        <Link to="/admin/products" className="mt-4 inline-block text-sm text-[#1d1a1a] underline">
          Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto grid w-full max-w-2xl gap-6">
      <div>
        <Link to="/admin/products" className="text-sm text-gray-500 hover:text-[#1d1a1a]">
          ← Products
        </Link>
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[#1d1a1a]">
          {isEdit ? "Edit product" : "Create product"}
        </h2>
      </div>

      <form
        className="w-full rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]"
        onSubmit={onSubmit}
      >
        {formError ? <p className="text-sm font-medium text-[#8b4259]">{formError}</p> : null}
        {mutationStatus === "failed" && mutationError ? <p className="mt-2 text-sm font-medium text-[#8b4259]">{mutationError}</p> : null}

        <div className="mt-5 grid gap-4">
          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Title</label>
            <input
              value={form.title}
              onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Collection</label>
            <select
              value={form.collectionId}
              onChange={(e) => setForm((prev) => ({ ...prev, collectionId: e.target.value }))}
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
            >
              <option value="">None</option>
              {(collections || [])
                .slice()
                .sort((a, b) => (a.title || "").localeCompare(b.title || ""))
                .map((c) => (
                  <option key={c._id} value={c._id}>
                    {c.title}
                  </option>
                ))}
            </select>
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Slug</label>
            <input
              value={form.slug}
              onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
              placeholder="auto-generated if empty"
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Description</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
              rows={3}
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Image</label>
            <input
              type="file"
              accept="image/*"
              disabled={imageUploading}
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm file:mr-3 file:rounded-full file:border-0 file:bg-[#1e1d22] file:px-4 file:py-2 file:text-xs file:font-medium file:text-white disabled:opacity-60"
              onChange={async (e) => {
                const file = e.target.files?.[0];
                if (!file) return;
                setImageUploading(true);
                setFormError(null);
                try {
                  const { url } = await uploadAdminImage(file);
                  if (!url) throw new Error("Upload failed");
                  setForm((prev) => ({ ...prev, productImage: url }));
                } catch (err) {
                  setFormError(err?.message || "Upload failed.");
                } finally {
                  setImageUploading(false);
                  e.target.value = "";
                }
              }}
            />
            {form.productImage ? (
              <img src={form.productImage} alt="" className="mt-2 max-h-40 w-auto rounded-2xl border border-[#eadfdf] object-contain" />
            ) : null}
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Status</label>
              <select
                value={form.status}
                onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              >
                <option value="active">Active</option>
                <option value="draft">Draft</option>
                <option value="archived">Archived</option>
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Rose color</label>
              <select
                value={form.roseColor}
                onChange={(e) => setForm((prev) => ({ ...prev, roseColor: e.target.value }))}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              >
                {ROSE_COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid gap-2 sm:grid-cols-2">
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Box color</label>
              <select
                value={form.boxColor}
                onChange={(e) => setForm((prev) => ({ ...prev, boxColor: e.target.value }))}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              >
                {BOX_COLOR_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-2">
              <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Price ({DEFAULT_CURRENCY})</label>
              <input
                value={form.priceAmount}
                onChange={(e) => setForm((prev) => ({ ...prev, priceAmount: e.target.value }))}
                type="number"
                min={0}
                className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
              />
            </div>
          </div>

          <div className="grid gap-2">
            <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Stock</label>
            <input
              value={form.quantity}
              onChange={(e) => setForm((prev) => ({ ...prev, quantity: e.target.value }))}
              type="number"
              min={0}
              className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
            />
          </div>

          <div className="flex gap-3 mt-2">
            <button
              type="button"
              onClick={goBack}
              className="flex-1 rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-5 py-3.5 text-sm font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={imageUploading}
              className="flex-1 rounded-full bg-[#1e1d22] px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)] disabled:opacity-60"
            >
              {isEdit ? "Save" : "Create"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
