
interface VehicleData {
  model: string;
  count: number;
  manufacturer: string;
}

const fleetData: VehicleData[] = [
  { model: "Hyundai I30 Combi", count: 70, manufacturer: "Hyundai" },
  { model: "Skoda Octavia", count: 20, manufacturer: "Skoda" },
  { model: "Hyundai I40 Combi", count: 19, manufacturer: "Hyundai" },
  { model: "Skoda Superb", count: 8, manufacturer: "Skoda" },
  { model: "Skoda Octavia III Combi", count: 7, manufacturer: "Skoda" },
  { model: "Skoda Fabia", count: 5, manufacturer: "Skoda" },
  { model: "Skoda Rapid", count: 4, manufacturer: "Skoda" },
  { model: "Skoda Octavia IV Combi", count: 4, manufacturer: "Skoda" },
  { model: "Skoda Scala", count: 4, manufacturer: "Skoda" },
  { model: "VW Golf", count: 1, manufacturer: "VW" },
  { model: "Skoda Superb III Combi", count: 1, manufacturer: "Skoda" },
  { model: "Audi A6", count: 1, manufacturer: "Audi" },
  { model: "VW Jetta", count: 1, manufacturer: "VW" },
  { model: "Audi A6 Allroad", count: 1, manufacturer: "Audi" },
  { model: "VW Passat", count: 1, manufacturer: "VW" },
  { model: "VW Touareg", count: 1, manufacturer: "VW" }
];

export default fleetData;
