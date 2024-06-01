"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Input } from "@/components/ui/input"
import MainTable from "@/components/main-table";

const CsvUploader = () => {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      Papa.parse(file, {
        complete: (result) => {
          setData(result.data);
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
