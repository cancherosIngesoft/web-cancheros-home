"use client";
import { useState } from "react";
import dynamic from "next/dynamic";
import { Document, Page } from "react-pdf";
import "react-pdf/dist/esm/Page/AnnotationLayer.css";
import "react-pdf/dist/esm/Page/TextLayer.css";

// Configurar el worker usando la versión del navegador
import { pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

interface PDFViewerProps {
  pdfUrl: string;
}

const PDFViewer = ({ pdfUrl }: PDFViewerProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [scale, setScale] = useState(1.0);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 flex gap-4 items-center">
        <button
          onClick={() => setScale((scale) => Math.max(scale - 0.1, 0.5))}
          className="px-3 py-1 bg-[#1A6B51] text-white rounded"
        >
          -
        </button>
        <span>{Math.round(scale * 100)}%</span>
        <button
          onClick={() => setScale((scale) => Math.min(scale + 0.1, 2))}
          className="px-3 py-1 bg-[#1A6B51] text-white rounded"
        >
          +
        </button>
      </div>

      <div className="max-h-[800px] overflow-auto border rounded-lg p-4">
        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center gap-4"
        >
          {Array.from(new Array(numPages), (el, index) => (
            <Page
              key={`page_${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              scale={scale}
            />
          ))}
        </Document>
      </div>

      <div className="mt-4 text-center">
        <p>Total de páginas: {numPages}</p>
      </div>
    </div>
  );
};

export default PDFViewer;
