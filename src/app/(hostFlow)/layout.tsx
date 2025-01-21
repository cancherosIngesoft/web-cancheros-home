import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-row overflow-x-hidden">
      <nav className="fixed top-0 left-0 h-full w-16">
        <LateralNavBar />
      </nav>
      <main className="flex-1 h-full p-8">{children}</main>
    </div>
  );
}
