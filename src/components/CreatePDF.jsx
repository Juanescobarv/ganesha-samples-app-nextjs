"use client";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function CreatePDF({ inputRef }) {
    const downloadPDF = () => {
        const input = inputRef.current;
    
        const pdfWidth = 800;
        const pdfHeight = 900;
    
        const pdf = new jsPDF({
            orientation: "portrait",
            unit: "px",
            format: [pdfWidth, pdfHeight],
        });
    
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
    
            // Calcula el tamaño de la imagen un 35% más pequeña que el tamaño original
            const scaleFactor = 0.75;
            const pdfImageWidth = canvas.width * scaleFactor;
            const pdfImageHeight = canvas.height * scaleFactor;
    
            // Calcula las posiciones para centrar la imagen en el PDF
            const offsetX = (pdfWidth - pdfImageWidth) / 2;
            const offsetY = (pdfHeight - pdfImageHeight) / 2;
    
            pdf.addImage(imgData, "PNG", offsetX, offsetY, pdfImageWidth, pdfImageHeight);
            pdf.save("muestra-auditoria.pdf");
        });
    };
    
    return (
        <div className="w-52 ml-5">
            <button className="w-52 h-12 rounded-lg mx-auto my-3 mb-10 text-white"
                style={{ background: "#EE2B7B" }} onClick={downloadPDF}>Descargar PDF</button>
        </div>

    )
}


