import Image from "next/image";

type TeamCardProps = {
  image: string;
  name: string;
  role: string;
};

export function TeamCard({ image, name, role }: TeamCardProps) {
  return (
    <article className="team-card">
      <div className="team-card-media image-zoom">
        <Image src={image} alt={name} fill sizes="(max-width: 900px) 100vw, 33vw" className="cover-image zoom-image" />
      </div>
      <h3>{name}</h3>
      <p>{role}</p>
    </article>
  );
}
