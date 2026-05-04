import { Leaf, Sparkles, CheckCircle, Droplet } from "lucide-react";
const features = [
  {
    icon: <Leaf className="w-6 h-6 mx-auto mb-2" />,
    text: "REAL, ORGANIC ROSES",
  },
  {
    icon: <Sparkles className="w-6 h-6 mx-auto mb-2" />,
    text: "BLOOMS 3+ YEARS",
  },
  {
    icon: <CheckCircle className="w-6 h-6 mx-auto mb-2" />,
    text: "NATURALLY PRESERVED",
  },
  {
    icon: <Droplet className="w-6 h-6 mx-auto mb-2" />,
    text: "NO WATER NEEDED",
  },
];

const Features = () => {
  return (
    <section className="w-full py-12 bg-[#F7F4F4] my-10">
      <div className="max-w-6xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {features.map((feature, index) => (
            <div key={index} className="group">
              {/* Icon */}
              <div className="">
                {feature.icon}
              </div>

              {/* Text */}
              <p className="text-xs tracking-[0.3em] text-gray-600 transition-all duration-300 group-hover:text-black">
                {feature.text}
              </p>

              {/* Underline animation */}
              <div className="mt-3 h-[1px] bg-black scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;