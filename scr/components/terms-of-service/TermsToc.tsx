"use client";

import { useEffect, useState } from "react";

type TermsTocItem = {
  id: string;
  label: string;
};

type TermsTocProps = {
  items: TermsTocItem[];
};

export function TermsToc({ items }: TermsTocProps) {
  const [activeId, setActiveId] = useState(items[0]?.id ?? "");

  useEffect(() => {
    if (items.length === 0) {
      return;
    }

    let frameId = 0;

    const updateActiveSection = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(() => {
        const readingLine = window.innerHeight * 0.4;
        const currentSection = items
          .map(({ id }) => document.getElementById(id))
          .filter((section): section is HTMLElement => Boolean(section))
          .reduce<{ distance: number; section: HTMLElement } | null>((closestSection, section) => {
            const bounds = section.getBoundingClientRect();

            if (bounds.bottom < 0 || bounds.top > window.innerHeight) {
              return closestSection;
            }

            const distance = Math.abs(bounds.top - readingLine);

            if (!closestSection || distance < closestSection.distance) {
              return { distance, section };
            }

            return closestSection;
          }, null)?.section;

        if (currentSection) {
          setActiveId(currentSection.id);
        }
      });
    };

    const syncHash = () => {
      const hashId = window.location.hash.slice(1);

      if (items.some((item) => item.id === hashId)) {
        setActiveId(hashId);
        return;
      }

      updateActiveSection();
    };

    const hashFrameId = window.requestAnimationFrame(syncHash);

    window.addEventListener("hashchange", syncHash);
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.cancelAnimationFrame(hashFrameId);
      window.removeEventListener("hashchange", syncHash);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [items]);

  return (
    <aside className="terms-toc" aria-label="Mục lục điều khoản">
      <p>Mục lục</p>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <a
              className={activeId === item.id ? "active" : undefined}
              href={`#${item.id}`}
              aria-current={activeId === item.id ? "location" : undefined}
              onClick={() => setActiveId(item.id)}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </aside>
  );
}
