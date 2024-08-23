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
import { columNames, Lab, referenceValues, units } from "@/types/Lab/Lab";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Search } from "@/components/ui/search";

interface LabData {
  testName: string;
  [date: string]: string | undefined;
}

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
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [transformedLabs, setTransformedLabs] = useState<LabData[]>([]);
  const [dates, setDates] = useState<string[]>([]);
  const { LabsDetails, isLoadingLabsDetails } = useStudy({
    fetchLabsDetails: true,
    idUser: id,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

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

  const filteredAnalysisNames = analysisNames.filter((name) => {
    const columnName = columNames[name as keyof Lab];
    return typeof columnName === "string"
      ? columnName.toLowerCase().includes(searchTerm.toLowerCase())
      : false;
  });

  // Paginación
  const totalPages = Math.ceil(filteredAnalysisNames.length / rowsPerPage);
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;
  const currentRows = filteredAnalysisNames.slice(
    indexOfFirstRow,
    indexOfLastRow
  );

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
        <div className="flex justify-end items-center mb-4">
          <Search
            placeholder="Buscar análisis..."
            className="w-full px-4 py-2 border rounded-md"
            value={searchTerm}
            color="#01A9A4"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <Table>
          <TableHeader className="sticky top-0 bg-white z-10 border-b">
            <TableRow>
              <TableHead className="whitespace-nowrap w-1">#</TableHead>
              <TableHead className="whitespace-nowrap w-32">Análisis</TableHead>
              <TableHead className="whitespace-nowrap w-40">
                Valor de Referencia
              </TableHead>
              <TableHead className="whitespace-nowrap w-10">Unidad</TableHead>
              {dates.map((date) => (
                <TableHead key={date} className="whitespace-nowrap w-10">
                  {new Date(date).toLocaleDateString()}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {currentRows.map((name, index) => (
              <TableRow key={name}>
                <TableCell className="font-medium w-1">
                  {index + 1 + (currentPage - 1) * rowsPerPage}
                </TableCell>
                <TableCell className="font-medium w-32">
                  {columNames[name as keyof Lab]}
                </TableCell>
                <TableCell className="w-40 min-h-[50px] whitespace-pre-wrap overflow-hidden text-ellipsis">
                  {referenceValues[name as keyof typeof referenceValues]}
                </TableCell>
                <TableCell className="w-10">
                  {units[name as keyof typeof units]}
                </TableCell>
                {dates.map((date) => (
                  <TableCell key={date} className="w-[150px]">
                    <Input
                      type="text"
                      defaultValue={
                        transformedLabs.find((lab) => lab.testName === name)?.[
                          date
                        ] || ""
                      }
                    />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="text-gray-500 mt-4 text-xs">
          Mostrando {currentRows.length} de {filteredAnalysisNames.length}{" "}
          resultados encontrados
        </div>
        <Pagination className="mt-4">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className=" cursor-pointer text-incor hover:text-incor"
            />
            {[...Array(totalPages)].map((_, i) => (
              <PaginationItem key={i}>
                <PaginationLink
                  isActive={currentPage === i + 1}
                  className=" cursor-pointer text-incor hover:text-incor"
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {i + 1}
                </PaginationLink>
              </PaginationItem>
            ))}
            <PaginationNext
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              className=" cursor-pointer text-incor hover:text-incor"
            />
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};
