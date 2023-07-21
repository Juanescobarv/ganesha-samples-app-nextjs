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
    //load date of the day
    const date = new Date();
    const [day, month, year] = [date.getDate(), date.getMonth() + 1, date.getFullYear()];
    const fullDate = `${day}/${month}/${year}`;

    //Load data from excel
    const [data, setData] = useState([]); 
    const saveData = (data) => {
        setData(data);
    };

    //Object to save the sample
    const [sample, setSample] = useState({
        fecha: fullDate, //Date of the sample
        nombre: '', //Name of the investigator
        apellido: '', //Last name of the investigator
        correo: '', //Email of the investigator
        auditoria: '', //Name of the audit
        tamanoPoblacion: 0, //Size/universe/population(N)
        nivelDeConfianza: 95, //Confidence level (Z)
        probabilidadDeExito: 50, //Probability of success (p)
        probailidadDeFallo: 50, //Probability of failure (q)
        errorDeEstimacion: 5, //Margin of error (e)
        data: [], //Data from the sample
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


