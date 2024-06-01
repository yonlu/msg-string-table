"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Input } from "@/components/ui/input"
import MainTable from "@/components/main-table";
import { Data } from '@/lib/types';

const CsvUploader = () => {
  const [data, setData] = useState<Data>([]);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    const file = e.target.files[0];

    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data as Data);
          setError(null);
        },
        header: false,
        skipEmptyLines: true,
        error: (error) => {
          setError(error.message);
        },
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Input type="file" accept=".csv" onChange={handleFileChange} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <MainTable data={data} />
    </div>
  );
};

export default CsvUploader;
