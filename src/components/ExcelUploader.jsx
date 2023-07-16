"use client";
import { useState } from "react";
import { useData } from "@/context/DataContext";
import * as XLSX from "xlsx";
import { Spinner } from "@/components/Spinner";

export function ExcelUploader() {
    //Loading State
    const [file, setFile] = useState(null);
    const [hasFile, setHasFile] = useState(false);
    //Success Message Spinner
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    //Context Data
    const { saveData, data } = useData();

    const handleDrop = (event) => {
        setIsLoading(true);
        setShowSuccessMessage(false); // Reset the success message

        event.preventDefault();
        const newFile =
            (event.dataTransfer && event.dataTransfer.files[0]) ||
            (event.target && event.target.files[0]);

        if (hasFile) {
            const confirmReplace = window.confirm(
                "¿Está seguro de que desea reemplazar el archivo existente?"
            );
            if (!confirmReplace) {
                setIsLoading(false);
                saveData(data);
                return;
            }
        }

        setFile(newFile);
        setHasFile(true);

        const reader = new FileReader();
        reader.onload = (event) => {
            const data = new Uint8Array(event.target.result);
            const workbook = XLSX.read(data, { type: "array" });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const dataArray = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            saveData(dataArray);
            setIsLoading(false);
        };
        reader.readAsArrayBuffer(newFile);

        setTimeout(() => {
            setIsLoading(false);
            setShowSuccessMessage(true);
        }, 1000); // Show the message after 1 second


    };
    const handleButtonClick = () => {
        document.getElementById("fileInput").click();
    };

    return (
        <div>
            <section
                onDragOver={(event) => event.preventDefault()}
                onDrop={handleDrop}

            >
                <div>
                    <input
                        type="file"
                        id="fileInput"
                        onChange={handleDrop}
                        style={{ display: "none" }}
                    />
                    <div className="grid gap-2 p-2">
                        <button onClick={handleButtonClick} type="button" className="btn btn-lg btn-primary m-4 mb-1 h-20 rounded-lg bg-gray-300 text-black text-2xl">Pulse o arrastre aquí para cargar un archivo</button>
                    </div>
                    {
                        isLoading && <p className="text-center mb-6 text-2xl"> El archivo <b>{file.name}</b> está siendo cargado</p>
                    }

                    {isLoading && <Spinner />}

                    {!isLoading && showSuccessMessage && (
                        <p className="text-center text-2xl">Archivo <b>{file.name}</b> cargado con éxito</p>
                    )}

                    {!isLoading && hasFile && !showSuccessMessage && (
                        <p className="text-center text-2xl">Archivo <b>{file.name}</b> cargado</p>
                    )}

                </div>
            </section>
        </div>
    );
}