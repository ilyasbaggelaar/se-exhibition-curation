import { Link } from "react-router-dom";

const categories = [
  {
    name: "Modern Art",
    query: "modern",
    image: "https://images.metmuseum.org/CRDImages/es/web-large/DP237684.jpg",
  },
  {
    name: "Renaissance",
    query: "renaissance",
    image:
      "https://images.metmuseum.org/CRDImages/ep/web-large/DP-13139-001.jpg",
  },
];

export default function CategoryGrid() {
    return (
        <>
        {/* CATEGORY SECTION */}
      <h1 className="text-3xl font-semibold mb-6">Choose a category</h1>

<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-16">
  {categories.map((cat) => (
    <Link
      key={cat.query}
      to={`/search?q=${encodeURIComponent(
        cat.query
      )}&tags&hasImages=true`}
      className="relative group rounded-3xl overflow-hidden shadow-lg transition-transform hover:scale-[1.02] duration-300"
    >
      <img
        src={cat.image}
        alt={cat.name}
        className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      <div className="absolute bottom-6 left-6">
        <h2 className="text-white text-3xl font-semibold drop-shadow-xl">
          {cat.name}
        </h2>
      </div>
    </Link>
  ))}
</div>
        </>
    )

}