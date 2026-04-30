import AdminSectionHeader from "../../components/admin/AdminSectionHeader";
import AdminTableCard from "../../components/admin/AdminTableCard";
import { adminCustomers } from "../../data/adminMockData";

export default function AdminCustomers() {
  return (
    <div className="grid gap-6">
      <AdminSectionHeader
        eyebrow="Customers"
        title="Customer accounts"
        description="View customer health, account status, and lifetime spend."
        actionLabel="Invite Admin"
      />

      <AdminTableCard
        title="Customer directory"
        description=""
        columns={[
          { key: "name", label: "Customer" },
          { key: "email", label: "Email" },
          { key: "orders", label: "Orders" },
          { key: "spent", label: "Lifetime Spend" },
          { key: "status", label: "Status", type: "status" },
        ]}
        rows={adminCustomers}
      />
    </div>
  );
}
