'use client';
import * as XLSX from "xlsx";
import { useProcessing } from "@/context/ProcessingContext";
import { useData } from "@/context/DataContext";

export function ExcelDownloader() {
  //Use Processing
  const { sampleProcessing, indexesArray } = useProcessing();
  //Use Data
  const { data } = useData();

  //Fuction to export data to Excel
  const exportToExcel = (ranData, headerExcel) => {
    ranData.unshift(headerExcel);
    const worksheet = XLSX.utils.json_to_sheet(ranData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
    XLSX.writeFile(workbook, ".muestra-aleatoria-simple.xlsx");
  };
  
  console.log(data);
  console.log(sampleProcessing.n)
  console.log(data.length)
  const headerExcel = data[0]; //Header of the Excel
  console.log(headerExcel) 
  const arrayLength = data.length - 1;
  console.log(arrayLength)
 
  //Function to handle the click event
  const handleExportClick = async () => { 
    const indexes = await indexesArray(arrayLength, sampleProcessing.n); //Array of indexes
    const dataRandom = indexes.map((index) => data[index]);
    exportToExcel(dataRandom, headerExcel); //Llamamos a la función exportToExcel
  };
 

  return (
    <section className="flex flex-row justify-center">
    <button
       className="w-1/6 h-12 rounded-lg mx-auto my-6 text-white"
       style={{ background: "#EE2B7B" }}
      onClick={handleExportClick}
    >
      Exportar Excel
    </button>
  </section>
  )
}