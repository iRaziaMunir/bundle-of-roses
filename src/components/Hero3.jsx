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


      <div className="relative z-10 max-w-xl h-full flex items-center mb-[500px] px-6 lg:px-16">

          <h1 className="absolute bottom-[3vh] text-3xl lg:text-4xl font-light leading-tight tracking-widest uppercase text-white">
            When it comes to unforgettable gifts, The Million Roses is always the right choice.
          </h1>
      </div>
    </section>
  );
};

export default Hero3;