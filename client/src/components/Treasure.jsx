import { Link } from "react-router";

const columns = [
  {
    content: (
      <>
        At The Million Roses, we go above and beyond to bring you the highest quality
        and most luxurious selection of{" "}
        <Link to="/forever-roses" className="underline underline-offset-4 hover:no-underline">
          forever roses
        </Link>,{" "}
        <Link to="/centerpieces" className="underline underline-offset-4 hover:no-underline">
          flower centerpieces
        </Link>, and roses arrangements available. Our unique forever flowers are sourced from Ecuador’s sun-kissed fields, providing you with a timeless beauty that will last for years. Every item is crafted with sustainability and love, leaving a lasting impression that will stand the test of time. Our products undergo a non-toxic process with a low environmental impact that allows roses to be preserved for 3 years.
      </>
    ),
  },
  {
    content: (
      <>
        Choose from our selection of{" "}
        <Link to="/red-roses" className="underline underline-offset-4 hover:no-underline">
          preserved red roses
        </Link>,{" "}
        <Link to="/white-roses" className="underline underline-offset-4 hover:no-underline">
          white roses
        </Link>, and{" "}
        <Link to="/black-roses" className="underline underline-offset-4 hover:no-underline">
          black roses
        </Link>, or even from our romantic gifts,{" "}
        <Link to="/custom-gifts" className="underline underline-offset-4 hover:no-underline">
          custom gifts
        </Link>, or thank you flowers. Whether you’re looking for a heart-shaped box with roses, a{" "}
        <Link to="/mothers-day" className="underline underline-offset-4 hover:no-underline">
          mother’s day gift
        </Link>, or even a{" "}
        <Link to="/wedding-centerpieces" className="underline underline-offset-4 hover:no-underline">
          wedding flower centerpiece
        </Link>, here you will find the perfect piece to celebrate life’s special moments or enhance your home decor.
      </>
    ),
  },
  {
    content: (
      <>
        For the classic romantic, consider a{" "}
        <Link to="/single-rose" className="underline underline-offset-4 hover:no-underline">
          single rose
        </Link>{" "}
        that will last for years with no need for watering or changing the light condition. For the modern lover, we have a wide range of colors, including{" "}
        <Link to="/purple-roses" className="underline underline-offset-4 hover:no-underline">
          purple roses
        </Link>,{" "}
        <Link to="/lavender-roses" className="underline underline-offset-4 hover:no-underline">
          lavender roses
        </Link>, and{" "}
        <Link to="/blue-roses" className="underline underline-offset-4 hover:no-underline">
          blue roses
        </Link>, each of them carefully composed to re-imagine a classic gift in a contemporary way.
      </>
    ),
  },
  {
    content: (
      <>
        Want to take it up a notch? Try our premium rose boxes, elegantly designed and perfect for any special occasion. Each box is filled with the most luxurious preserved roses, carefully handcrafted with passion and attention to detail in every lash. Whether you’re looking to express your love with an opulent display or simply to spoil yourself with a{" "}
        <Link to="/luxury-gifts" className="underline underline-offset-4 hover:no-underline">
          luxurious gift
        </Link>, our collection of preserved roses in a box will impress even the most sophisticated.
      </>
    ),
  },
  {
    content: (
      <>
        When it comes to expressing love or sharing a special moment, flowers always bloom in beauty. At The Million Roses, take a deep dive in our variety of{" "}
        <Link to="/forever-flowers" className="underline underline-offset-4 hover:no-underline">
          forever flowers
        </Link>, like{" "}
        <Link to="/buttercups" className="underline underline-offset-4 hover:no-underline">
          persian buttercups
        </Link>, and let our timeless pieces turn any special moment into a forever memorable one.
      </>
    ),
  },
];
export default function Treasure() {
  return (
    <section className="py-16 bg-[#f7f4f4]">
      <div className="max-w-8xl px-6 lg:px-16">

        <h2 className="text-start text-3xl tracking-widest font-light mb-12 uppercase">
         Treasure the beauty of a rose that never wilts
        </h2>

        {/* Scroll Container */}
        <div className="overflow-x-auto no-scrollbar">
          
          {/* Columns */}
          <div className="flex gap-10 min-w-max">

            {columns.map((column, index) => (
              <div
                key={index}
                className="w-[260px] flex-shrink-0"
              >
                <p className="text-[13px] leading-[1.8] text-gray-700">
                  {column.content}
                </p>
              </div>
            ))}

          </div>
        </div>

      </div>
    </section>
  );
}