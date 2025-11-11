"use client";

import { Table, TableHeader, TableRow, TableHead, TableBody } from "@/components/ui/table"
import { useCallback, useEffect, useRef, useState } from "react";
import { Data, DataEmoticon } from "@/lib/types";
import CSVExporter, { EmoticonCSVExporter } from '@/components/csv-exporter';
import InputRow, { InputRowHandle } from "@/components/input-row";
import InputRowEmoticon, { InputEmoticonRowHandle } from "@/components/input-row-emoticon";
import { Button } from "@/components/ui/button";

interface MainTableProps {
  data: string[][];
};

export const MainTable = ({ data }: MainTableProps) => {
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

  const addRow = () => {
    setTransformedData(prev => [...prev, ['', '', '', '']]);
  }

  return (
    <>
      <CSVExporter getData={getData} />
      <div className="border rounded-lg w-full space-y-4">
        <Table>
          <TableHeader className="sticky top-0 bg-zinc-900 z-10">
            <TableRow className="hover:bg-zinc-700">
              <TableHead className="text-white">#</TableHead>
              <TableHead className="text-white">Key Encoded</TableHead>
              <TableHead className="text-white">Key Decoded</TableHead>
              <TableHead className="text-white">Text Encoded</TableHead>
              <TableHead className="text-white">Text Decoded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformedData.map((row, index) => (
              <InputRow
                ref={(el) => { rowsRef.current[index] = el; }}
                rowData={row}
                rowIndex={index}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={addRow}>Add New Entry</Button>
    </>
  )
}


export const MainEmoticonTable = ({ data }: MainTableProps) => {
  const [transformedData, setTransformedData] = useState<DataEmoticon>([]);
  const rowsRef = useRef<(InputEmoticonRowHandle | null)[]>([]);

  const transformData = useCallback((data: Data): string[][] => {
    const transformedData = data.map((row) => {
      const key = row[0];
      const keyDecoded = decodeURIComponent(escape(atob(key)));

      const key2 = row[1];
      const key2Decoded = decodeURIComponent(escape(atob(key2)));

      const value = row[2];
      const valueDecoded = decodeURIComponent(escape(atob(value)));

      return [key, keyDecoded, key2, key2Decoded, value, valueDecoded];
    });
    return transformedData;
  }, []);

  useEffect(() => {
    setTransformedData(transformData(data));
  }, [data, transformData]);

  const getData = (): string[][] => {
    return rowsRef.current.map(ref => ref?.getData() || []);
  }

  const addRow = () => {
    setTransformedData(prev => [...prev, ['', '', '', '', '', '']]);
  }

  return (
    <>
      <EmoticonCSVExporter getData={getData} />
      <div className="border rounded-lg w-full space-y-4">
        <Table>
          <TableHeader className="sticky top-0 bg-zinc-900 z-10">
            <TableRow className="hover:bg-zinc-700">
              <TableHead className="text-white">#</TableHead>
              <TableHead className="text-white">Key Encoded</TableHead>
              <TableHead className="text-white">Key Decoded</TableHead>
              <TableHead className="text-white">Key 2 Encoded</TableHead>
              <TableHead className="text-white">Key 2 Decoded</TableHead>
              <TableHead className="text-white">Text Encoded</TableHead>
              <TableHead className="text-white">Text Decoded</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transformedData.map((row, index) => (
              <InputRowEmoticon
                ref={(el) => { rowsRef.current[index] = el; }}
                rowData={row}
                rowIndex={index}
                key={index}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <Button onClick={addRow}>Add New Entry</Button>
    </>
  )
}
