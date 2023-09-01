import * as XLSX from "xlsx";
import { useData } from "@/context/DataContext";

export function ExcelDownloader() {
  //Use Data
  const { data, indexes, sample } = useData();

  //Fuction to export data to Excel
  const exportToExcel = (ranData, headerExcel) => {
    ranData.unshift(headerExcel);
    const worksheet = XLSX.utils.json_to_sheet(ranData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Muestra");
    XLSX.writeFile(workbook, ".muestra-aleatoria-simple.xlsx");
  };
  
  //Function to handle the click event
  //FIX TO DO: If the sample size is smaller, the function can bring double the header
  const handleExportClick = () => { 
    const dataRandom =  indexes.map((index) => data[index -1]);
    exportToExcel(dataRandom, sample.headerExcel); //Llamamos a la función exportToExcel
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