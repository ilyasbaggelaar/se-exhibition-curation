import { Link } from "react-router-dom";
import { useState } from "react";

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
	{
		name: "Asian Art",
		query: "Asian",
		image:
			"https://www.artic.edu/iiif/2/cef4e5df-a749-090b-b897-7d5f40654685/full/843,/0/default.jpg",
	},
	{
		name: "European Sculpture and Decorative Arts",
		query: "European Sculpture",
		image: "https://images.metmuseum.org/CRDImages/es/web-large/DP224276.jpg",
	},
	{
		name: "European Paintings",
		query: "European Paintings",
		image: "https://images.metmuseum.org/CRDImages/ep/web-large/DT8310.jpg",
	},
	{
		name: "Egyptian Art",
		query: "Egyptian",
		image:
			"https://www.artic.edu/iiif/2/9365a024-75ce-75e9-756f-1c2c96eadec9/full/843,/0/default.jpg",
	},
	{
		name: "Islamic Art",
		query: "Islamic Art",
		image: "https://images.metmuseum.org/CRDImages/is/web-large/DP240367.jpg",
	},
	{
		name: "Arms and Armor",
		query: "Arms and Armor",
		image:
			"https://www.artic.edu/iiif/2/ca207e0a-de5f-4bcb-5541-90f5cc4487a1/full/843,/0/default.jpg",
	},
	{
		name: "Drawings and Prints",
		query: "Drawings and prints",
		image: "https://images.metmuseum.org/CRDImages/dp/web-large/DP297385.jpg",
	},
	{
		name: "Photographs",
		query: "Photographs",
		image:
			"https://www.artic.edu/iiif/2/d447305a-6898-0ddc-c191-e99508a5e77e/full/843,/0/default.jpg",
	},
	{
		name: "Musical Instruments",
		query: "Musical Instury",
		image:
			"https://www.artic.edu/iiif/2/777ff25c-4228-8e1d-c428-1f939347df94/full/843,/0/default.jpg",
	},
];

export default function CategoryGrid() {
	const [showMore, setShowMore] = useState(false);

	const sortedCategories = [...categories].sort((a, b) =>
		a.name.localeCompare(b.name)
	);

	const firstThree = sortedCategories.slice(0, 3);
	const rest = sortedCategories.slice(3);

	return (
		<>
			{/* CATEGORY SECTION */}
			<h1 className="text-3xl font-semibold mb-6">Choose a category</h1>
			<button
				onClick={() => setShowMore((prev) => !prev)}
				className="mb-6 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
			>
				{showMore ? "Show Less" : "More Categories"}
			</button>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-5">
				{firstThree.map((cat) => (
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


			{showMore && (
				<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
					{rest.map((cat) => (
						<Link
							key={cat.query}
							to={`/search?q=${encodeURIComponent(cat.query)}&tags&hasImages=true`}
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
			)}
		</>
	);
}
