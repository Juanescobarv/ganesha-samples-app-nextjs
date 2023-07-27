import { useProcessing } from "@/context/ProcessingContext";
import { useData } from "@/context/DataContext";

export function TechnicalMas() {
  //Context data
  const { sample } = useData();

  //Context processing
  const { sampleProcessing, saveSampleProcessing } = useProcessing();
  console.log(sampleProcessing);
  saveSampleProcessing(sample.data, sample.nivelDeConfianza, sample.probabilidadDeExito, sample.errorDeEstimacion)
  console.log(sampleProcessing)
 

  {/*TODO: Change de fields of name type of audit */}
  return (
    <section className="d-flex flex-row justi justify-content-around card border-secondary mb-5 m-2 p-2">
      <h2 className="text-center m-4 mt-5">Ficha técnica MAS</h2>
      <div className="mt-5">
        <p>Fecha de selección de muestra: {sample.fecha}</p>
        <p>Nombre de la auditoria: {sample.auditoria}</p>
        <p>Diseño muestral: Muestra Aleatoria Simple</p>
        <p>
          Nombre del auditor: {sample.nombre} {sample.apellido}{" "}
        </p>
        <p>Correo: {sample.correo}</p>
        <p>Periodo de la auditoria: </p>
        
        <p>Descripción: </p>
        <p>Tamaño de la población: {sampleProcessing.N}</p>
        <p>Nivel de confianza: {sample.nivelDeConfianza}%</p>
        <p>Probabilidad de éxito: {sample.probabilidadDeExito}%</p>
        <p>Probabilidad de fallo: {Math.ceil((sampleProcessing.q) * 100)}%</p>
        <p>Error de estimación: {sample.errorDeEstimacion}%</p>
        <p>Tamaño de la muestra: {sampleProcessing.n}</p>
      </div>
    </section>

  )
}

