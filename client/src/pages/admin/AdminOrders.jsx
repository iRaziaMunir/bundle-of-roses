import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminTableCard from "../../components/admin/AdminTableCard";
import {
  loadAdminOrders,
  selectAdminOrderRows,
  selectAdminOrdersError,
  selectAdminOrdersStatus,
} from "../../redux/Slices/adminOrdersSlice";

export default function AdminOrders() {
  const dispatch = useDispatch();
  const rows = useSelector(selectAdminOrderRows);
  const status = useSelector(selectAdminOrdersStatus);
  const error = useSelector(selectAdminOrdersError);

  useEffect(() => {
    dispatch(loadAdminOrders());
  }, [dispatch]);

  return (
    <div className="grid gap-6">
      <AdminSectionHeader
        eyebrow="Order Management"
        title="Orders"
        description="Review payment and fulfillment state from a single dashboard view using live admin order data."
        actionLabel="Download CSV"
      />

      {status === "loading" ? (
        <section className="rounded-[30px] border border-[#eadfdf] bg-white/90 p-8 text-center shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm uppercase tracking-[0.28em] text-[#8f7f7f]">Loading orders</p>
          <h3 className="mt-3 text-2xl font-semibold text-[#1d1a1a]">Fetching order operations data from the admin API</h3>
        </section>
      ) : null}

      {status === "failed" ? (
        <section className="rounded-[30px] border border-[#f1ccd7] bg-[#fff7f9] p-6 shadow-[0_16px_40px_rgba(42,26,26,0.08)]">
          <p className="text-sm font-medium text-[#8b4259]">Unable to load admin orders.</p>
          <p className="mt-2 text-sm text-[#7a5f66]">{error}</p>
        </section>
      ) : null}

      {status !== "loading" ? (
        <AdminTableCard
          title="Recent orders"
          description="Live admin orders loaded through Redux Toolkit async thunks."
          columns={[
            { key: "id", label: "Order" },
            { key: "customer", label: "Customer" },
            { key: "date", label: "Date" },
            { key: "total", label: "Total" },
            { key: "payment", label: "Payment", type: "status" },
            { key: "fulfillment", label: "Fulfillment", type: "status" },
          ]}
          rows={rows}
        />
      ) : null}
    </div>
  );
}
