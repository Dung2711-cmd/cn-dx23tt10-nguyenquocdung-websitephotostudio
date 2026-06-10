import { IconBrandFacebook, IconBrandInstagram, IconBrandThreads } from "@tabler/icons-react";

const links = [
  { label: "Instagram", icon: IconBrandInstagram },
  { label: "Facebook", icon: IconBrandFacebook },
  { label: "Threads", icon: IconBrandThreads },
];

export function SocialLinks() {
  return (
    <nav className="contact-social-links" aria-label="Mạng xã hội">
      {links.map(({ icon: Icon, label }) => (
        <a href="#" key={label} aria-label={label}>
          <Icon size={18} stroke={1.7} />
        </a>
      ))}
    </nav>
  );
}
