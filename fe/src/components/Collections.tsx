import { Link } from "react-router-dom";
import ReactPlayer from "react-player";
import SkeletonBox from "./SkeletonBox";


const collectionsOfMuseums = [
    {
        name: "Met Museum",
        query:"Met",
        image: "https://player.vimeo.com/video/1079634672?speed=0&pip=0&loop=1&background=1&app_id=122963",
    },
    {
        name: "Chicago Art Institute",
        query:"Chicago",
        image: "https://www.artic.edu/files/a8a34eff-90e5-4c63-adcd-a22a69c04567/HomepageVideo_v7_LION_small.mp4",
    }
]

export default function Collections({loading = false}: {loading: boolean}) {
    
    if (loading) {
        return (
                  <div className="flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">Explore Collections</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {Array.from({ length: 2 }).map((_, i) => (
            <SkeletonBox key={i} className="h-48 w-full rounded-lg" />
          ))}
        </div>
      </div>
        )
    }

 return (
  <div className="flex flex-col items-center w-full">
    <h2 className="text-2xl sm:text-3xl font-bold mb-6">Explore Collections</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
      {collectionsOfMuseums.map((collection) => (
        <Link
          key={collection.query}
          to={`/search?q=${collection.query}`}
          state={{ museumKey: collection.query }}
          className="group relative block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
        >
          <ReactPlayer
            url={collection.image}
            playing={true}
            loop={true}
            muted={true}
            width="100%"
            height="100%"
            className="pointer-events-none aspect-video object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-black/60 p-4 text-white">
            <h3 className="text-lg sm:text-xl font-semibold">{collection.name}</h3>
          </div>
        </Link>
      ))}
    </div>
  </div>
);

}