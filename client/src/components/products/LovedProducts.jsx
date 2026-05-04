import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, A11y } from "swiper/modules";
import "swiper/css";

import {
  loadLovedProducts,
  selectLovedProductsError,
  selectLovedProductsItems,
  selectLovedProductsStatus,
} from "../../redux/slices/products/lovedProductsSlice";

function formatPrice(price) {
  const amount = price?.amount;
  const currency = price?.currency || "USD";
  if (typeof amount !== "number") return "";
  return new Intl.NumberFormat("en-US", { style: "currency", currency, maximumFractionDigits: 0 }).format(amount);
}

export default function LovedProducts() {
  const dispatch = useDispatch();
  const status = useSelector(selectLovedProductsStatus);
  const error = useSelector(selectLovedProductsError);
  const products = useSelector(selectLovedProductsItems);

  useEffect(() => {
    if(status === "idle"){
      dispatch(loadLovedProducts());
    }
  }, [dispatch, status]);

  return (
    <section className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-6 lg:px-16">
        <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-8 text-center uppercase">
          Most Loved Products
        </h2>

        {status === "loading" ? <p className="text-center text-sm text-gray-500">Loading…</p> : null}
        {status === "failed" ? <p className="text-center text-sm text-red-600">{error}</p> : null}

        {products.length ? (
          <div className="relative">
            <Swiper
              slidesPerView={1}
              spaceBetween={100}
              breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }}
              navigation={{ nextEl: ".swiper-next", prevEl: ".swiper-prev" }}
              pagination={{ clickable: true }}
              modules={[Navigation, Pagination, A11y]}
            >
              {products.map((p) => {
                const to = `/category/products/${p.slug}`;
                const img = p.images?.[0]?.url;
                const alt = p.images?.[0]?.alt || p.title;

                return (
                  <SwiperSlide key={p._id} className="group">
                    <Link to={to} className="relative overflow-hidden block">
                      {img ? <img src={img} alt={alt} className="w-full h-72 object-cover" /> : <div className="w-full h-72 bg-gray-100" />}
                      <div className="p-4 text-center">
                        <h3 className="text-sm font-normal mb-2">{p.title}</h3>
                        <p className="text-gray-500 text-lg mb-2">{formatPrice(p.price)}</p>
                      </div>
                    </Link>

                    <Link to={to} className="w-full mt-2 px-6 py-3 border border-black text-white bg-black text-sm tracking-widest cursor-pointer block text-center">
                      View Product
                    </Link>
                  </SwiperSlide>
                );
              })}
              <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full hidden group-hover:block z-10 swiper-prev">
                ‹
              </button>
              <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full hidden group-hover:block z-10 swiper-next">
                ›
              </button>
            </Swiper>
          </div>
        ) : null}
      </div>
    </section>
  );
}