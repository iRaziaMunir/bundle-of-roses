export const adminStats = [
  { label: "Total Revenue", value: "$48,620", change: "+12.4%", tone: "emerald" },
  { label: "Active Orders", value: "128", change: "+18 today", tone: "blue" },
  { label: "Low Stock Variants", value: "9", change: "Needs review", tone: "amber" },
  { label: "Customers", value: "1,284", change: "+34 this week", tone: "rose" },
];

export const adminProducts = [
  {
    id: "prod_1",
    title: "Baby Heart Beige Box",
    slug: "baby-heart-beige-box",
    collection: "Small Surprises",
    status: "Active",
    variants: 3,
    inventory: 75,
    price: "$190",
  },
  {
    id: "prod_2",
    title: "Classic Black Superdome Box",
    slug: "classic-black-superdome-box",
    collection: "Grand Gestures",
    status: "Active",
    variants: 2,
    inventory: 20,
    price: "$410",
  },
  {
    id: "prod_3",
    title: "Supreme Black Box",
    slug: "supreme-black-box",
    collection: "Most Gifted",
    status: "Draft",
    variants: 4,
    inventory: 12,
    price: "$440",
  },
];

export const adminInventory = [
  { id: "inv_1", sku: "BH-BEIGE-WHITE", product: "Baby Heart Beige Box", variant: "White / Beige", quantity: 25, status: "Healthy" },
  { id: "inv_2", sku: "CBS-BLACK-RED", product: "Classic Black Superdome Box", variant: "Red / Black", quantity: 4, status: "Low" },
  { id: "inv_3", sku: "SB-BLACK-GOLD", product: "Supreme Black Box", variant: "Gold / Black", quantity: 0, status: "Out" },
];

export const adminOrders = [
  { id: "BOR-MAY-1001", customer: "Sofia Malik", total: "$410", payment: "Paid", fulfillment: "Processing", date: "2026-04-28" },
  { id: "BOR-MAY-1002", customer: "Daniel Harper", total: "$190", payment: "Pending", fulfillment: "Unfulfilled", date: "2026-04-28" },
  { id: "BOR-MAY-1003", customer: "Emma Wilson", total: "$630", payment: "Paid", fulfillment: "Shipped", date: "2026-04-27" },
];

export const adminCollections = [
  { id: "col_1", title: "Grand Gestures", products: 18, status: "Active" },
  { id: "col_2", title: "Most Gifted", products: 12, status: "Active" },
  { id: "col_3", title: "Mother's Day", products: 24, status: "Hidden" },
];

export const adminCustomers = [
  { id: "cus_1", name: "Sofia Malik", email: "sofia@example.com", orders: 6, spent: "$1,920", status: "Active" },
  { id: "cus_2", name: "Daniel Harper", email: "daniel@example.com", orders: 2, spent: "$600", status: "Active" },
  { id: "cus_3", name: "Olivia Reed", email: "olivia@example.com", orders: 1, spent: "$190", status: "Disabled" },
];

export const recentAdminActivity = [
  { id: "act_1", title: "Inventory adjusted", detail: "Classic Black Superdome Box / Red variant reduced to 4 units.", time: "12 min ago" },
  { id: "act_2", title: "New order received", detail: "Order BOR-MAY-1002 placed with exact delivery date selected.", time: "26 min ago" },
  { id: "act_3", title: "Collection updated", detail: "Most Gifted collection now includes 2 additional products.", time: "1 hr ago" },
];
