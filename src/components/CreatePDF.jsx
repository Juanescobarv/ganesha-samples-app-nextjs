"use client";
import { useData } from "@/context/DataContext";
import { useProcessing } from "@/context/ProcessingContext";
import { useRef } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export function CreatePDF() {
    //Context data
    const { sample } = useData();

    //Context processing
    const { sampleProcessing } = useProcessing();

    //Create a ref by importing useRef from react
    const inputRef = useRef();

    //Create a function that will be called on button click
    const downloadPDF = () => {
        const input = inputRef.current;
        //Get the html2canvas element
        html2canvas(input).then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            const pdf = new jsPDF();
            pdf.addImage(imgData, "JPEG", 10, 5);
            pdf.save("muestra-auditoria.pdf");
        });
    };

    return (
        <>
         <div ref={inputRef}>
            <p>Fecha de selección de muestra: {sample.fecha}</p>
            <p>Diseño muestral: Muestra Aleatoria Simple</p>

            <p>Nombre de la auditoria: {sample.auditoria}</p>
            <p>Periodo de la auditoria: Desde {sample.periodoInicio} hasta {sample.periodoFin}</p>
            <p>Nombre de la prueba: {sample.prueba}</p>
            <p>Descripción: {sample.descripcion} </p>

            <p>Nombre del auditor: {sample.nombre}</p>
            <p>Correo: {sample.correo}</p>

            <p>Tamaño de la población: {sampleProcessing.N}</p>
            <p>Nivel de confianza: {sample.nivelDeConfianza}%</p>
            <p>Probabilidad de éxito: {sample.probabilidadDeExito}%</p>
            <p>Probabilidad de fallo: {Math.ceil((sampleProcessing.q) * 100)}%</p>
            <p>Error de estimación: {sample.errorDeEstimacion}%</p>
            <p>Tamaño de la muestra: {sampleProcessing.n}</p>
            <p>-----</p>
            
        </div>
        <button className="w-1/6 h-12 rounded-lg mx-auto my-6 text-white"
                style={{ background: "#EE2B7B" }} onClick={downloadPDF}>Download PDF</button>
        </>
       
    )
}


