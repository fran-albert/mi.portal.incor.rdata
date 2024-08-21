"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Search } from "../ui/search";
import Loading from "@/app/loading";
import { IoMdArrowBack, IoMdArrowForward } from "react-icons/io";
interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  showSearch?: boolean;
  searchPlaceholder?: string;
  addLinkPath?: string;
  addLinkText?: string;
  searchColumn?: string;
  canAddUser?: boolean;
  customFilter?: (data: TData, query: string) => boolean;
  onAddClick?: () => void;
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  showSearch = false,
  searchPlaceholder = "",
  addLinkPath = "/",
  addLinkText = "Agregar",
  searchColumn = "name",
  customFilter,
  canAddUser = true,
  onAddClick,
  isLoading = false,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [pagination, setPagination] = React.useState({
    pageIndex: 0,
    pageSize: 16,
  });
  const [searchInput, setSearchInput] = React.useState("");
  const [isAdding, setIsAdding] = React.useState(false);
  const filteredData = React.useMemo(() => {
    if (customFilter && searchInput) {
      return data.filter((item) => customFilter(item, searchInput));
    }
    return data;
  }, [data, customFilter, searchInput]);
  const table = useReactTable({
    data: filteredData,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      pagination,
    },
  });

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(event.target.value);
  };

  const pageCount = table.getPageCount();

  const handlePageChange = (pageIndex: number) => {
    setPagination((current) => ({
      ...current,
      pageIndex,
    }));
  };

  if (isAdding) {
    return null;
  }

  const renderPageNumbers = () => {
    const pages = [];
    const { pageIndex } = pagination;

    const startPage = Math.max(0, pageIndex - 2);
    const endPage = Math.min(pageCount - 1, pageIndex + 2);

    if (startPage > 0) {
      pages.push(
        <Button
          key="first"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(0)}
          className={`mx-1 ${
            pageIndex === 0
              ? "bg-teal-500 text-white border-black"
              : "text-teal-500"
          }`}
        >
          1
        </Button>
      );
      if (startPage > 1) {
        pages.push(
          <span key="start-ellipsis" className="mx-1 text-teal-500">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <Button
          key={i}
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(i)}
          className={`transition duration-150 ease-in-out ${
            pageIndex === i ? "bg-incor text-white" : "bg-white text-teal-500"
          } hover:bg-teal-500 hover:text-white focus:outline-none mx-1`}
        >
          {i + 1}
        </Button>
      );
    }

    if (endPage < pageCount - 1) {
      if (endPage < pageCount - 2) {
        pages.push(
          <span key="end-ellipsis" className="mx-1 text-gray-500">
            ...
          </span>
        );
      }
      pages.push(
        <Button
          key="last"
          variant="outline"
          size="sm"
          onClick={() => handlePageChange(pageCount - 1)}
          className={`mx-1 ${
            pageIndex === pageCount - 1
              ? "bg-teal-500 text-white border-black"
              : "text-teal-500"
          }`}
        >
          {pageCount}
        </Button>
      );
    }

    return pages;
  };

  return (
    <>
      {isLoading ? (
        <Loading isLoading={true} />
      ) : (
        <>
          {showSearch && (
            <div className="flex items-center mb-4">
              <Search
                placeholder={searchPlaceholder}
                className="w-full px-4 py-2 border rounded-md"
                value={searchInput}
                onChange={handleSearchChange}
              />
              {canAddUser && (
                <div className="ml-4">
                  {onAddClick ? (
                    <Button
                      className="bg-incor hover:bg-incor-700 text-white"
                      onClick={onAddClick}
                    >
                      {addLinkText}
                    </Button>
                  ) : (
                    <Link href={addLinkPath} passHref>
                      <Button className="bg-incor hover:bg-incor-700 text-white">
                        {addLinkText}
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </div>
          )}
          <div className="rounded-lg overflow-hidden shadow-xl border border-gray-200">
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-incor">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <tr key={headerGroup.id}>
                      {headerGroup.headers.map((header) => (
                        <th
                          key={header.id}
                          className="py-2 px-6 text-left text-sm font-semibold text-white uppercase tracking-wider"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                        </th>
                      ))}
                    </tr>
                  ))}
                </thead>
                <tbody className="text-gray-700">
                  {table.getRowModel().rows.length ? (
                    table.getRowModel().rows.map((row) => (
                      <tr
                        key={row.id}
                        className={`${
                          row.getIsSelected()
                            ? "bg-teal-100"
                            : "hover:bg-gray-50"
                        } transition duration-150 ease-in-out`}
                      >
                        {row.getVisibleCells().map((cell) => (
                          <td
                            key={cell.id}
                            className="py-2 px-6 border-b border-gray-200"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-10 text-center text-gray-500"
                      >
                        No se encuentran resultados con ese criterio de
                        búsqueda.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="flex items-center justify-center space-x-2 py-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.pageIndex - 1)}
              disabled={pagination.pageIndex === 0}
              className={`mx-1 ${
                pagination.pageIndex === 0
                  ? "text-teal-500 hover:text-teal-500"
                  : "text-teal-500 hover:text-teal-500"
              }`}
            >
              <IoMdArrowBack />
            </Button>
            {renderPageNumbers()}
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(pagination.pageIndex + 1)}
              disabled={pagination.pageIndex === pageCount - 1}
              className={`mx-1 ${
                pagination.pageIndex === 0
                  ? "text-teal-500 hover:text-teal-500"
                  : "text-teal-500 hover:text-teal-500"
              }`}
            >
              <IoMdArrowForward  />
            </Button>
          </div>
        </>
      )}
    </>
  );
}
