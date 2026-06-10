const logos = ["Vogue", "Bazaar", "Elle"];

export function AuthPress() {
  return (
    <div className="auth-press" aria-label="Ấn phẩm đã giới thiệu Studio Elegance">
      {logos.map((logo) => (
        <span key={logo}>{logo}</span>
      ))}
    </div>
  );
}
