type ExportConfig<T> = {
  data: T[];
  filename: string;
  headers: string[];
  mapper: (item: T) => (string | number)[];
};

export const exportToCSV = <T>({
  data,
  filename,
  headers,
  mapper,
}: ExportConfig<T>) => {
  const csvData = data.map(mapper);

  const csvContent = [
    headers.join(","),
    ...csvData.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);

  link.setAttribute("href", url);
  link.setAttribute("download", `${filename}.csv`);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
