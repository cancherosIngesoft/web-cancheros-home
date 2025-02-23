import { LateralNavBar } from "@/components/layout/LateralNavBar";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full h-full flex flex-row overflow-x-hidden">
      <nav className="fixed w-full bottom-0  md:top-0 md:left-0 md:bottom-none h-16 md:h-full md:w-16">
        <LateralNavBar />
      </nav>
      <main className="flex-1 h-full p-2 py-4 mb-10 md:pb-0 md:p-8">{children}</main>
    </div>
  );
}
