export default function Container({
  children,
  className,
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div className={`w-full max-w-7xl px-4 mx-auto ${className}`}>
      {children}
    </div>
  );
}
