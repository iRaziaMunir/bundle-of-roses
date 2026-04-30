import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminDialog from "../../components/admin/AdminDialog";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminTableCard from "../../components/admin/AdminTableCard";
import {
  createAdminCollectionThunk,
  hideAdminCollectionThunk,
  loadAdminCollections,
  resetMutationState,
  selectAdminCollectionsError,
  selectAdminCollectionsItems,
  selectAdminCollectionsMutationError,
  selectAdminCollectionsMutationStatus,
  selectAdminCollectionsStatus,
  updateAdminCollectionThunk,
} from "../../redux/Slices/adminCollectionsSlice";

function slugify(value = "") {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/['"]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export default function AdminCollections() {
  const dispatch = useDispatch();

  const collections = useSelector(selectAdminCollectionsItems);
  const listStatus = useSelector(selectAdminCollectionsStatus);
  const listError = useSelector(selectAdminCollectionsError);

  const mutationStatus = useSelector(selectAdminCollectionsMutationStatus);
  const mutationError = useSelector(selectAdminCollectionsMutationError);

  const [mode, setMode] = useState("create"); // create | edit
  const [editingId, setEditingId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formError, setFormError] = useState(null);

  const [form, setForm] = useState({
    title: "",
    slug: "",
    description: "",
    status: "active", // active | hidden
  });

  const [hideConfirm, setHideConfirm] = useState(null);
  const [hideAlert, setHideAlert] = useState(null);

  useEffect(() => {
    dispatch(loadAdminCollections());
  }, [dispatch]);

  function openCreate() {
    setMode("create");
    setEditingId(null);
    setFormError(null);
    setForm({
      title: "",
      slug: "",
      description: "",
      status: "active",
    });
    setIsFormOpen(true);
  }

  function openEdit(collection) {
    setMode("edit");
    setEditingId(collection._id);
    setFormError(null);

    setForm({
      title: collection.title || "",
      slug: collection.slug || "",
      description: collection.description || "",
      status: collection.status || "active",
    });
    setIsFormOpen(true);
  }

  function openHideConfirm(collectionId) {
    setHideConfirm({ collectionId });
  }

  async function confirmHideCollection() {
    if (!hideConfirm) return;
    const { collectionId } = hideConfirm;
    setHideConfirm(null);
    try {
      await dispatch(hideAdminCollectionThunk({ id: collectionId })).unwrap();
      dispatch(loadAdminCollections());
      dispatch(resetMutationState());
    } catch {
      dispatch(resetMutationState());
      setHideAlert({
        title: "Could not hide collection",
        message: "Something went wrong. Try again.",
      });
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setFormError(null);

    const title = form.title.trim();
    if (!title) return setFormError("Title is required.");

    const slug = form.slug.trim() ? slugify(form.slug) : slugify(title);
    if (!slug) return setFormError("Slug is required.");

    const payload = {
      title,
      slug,
      description: form.description,
      status: form.status,
    };

    try {
      if (mode === "create") {
        await dispatch(createAdminCollectionThunk(payload)).unwrap();
      } else {
        await dispatch(updateAdminCollectionThunk({ id: editingId, payload })).unwrap();
      }

      dispatch(loadAdminCollections());
      dispatch(resetMutationState());
      setIsFormOpen(false);
    } catch {
      // handled by mutationError
    }
  }

  const tableRows = (collections || []).map((c) => {
    const productsCount = c.productIds ? c.productIds.length : 0;
    const statusLabel = c.status === "active" ? "Active" : "Hidden";

    return {
      id: c._id,
      title: c.title,
      products: productsCount,
      status: statusLabel,
      actions: (
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-3 py-1 text-xs font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
            onClick={() => openEdit(c)}
          >
            Edit
          </button>
          <button
            type="button"
            className="rounded-full border border-[#f1ccd7] bg-[#fff7f9] px-3 py-1 text-xs font-medium text-[#8b4259] hover:bg-[#ffeef4]"
            onClick={() => openHideConfirm(c._id)}
          >
            Hide
          </button>
        </div>
      ),
    };
  });

  const columns = [
    { key: "title", label: "Collection" },
    { key: "products", label: "Products" },
    { key: "status", label: "Status", type: "status" },
    { key: "actions", label: "Actions" },
  ];

  const canSubmit = mutationStatus !== "loading";

  return (
    <div className="grid gap-6">
      <AdminDialog
        open={!!hideConfirm}
        title="Hide collection"
        message="Hide this collection? It will disappear from the storefront."
        confirmText="Hide"
        cancelText="Cancel"
        danger
        onConfirm={confirmHideCollection}
        onCancel={() => setHideConfirm(null)}
      />
      <AdminDialog
        open={!!hideAlert}
        title={hideAlert?.title ?? ""}
        message={hideAlert?.message ?? ""}
        confirmText="OK"
        onConfirm={() => setHideAlert(null)}
      />

      <AdminSectionHeader
        eyebrow="Merchandising"
        title="Collections"
        description="Create collections with title, slug, description, and status. Assign products from each product’s edit form."
        actionLabel="Create Collection"
        onAction={openCreate}
      />

      {listStatus === "loading" ? (
        <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-8 text-center shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#8f7f7f]">Loading collections</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#1d1a1a]">Fetching merchandising data from the admin API</h3>
        </section>
      ) : null}

      {listStatus === "failed" ? (
        <section className="rounded-[30px] border border-[#f1ccd7] bg-[#fff7f9] p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm font-medium text-[#8b4259]">Unable to load collections.</p>
          <p className="mt-2 text-sm text-[#7a5f66]">{listError}</p>
        </section>
      ) : null}

      {listStatus !== "loading" ? (
        <section className="grid gap-6 xl:grid-cols-[1.55fr_1fr]">
          <AdminTableCard
            title="Collection setup"
            description="Create or edit a collection from the form on the right. Hide sets status to hidden (soft)."
            columns={columns}
            rows={tableRows}
          />

          <div className="grid gap-6">
            {!isFormOpen ? (
              <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
                <h3 className="text-xl font-semibold tracking-tight text-[#1d1a1a]">Quick actions</h3>
                <p className="mt-1 text-sm text-gray-500">Start by creating a new collection or editing one of the rows.</p>

                <button
                  type="button"
                  onClick={openCreate}
                  className="mt-5 w-full rounded-full bg-[#1e1d22] px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)] hover:opacity-95"
                >
                  Create Collection
                </button>
              </section>
            ) : (
              <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold tracking-tight text-[#1d1a1a]">
                      {mode === "create" ? "New collection" : "Edit collection"}
                    </h3>
                    <p className="mt-1 text-sm text-gray-500">Link products from Admin → Products when editing a product.</p>
                  </div>
                  <button
                    type="button"
                    className="rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-4 py-2 text-sm font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
                    onClick={() => setIsFormOpen(false)}
                  >
                    Cancel
                  </button>
                </div>

                {formError ? <p className="mt-4 text-sm font-medium text-[#8b4259]">{formError}</p> : null}
                {mutationStatus === "failed" && mutationError ? (
                  <p className="mt-2 text-sm font-medium text-[#8b4259]">{mutationError}</p>
                ) : null}

                <form className="mt-5 grid gap-4" onSubmit={onSubmit}>
                  <div className="grid gap-2">
                    <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm((prev) => ({ ...prev, title: e.target.value }))}
                      className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
                    />
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
                    <label className="text-xs uppercase tracking-[0.24em] text-gray-400">Status</label>
                    <select
                      value={form.status}
                      onChange={(e) => setForm((prev) => ({ ...prev, status: e.target.value }))}
                      className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm outline-none"
                    >
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end">
                    <button
                      type="submit"
                      disabled={!canSubmit}
                      className="rounded-full bg-[#1e1d22] px-5 py-3.5 text-sm font-medium text-white shadow-[0_12px_26px_rgba(30,29,34,0.16)] disabled:opacity-60"
                    >
                      {mode === "create" ? "Create" : "Save changes"}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsFormOpen(false)}
                      className="rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-5 py-3.5 text-sm font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
                    >
                      Close
                    </button>
                  </div>
                </form>
              </section>
            )}
          </div>
        </section>
      ) : null}
    </div>
  );
}
