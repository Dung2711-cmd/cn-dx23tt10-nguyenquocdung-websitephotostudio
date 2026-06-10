"use client";

import Image from "next/image";
import { useState } from "react";

type BookingDetailGalleryProps = {
  images: string[];
  packageLabel: string;
  title: string;
};

export function BookingDetailGallery({ images, packageLabel, title }: BookingDetailGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);

  return (
    <section className="booking-detail-gallery" aria-label="Gallery booking">
      <div className="booking-detail-main-image image-zoom">
        <Image
          src={activeImage}
          alt={title}
          fill
          priority
          sizes="(max-width: 900px) 100vw, 58vw"
          className="cover-image zoom-image"
        />
        <div>
          <span>{packageLabel}</span>
          <h2>The Grand Atelier Studio</h2>
        </div>
      </div>
      <div className="booking-detail-thumbs">
        {images.map((image, index) => (
          <button
            className={activeImage === image ? "active image-zoom" : "image-zoom"}
            key={image}
            onClick={() => setActiveImage(image)}
            type="button"
          >
            <Image
              src={image}
              alt={`${title} ${index + 1}`}
              fill
              sizes="(max-width: 900px) 30vw, 12vw"
              className="cover-image zoom-image"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
