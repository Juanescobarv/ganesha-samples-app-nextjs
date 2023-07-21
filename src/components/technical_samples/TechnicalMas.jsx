import { useData } from "@/context/DataContext";

export function TechnicalMas() {

  //Context Data
  const { data, sample } = useData();

  console.log(data);
  console.log(sample);


  return (
    <div>TechnicalMas</div>
  )
}

