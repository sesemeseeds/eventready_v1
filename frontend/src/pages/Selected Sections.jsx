import React, { useState } from "react";
import { read, utils } from "xlsx";
import { MdEdit, MdAdd, MdDelete } from "react-icons/md";

const ImportExcel = () => {
    const [excelData, setExcelData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [excelError, setExcelError] = useState('');
    const file_type = [
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'application/vnd.ms-excel'
    ];

    const handleChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile && file_type.includes(selectedFile.type)) {
                let reader = new FileReader();
                reader.onload = (e) => {
                    const workbook = read(e.target.result);
                    const sheet = workbook.SheetNames;
                    if (sheet.length) {
                        const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
                        setExcelData(data);
                        setFilteredData(data); // Initialize filtered data with all data
                    }
                }
                reader.readAsArrayBuffer(selectedFile);
            } else {
                setExcelError('Please upload only Excel files');
                setExcelData([]);
                setFilteredData([]);
            }
        }
    }

    const handleSearch = (e) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = excelData.filter((item) =>
            item.Name.toLowerCase().includes(query) ||
            item.Phone_Number.toString().includes(query) ||
            item.Email.toLowerCase().includes(query)
        );
        setFilteredData(filtered);
    }

    const handleEdit = (index, field, value) => {
        const newData = [...excelData];
        newData[index][field] = value;
        setExcelData(newData);
        setFilteredData(newData);
    }

    const handleAddRow = () => {
        const newRow = { Name: "", Phone_Number: "", Email: "", Attended: false };
        setExcelData([...excelData, newRow]);
        setFilteredData([...filteredData, newRow]);
    }

    const handleDeleteRow = (index) => {
        const newData = excelData.filter((item, i) => i !== index);
        setExcelData(newData);
        setFilteredData(newData);
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '20px' }}>
            <label style={{ backgroundColor: '#007bff', color: 'white', padding: '10px 20px', borderRadius: '5px', cursor: 'pointer', transition: 'background-color 0.3s ease' }}>
                Import Excel
                <input type='file' onChange={handleChange} style={{ display: 'none' }} />
            </label>
            <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={handleSearch}
                style={{
                    marginTop: '10px',
                    marginBottom: '10px',
                    padding: '8px',
                    borderRadius: '5px',
                    border: '1px solid #ddd',
                    width: '100%',
                    maxWidth: '400px'
                }}
            />
            <h2 style={{ marginTop: '20px', marginBottom: '10px' }}>Check-in List</h2>
            {filteredData.length > 0 && (
                <>
                    <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                        <thead>
                            <tr>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Name</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Phone Number</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Email</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Attended</th>
                                <th style={{ border: '1px solid #ddd', padding: '8px', backgroundColor: '#f2f2f2' }}>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredData.map((info, index) => (
                                <tr key={index}>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <input
                                            type="text"
                                            value={info.Name}
                                            onChange={(e) => handleEdit(index, 'Name', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <input
                                            type="text"
                                            value={info.Phone_Number}
                                            onChange={(e) => handleEdit(index, 'Phone_Number', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <input
                                            type="text"
                                            value={info.Email}
                                            onChange={(e) => handleEdit(index, 'Email', e.target.value)}
                                        />
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <input type="checkbox" checked={info.Attended} onChange={(e) => handleEdit(index, 'Attended', e.target.checked)} />
                                    </td>
                                    <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                                        <button onClick={() => handleEdit(index)}><MdEdit /></button>
                                        <button onClick={() => handleDeleteRow(index)}><MdDelete /></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button onClick={handleAddRow} style={{ marginTop: '20px' }}>
                        <MdAdd /> Add Row
                    </button>
                </>
            )}

            {excelError && <p style={{ color: 'red', marginTop: '10px' }}>{excelError}</p>}
            {filteredData.length === 0 && !excelError && <p style={{ marginTop: '10px' }}>No user data is present</p>}
        </div>
    )
}

export default ImportExcel;