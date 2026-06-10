type TermsSectionProps = {
  id: string;
  index: string;
  title: string;
  children: React.ReactNode;
};

export function TermsSection({ children, id, index, title }: TermsSectionProps) {
  return (
    <article className="terms-section" id={id}>
      <header>
        <span>{index}</span>
        <h2>{title}</h2>
      </header>
      <div>{children}</div>
    </article>
  );
}
