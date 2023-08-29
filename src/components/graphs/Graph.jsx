import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

import { useData } from "@/context/DataContext";

export function Graph() {
  const { sample } = useData();
  //Tamaño del array
  const arraySize = mas.data.length - 1;
  //Array de labels
  const labels = Array.from({ length: arraySize }, (_, i) => i + 1);
  //Nuevo Array de 1 a n
  const arr = Array.from({ length: arraySize }, (_, i) => i + 1);
  //Data
  let data = mas.data;
  //Media de la data
  const media = parseInt(arraySize / 2);
  //Desviación estándar con el index de la data
  const desviacionEst = (data) => {
    let desviacion = 0;
    let desviacionEstandar = 0;
    for (let i = 0; i < arraySize; i++) {
      desviacion += Math.pow(data.indexOf(data[i]) - media, 2);
    }
    desviacionEstandar = Math.sqrt(desviacion / arraySize);
    return desviacionEstandar;
  };

  //Función de distribución normal
  const normDist = (valores, media, desviacionEstandar) => {
    return valores.map((x) => {
      const num = Math.exp(-((x - media) ** 2) / (2 * desviacionEstandar ** 2));
      const den = Math.sqrt(2 * Math.PI) * desviacionEstandar;
      return num / den;
    });
  };

  let desviacionEstandar = desviacionEst(data);
  let resultadosA = normDist(arr, media, desviacionEstandar);

  let arrayA = graphIndexes;
  let arrayB = resultadosA;
  let resultadosB = Array(arrayB.length).fill(0);

  for (let i = 0; i < arrayA.length; i++) {
    let index = arrayA[i];
    if (index >= 0 && index < arrayB.length) {
      resultadosB[index] = arrayB[index];
    }
  }

  console.log(resultadosB);

  //Gráfica
  const datos = {
    labels,
    datasets: [
      {
        label: "Datos originales (N)",
        data: resultadosA,
        tension: 0.5,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Muestra (n)",
        data: resultadosB,
        tension: 0.75,
        fill: false,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Distribución de los datos",
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: "Índices",
        },
      },
      y: {
        title: {
          display: true,
          text: "Distribución",
        },
      },
    },
  };

  return <Line options={options} data={datos} />;
}
