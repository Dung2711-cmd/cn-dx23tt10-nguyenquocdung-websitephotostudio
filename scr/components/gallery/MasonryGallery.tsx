"use client";

import Image from "next/image";
import type { GalleryItem } from "./gallery-data";

type MasonryGalleryProps = {
  items: GalleryItem[];
  onSelect: (index: number) => void;
};

export function MasonryGallery({ items, onSelect }: MasonryGalleryProps) {
  return (
    <section className="masonry-gallery">
      {items.map((item, index) => (
        <button
          className={`${item.className} image-zoom`}
          key={`${item.image}-${item.alt}`}
          onClick={() => onSelect(index)}
          type="button"
        >
          <Image src={item.image} alt={item.alt} fill sizes="(max-width: 900px) 100vw, 33vw" className="cover-image zoom-image" />
        </button>
      ))}
    </section>
  );
}
