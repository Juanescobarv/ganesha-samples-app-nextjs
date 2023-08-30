"use client";
import { createContext, useContext, useState } from "react";

const ProcessingContext = createContext();

export const useProcessing = () => {
    const context = useContext(ProcessingContext)
    if (!context) {
        throw new Error("useProcessing must be used within a ProcessingProvider")
    }
    return context
}

export const ProcessingProvider = ({ children }) => {
    //normSInv function to calculate the Z value of the confidence level 
    const normSInv = (p) => {
        if (p < 0 || p > 1) {
            console.error("NormSInv: Argument out of range.");
            return 0;
        }

        const a = [-39.6968302866538, 220.946098424521, -275.928510446969, 138.357751867269, -30.6647980661472, 2.50662827745924];
        const b = [-54.4760987982241, 161.585836858041, -155.698979859887, 66.8013118877197, -13.2806815528857];
        const c = [-7.78489400243029e-3, -0.322396458041136, -2.40075827716184, -2.54973253934373, 4.37466414146497, 2.93816398269878];
        const d = [7.78469570904146e-3, 0.32246712907004, 2.445134137143, 3.75440866190742];

        const p_low = 0.02425;
        const p_high = 1 - p_low;

        let q, r;
        let retVal;

        if (p < p_low) {
            q = Math.sqrt(-2 * Math.log(p));
            retVal =
                (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        } else if (p <= p_high) {
            q = p - 0.5;
            r = q * q;
            retVal =
                ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) /
                (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1);
        } else {
            q = Math.sqrt(-2 * Math.log(1 - p));
            retVal =
                -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) /
                ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1);
        }

        return retVal;
    };

    //Object to processing data the sample
    const [sampleProcessing, setSampleProcessing] = useState({
        N: 0,
        Z: 0,
        p: 0,
        q: 0,
        e: 0,
        n: 0,

    });


    const saveSampleProcessing = (N, z, p, e) => { //sample.data, sample.nivelDeConfianza, sample.probabilidadDeExito, sample.errorDeEstimacion
        //Size/universe/population(N)
        sampleProcessing.N = N.length;

        //Confidence level (Z)
        const zeta = parseInt(z) / 100; //Change to decimal
        const alfa = (1 - zeta) / 2; //Significance level
        sampleProcessing.Z = normSInv(zeta * alfa) * (-1); //Z


        //Probability of success (p)
        sampleProcessing.p = parseInt(p) / 100; //Change to decimal

        //Probability of failure (q)
        sampleProcessing.q = 1 - sampleProcessing.p; //q

        //Margin of error (e)
        sampleProcessing.e = parseInt(e) / 100; //Change to decimal

        //Sample size (n)
        console.log(sampleProcessing.n); sampleProcessing.n = Math.ceil((sampleProcessing.N * sampleProcessing.Z ** 2 * sampleProcessing.p * sampleProcessing.q) / ((sampleProcessing.N - 1) * sampleProcessing.e ** 2 + sampleProcessing.Z ** 2 * sampleProcessing.p * sampleProcessing.q));
        setSampleProcessing(sampleProcessing);
    };

    //This is import for generate de graph and the data of the sample
    const indexesArray = (length, muestra) => {
        // Constantes y variables necesarias
        let indexes = []; // Array que contendrá los índices aleatorios
        let startIndex = 1; // Índice inicial
        let parts; // Número de segmentos en los que se dividirá el array
        length >= 10000
            ? (parts = 10)
            : length <= 100
                ? (parts = 2)
                : (parts = 4); // Si length es mayor o igual a 10000, segment = 10, si length es menor a 100, segment = 2, si no, segment = 4
        // Tamaño de la muestra dividido entre el número de segmentos(oartes)
        let splitSample;

        muestra % parts === 0
            ? (splitSample = muestra / parts)
            : (splitSample = Math.floor(muestra / parts));
        const partSize = Math.floor(length / parts); // Tamaño de cada parte

        const count = splitSample;
        // For para dividir el array en partes iguales
        for (let i = 0; i < parts; i++) {
            //Ejemplo: con un array de 20 elementos y 2 partes
            let endIndex = startIndex + partSize; // endIndex = 10
            if (i === parts - 1) { 
                // Si i = 1
                endIndex = length; // endIndex = 20
                splitSample = muestra; // splitSample = 20
            }

            while (indexes.length < splitSample) { // Mientras que el array indexes tenga menos elementos que el tamaño de la muestra
                let randomIndex = Math.floor( // randomIndex = 10
                    Math.random() * (endIndex - startIndex + 1) + startIndex // Math.random() * (20 - 10 + 1) + 10
                );

                if (indexes.indexOf(randomIndex) === -1) { // Si el índice aleatorio no está en el array indexes
                    indexes.push(randomIndex); // Añadir el índice aleatorio al array indexes
                }
            }
            splitSample += count; // splitSample = 20 + 10
            startIndex = endIndex; // startIndex = 10
        }
        // ordenar los indices aleatorios
        indexes.sort((a, b) => a - b); // Ordenar los índices aleatorios de menor a mayor
        //Si el ultimo elemento del array indexes es igual al tamaño del array, restarle 1
        indexes[indexes.length - 1] === length ? indexes[indexes.length - 1] -= 1 : indexes[indexes.length - 1] = indexes[indexes.length - 1];
        
        return indexes //Un array con los índices aleatorios 
    }

    return <ProcessingContext.Provider value={{
        sampleProcessing,
        saveSampleProcessing,
        indexesArray
    }}>{children}</ProcessingContext.Provider>;
}

