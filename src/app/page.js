"use client";
import { ExcelUploader } from "@/components/ExcelUploader";
import { SelectToggle } from "@/components/SelectToggle";
import { useData } from "@/context/DataContext";

function Home() {
  const { data } = useData();

  console.log(data);

  return (
    <div>
      <ExcelUploader />
      <SelectToggle />
    </div>
  )
}

export default Home