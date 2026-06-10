type AuthFieldProps = {
  label: string;
  name: string;
  placeholder: string;
  type?: string;
};

export function AuthField({ label, name, placeholder, type = "text" }: AuthFieldProps) {
  return (
    <label className="auth-field">
      <span>{label}</span>
      <input name={name} placeholder={placeholder} type={type} />
    </label>
  );
}
