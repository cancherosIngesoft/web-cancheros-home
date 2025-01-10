import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";

export default function Home() {
  return (
    <div>
      <Navbar />
      <main>
        <h1 className="text-4xl font-bold">Bienvenido a Cancheros</h1>
      </main>
      <Footer />
    </div>
  );
}
