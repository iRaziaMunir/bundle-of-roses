import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import MainLayout from "../layouts/MainLayout";
import RoutePlaceholder from "../pages/RoutePlaceholder";
import ProductDetails from "../pages/ProductDetails";

export default function AppRoutes() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element = {<MainLayout />}>
            <Route path="/" element={<Home/>} />
            <Route path="/flowers" element={<RoutePlaceholder />} />
            <Route path="/collections" element={<RoutePlaceholder />} />
            <Route path="/best-sellers" element={<RoutePlaceholder />} />
            <Route path="/mothers-day" element={<RoutePlaceholder />} />
            <Route path="/category/products/:slug" element={<ProductDetails />} />
            <Route path="/category/:group/:slug" element={<RoutePlaceholder />} />
            <Route path="/search/:query" element={<RoutePlaceholder />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}