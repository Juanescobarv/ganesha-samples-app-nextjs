import { useProcessing } from "@/context/ProcessingContext";
import { useData } from "@/context/DataContext";

export function TechnicalMas() {
  //Context data
  const { sample } = useData();

  //Context processing
  const { sampleProcessing, saveSampleProcessing } = useProcessing();

  saveSampleProcessing(sample.data, sample.nivelDeConfianza, sample.probabilidadDeExito, sample.errorDeEstimacion)


  return (
    <section>
      <h2 className="text-center m-4 mt-5 text-3xl">Ficha técnica</h2>
      <p className="text-center mt-2"><b>Fecha de selección de la muestra:</b> {sample.fecha}</p>
      <p className="text-center"><b>Diseño muestral:</b> Muestra Aleatoria Simple</p>
      <div className="flex flex-row justify-center">
        <div className="flex flex-col m-5 max-w-sm min-w-384">
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-3" style={{ borderBottomColor: "#EE2B7B" }}><b>Nombre del auditor:</b><br /> {sample.nombre}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 text-justify pt-3" style={{ borderBottomColor: "#EE2B7B" }}><b>Correo:</b><br /> {sample.correo}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-3" style={{ borderBottomColor: "#EE2B7B" }}><b>Nombre de la auditoria:</b><br /> {sample.auditoria}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-3" style={{ borderBottomColor: "#EE2B7B" }}><b>Periodo de la auditoria:</b><br /> Desde {sample.periodoInicio} hasta {sample.periodoFin}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-3" style={{ borderBottomColor: "#EE2B7B" }}><b>Nombre de la prueba:</b><br /> {sample.prueba}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-20" style={{ borderBottomColor: "#EE2B7B" }}><b>Descripción:</b> {sample.descripcion} </p>
        </div>

        <div className="flex flex-col m-5" style={{ width: 384 }}>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Tamaño de la población:</b> {sampleProcessing.N}</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Nivel de confianza:</b> {sample.nivelDeConfianza}%</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Probabilidad de éxito:</b> {sample.probabilidadDeExito}%</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Probabilidad de fallo:</b> {Math.ceil((sampleProcessing.q) * 100)}%</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Error de estimación:</b> {sample.errorDeEstimacion}%</p>
          <p className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2 h-16 pt-5" style={{ borderBottomColor: "#EE2B7B" }}><b>Tamaño de la muestra:</b> {sampleProcessing.n}</p>
        </div>
      </div>

    </section>

  )
}

