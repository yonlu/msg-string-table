"use client";

import Papa from 'papaparse';
import { Button } from '@/components/ui/button';
import { Data } from '@/lib/types';

export default function CSVExporter({ data }: { data: Data }) {
  const handleClick = () => {
    if (!data) return;

    const formattedData = data.map(d => {
      return [d[0], d[2]]
    });

    const json = JSON.stringify(formattedData);
    const csv = Papa.unparse(json as unknown as string[]);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
   };

  return (
   <Button onClick={handleClick}>Export CSV</Button>
  )
}
