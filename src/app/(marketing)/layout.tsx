import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";


// Layout de marketing - Solo para rutas dentro de (marketing)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-full flex flex-col overflow-y-auto">
      <Navbar />
      <div className="flex-1">{children}</div>
      <Footer />
    </div>
  );
}