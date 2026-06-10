"use client";

import type { GalleryCategory } from "./gallery-data";

const tabs: { label: string; value: GalleryCategory }[] = [
  { label: "Tất cả", value: "all" },
  { label: "Cưới", value: "wedding" },
  { label: "Chân dung", value: "portrait" },
  { label: "Thời trang", value: "fashion" },
  { label: "Sự kiện", value: "event" },
];

type CategoryTabsProps = {
  activeCategory: GalleryCategory;
  onChange: (category: GalleryCategory) => void;
};

export function CategoryTabs({ activeCategory, onChange }: CategoryTabsProps) {
  return (
    <div className="gallery-tabs" role="tablist" aria-label="Thể loại ảnh">
      {tabs.map((tab) => (
        <button
          aria-selected={activeCategory === tab.value}
          className={activeCategory === tab.value ? "active" : undefined}
          key={tab.value}
          onClick={() => onChange(tab.value)}
          role="tab"
          type="button"
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
