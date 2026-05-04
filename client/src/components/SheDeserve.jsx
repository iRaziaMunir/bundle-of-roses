import she from "../assets/she.webp";
import heart from "../assets/heart.webp";

export default function SheDeserve() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:justify-center gap-10">
          <div className="w-lg my-auto">
            <h6 className="font-light tracking-widest uppercase text-sm">Strong. Graceful. Unforgettable.</h6>
            <h5 className="text-3xl font-light tracking-widest uppercase my-6">She Deserves Nothing Less.</h5>
            <button className="relative mt-8 border border-black text-white bg-black px-12 py-3 text-sm tracking-widest group cursor-pointer block overflow-hidden">
              <span className="relative z-10 transition-colors duration-300 group-hover:text-black font-light uppercase">
                SHOP preserved roses
              </span>
              <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>

            </button>
          </div>
          <div className="flex">
            <div>
              <img src={she} alt="She Deserves Collection" className="w-full h-[50vh] object-cover" />
            </div>
            <div>
              <img src={heart} alt="She Deserves Collection" className="w-full h-100 object-cover mt-10" />
            </div>
          </div>
        </div>
      </div>
    <hr className="border-gray-200 my-12"/>
    </section>
    
  )
}