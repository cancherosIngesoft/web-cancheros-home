"use client";
import { useState, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";

interface PDFComponentProps {
  pdfUrl: string;
}

const PDFComponent = ({ pdfUrl }: PDFComponentProps) => {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState<number>(1);

  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.js`;
  }, []);

  function onDocumentLoadSuccess({ numPages }: { numPages: number }) {
    setNumPages(numPages);
  }

  return (
    <div className="flex flex-col items-center">
      <Document
        file={pdfUrl}
        onLoadSuccess={onDocumentLoadSuccess}
        className="max-w-full"
      >
        <Page
          pageNumber={pageNumber}
          renderTextLayer={true}
          renderAnnotationLayer={true}
          className="max-w-full"
        />
      </Document>
      <div className="mt-4 flex gap-4 items-center">
        <button
          onClick={() => setPageNumber((page) => Math.max(page - 1, 1))}
          disabled={pageNumber <= 1}
          className="px-4 py-2 bg-[#1A6B51] text-white rounded disabled:opacity-50"
        >
          Anterior
        </button>
        <p>
          Página {pageNumber} de {numPages}
        </p>
        <button
          onClick={() => setPageNumber((page) => Math.min(page + 1, numPages))}
          disabled={pageNumber >= numPages}
          className="px-4 py-2 bg-[#1A6B51] text-white rounded disabled:opacity-50"
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PDFComponent;
