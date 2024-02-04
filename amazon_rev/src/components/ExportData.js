import React from "react";
import exportFromJSON from "export-from-json";

const ExportData = ({ data, page, sentiment }) => {
  const onExportLocal = () => {
    const fileName = `data ${sentiment}_${page}`;
    const exportType = exportFromJSON.types.csv;
    exportFromJSON({ data, fileName, exportType });
  };

  return (
    <div>
      <button onClick={onExportLocal}>Export local data</button>
    </div>
  );
};

export default ExportData;
