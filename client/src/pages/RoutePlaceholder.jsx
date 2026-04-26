import { Link, useLocation, useParams } from "react-router";

const formatSegment = (value = "") =>
  value
    .replace(/-/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase());

export default function RoutePlaceholder() {
  const location = useLocation();
  const params = useParams();

  const routeTitle =
    params.slug && params.group
      ? `${formatSegment(params.group)} / ${formatSegment(params.slug)}`
      : params.query
        ? `Search: ${decodeURIComponent(params.query)}`
        : formatSegment(location.pathname.slice(1)) || "Page";

  return (
    <section className="min-h-[60vh] px-6 lg:px-16 py-16">
      <h1 className="text-2xl lg:text-4xl tracking-widest uppercase">{routeTitle}</h1>
      <p className="mt-4 max-w-2xl text-gray-600">
        This page route is now connected. You can replace this placeholder with your final section or product listing
        component anytime.
      </p>
      <Link to="/" className="inline-block mt-8 border border-black px-6 py-3 text-xs tracking-widest uppercase">
        Back to Home
      </Link>
    </section>
  );
}

