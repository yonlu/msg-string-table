"use client";

import React, { useState } from 'react';
import Papa from 'papaparse';
import { Dropzone, DropzoneContent, DropzoneEmptyState } from "@/components/ui/shadcn-io/dropzone";
import { MainEmoticonTable, MainTable } from "@/components/main-table";
import { Data } from '@/lib/types';

export const CsvUploader = () => {
  const [data, setData] = useState<Data>([]);
  const [files, setFiles] = useState<File[]>();
  const [error, setError] = useState<string | null>(null);

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFiles([file]);

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
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Dropzone
        src={files}
        accept={{ 'text/csv': ['.csv'] }}
        onDrop={handleFileDrop}
        className="w-full max-w-2xl"
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <MainTable data={data} />
    </div>
  );
};


export const CsvEmoticonUploader = () => {
  const [data, setData] = useState<Data>([]);
  const [files, setFiles] = useState<File[]>();
  const [error, setError] = useState<string | null>(null);

  const handleFileDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    setFiles([file]);

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
  };

  return (
    <div className="flex flex-col items-center justify-center w-full gap-4">
      <Dropzone
        src={files}
        accept={{ 'text/csv': ['.csv'] }}
        onDrop={handleFileDrop}
        className="w-full max-w-2xl"
      >
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
      {error && <p className="text-destructive text-sm">{error}</p>}
      <MainEmoticonTable data={data} />
    </div>
  );
};
