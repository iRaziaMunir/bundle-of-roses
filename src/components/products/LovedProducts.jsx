import { Heart } from "lucide-react";
import blackSmallHeart from "../../assets/products/lovedProducts/black_small_heart.webp";
import blackBigHeart from "../../assets/products/lovedProducts/black_big_heart.webp";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import 'swiper/css';

const products = [
  {
    image: blackSmallHeart,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: blackBigHeart,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
  {
    image: blackSmallHeart,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: blackBigHeart,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
  {
    image: blackSmallHeart,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: blackBigHeart,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
  {
    image: blackSmallHeart,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: blackBigHeart,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
];

const LovedProducts = () => {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-8xl mx-auto px-6 lg:px-16">
        <h2 className="text-2xl md:text-3xl font-light tracking-widest mb-8 text-center uppercase">
          Most Loved Products
        </h2>
        <div className="relative">

        <Swiper
          slidesPerView={1}
          spaceBetween={100}
          breakpoints={{
            640: { slidesPerView: 2 },
            1024: { slidesPerView: 4 },
          }}
          // navigation={true}
          navigation={{
    nextEl: ".swiper-next",
    prevEl: ".swiper-prev",
  }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
          modules={[Navigation, Pagination, A11y]}
        >
          {products.map((product, index) => (
            <SwiperSlide key={index}>
              <div className="group relative overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover"
                />
                <div className="p-4 text-center">
                  <h3 className="text-sm font-normal mb-2">{product.name}</h3>
                  <div className="flex items-center justify-center mb-2">
                    {Array.from({ length: 5 }, (_, i) => (
                      <span
                        key={i}
                        className={"text-sm"}
                      >
                        ★
                      </span>
                    ))}
                    <span className="text-xs text-gray-500 ml-2">
                      ({product.reviews})
                    </span>
                  </div>
                  <p className="text-gray-500 text-lg mb-2">{product.price}</p>
                </div>
              </div>
              <button className="w-full mt-2 px-6 py-3 border border-black text-white bg-black text-sm tracking-widest cursor-pointer">
                View Product
              </button>
              {/* Navigation buttons inside the slide */}
    <button className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full hidden group-hover:block z-10 swiper-prev">
      ‹
    </button>
    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black text-white w-10 h-10 rounded-full hidden group-hover:block z-10 swiper-next">
      ›
    </button>
            </SwiperSlide>
          ))}
        </Swiper>
        </div>

      </div>
    </section>
  );
};

export default LovedProducts;