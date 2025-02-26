"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

interface PDFComponentProps {
  pdfUrl: string;
}

const PDFComponent = ({ pdfUrl }: PDFComponentProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [isLoading, setIsLoading] = useState(true);
  const [scale, setScale] = useState(1.0);

  useEffect(() => {
    // Configurar el worker
    const workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;
    pdfjs.GlobalWorkerOptions.workerSrc = workerSrc;
  }, []);

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const changePage = (offset: number) => {
    setPageNumber((prevPageNumber) => {
      const newPageNumber = prevPageNumber + offset;
      return Math.min(Math.max(1, newPageNumber), numPages);
    });
  };

  return (
    <div className="flex flex-col items-center">
      {/* Controles de zoom */}
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={() => setScale((s) => Math.max(0.5, s - 0.1))}
          className="px-3 py-1 bg-[#1A6B51] text-white rounded"
        >
          -
        </button>
        <span>{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale((s) => Math.min(2, s + 0.1))}
          className="px-3 py-1 bg-[#1A6B51] text-white rounded"
        >
          +
        </button>
      </div>

      {/* Contenedor del PDF */}
      <div className="w-full overflow-auto flex justify-center">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div className="flex justify-center items-center h-[400px]">
              Cargando PDF...
            </div>
          }
          error={
            <div className="flex justify-center items-center h-[400px] text-red-500">
              Error al cargar el PDF. Por favor, intente de nuevo.
            </div>
          }
        >
          {!isLoading && (
            <Page
              pageNumber={pageNumber}
              scale={scale}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              className="shadow-lg"
            />
          )}
        </Document>
      </div>

      {/* Controles de navegación */}
      {numPages > 0 && (
        <div className="mt-4 flex items-center gap-4">
          <button
            onClick={() => changePage(-1)}
            disabled={pageNumber <= 1}
            className="px-4 py-2 bg-[#1A6B51] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span>
            Página {pageNumber} de {numPages}
          </span>
          <button
            onClick={() => changePage(1)}
            disabled={pageNumber >= numPages}
            className="px-4 py-2 bg-[#1A6B51] text-white rounded disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Siguiente
          </button>
        </div>
      )}
    </div>
  );
};

export default PDFComponent;
