import heroImage from "../assets/hero3.webp";

const Hero3 = () => {
  return (
    <section className="relative w-full h-[83vh] my-12">

      <img
        src={heroImage}
        alt="Luxury Roses"
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>


      <div className="relative z-10 max-w-xl h-full flex items-end px-6 lg:px-16 pb-10 sm:pb-14 md:pb-16">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-light leading-tight tracking-widest uppercase text-white">
          When it comes to unforgettable gifts, The Million Roses is always the right choice.
        </h1>
      </div>
    </section>
  );
};

export default Hero3;