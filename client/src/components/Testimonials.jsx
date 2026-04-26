import { useEffect, useState } from "react";
const testimonials = [
  {
    id: 1,
    brand: "Forbes",
    text: `"The fragrant roses look gorgeous, smell amazing and last for more than three years.."`,
  },
  {
    id: 2,
    brand: "InStyle",
    text: `"...holds a vibrant collection of pink roses that look fresh for up to three years. The secret: a special rehydration process that helps each bloom stay beautiful for the long haul. If pink’s not her thing, you can customize the color of both the roses and the suede box. It also comes with a paper or e-card, and you can choose to add chocolates for an extra charge to pamper her even more.."`,
  },
  {
    id: 3,
    brand: "Billboard",
    text: `"The box comes with six color arrangement options, including, black, pink, and violet with the option of light pink, dark pink, or white suede box. It comes with 18 to 20 roses, and you can include a card with a sweet custom message and chocolates."`,
  },
  {
    id: 4,
    brand: "Vogue",
    text: `"Everyone loves receiving flowers. Even better if they’re flowers for a cause.."`,
  },
  {
    id: 5,
    brand: "Elle",
    text: `"..the good news is romance doesn’t have to be left behind, thanks to The Million Roses naturally preserved roses that last at least three years instead of a few days.."`,
  },
];

export default function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="py-14 text-center">
      <hr className="border-gray-200" />
      <div className="max-w-xl mx-auto px-4 h-48 mt-12  overflow-hidden relative">
        <p className="text-sm transition-all duration-500 leading-[1.5rem] tracking-wider animate-slideUp">
          {testimonials[activeIndex].text}
        </p>
      </div>

      {/* Tabs */}
      <div className="mt-10 flex justify-center gap-24">
        {testimonials.map((item, index) => (
          <button
            key={item.id}
            onClick={() => setActiveIndex(index)}
            className={`text-3xl font-bold transition-all duration-300 cursor-pointer ${activeIndex === index
              ? "text-black"
              : "text-gray-400"
              }`}
          >
            {item.brand}
          </button>
        ))}
      </div>
    </section>
  );
}