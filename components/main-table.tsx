"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { useCallback, useEffect, useRef, useState } from "react";
import { Data } from "@/lib/types";
import CSVExporter from '@/components/csv-exporter';
import InputRow, { InputRowHandle } from "@/components/input-row";

interface MainTableProps {
  data: string[][];
};

export default function MainTable({ data }: MainTableProps) {
  const [transformedData, setTransformedData] = useState<Data>([]);
  const rowsRef = useRef<(InputRowHandle | null)[]>([]);

  const transformData = useCallback((data: Data): string[][] => {
    const transformedData = data.map((row) => {
      const key = row[0];
      const keyDecoded = decodeURIComponent(escape(atob(key)));
      const value = row[1];
      const valueDecoded = decodeURIComponent(escape(atob(value)));
      return [key, keyDecoded, value, valueDecoded];
    });
    return transformedData;
  }, []);

  useEffect(() => {
    setTransformedData(transformData(data));
  }, [data, transformData]);

  const getData = (): string[][] => {
    return rowsRef.current.map(ref => ref?.getData() || []);
  }

  return (
    <>
      <CSVExporter getData={getData} />
      <div className="border rounded-lg w-full space-y-4">
        <Table>
          <TableHeader className="sticky top-0 bg-zinc-900 z-10">
            <TableRow className="hover:bg-zinc-700">
              <TableHead className="text-white">Key Encoded</TableHead>
              <TableHead className="text-white">Key Decoded</TableHead>
              <TableHead className="text-white">Text Encoded</TableHead>
              <TableHead className="text-white">Text Decoded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformedData.map((row, index) => (
              <InputRow
                ref={(el) => { rowsRef.current[index] = el; } }
                rowData={row}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
