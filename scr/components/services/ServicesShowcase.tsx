"use client";

import { useState } from "react";
import { ServiceCard } from "./ServiceCard";
import { serviceCategories, services, type ServiceCategory } from "./services-data";

export function ServicesShowcase() {
  const [activeCategory, setActiveCategory] = useState<ServiceCategory>("all");
  const visibleServices =
    activeCategory === "all"
      ? services
      : services.filter((service) => service.category === activeCategory);

  return (
    <section className="services-page-showcase shell" aria-label="Danh sách dịch vụ">
      <div className="services-page-filters" role="group" aria-label="Lọc dịch vụ">
        {serviceCategories.map((category) => (
          <button
            className={activeCategory === category.value ? "active" : undefined}
            key={category.value}
            onClick={() => setActiveCategory(category.value)}
            type="button"
          >
            {category.label}
          </button>
        ))}
      </div>

      <div className="services-page-grid">
        {visibleServices.map((service) => (
          <ServiceCard
            categoryLabel={service.categoryLabel}
            description={service.description}
            image={service.image}
            key={service.title}
            price={service.price}
            title={service.title}
          />
        ))}
      </div>
    </section>
  );
}
