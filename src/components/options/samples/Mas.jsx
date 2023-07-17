import { useState } from "react";
import { useData } from "@/context/DataContext";

export function Mas() {
  //Loading State
  const [hasData, setHasData] = useState(false);
  //Context Data
  const { sample, saveSample } = useData();

  //Loading State Sample
  const onChange = (event) => {
    event.preventDefault();
    saveSample({ ...sample, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí podrías hacer alguna validación o manipulación de los datos antes de enviarlos al componente.
    // sample.NivelDeConfianza = Number(sample.NivelDeConfianza);
    // sample.ProbabilidadDeExito = Number(sample.ProbabilidadDeExito); //P
    // sample.ProbabilidadDeFallo = 0; // Q
    // sample.ErrorDeEstimacion = Number(sample.ErrorDeEstimacion); //e
    // Luego los enviamos al componente Data como propiedades}
    setHasData(true);
    console.log(sample);
  };

  return (
  <section>
    <form className="form-select-sm flex flex-col" onSubmit={handleSubmit}>
    <div className="flex flex-row justify-around">
      <div className="flex flex-col ml-5">
        <label className="mt-2">
          Nombre:
          <input
            className="bg-gray-100 ml-5"
            type="text"
            value={sample.nombre}
            name="nombre"
            onChange={onChange}
          />
        </label>
        <label className="mt-4">
          Apellido:
          <input
            className="bg-gray-100 ml-5"
            type="text"
            value={sample.apellido}
            name="apellido"
            onChange={onChange}
          />
        </label>
        <label className="mt-4">
          Correo:
          <input
            className="ml-5 bg-gray-100"
            type="email"
            value={sample.correo}
            name="correo"
            onChange={onChange}
          />
        </label>
        <label className="mt-4">
          Nombre de la auditoria:
          <input
            className="ml-5 bg-gray-100"
            type="text"
            value={sample.auditoria}
            name="auditoria"
            onChange={onChange}
          />
        </label>
      </div>
      <div className="flex flex-col mr-5">
        <label className="mt-2">
          Nivel de confianza:
          <input
            className="ml-5 bg-gray-100"
            type="number"
            value={sample.NivelDeConfianza}
            name="NivelDeConfianza"
            onChange={onChange}
          />
        </label>
        <label className="mt-4">
          Probabilidad de éxito:
          <input
            className="ml-5 bg-gray-100"
            type="number"
            value={sample.ProbabilidadDeExito}
            name="ProbabilidadDeExito"
            onChange={onChange}
          />
        </label>
        <label className="mt-4">
          Margen de Error:
          <input
            className="ml-5 bg-gray-100"
            type="number"
            value={sample.ErrorDeEstimacion}
            name="ErrorDeEstimacion"
            onChange={onChange}
          />
        </label>
      </div>
    </div>

    <button
      className="w-1/6 h-12 rounded-lg mx-auto my-6 text-white"
      style={{ background: "#EE2B7B"}}
      type="submit"
    >
      Obtener muestra
    </button>
  </form>

    {/* <div>{hasData && <Technicalsample {...sample} />}</div> */}
  </section>
  );
}