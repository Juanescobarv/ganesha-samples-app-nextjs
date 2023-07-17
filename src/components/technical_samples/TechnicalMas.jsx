import { useData } from "@/context/DataContext";

export function TechnicalMas() {
    const { data, sample } = useData();
    console.log(data);
    console.log(sample);
    
  return (
    <div>TechnicalMas</div>
  )
}