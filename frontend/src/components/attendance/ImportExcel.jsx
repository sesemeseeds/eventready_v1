import React, { useState, useEffect } from "react";
import { read, utils } from "xlsx";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";

import {
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import AxiosInstance from "../Axios";

const ImportExcel = (eventID) => {
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [excelError, setExcelError] = useState("");

  const [isEditingRow, setIsEditingRow] = useState({});
  const file_type = [
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.ms-excel",
  ];

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const filtered = excelData.filter(
      (item) =>
        item.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.phone_number?.toString().includes(searchQuery) ||
        item.email?.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredData(filtered);
  }, [searchQuery, excelData]);

  const fetchData = async () => {
    try {
      const response = await AxiosInstance.get(
        `/attendee/?event_id=${eventID.eventID}`
      );
      setExcelData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && file_type.includes(selectedFile.type)) {
        let reader = new FileReader();

        reader.onload = async (e) => {
          const workbook = read(e.target.result);
          const sheet = workbook.SheetNames;
          if (sheet.length) {
            const data = utils.sheet_to_json(workbook.Sheets[sheet[0]]);
            const tempData = data.map((item) => ({
              name: item.Name,
              phone_number: item.Phone_Number,
              email: item.Email,
            }));

            try {
              await Promise.all(
                filteredData.map(async (attendee) => {
                  try {
                    await AxiosInstance.delete(`/attendee/${attendee.id}/`);
                    console.log("Attendee deleted successfully");
                  } catch (error) {
                    console.error("Error deleting attendee:", error);
                  }
                })
              );
            } catch (error) {
              console.error("Error deleting attendees:", error);
            }

            await Promise.all(
              data.map(async (attendee) => {
                try {
                  await AxiosInstance.post(`/attendee/`, {
                    event_id: eventID.eventID,
                    name: attendee.Name,
                    phone_number: attendee.Phone_Number,
                    email: attendee.Email,
                    attended: attendee.Attended,
                  });
                } catch (error) {
                  console.error("Error creating attendance:", error);
                }
              })
            );

            setExcelData(tempData);
            setFilteredData(tempData);
            setExcelError("");
          }
        };

        reader.onloadend = () => {
          e.target.value = "";
        };

        reader.readAsArrayBuffer(selectedFile);
      } else {
        setExcelError("Please upload only Excel files");
        setExcelData([]);
        setFilteredData([]);
      }
    }
  };

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    const filtered = excelData.filter(
      (item) =>
        item.name?.toLowerCase().includes(query) ||
        item.phone_number?.toString().includes(query) ||
        item.email?.toLowerCase().includes(query)
    );
    setFilteredData(filtered);
  };

  const handleEdit = async (index, field, value) => {
    try {
      const attendeeId = filteredData[index].id;
      const updatedField = { [field]: value };
      const response = await AxiosInstance.patch(
        `/attendee/${attendeeId}/`,
        updatedField
      );
      const updatedAttendee = response.data;

      const updatedData = excelData.map((attendee) =>
        attendee.id === updatedAttendee.id ? updatedAttendee : attendee
      );
      setExcelData(updatedData);

      console.log("Attendee updated successfully");
    } catch (error) {
      console.error("Error updating attendee:", error);
    }
  };

  const handleAddRow = async () => {
    try {
      const newRow = { name: "", phone_number: "", email: "", attended: false };
      const response = await AxiosInstance.post(`/attendee/`, {
        event_id: eventID.eventID,
        name: newRow.name,
        phone_number: newRow.phone_number,
        email: newRow.email,
        attended: newRow.attended,
      });
      const newAttendee = response.data;
      
  
      setExcelData([newAttendee, ...excelData]);
      setFilteredData([newAttendee, ...filteredData]);
      
 
      setIsEditingRow((prevIsEditingRow) => ({
        ...prevIsEditingRow,
        0: true, 
      }));
      
      console.log("Attendee added successfully");
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  const handleDeleteRow = async (index) => {
    try {
      const deletedAttendee = filteredData[index];
      await AxiosInstance.delete(`/attendee/${deletedAttendee.id}/`);
      console.log("Attendee deleted successfully");
      fetchData();
    } catch (error) {
      console.error("Error deleting attendee:", error);
    }
  };

  const toggleEditingRow = (index) => {
    setIsEditingRow((prevIsEditingRow) => ({
      ...prevIsEditingRow,
      [index]: !prevIsEditingRow[index],
    }));
  };

  const handleSaveRow = async (index) => {
    const attendee = filteredData[index];
    await handleEdit(index, "name", attendee.name);
    await handleEdit(index, "phone_number", attendee.phone_number);
    await handleEdit(index, "email", attendee.email);
    await handleEdit(index, "attended", attendee.attended);
    toggleEditingRow(index);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: "20px",
      }}
    >
      <label
        style={{
          backgroundColor: "#13547a",
          color: "white",
          padding: "10px 20px",
          borderRadius: "5px",
          cursor: "pointer",
          transition: "background-color 0.3s ease",
        }}
      >
        Import Excel
        <input
          type="file"
          onChange={handleChange}
          style={{ display: "none" }}
        />
      </label>
      <TextField
        className="search-bar"
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={handleSearch}
        style={{
          marginTop: "10px",
          marginBottom: "10px",
          width: "100%",
          maxWidth: "400px",
          marginRight: "auto",
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
      <h2 style={{ marginTop: "20px", marginBottom: "10px" }}>Check-in List</h2>

      {filteredData.length > 0 && (
        <>
          <TableContainer style={{ maxHeight: 400 }}>
            <Table
              stickyHeader
              style={{ backgroundColor: "white" }}
              aria-label="simple table"
            >
              <TableHead>
                <TableRow>
                  <TableCell style={{ width: "25%", fontWeight: "bold" }}>
                    Name
                  </TableCell>
                  <TableCell style={{ width: "25%", fontWeight: "bold" }}>
                    Phone Number
                  </TableCell>
                  <TableCell style={{ width: "30%", fontWeight: "bold" }}>
                    Email
                  </TableCell>
                  <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                    Attended
                  </TableCell>
                  <TableCell style={{ width: "10%", fontWeight: "bold" }}>
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredData.map((info, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      {isEditingRow[index] ? (
                        <TextField
                          value={info.name}
                          onChange={(e) =>
                            handleEdit(index, "name", e.target.value)
                          }
                        />
                      ) : (
                        info.name
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditingRow[index] ? (
                        <TextField
                          value={info.phone_number}
                          onChange={(e) =>
                            handleEdit(index, "phone_number", e.target.value)
                          }
                        />
                      ) : (
                        info.phone_number
                      )}
                    </TableCell>
                    <TableCell>
                      {isEditingRow[index] ? (
                        <TextField
                          value={info.email}
                          onChange={(e) =>
                            handleEdit(index, "email", e.target.value)
                          }
                        />
                      ) : (
                        info.email
                      )}
                    </TableCell>
                    <TableCell>
                      <Checkbox
                        checked={info.attended}
                        onChange={(e) =>
                          handleEdit(index, "attended", e.target.checked)
                        }
                      />
                    </TableCell>
                    <TableCell>
                      {isEditingRow[index] ? (
                        <Tooltip title="Save">
                          <IconButton onClick={() => handleSaveRow(index)}>
                            <SaveIcon />
                          </IconButton>
                        </Tooltip>
                      ) : (
                        <Tooltip title="Edit">
                          <IconButton onClick={() => toggleEditingRow(index)}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                      )}
                      <Tooltip title="Delete">
                        <IconButton onClick={() => handleDeleteRow(index)}>
                          <DeleteIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Button
            variant="contained"
            onClick={handleAddRow}
            style={{ marginTop: "20px" }}
          >
            <AddIcon /> Add Row
          </Button>
        </>
      )}

      {excelError && (
        <p style={{ color: "red", marginTop: "10px" }}>{excelError}</p>
      )}
      {filteredData.length === 0 && !excelError && (
        <p style={{ marginTop: "10px" }}>No user data is present</p>
      )}
    </div>
  );
};

export default ImportExcel;
