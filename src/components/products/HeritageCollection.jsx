import { Plus } from "lucide-react";
import whiteRose1 from "../../assets/products/heritageProducts/White_Roses1.webp";
import whiteRose2 from "../../assets/products/heritageProducts/White_Roses2.webp";
import whiteRose3 from "../../assets/products/heritageProducts/White_Roses3.webp";
import whiteRose4 from "../../assets/products/heritageProducts/White_Roses4.webp";



const products = [
  {
    image: whiteRose1,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: whiteRose2,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
  {
    image: whiteRose3,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: whiteRose4,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  }
];

const HeritageCollection = () => {
  return (
    <section className="pt-16">
      <h2 className="text-center text-3xl tracking-widest font-light mb-12 uppercase">
        The Heritage Collection
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 px-6 lg:px-16">
        {products.map((product, index) => (
          <div key={index} className="group">

            {/* IMAGE WRAPPER */}
            <div className="relative overflow-hidden cursor-pointer">

              {/* IMAGE */}
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover transition duration-500"
              />


              <button className="absolute bottom-4 right-4 flex items-center gap-2 bg-black text-white px-4 py-2 text-xs tracking-widest opacity-0 group-hover:opacity-100 transition duration cursor-pointer">

                <Plus className="w-4 h-4 transition-transform duration-300 hover:rotate-90" />

              </button>

            </div>

            <div className="mt-4 text-center">
              <h3 className="text-sm mb-1">{product.name}</h3>
              <div className="flex items-center justify-center gap-2 mt-1">

                {/* Stars */}
                <div className="flex items-center">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span
                      key={i}
                      className={`text-sm ${i < Math.floor(product.rating)
                        ? "text-black"
                        : "text-gray-300"
                        }`}
                    >
                      ★
                    </span>
                  ))}
                </div>

                {/* Reviews */}
                <span className="text-xs text-gray-500">
                  ({product.reviews})
                </span>

              </div>
              <p className="text-sm text-gray-500 mt-1">{product.price}</p>
            </div>

          </div>
        ))}
      </div>
      <button className="relative mt-8 border border-black text-white bg-black px-12 py-3 text-sm tracking-widest group cursor-pointer mx-auto block overflow-hidden">
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
          View all
        </span>
        <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>

      </button>

    </section>
  );
};

export default HeritageCollection;