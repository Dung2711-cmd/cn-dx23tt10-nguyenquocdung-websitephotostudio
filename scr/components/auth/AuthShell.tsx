import Image from "next/image";

type AuthShellProps = {
  children: React.ReactNode;
};

export function AuthShell({ children }: AuthShellProps) {
  return (
    <main className="auth-page">
      <Image
        src="/images/studio.png"
        alt="Không gian studio"
        fill
        priority
        sizes="100vw"
        className="auth-background"
      />
      <div className="auth-backdrop" />
      <div className="auth-content">{children}</div>
    </main>
  );
}
