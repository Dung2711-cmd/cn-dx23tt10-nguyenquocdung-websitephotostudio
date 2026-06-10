"use client";

import Image from "next/image";
import type { GalleryItem } from "./gallery-data";

type LightboxProps = {
  item?: GalleryItem;
  onClose: () => void;
};

export function Lightbox({ item, onClose }: LightboxProps) {
  if (!item) return null;

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label={item.alt}>
      <button aria-label="Đóng" onClick={onClose} type="button">
        ×
      </button>
      <div>
        <Image src={item.image} alt={item.alt} fill sizes="100vw" className="contain-image" />
      </div>
    </div>
  );
}
