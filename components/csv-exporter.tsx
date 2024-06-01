"use client";

import Papa from 'papaparse';
import { Button } from '@/components/ui/button';

export default function CSVExporter({ data }) {

  const handleClick = () => {
    const json = JSON.stringify(data);
    const csv = Papa.unparse(json);
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
