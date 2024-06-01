import CsvUploader from "@/components/csv-uploader";

export default function Home() {
  return (
    <main className="min-h-screen flex-col items-center justify-between p-8 space-y-4">
      <CsvUploader />
    </main>
  );
}

