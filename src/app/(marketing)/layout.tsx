import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";


// Layout de marketing - Solo para rutas dentro de (marketing)
export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      <div className="w-full max-w-screen">{children}</div>
      <Footer />
    </>
  );
}
