import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import SaveIcon from "@material-ui/icons/Save";
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import Paper from "@mui/material/Paper";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
  FormControlLabel,
  Checkbox,
  Typography,
  Box,
  Tooltip,
  DialogActions,
} from "@material-ui/core";
import {
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from "@material-ui/core";

import AxiosInstance from "../Axios";


// Format category name with spaces between words
const formatCategoryName = (name) => {
  if (!name) return ""; // Return an empty string if name is undefined
  return name
    .split(/(?=[A-Z])/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
    .join(" "); // Join words with spaces
};

function BudgetSubcategories({
  totalBudget,
  reloadSubcategories,
  currentSpent,
  budgetID,
}) {
  const [openDialog, setOpenDialog] = useState(false);
  const [editIndex, setEditIndex] = useState(null); 
  const [category, setCategories] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemPaid, setItemPaid] = useState(false);
  const [totalCost, setTotalCost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);
  const [editBudgetIndex, setEditBudgetIndex] = useState(null);
  const [budgetValue, setBudgetValue] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const getCategories = async () => {
    try {
      const categoryResponse = await AxiosInstance.get(
        `budgetcategory/?budget=${budgetID}`
      );
      const categoriesData = categoryResponse.data;

      let totalPaid = 0;

      const categoriesWithItems = await Promise.all(
        categoriesData.map(async (category) => {
          const itemsResponse = await AxiosInstance.get(
            `budgetitems/?category=${category.id}`
          );
          const itemsData = itemsResponse.data;

          const categoryTotalPaid = itemsData.reduce((acc, item) => {
            if (item.paid) {
              acc += item.quantity * item.cost;
            }
            return acc;
          }, 0);

          totalPaid += categoryTotalPaid;

          return { ...category, items: itemsData };
        })
      );

      setTotalCost(totalPaid);
      currentSpent(totalPaid);

      setCategories(categoriesWithItems);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    getCategories();
  }, [budgetID, reloadSubcategories]);

  const handleAddClick = (category) => {
    setSelectedCategory(category);
    setOpenDialog(true);
    resetFormFields();
  };

  const handleEditClick = (index, data) => {
    setOpenDialog(true);
    setEditIndex(data.id);
    setItemName(data.name);
    setItemDescription(data.description);
    setItemQuantity(data.quantity);
    setItemCost(data.cost);
    setItemPaid(data.paid);
  
    // Check if there's an attachment
    if (data.attachment) {
      // Split the attachment URL by '/' and get the last part (filename)
      const filename = data.attachment.split('/').pop();
      setUploadedFileName(filename);
    } else {
      setUploadedFileName(""); // Reset filename if there's no attachment
    }
  };

  const handleBudgetEditClick = (index) => {
    setEditBudgetIndex(index);
    setBudgetValue(category[index].total || "");
  };

  const handleDeleteClick = async (item) => {
    try {
      await AxiosInstance.delete(`budgetitems/${item.id}/`);
    } catch (error) {
      console.error("Error deleting item:", error);
    }
    getCategories();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    resetFormFields();
    setEditIndex(null);
  };

  const resetFormFields = () => {
    setItemName("");
    setItemDescription("");
    setItemQuantity("");
    setItemCost("");
    setItemPaid(false);
    setUploadedFile(null);
    setUploadedFileName("");
  };

  const handleSubmit = async () => {
    const cost = totalCost + itemQuantity * itemCost;
    if (cost > totalBudget) {
      alert(
        `Total cost $${cost} cannot exceed the total budget $${totalBudget}`
      );
      return;
    }
  
    try {
      const formData = new FormData();
      formData.append('category', selectedCategory.id);
      formData.append('name', itemName);
      formData.append('description', itemDescription);
      formData.append('quantity', itemQuantity);
      formData.append('cost', itemCost);
      formData.append('paid', itemPaid);
      formData.append('attachment', uploadedFile); // Assuming uploadedFile is the file object
  
      if (editIndex !== null) {
        await AxiosInstance.put(`budgetitems/${editIndex}/`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Important for file upload
          }
        });
      } else {
        await AxiosInstance.post("budgetitems/", formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Important for file upload
          }
        });
      }
  
      handleCloseDialog();
      getCategories();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  const handleBudgetEditSubmit = async () => {
    const newCategoryTotal = parseFloat(budgetValue);

    const otherCategoryTotals = category.reduce((acc, cat, index) => {
      if (index !== editBudgetIndex) {
        return acc + parseFloat(cat.total || 0);
      }
      return acc;
    }, 0);

    if (otherCategoryTotals + newCategoryTotal > totalBudget) {
      alert(
        `Total of all categories ($${
          otherCategoryTotals + newCategoryTotal
        }) exceeds the overall budget $${totalBudget}`
      );
      return;
    }

    try {
      await AxiosInstance.put(
        `budgetcategory/${category[editBudgetIndex].id}/`,
        {
          name: category[editBudgetIndex].name,
          total: budgetValue,
        }
      );
      setEditBudgetIndex(null);
      getCategories();
    } catch (error) {
      console.error("Error updating budget:", error);
    }
  };

  // Check if all required fields are filled and valid
  const isFormValid = itemName && itemDescription && itemQuantity && itemCost;

  // Function to handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    setUploadedFile(file);
    setUploadedFileName(file.name);
  };

  return (
    <div>
      <h2>Budget </h2>
      {/* Render selected categories */}
      {category?.map((category, index) => (
        <Accordion
          style={{
            backgroundColor: "aliceblue",
            boxShadow: "none",
            position: "static",
          }}
          key={category.id}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <div
              style={{
                position: "sticky",
                top: "0",
                backgroundColor: "#13547a",
                color: "White",
                padding: "10px",
                boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
                display: "flex",
                borderRadius: "10px",
                alignItems: "center",
                justifyContent: "space-between",
                marginTop: "10px",
                height: "50px",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  width: "100%",
                  alignItems: "center",
                  marginRight: "20px",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center" }}>
                  <p
                    style={{
                      fontWeight: "bold",
                      fontSize: "1.2rem",
                      marginRight: "8px",
                      
                    }}
                  >
                    {formatCategoryName(category.name)}
                  </p>
                  Allocated Budget: $
                  {editBudgetIndex === index ? (
                    <TextField
                      size="small"
                      margin="none"
                      style={{
                        backgroundColor: "white",
                        marginLeft: "5px",
                        marginRight: "5px",
                        width: "20%",
                      }}
                      variant="outlined"
                      type="number"
                      value={budgetValue}
                      onChange={(e) => {
                        setBudgetValue(e.target.value);
                      }}
                      onClick={(e) => e.stopPropagation()}
                    />
                  ) : (
                    <p style={{ marginRight: "5px" }}>{`${
                      category.total || 0
                    }`}</p>
                  )}
                  {editBudgetIndex === index ? (
                    <Tooltip title="Save Budget">
                      <SaveIcon
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBudgetEditSubmit();
                        }}
                      ></SaveIcon>
                    </Tooltip>
                  ) : (
                    <Tooltip title="Edit Budget">
                      <EditIcon
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBudgetEditClick(index);
                        }}
                      />
                    </Tooltip>
                  )}
                </div>

                <p style={{ display: "flex", alignItems: "center" }}>
                  {` Paid Items: ${
                    category.items.filter((item) => item.paid).length
                  } / ${category.items.length} `}
                  {`  | Total Used: $${category.items
                    .filter((item) => item.paid)
                    .reduce(
                      (acc, item) => acc + item.quantity * item.cost,
                      0
                    )}`}
                </p>
              </Box>

              {/* Render "Add" icon */}
              <Tooltip title="Add Budget Item">
                <AddIcon
                  style={{ cursor: "pointer" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddClick(category);
                  }}
                />
              </Tooltip>
            </div>
          </AccordionSummary>
          <AccordionDetails>
            <div
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
                scrollbarWidth: "thin",
                scrollbarColor: "#888 transparent",
                width: "100%",
              }}
            >
              <Table style={{ backgroundColor: "white" }} stickyHeader>
                <TableHead style={{ backgroundColor: "white" }}>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Cost</TableCell>
                    <TableCell>Paid</TableCell>
                    <TableCell>Total Cost</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {category?.items &&
                    category?.items?.map((item, index) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.name}</TableCell>
                        <TableCell>{item.quantity}</TableCell>
                        <TableCell>${item.cost}</TableCell>
                        <TableCell>{item.paid ? "Yes" : "No"}</TableCell>
                        <TableCell>${item.quantity * item.cost}</TableCell>
                        <TableCell width="10%">
                          <Tooltip title="Edit Item">
                            <EditIcon
                              style={{
                                cursor: "pointer",
                                color: "black",
                              }}
                              onClick={() => handleEditClick(index, item)}
                            />
                          </Tooltip>
                          {item.attachment && ( 
                            <Tooltip title="Download Attachment">
                              <a
                                href={item.attachment} 
                                target="_blank"
                                rel="noopener noreferrer"
                                download
                              >
                                <InsertDriveFileIcon
                                  style={{
                                    cursor: "pointer",
                                    color: "black",
                                    alignContent: "center"
                                  }}
                                />
                              </a>
                            </Tooltip>
                          )}
                          <Tooltip title="Delete Item">
                            <DeleteIcon
                              style={{ cursor: "pointer", color: "black" }}
                              onClick={() => handleDeleteClick(item)}
                            />
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </AccordionDetails>
        </Accordion>
      ))}

      {/* Dialog for entering category details */}
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle style={{ backgroundColor: "#13547a", color: "white" }}>
          {editIndex !== null
            ? "Edit Details"
            : `Add ${formatCategoryName(category.name)} Details`}
        </DialogTitle>
        <DialogContent>
          <TextField
            name="name"
            label="Name"
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            name="description"
            label="Description"
            value={itemDescription}
            onChange={(e) => setItemDescription(e.target.value)}
            fullWidth
            multiline
            rows={2}
            required
          />
          <TextField
            name="quantity"
            label="Quantity"
            type="number"
            value={itemQuantity}
            onChange={(e) => setItemQuantity(e.target.value)}
            fullWidth
            required
          />
          <TextField
            name="cost"
            label="Cost"
            type="number"
            value={itemCost}
            onChange={(e) => setItemCost(e.target.value)}
            fullWidth
            required
          />
          {/* File upload */}
          <Box style={{ display: 'flex', alignItems: 'center', marginTop: '10px' }}>
            <input
              type="file"
              id="file"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
            <label htmlFor="file">
              <Button
                variant="contained"
                component="span"
                style={{ backgroundColor: "#13547a", color: "white" }}
              >
                Upload File
              </Button>
            </label>
            {uploadedFileName && <Typography style={{ marginLeft: '10px' }}>{uploadedFileName}</Typography>}
            <Box style={{ marginLeft: 'auto', marginRight: '50px' }}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={itemPaid}
                    onChange={(e) => setItemPaid(e.target.checked)}
                    name="paid"
                    style={{ color: "green" }}
                  />
                }
                label="Paid"
                labelPlacement="end"
              />
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} disabled={!isFormValid}>
            Cancel
          </Button>{" "}
          <Button
            style={{ backgroundColor: "#13547a", color: "white" }}
            onClick={handleSubmit}
            variant="contained"
            color="#13547a"
            disabled={!isFormValid}
          >
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default BudgetSubcategories;
