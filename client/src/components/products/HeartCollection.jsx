import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router";
import HomeCollectionSectionProductCard from "./HomeCollectionSectionProductCard";
import { HOME_COLLECTION_SECTION_IDS } from "../../constants/homeCollectionSections";
import {
  loadHomeCollectionSectionProducts,
  selectHomeCollectionSection,
} from "../../redux/slices/products/homeCollectionSectionsSlice";

const SECTION_ID = HOME_COLLECTION_SECTION_IDS.HEART;

export default function HeartCollection() {
  const dispatch = useDispatch();
  const section = useSelector(selectHomeCollectionSection(SECTION_ID));

  useEffect(() => {
    dispatch(loadHomeCollectionSectionProducts({ sectionId: SECTION_ID }));
  }, [dispatch]);

  const products = section?.items ?? [];
  const collectionSlug = section?.collectionSlug ?? "";

  return (
    <section className="pt-16 max-w-7xl mx-auto">
      <h6 className="text-center text-sm tracking-widest mb-4 uppercase font-light">Featured Collection</h6>
      <h2 className="text-center text-3xl tracking-widest font-light mb-12 uppercase">Heart Collection</h2>

      {section?.status === "loading" ? (
        <p className="text-center text-sm text-gray-500 px-6">Loading…</p>
      ) : null}
      {section?.status === "failed" ? (
        <p className="text-center text-sm text-red-600 px-6">{section.error}</p>
      ) : null}
      {section?.status === "succeeded" && products.length === 0 ? (
        <p className="text-center text-sm text-gray-500 px-6">No products in this collection yet.</p>
      ) : null}

      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 px-6 lg:px-16">
          {products.map((product) => (
            <HomeCollectionSectionProductCard key={product._id} product={product} imageMode="hover" />
          ))}
        </div>
      ) : null}

      {collectionSlug ? (
        <div className="mt-8 flex justify-center px-6 lg:px-16">
          <Link
            to={`/collections/${collectionSlug}`}
            className="relative inline-block border border-black text-white bg-black px-12 py-3 text-sm tracking-widest group cursor-pointer overflow-hidden text-center"
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-black">View all</span>
            <span className="absolute inset-0 bg-white transform -translate-x-full transition-transform duration-500 group-hover:translate-x-0" />
          </Link>
        </div>
      ) : null}
    </section>
  );
}
