"use client";

import Papa from 'papaparse';
import { Button } from '@/components/ui/button';

interface CSVExporterProps {
  getData: () => string[][];
}

export default function CSVExporter({ getData }: CSVExporterProps) {
  const handleClick = () => {
    const data = getData();
    if (!data) return;

    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
    <Button onClick={handleClick}>Export CSV</Button>
  );
}
