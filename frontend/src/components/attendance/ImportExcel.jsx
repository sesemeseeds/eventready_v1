import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import {
  IconButton,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Tooltip,
} from "@mui/material";
import AxiosInstance from "../Axios"; // Ensure AxiosInstance is correctly imported
import ReactFileReader from 'react-file-reader'; // Import ReactFileReader correctly

const ImportExcel = ({ eventID }) => {
  const [excelData, setExcelData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [excelError, setExcelError] = useState("");
  const [selectAllAttended, setSelectAllAttended] = useState(() => {
    const savedState = localStorage.getItem("selectAllAttended");
    return savedState ? JSON.parse(savedState) : false;
  });
  const [isEditingRow, setIsEditingRow] = useState({});

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
      const response = await AxiosInstance.get(`/attendee/?event_id=${eventID}`);
      setExcelData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleFiles = (files) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      // Process the content of the file here
      console.log(content);
    };
    reader.readAsText(files[0]);
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
    } catch (error) {
      console.error("Error updating attendee:", error);
    }
  };

  const handleAddRow = async () => {
    try {
      // Implementation omitted for brevity
    } catch (error) {
      console.error("Error adding attendee:", error);
    }
  };

  const handleDeleteRow = async (index) => {
    try {
      // Implementation omitted for brevity
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
    // Implementation omitted for brevity
  };

  const toggleAllAttendedCheckboxes = async () => {
    // Implementation omitted for brevity
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
        <ReactFileReader handleFiles={handleFiles} fileTypes={'.csv,.xlsx'}>
          <button style={{ display: "none" }}>Upload</button>
        </ReactFileReader>
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
                  <TableCell
                    style={{
                      width: "15%",
                      fontWeight: "bold",
                      textAlign: "center",
                    }}
                  >
                    Attended
                    <FormControlLabel
                      control={
                        <Switch
                          checked={selectAllAttended}
                          onChange={toggleAllAttendedCheckboxes}
                          color="primary"
                          />
                        }
                        label=""
                        sx={{ marginLeft: "5px" }}
                      />
                    </TableCell>
                    <TableCell
                      style={{
                        width: "10%",
                        fontWeight: "bold",
                        textAlign: "center",
                      }}
                    >
                      <Tooltip title="Add Row">
                        {" "}
                        <IconButton onClick={handleAddRow}>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
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
                      <TableCell style={{ textAlign: "center" }}>
                        {info.attended ? (
                          <Tooltip title="Mark as not attended">
                            <IconButton
                              style={{ color: "#4caf50" }}
                              onClick={() => handleEdit(index, "attended", false)}
                            >
                              <CheckCircleIcon />
                            </IconButton>
                          </Tooltip>
                        ) : (
                          <Tooltip title="Mark as attended">
                            <IconButton
                              style={{ color: "#757575" }}
                              onClick={() => handleEdit(index, "attended", true)}
                            >
                              <CheckCircleOutlineIcon />
                            </IconButton>
                          </Tooltip>
                        )}
                      </TableCell>
                      <TableCell style={{ textAlign: "center" }}>
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
