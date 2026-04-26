// import blog1 from "../assets/blogPosts/blog1.webp";
// import blog2 from "../assets/blogPosts/blog2.webp";

// const posts = [
//   {
//     title: "Mother's Day with forever roses",
//     description: "Mother's Day is one of the most meaningful occasions in the year. It's when we come together to celebrate the woman who gave us life—whose love has no limits. She's been there for our first smiles ...",
//     image: blog1,
//     link: "#"
//   },
//   {
//     title: "Eternal Affection: Exquisite Mother’s Day Gifts for Grandmothers",
//     description: "When Mother's Day approaches, we often think of our mothers and the nurturing love they've showered upon us. But there's another, equally important woman in many of our lives who deserves cel...",
//     image: blog2,
//     link: "#"
//   },
// ]
// export default function BlogPosts() {
//   return (
//     <section className="py-12">
//       <div className="max-w-7xl mx-auto">
//         <div className="flex flex-col items-center gap-10 px-6 lg:px-16">
//           <h1>Blog Posts</h1>
//           <div className="flex items-center gap-16">
//             {posts.map((post, index) => {
//               return (
//                 <div key={index} className="h-96 w-96">
//                   <img src={post.image} alt={post.title} className="w-100 h-100 object-cover"/>
//                   <h2>{post.title}</h2>
//                   <p>{post.description}</p>
//                   <a href={post.link}>Read more</a>
//                 </div>
//               )
//             })}
//           </div>
//           <div>
//             <button className="relative mt-8 border border-black text-white bg-black px-12 py-3 text-sm tracking-widest group cursor-pointer mx-auto block overflow-hidden">
//               <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
//                 View all
//               </span>
//               <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>

//             </button>
//             </div>
//         </div>
//       </div>
//     </section>
//   )
// }

import blog1 from "../assets/blogPosts/blog1.webp";
import blog2 from "../assets/blogPosts/blog2.webp";

const posts = [
  {
    title: "Mother's Day with forever roses",
    description:
      "Mother's Day is one of the most meaningful occasions in the year. It's when we come together to celebrate the woman who gave us life—whose love has no limits...",
    image: blog1,
    link: "#",
  },
  {
    title: "Eternal Affection: Exquisite Mother’s Day Gifts for Grandmothers",
    description:
      "When Mother's Day approaches, we often think of our mothers and the nurturing love they've showered upon us...",
    image: blog2,
    link: "#",
  },
];

export default function BlogPosts() {
  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col items-center px-6 lg:px-16">

          <h2 className="text-center text-3xl tracking-widest font-light mb-12 uppercase">
            Blog Posts      
          </h2>

          <div className="flex flex-wrap justify-center gap-16">
            {posts.map((post, index) => (
              <div
                key={index}
                className="w-full sm:w-[300px] lg:w-[350px] space-y-4"
              >
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full object-contain object-top cursor-pointer"
                />

                <h2 className="text-xl font-light tracking-widest uppercase">{post.title}</h2>
                <p className="text-sm tracking-wider font-normal text-gray-700">
                  {post.description}
                </p>

                <a
                  href={post.link}
                  className="text-sm underline cursor-pointer text-gray-500"
                >
                  Read more
                </a>
              </div>
            ))}
          </div>

          {/* Button */}
          <button className="relative mt-8 border border-black text-white bg-black px-12 py-3 text-sm tracking-widest group cursor-pointer overflow-hidden">
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">
              View all
            </span>
            <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0"></span>
          </button>

        </div>
      </div>
    </section>
  );
}