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
    const [indexes, setIndexes] = useState([]);

    const saveData = (data) => {
        setData(data);
    };

    const saveIndexes = (indexes) => {
        setIndexes(indexes);
    };

    //Object to save the sample
    const [sample, setSample] = useState({
        fecha: fullDate, //Date of the sample
        auditoria: '', //Name of the audit
        periodoInicio: '', //Start date of the audit
        periodoFin: '', //End date of the audit
        prueba: '', //Last name of the investigator
        descripcion: '', //Description of the test

        nombre: '', //Name of the investigator
        correo: '', //Email of the investigator

        tamanoPoblacion: 0, //Size/universe/population(N)
        nivelDeConfianza: 90, //Confidence level (Z)
        probabilidadDeExito: 50, //Probability of success (p)
        probailidadDeFallo: 50, //Probability of failure (q)
        errorDeEstimacion: 10, //Margin of error ()

        headerExcel: [], //Header of the excel
        data: [], //Data from the sample
        indexes: [], //Indexes of the data
    });

    //Save the data of the sample
    sample.data = data
    sample.indexes = indexes

    const saveSample = (sample) => {
        setSample(sample);
    };

    return <DataContext.Provider value={{
        data,
        saveData,
        indexes,
        saveIndexes,
        sample,
        saveSample
    }}>{children}</DataContext.Provider>;
};


