"use client";

import { useMemo, useState } from "react";
import { CategoryTabs } from "./CategoryTabs";
import { Lightbox } from "./Lightbox";
import { MasonryGallery } from "./MasonryGallery";
import { galleryItems, type GalleryCategory } from "./gallery-data";

export function GalleryExperience() {
  const [activeCategory, setActiveCategory] = useState<GalleryCategory>("all");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const visibleItems = useMemo(
    () =>
      activeCategory === "all"
        ? galleryItems
        : galleryItems.filter((item) => item.category === activeCategory),
    [activeCategory],
  );

  return (
    <>
      <CategoryTabs activeCategory={activeCategory} onChange={setActiveCategory} />
      <MasonryGallery items={visibleItems} onSelect={setSelectedIndex} />
      <Lightbox
        item={selectedIndex === null ? undefined : visibleItems[selectedIndex]}
        onClose={() => setSelectedIndex(null)}
      />
    </>
  );
}
