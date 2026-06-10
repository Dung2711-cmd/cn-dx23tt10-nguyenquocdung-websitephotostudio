export type GalleryCategory = "all" | "wedding" | "portrait" | "fashion" | "event";

export type GalleryItem = {
  image: string;
  alt: string;
  className: string;
  category: Exclude<GalleryCategory, "all">;
};

export const galleryItems: GalleryItem[] = [
  {
    image: "/images/wedding.png",
    alt: "Ảnh cưới trong hành lang cổ điển",
    className: "gallery-item gallery-item--tall",
    category: "wedding",
  },
  {
    image: "/images/portrait.png",
    alt: "Chân dung nghệ thuật",
    className: "gallery-item gallery-item--large",
    category: "portrait",
  },
  {
    image: "/images/fashion.png",
    alt: "Ảnh thời trang",
    className: "gallery-item gallery-item--medium",
    category: "fashion",
  },
  {
    image: "/images/service-gallery-rings.png",
    alt: "Nhẫn cưới",
    className: "gallery-item gallery-item--short",
    category: "wedding",
  },
  {
    image: "/images/team-linh-chi.png",
    alt: "Chân dung nữ",
    className: "gallery-item gallery-item--medium",
    category: "portrait",
  },
  {
    image: "/images/service-gallery-table.png",
    alt: "Bàn tiệc",
    className: "gallery-item gallery-item--tall",
    category: "event",
  },
  {
    image: "/images/team-minh-quan.png",
    alt: "Chân dung thời trang nam",
    className: "gallery-item gallery-item--medium",
    category: "fashion",
  },
];
