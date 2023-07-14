"use client";
import { ExcelUploader } from "@/components/ExcelUploader";
import { useData } from "@/context/DataContext";

function Home() {
  const { data } = useData();

  console.log(data);

  return (
    <div>
      <ExcelUploader />

      <h1>Home</h1>

    </div>
  )
}

export default Home