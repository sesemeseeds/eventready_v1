import React, { useState } from 'react';
import { Button } from '@material-ui/core';

function BudgetUpload() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);

  const handleFileChange = (e) => {
    const uploadedFile = e.target.files[0];
    setFile(uploadedFile);

    // Read the file and parse the column headings
    const reader = new FileReader();
    reader.onload = (event) => {
      const content = event.target.result;
      const lines = content.split('\n');
      if (lines.length > 0) {
        const headings = lines[0].split(',');
        setColumns(headings);
      }
    };
    reader.readAsText(uploadedFile);
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileChange} style={{ display: 'none' }} id="file-upload" />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          Upload Budget
        </Button>
      </label>
      {columns.length > 0 && (
        <div>
          <h3>Uploaded Columns:</h3>
          <ul>
            {columns.map((column, index) => (
              <li key={index}>{column}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default BudgetUpload;
