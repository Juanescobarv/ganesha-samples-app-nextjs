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
    const [data, SetData] = useState([]);

    const saveData = (data) => {
        SetData(data);
    };

    return <DataContext.Provider value={{
        data,
        saveData
    }}>{children}</DataContext.Provider>;
};


