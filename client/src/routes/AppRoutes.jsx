import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import RoutePlaceholder from "../pages/RoutePlaceholder";
import ProductDetails from "../pages/ProductDetails";
import CollectionPage from "../pages/CollectionPage";
import CollectionsBrowsePage from "../pages/CollectionsBrowsePage";
import AdminShell from "../components/admin/AdminShell";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminProducts from "../pages/admin/AdminProducts";
import AdminProductForm from "../pages/admin/AdminProductForm";
import AdminInventory from "../pages/admin/AdminInventory";
import AdminOrders from "../pages/admin/AdminOrders";
import AdminCollections from "../pages/admin/AdminCollections";
import AdminCustomers from "../pages/admin/AdminCustomers";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/flowers" element={<RoutePlaceholder />} />
            <Route path="/collections" element={<CollectionsBrowsePage />} />
            <Route path="/collections/:slug" element={<CollectionPage />} />
            <Route path="/best-sellers" element={<RoutePlaceholder />} />
            <Route path="/mothers-day" element={<RoutePlaceholder />} />
            <Route path="/category/products/:slug" element={<ProductDetails />} />
            <Route path="/category/:group/:slug" element={<RoutePlaceholder />} />
            <Route path="/search/:query" element={<RoutePlaceholder />} />
          </Route>

          <Route path="/admin" element={<AdminShell />}>
            <Route index element={<AdminDashboard />} />
            <Route path="products" element={<AdminProducts />} />
            <Route path="products/new" element={<AdminProductForm />} />
            <Route path="products/:productId/edit" element={<AdminProductForm />} />
            <Route path="inventory" element={<AdminInventory />} />
            <Route path="orders" element={<AdminOrders />} />
            <Route path="collections" element={<AdminCollections />} />
            <Route path="customers" element={<AdminCustomers />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}