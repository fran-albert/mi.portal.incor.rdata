import { ColumnDef } from "@tanstack/react-table";
import { Labs } from "@/modules/labs/domain/Labs";

export const getColumns = (): ColumnDef<any>[] => {
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: 'testName',  // Clave para el nombre de la prueba
      header: 'Prueba',  // Encabezado que verán los usuarios
      cell: info => info.getValue(),  // Obtener y mostrar el valor de 'testName'
    },
    {
      accessorKey: 'value',  // Clave para el valor de la prueba
      header: 'Resultado',  // Encabezado para el resultado
      cell: info => info.getValue(),  // Obtener y mostrar el valor de 'value'
    },
    {
      accessorKey: 'value',  // Clave para el valor de la prueba
      header: 'Resultado',  // Encabezado para el resultado
      cell: info => info.getValue(),  // Obtener y mostrar el valor de 'value'
    },
    {
      accessorKey: 'value',  // Clave para el valor de la prueba
      header: 'Resultado',  // Encabezado para el resultado
      cell: info => info.getValue(),  // Obtener y mostrar el valor de 'value'
    },
  ];

  return columns;
};
