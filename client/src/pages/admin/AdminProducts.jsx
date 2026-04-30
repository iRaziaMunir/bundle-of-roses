import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import AdminDialog from "../../components/admin/AdminDialog";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminTableCard from "../../components/admin/AdminTableCard";
import {
  archiveAdminProductThunk,
  loadAdminProducts,
  permanentlyDeleteAdminProductThunk,
  resetMutationState,
  selectAdminProductRows,
  selectAdminProductsError,
  selectAdminProductsFilters,
  selectAdminProductsStatus,
  setAdminProductsStatusFilter,
} from "../../redux/Slices/adminProductsSlice";

export default function AdminProducts() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rows = useSelector(selectAdminProductRows);
  const status = useSelector(selectAdminProductsStatus);
  const error = useSelector(selectAdminProductsError);
  const filters = useSelector(selectAdminProductsFilters);

  const [confirmDialog, setConfirmDialog] = useState(null);
  const [alertDialog, setAlertDialog] = useState(null);

  const refreshList = () => {
    dispatch(loadAdminProducts({ status: filters.status || undefined }));
  };

  useEffect(() => {
    dispatch(loadAdminProducts({ status: filters.status || undefined }));
  }, [dispatch, filters.status]);

  function openArchiveConfirm(productId) {
    setConfirmDialog({
      intent: "archive",
      productId,
      title: "Archive product",
      message: "Archive this product? It will become unavailable in storefront listings.",
      confirmText: "Archive",
      cancelText: "Cancel",
      danger: false,
    });
  }

  function openDeleteConfirm(productId, productTitle) {
    setConfirmDialog({
      intent: "delete",
      productId,
      productTitle,
      title: "Delete product",
      message: `Permanently delete “${productTitle}”? This removes the product from the database, all collections, and carts. This cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      danger: true,
    });
  }

  async function handleConfirmDialogConfirm() {
    if (!confirmDialog) return;
    const { intent, productId } = confirmDialog;
    setConfirmDialog(null);

    try {
      if (intent === "archive") {
        await dispatch(archiveAdminProductThunk(productId)).unwrap();
      } else if (intent === "delete") {
        await dispatch(permanentlyDeleteAdminProductThunk(productId)).unwrap();
      }
      dispatch(resetMutationState());
      refreshList();
    } catch {
      dispatch(resetMutationState());
      setAlertDialog({
        title: intent === "archive" ? "Could not archive" : "Could not delete",
        message:
          intent === "archive"
            ? "Something went wrong while archiving the product. Try again."
            : "Something went wrong while deleting the product. Try again.",
      });
    }
  }

  const productTableColumns = [
    { key: "title", label: "Product" },
    { key: "inventory", label: "Stock" },
    { key: "price", label: "Price" },
    { key: "status", label: "Status", type: "status" },
    { key: "actions", label: "Actions" },
  ];

  const productTableRows = rows.map((r) => ({
    ...r,
    actions: (
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          className="rounded-full border border-[#eadfdf] bg-[#fcfaf8] px-3 py-1 text-xs font-medium text-[#1d1a1a] hover:bg-[#f7f1ed]"
          onClick={() => navigate(`/admin/products/${r.id}/edit`)}
        >
          Edit
        </button>
        <button
          type="button"
          className="rounded-full border border-[#f1ccd7] bg-[#fff7f9] px-3 py-1 text-xs font-medium text-[#8b4259] hover:bg-[#ffeef4]"
          onClick={() => openArchiveConfirm(r.id)}
        >
          Archive
        </button>
        <button
          type="button"
          className="rounded-full border border-[#dcc] bg-white px-3 py-1 text-xs font-medium text-[#5c5c5c] hover:bg-[#f5f5f5]"
          onClick={() => openDeleteConfirm(r.id, r.title)}
        >
          Delete
        </button>
      </div>
    ),
  }));

  return (
    <div className="grid gap-6">
      <AdminDialog
        open={!!confirmDialog}
        title={confirmDialog?.title ?? ""}
        message={confirmDialog?.message ?? ""}
        confirmText={confirmDialog?.confirmText ?? "OK"}
        cancelText={confirmDialog?.cancelText}
        danger={confirmDialog?.danger ?? false}
        onConfirm={handleConfirmDialogConfirm}
        onCancel={() => setConfirmDialog(null)}
      />

      <AdminDialog
        open={!!alertDialog}
        title={alertDialog?.title ?? ""}
        message={alertDialog?.message ?? ""}
        confirmText="OK"
        onConfirm={() => setAlertDialog(null)}
      />

      <AdminSectionHeader
        eyebrow="Catalog"
        title="Products"
        actionLabel="Add Product"
        onAction={() => navigate("/admin/products/new")}
      />

      <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-5 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h3 className="text-xl font-semibold tracking-tight text-[#1d1a1a]">Product filters</h3>
          </div>

          <select
            value={filters.status}
            onChange={(event) => dispatch(setAdminProductsStatusFilter(event.target.value))}
            className="rounded-2xl border border-[#eadfdf] bg-[#fcfaf8] px-4 py-3 text-sm text-[#1d1a1a] outline-none"
          >
            <option value="">All statuses</option>
            <option value="active">Active</option>
            <option value="draft">Draft</option>
            <option value="archived">Archived</option>
          </select>
        </div>
      </section>

      {status === "loading" ? (
        <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-8 text-center shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#8f7f7f]">Loading products</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#1d1a1a]">Fetching catalog data from the admin API</h3>
        </section>
      ) : null}

      {status === "failed" ? (
        <section className="rounded-[30px] border border-[#f1ccd7] bg-[#fff7f9] p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm font-medium text-[#8b4259]">Unable to load admin products.</p>
          <p className="mt-2 text-sm text-[#7a5f66]">{error}</p>
        </section>
      ) : null}

      {status !== "loading" ? (
        <AdminTableCard title="Catalog list" columns={productTableColumns} rows={productTableRows} />
      ) : null}
    </div>
  );
}
