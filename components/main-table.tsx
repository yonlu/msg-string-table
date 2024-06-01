"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import CSVExporter from '@/components/csv-exporter';
import { useCallback, useEffect, useState } from "react";
import { Data } from "@/lib/types";

interface MainTableProps {
  data: string[][];
};

export default function MainTable({ data }: MainTableProps) {
  const [transformedData, setTransformedData] = useState<Data>([]);

  const transformData = useCallback((data: Data) => {
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

  const onChange = (e: React.ChangeEvent<HTMLInputElement>, idx: number, i: number) => {
    let newData = [...transformedData];
    switch (i) {
      case 1:
        newData[idx][i] = e.target.value;
        newData[idx][0] = btoa(unescape(encodeURIComponent(e.target.value)));
        setTransformedData(newData);
        break;
      case 3:
        newData[idx][i] = e.target.value;
        newData[idx][2] = btoa(unescape(encodeURIComponent(e.target.value)));
        setTransformedData(newData);
        break;
    }
  }

  return (
    <>
      <CSVExporter data={transformedData} />
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
              <TableRow key={index}>
                {row.map((value, i) => (
                  <TableCell className="truncate max-w-sm" key={i}>
                    <Input type="text" value={value} onChange={(e) => onChange(e, index, i)} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
}
