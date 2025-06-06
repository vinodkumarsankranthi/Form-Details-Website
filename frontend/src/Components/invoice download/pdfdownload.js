import React, { useRef, useState } from "react";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

function DownloadPdf() {
  const [isLoading, setIsLoading] = useState(false);
  const slipRef = useRef();

  const handleDownloadPdf = () => {
    setIsLoading(true);
    const slipElement = slipRef.current;

    html2canvas(slipElement, {
      scale: 2, // Increase scale for better quality
      width: 610, // Fixed width for desktop view
      height: slipElement.scrollHeight, // Adjust height based on the content
      windowWidth: 1200, // Set window width for rendering like desktop
    }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4", true);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
      const imgX = (pdfWidth - imgWidth * ratio) / 2;
      const imgY = 10;

      pdf.addImage(
        imgData,
        "PNG",
        imgX,
        imgY,
        imgWidth * ratio,
        imgHeight * ratio
      );

      pdf.save(`invoice.pdf`);
      setIsLoading(false);
    });
  };

  return (
    <div>
      <div ref={slipRef} style={{ padding: "20px", border: "1px solid #ccc" }}>
        {/* The content to be included in the PDF */}
        <h2>Download Pdf</h2>
        <p>paragraph</p>
        <p>paragraph</p>
      </div>
      <Button onClick={handleDownloadPdf} disabled={isLoading}>
        {isLoading ? "Generating PDF..." : "Download PDF"}
      </Button>
    </div>
  );
}

export default DownloadPdf;
