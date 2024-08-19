import { useEffect, useState } from "react";
import Loading from "@/app/loading";
import { useStudy } from "@/hooks/Study/useStudy";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Lab } from "@/types/Lab/Lab";
import { displayNames } from "@/common/helpers/helpers";

interface LabData {
  testName: string;
  [date: string]: string | undefined;
}

const referenceValues = {
  globulosRojos: "4.3 - 5.5",
  globulosBlancos: "4.0 - 9.0",
  hemoglobina: "11.5 - 16.0",
  hematocrito: "36 - 54",
  vcm: "No especificado",
  hcm: "No especificado",
  chcm: "No especificado",
  plaquetas: "150,000 - 400,000",
  glucemia: "0.7 - 1.1",
  uremia: "0.15 - 0.55",
  creatininemia: "7 - 13",
  colesterolTotal: "Deseable\nhasta 200",
  colesterolHdl: "> 40 (Recomendable) > 60 (Protectivo)",
  colesterolLdl:
    "< 129 (Riesgo bajo)\n130 - 189 (Riesgo moderado)\n> 190 (Riesgo elevado)",
  trigliceridos:
    "< 150 (Deseable)\n150 - 499 (Moderadamente elevado)\n> 500 (Elevado)",
  uricemia: "Hombre: 25 - 60\nMujer: 20 - 50",
  tiempoCoagulacion: "Hasta 17 min",
  tiempoSangria: "Hasta 4 min",
  tiempoProtrombina: "No especificado",
  tiempoTromboplastina: "33 - 48",
  transaminasaGlutamicoOxalac: "Mujer: < 32\nHombre: < 40",
  transaminasaGlutamicoPiruvic: "Mujer: < 33\nHombre: < 41",
  fosfatasaAlcalina: "Mujeres: 65 - 300\nHombres: 65 - 300\nNiños: Hasta 645",
  bilirrubinaDirecta: "Menor de 2.5",
  bilirrubinaIndirecta: "Menor de 7.5",
  bilirrubinaTotal: "Menor de 10.0",
  amilasemia: "Suero: Hasta 125\nOrina: Hasta 680",
  glutamilTranspeptidasa: "Mujer: < 32\nHombre: < 60",
  sodio: "135 - 145",
  potasio: "3.5 - 5.0",
  cloroPlasmatico: "95.0 - 105.0",
  calcemiaTotal: "8.6 - 10.5",
  magnesioSangre: "1.90 - 2.50",
  proteinasTotales: "6.1 - 7.9",
  albumina: "3.5 - 4.8",
  ferritina: "Hombres: 30 - 400\nMujeres: 10 - 150",
  tirotrofinaPlamatica: "Adultos: 0.27 - 4.20",
  tiroxinaEfectiva: "0.93 - 1.70",
  hemoglobinaGlicosilada: "4.8 - 5.9",
  antigenoProstaticoEspecifico:
    "Menor de 40 años: Hasta 1.4\n40-49 años: Hasta 2.00\n50-59 años: Hasta 3.1\n60-69 años: Hasta 4.1\nMayores de 70 años: Hasta 4.4",
  vitaminaD3:
    "< 15 (Deficiente)\n15-30 (Insuficiente)\n30-100 (Suficiente)\n> 100 (Toxicidad)",
  pseudocolinesterasa: "4970 - 13977",
};

