import { useEffect, useRef, useState } from "react";
import { searchMesArtworks } from "../api/mesuemApi";
import { Link } from "react-router-dom";
import SkeletonBox from "./SkeletonBox";
import ArtworkPopUp from "./ArtworkPopUp";


export default function ExploreArtScroller({loading = false}: {loading?: boolean}) {

  const [exploreArt, setExploreArt] = useState<any[]>([]);
  const [centerIndex, setCenterIndex] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selectedArtwork, setSelectedArtowrk] = useState<any>(null);
  const [popUpOpen, setPopUpOpen] = useState(false);


  useEffect(() => {
    const fetchExploreArt = async () => {
      const { artworks } = await searchMesArtworks("art", 1, 30, {
        tags: true,
        hasImages: true,
      });

      const shuffled = artworks.sort(() => 0.5 - Math.random());
      setExploreArt(shuffled.slice(0, 10)); // Limit to 10 items
    };

    fetchExploreArt();
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const scrollStep = 280;
    let currentScroll = 0;
    let interval: number;

    const startAutoScrolling = () => {
      interval = window.setInterval(() => {
        if (!container || isHovering) return;

        const maxScroll = container.scrollWidth - container.clientWidth;

        if (currentScroll >= maxScroll - scrollStep) {
          container.scrollTo({ left: 0, behavior: "smooth" });
          currentScroll = 0;
        } else {
          currentScroll += scrollStep;
          container.scrollBy({ left: scrollStep, behavior: "smooth" });
        }
      }, 3500);
    };

    startAutoScrolling();

    return () => clearInterval(interval);
  }, [isHovering]);

  // Center detection on scroll
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    const updateCenterIndex = () => {
      const containerRect = container.getBoundingClientRect();
      const containerCenter = containerRect.left + containerRect.width / 2;

      let closestIndex = 0;
      let closestDistance = Infinity;

      const items = Array.from(container.querySelectorAll(".art-tile"));

      items.forEach((el, index) => {
        const rect = el.getBoundingClientRect();
        const itemCenter = rect.left + rect.width / 2;
        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setCenterIndex(closestIndex);
    };

    container.addEventListener("scroll", updateCenterIndex);
    window.addEventListener("resize", updateCenterIndex);
    updateCenterIndex();

    return () => {
      container.removeEventListener("scroll", updateCenterIndex);
      window.removeEventListener("resize", updateCenterIndex);
    };
  }, [exploreArt]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!scrollRef.current) return;

      if (e.key === "ArrowRight" || e.key === "PageDown") {
        scrollRef.current.scrollBy({ left: 300, behavior: "smooth" });
      } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
        scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    let startX = 0;

    const onTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX;
    };

    const onTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX;
      const diffX = endX - startX;

      if (Math.abs(diffX) > 50) {
        const direction = diffX > 0 ? -1 : 1;
        el.scrollBy({ left: direction * 300, behavior: "smooth" });
      }
    };

    el.addEventListener("touchstart", onTouchStart);
    el.addEventListener("touchend", onTouchEnd);

    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, []);

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
  
    let lastScroll = 0;
  
    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return;
  
      e.preventDefault(); // Disable native vertical scroll
  
      const now = Date.now();
      const timeSinceLast = now - lastScroll;
      lastScroll = now;
  
      // If scrolling very fast, skip any smooth behavior
      const behavior = timeSinceLast < 100 ? "auto" : "smooth";
  
      container.scrollBy({
        left: e.deltaY,
        behavior,
      });
    };
  
    container.addEventListener("wheel", handleWheel, { passive: false });
    return () => container.removeEventListener("wheel", handleWheel);
  }, []);


  if (loading) {

    return(
          <div className="px-4">
        <h2 className="text-3xl font-semibold text-center mb-8">Today's top picks</h2>
        <div className="flex gap-6 overflow-x-auto no-scrollbar py-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonBox key={i} className="w-64 h-80 rounded-xl" />
          ))}
        </div>
      </div>
      )
  }

    return (
        <>
              
      <div className="text-center mb-8">
        <h2 className="text-3xl font-semibold">Today's top picks</h2>
      </div>

      <div
        ref={scrollRef}
        className="overflow-x-auto no-scrollbar px-4 -mx-4"
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
      >
        <div className="flex gap-6 items-end py-4 min-w-max">
          {exploreArt.map((art, index) => {
            const isHovered = hoveredIndex === index;
            const isCenter = index === centerIndex;
            const isActive = hoveredIndex !== null ? isHovered : isCenter;
            const scale = isActive ? 1.08 : 0.95;
            const brightness = isActive
              ? "brightness(100%)"
              : "brightness(75%)";
            const zIndex = isActive ? 30 : 10;

            return (
              <div
                key={art.objectID || index}
                className={`art-tile relative transition-all duration-500 rounded-xl overflow-hidden shadow-xl`}
                style={{
                  transform: `scale(${scale})`,
                  filter: brightness,
                  zIndex,
                  width: "16rem",
                  height: "22rem",
                }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => {
                  setSelectedArtowrk(art);
                  setPopUpOpen(true);
                }}
              >
                {art.primaryImageSmall ? (
                  <img
                    src={art.primaryImageSmall}
                    alt={art.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-300" />
                )}
                <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white p-3 text-sm">
                  <div className="font-semibold truncate">{art.title}</div>
                  <div className="text-xs truncate">
                    {art.artistDisplayName || "Unknown Artist"}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <ArtworkPopUp
  isOpen={popUpOpen}
  onClose={() => setPopUpOpen(false)}
  artwork={selectedArtwork}
/>
      </div>
        </>
    )
}


