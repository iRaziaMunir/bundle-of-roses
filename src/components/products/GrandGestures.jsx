import { Plus } from "lucide-react";
import whiteRose1 from "../../assets/products/mostGifted/mostGifted1.0.webp";
import whiteRose2 from "../../assets/products/mostGifted/mostGifted1.webp";
import whiteRose3 from "../../assets/products/mostGifted/mostGifted2.webp";
import whiteRose4 from "../../assets/products/mostGifted/mostGifted2.0.webp";
import whiteRose5 from "../../assets/products/mostGifted/mostGifted3.0.webp";
import whiteRose6 from "../../assets/products/mostGifted/mostGifted3.webp";




const products = [
  {
    image: whiteRose1,
    hoverImage: whiteRose2,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  },
  {
    image: whiteRose3,
    hoverImage: whiteRose4,
    name: "Luxury Pink Box | Roses",
    rating: 4.9,
    reviews: 512,
    price: "$420.00",
  },
  {
    image: whiteRose5,
    hoverImage: whiteRose6,
    name: "Heart Black Box | Red Roses",
    rating: 4.8,
    reviews: 854,
    price: "$450.00",
  }
];

const GrandGestures = () => {
  return (
    <section className="max-w-7xl mx-auto">
      <h6 className="text-center text-sm tracking-widest mb-4 uppercase font-light">
        Featured Collection
      </h6>
      <h2 className="text-center text-3xl tracking-widest font-light mb-12 uppercase">
        Grand Gestures
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-16">
        {products.map((product, index) => (
          <div key={index} className="group">

            <div className="relative overflow-hidden cursor-pointer">

              <img
                src={product.image}
                alt={product.name}
                className="w-full h-80 object-cover absolute inset-0 transition-opacity duration-500 group-hover:opacity-0"
              />
              <img
                src={product.hoverImage}
                alt={product.name}
                className="w-full h-80 object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
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
        <span className="relative z-10 transition-colors duration-300 group-hover:text-black uppercase">
          Made to be remembered
        </span>
        <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>

      </button>

    </section>
  );
};

export default GrandGestures;