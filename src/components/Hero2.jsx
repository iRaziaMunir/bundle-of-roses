import HeroImage from "../assets/hero2.webp";
export default function Hero2(){

  return(
    <section className="w-full h-[84vh] my-12">
      <img src={HeroImage}
      alt="Hero Image " 
      className="w-full h-full"/>
      {/* Overlay */}
    </section>
  )
}