const units = {
  globulosRojos: "millones/mm³",
  globulosBlancos: "miles/mm³",
  hemoglobina: "g/dL",
  hematocrito: "%",
  vcm: "um³",
  hcm: "pg",
  chcm: "g/dL",
  plaquetas: "/mm³",
  glucemia: "g/L",
  uremia: "g/L",
  creatininemia: "mg/L",
  colesterolTotal: "mg/dL",
  colesterolHdl: "mg/dL",
  colesterolLdl: "mg/dL",
  trigliceridos: "mg/dL",
  uricemia: "mg/L",
  tiempoCoagulacion: "minutos",
  tiempoSangria: "minutos",
  tiempoProtrombina: "segundos",
  tiempoTromboplastina: "segundos",
  transaminasaGlutamicoOxalac: "U/L",
  transaminasaGlutamicoPiruvic: "U/L",
  fosfatasaAlcalina: "U/L",
  bilirrubinaDirecta: "mg/L",
  bilirrubinaIndirecta: "mg/L",
  bilirrubinaTotal: "mg/L",
  amilasemia: "U/L",
  glutamilTranspeptidasa: "U/L",
  sodio: "meq/L",
  potasio: "meq/L",
  cloroPlasmatico: "meq/L",
  calcemiaTotal: "mg/dL",
  magnesioSangre: "mg/dL",
  proteinasTotales: "g/L",
  albumina: "g/dL",
  ferritina: "ng/mL",
  tirotrofinaPlamatica: "uUI/mL",
  tiroxinaEfectiva: "ng/dL",
  hemoglobinaGlicosilada: "%",
  antigenoProstaticoEspecifico: "ng/mL",
  vitaminaD3: "ng/mL",
  pseudocolinesterasa: "U/L",
};

const analysisNames = Object.keys(referenceValues);

const transformLabData = (labsDetails: any[]): LabData[] => {
  const groupedData: { [testName: string]: LabData } = {};

  labsDetails.forEach(({ date, ...tests }) => {
    Object.entries(tests).forEach(([testName, value]) => {
      if (!groupedData[testName]) {
        groupedData[testName] = { testName };
      }
      groupedData[testName][date] = value?.toString();
    });
  });

  return Object.values(groupedData);
};

export const LabPatientTable = ({ id }: { id: number }) => {
  const [transformedLabs, setTransformedLabs] = useState<LabData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { LabsDetails, isLoadingLabsDetails } = useStudy({
    fetchLabsDetails: true,
    idUser: id,
  });

  useEffect(() => {
    if (LabsDetails && LabsDetails.length > 0) {
      const transformed = transformLabData(LabsDetails);
      setTransformedLabs(transformed);

      const datesFromLabs = LabsDetails.map((lab) => lab.date).filter(
        (date): date is string => date !== undefined
      );
      setDates(datesFromLabs);
    }
  }, [LabsDetails]);

  if (isLoadingLabsDetails) {
    return <Loading isLoading />;
  }

  if (!LabsDetails || LabsDetails.length === 0) {
    return (
      <div className="text-gray-900 text-sm">
        Los laboratorios del paciente no se pudieron insertar en la tabla.
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative overflow-x-auto">
        <ScrollArea className="h-96">
          <Table>
            <TableHeader className="sticky top-0 bg-white z-10 border-b">
              <TableRow>
                <TableHead className="whitespace-nowrap w-10">#</TableHead>
                <TableHead className="whitespace-nowrap w-32">
                  Análisis
                </TableHead>
                <TableHead className="whitespace-nowrap w-40">
                  Valor de Referencia
                </TableHead>
                <TableHead className="whitespace-nowrap w-32">Unidad</TableHead>
                {dates.map((date) => (
                  <TableHead key={date} className="whitespace-nowrap">
                    {new Date(date).toLocaleDateString()}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {analysisNames.map((name, index) => (
                <TableRow key={name}>
                  <TableCell className="font-medium w-10">
                    {index + 1}
                  </TableCell>
                  <TableCell className="font-medium w-32">
                    {displayNames[name as keyof Lab]}
                  </TableCell>
                  <TableCell className="w-40">
                    {referenceValues[name as keyof typeof referenceValues]}
                  </TableCell>
                  <TableCell className="w-32">
                    {units[name as keyof typeof units]}
                  </TableCell>
                  {dates.map((date) => (
                    <TableCell key={date}>
                      <Input
                        type="text"
                        defaultValue={
                          transformedLabs.find(
                            (lab) => lab.testName === name
                          )?.[date] || ""
                        }
                      />
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </div>
    </div>
  );
};
