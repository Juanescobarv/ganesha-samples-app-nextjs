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
    
    const pow_q = (value, exponent) => Math.pow(value, exponent);
    const pow_r = (value, exponent) => Math.pow(value, exponent);

    //NormSInv function to calculate the Z value of the confidence level 
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

        if (p < p_low || p > p_high) {
            q = Math.sqrt(-2 * Math.log(p));
            const coeffs = p < p_low ? a : c;
            const divisor_coeffs = p < p_low ? b : d;
            const powFunc = p < p_low ? pow_q : pow_r;
            const initialValue = p < p_low ? 0 : q;
            return coeffs.reduce((acc, coeff, i) => acc + coeff * powFunc(initialValue, i), 0) / divisor_coeffs.reduce((acc, coeff, i) => acc + coeff * powFunc(initialValue, i), 0) + (p < p_low ? 1 : -1);
        } else {
            q = p - 0.5;
            r = q * q;
            return a.reduce((acc, coeff, i) => acc + coeff * pow_r(r, i), 0) * q / (b.reduce((acc, coeff, i) => acc + coeff * pow_r(r, i), 0) * r + 1);
        }
    };

    //Object to processing data the sample
    const [sampleProcessing, setsampleProcessing] = useState({
        N,
        Z,
        p,
        q,
        e,
        n,

    });


    const saveSampleProcessing = (N, z, p, e) => {
        //Size/universe/population(N)
        sampleProcessing.N = N.length - 1;

        //Confidence level (Z)
        const z = mas.NivelDeConfianza / 100; //Change to decimal
        const alfa = 1 - z; //Significance level
        sampleProcessing.Z = NormSInv(z * (alfa / 2)) * -1; //Z

        //Probability of success (p)
        sampleProcessing.p = p / 100; //Change to decimal

        //Probability of failure (q)
        sampleProcessing.q = 1 - sampleProcessing.p; //q

        //Margin of error (e)
        sampleProcessing.e = e / 100; //Change to decimal

        //Sample size (n)
        sampleProcessing.n = Math.ceil((sampleProcessing.N * sampleProcessing.Z ** 2 * sampleProcessing.p * sampleProcessing.q) / ((sampleProcessing.N - 1) * e ** 2 + sampleProcessing.Z ** 2 * sampleProcessing.p * sampleProcessing.q))

        setsampleProcessing(sampleProcessing);
    };



    return <ProcessingContext.Provider value={{
        sampleProcessing,
        saveSampleProcessing
    }}>{children}</ProcessingContext.Provider>;
}

