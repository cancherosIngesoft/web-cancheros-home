"use client";
import dynamic from "next/dynamic";

// Importar el componente PDF de manera dinámica con no-SSR
const PDFComponent = dynamic(() => import("./PDFComponent"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-[400px]">
      Cargando visor de PDF...
    </div>
  ),
});

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  return <PDFComponent pdfUrl={pdfUrl} />;
};

export default PDFViewer;
