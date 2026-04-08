import heroImage from "../assets/hero.webp";

const Hero = () => {
  return (
    <section className="relative w-full h-[70vh]">

      {/* Background Image */}
      <img
        src={heroImage}
        alt="Luxury Roses"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent"></div>


      {/* Content */}
      <div className="relative z-10 max-w-xl h-full flex items-center px-6 lg:px-10">

        <div className="max-w-xl text-white mt-[200px]">

          <h6 className="text-xs tracking-[0.3em] mb-4">
            THE MILLION ROSES®
          </h6>
          <h1 className="text-3xl md:text-5xl lg:text-4xl font-light leading-tight tracking-widest">
            REAL LUXURY ROSES
            THAT LAST FOR YEARS.
            THE DEFINITIVE
            GESTURE. ANYTIME.
            ANYWHERE.
          </h1>

          <button className="mt-8 relative overflow-hidden border border-white text-black px-6 py-3 text-sm tracking-widest group cursor-pointer">

            {/* Text */}
            <span className="relative z-10 transition-colors duration-300 group-hover:text-white">
              SHOP THE COLLECTION
            </span>

            {/* Sliding background (goes away on hover) */}
            <span className="absolute inset-0 bg-white transition-transform duration-500 group-hover:translate-x-full"></span>

          </button>

        </div>
      </div>
    </section>
  );
};

export default Hero;