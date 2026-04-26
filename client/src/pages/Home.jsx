import BlogPosts from "../components/BlogPosts"
import Features from "../components/Features"
import Hero from "../components/Hero"
import Hero2 from "../components/Hero2"
import Hero3 from "../components/Hero3"
import GrandGestures from "../components/products/GrandGestures"
import HeartCollection from "../components/products/HeartCollection"
import HeritageCollection from "../components/products/HeritageCollection"
import LovedProducts from "../components/products/LovedProducts"
import MostGifted from "../components/products/MostGifted"
import SmallSurprises from "../components/products/SmallSurprises"
import SheDeserve from "../components/SheDeserve"
import Testimonials from "../components/Testimonials"
import Treasure from "../components/Treasure"
export default function Home() {
  return (
    <>
    <Hero />
    <Features />
    <LovedProducts />
    <HeritageCollection />
    <Testimonials />
    <MostGifted />
    <Hero2 />
    <HeartCollection />
    <SheDeserve />
    <GrandGestures />
    <Hero3 />
    <SmallSurprises />
    <BlogPosts />
    <Treasure />
    </>
    
  )
}