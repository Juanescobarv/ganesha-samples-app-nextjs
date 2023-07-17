"use client";
import { createContext, useContext, useState } from "react";

const DataContext = createContext();

export const useData = () => {
    const context = useContext(DataContext)
    if (!context) {
        throw new Error("useData must be used within a DataProvider")
    }
    return context
};

export const DataProvider = ({ children }) => {
    //Load data from excel
    const [data, setData] = useState([]); 
    const saveData = (data) => {
        setData(data);
    };
    //Load data from Sample
    const [sample, setSample] = useState({
        nombre: "",
        apellido: "",
        correo: "",
        auditoria: "",
        TamanoPoblacion: 0, //Tamaño del Universo/Población(N)
        NivelDeConfianza: "",
        ProbabilidadDeExito: "",
        ErrorDeEstimacion: "",
        data: [],
      });

    const saveSample = (sample) => {
        setSample(sample);
    };

    return <DataContext.Provider value={{
        data,
        saveData, 
        sample,
        saveSample
    }}>{children}</DataContext.Provider>;
};


