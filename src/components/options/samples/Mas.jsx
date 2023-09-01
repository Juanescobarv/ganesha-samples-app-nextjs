'use client'
import { useState } from "react";
import { useData } from "@/context/DataContext";
import { useProcessing } from "@/context/ProcessingContext";
import { TechnicalMas } from "@/components/technical_samples/TechnicalMas";
import { ExcelDownloader } from "@/components/ExcelDownloader";

export function Mas() {
  //Loading State
  const [hasData, setHasData] = useState(false);
  //Context Data
  const { data, saveData, saveIndexes, sample, saveSample } = useData();
  //Use Processing
  const { sampleProcessing, indexesArray } = useProcessing();

  //Loading State Sample
  const onChange = async (event) => {
    event.preventDefault();
    await saveSample({ ...sample, [event.target.name]: event.target.value });
    await setHasData(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    //Data
    if (sampleProcessing.N === 0) {
      //Header
      const headerExcel = data[0]; //Header of the Excel
      sample.headerExcel = headerExcel//Save the header of the Excel
      const dataSave = await data.slice(1); //Data without the header
      
     
      await saveData(dataSave)
    }else {
     
      await saveData(data)
    }

    await setHasData(true);

    //Indexes
    const indexes = await indexesArray(sampleProcessing.N, sampleProcessing.n); //Array of indexes
    
    await saveIndexes(indexes)
  };

  return (
    <section>
      <form className="form-select-sm flex flex-col" onSubmit={handleSubmit}>
        <div className="flex flex-row justify-center">
          <div className="flex flex-col m-5 max-w-sm min-w-384">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de la auditoria:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.auditoria}
                name="auditoria"
                onChange={onChange}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Periodo de la auditoria:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="date"
                value={sample.periodoInicio}
                name="periodoInicio"
                onChange={onChange}
              />
              <span>Hasta:</span>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="date"
                value={sample.periodoFin}
                name="periodoFin"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre de la prueba:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.prueba}
                name="prueba"
                onChange={onChange}
              />
            </label>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Descripción de la prueba:
              <textarea
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                value={sample.descripcion}
                name="descripcion"
                onChange={(event) => {
                  const inputValue = event.target.value;
                  if (inputValue.length <= 100) {
                    onChange(event);
                  }
              }}
                rows="2"
              ></textarea>
            </label>
          </div>

          <div className="flex flex-col m-5" style={{ width: 384 }}>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nombre del auditor:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="text"
                value={sample.nombre}
                name="nombre"
                onChange={onChange}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Correo:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="email"
                value={sample.correo}
                name="correo"
                onChange={onChange}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Nivel de confianza:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="number"
                value={sample.nivelDeConfianza}
                name="nivelDeConfianza"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue >= 0) {
                    onChange(e);
                  }
                }}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Probabilidad de éxito:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="number"
                value={sample.probabilidadDeExito}
                name="probabilidadDeExito"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue >= 0) {
                    onChange(e);
                  }
                }}
              />
            </label>
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Margen de error:
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                style={{ borderBottomColor: "#EE2B7B" }}
                type="number"
                value={sample.errorDeEstimacion}
                name="errorDeEstimacion"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  if (inputValue >= 0) {
                    onChange(e);
                  }
                }}
              />
            </label>
          </div>
        </div>

        <button
          className="w-1/6 h-12 rounded-lg mx-auto my-6 text-white"
          style={{ background: "#EE2B7B" }}
          type="submit"
        >
          Obtener muestra
        </button>
      </form>
      {<section>
        {hasData && <TechnicalMas />}
      </section>}
      <div className="w-auto h-12 rounded-lg mx-auto my-6 text-white">
        {hasData && <ExcelDownloader />}
      </div>
    </section>

  );
}