import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@tabler/icons-react";

type ServiceCardProps = {
  categoryLabel: string;
  description: string;
  image: string;
  price: string;
  title: string;
};

export function ServiceCard({
  categoryLabel,
  description,
  image,
  price,
  title,
}: ServiceCardProps) {
  return (
    <article className="services-page-card">
      <div className="services-page-card-media image-zoom">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 900px) 100vw, 33vw"
          className="cover-image zoom-image"
        />
        <span>{categoryLabel}</span>
      </div>
      <div className="services-page-card-copy">
        <h2>{title}</h2>
        <p>{description}</p>
        <Link href="/service-details" aria-label={`Xem chi tiết ${title}`}>
          <strong>{price}</strong>
          <IconArrowRight size={20} stroke={1.8} />
        </Link>
      </div>
    </article>
  );
}
