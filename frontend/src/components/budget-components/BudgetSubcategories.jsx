import React, { useState, useEffect } from "react";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
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
  const [editIndex, setEditIndex] = useState(null); // State to track the index of the category being edited
  const [category, setCategories] = useState([]);
  const [itemName, setItemName] = useState("");
  const [itemDescription, setItemDescription] = useState("");
  const [itemQuantity, setItemQuantity] = useState("");
  const [itemCost, setItemCost] = useState("");
  const [itemPaid, setItemPaid] = useState(false);
  const [totalCost, setTotalCost] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(false);

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
      if (editIndex !== null) {
        await AxiosInstance.put(`budgetitems/${editIndex}/`, {
          name: itemName,
          description: itemDescription,
          quantity: itemQuantity,
          cost: itemCost,
          paid: itemPaid,
        });
      } else {
        await AxiosInstance.post("budgetitems/", {
          category: selectedCategory.id,
          name: itemName,
          description: itemDescription,
          quantity: itemQuantity,
          cost: itemCost,
          paid: itemPaid,
        });
      }

      handleCloseDialog();
      getCategories();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  };

  // Check if all required fields are filled and valid
  const isFormValid = itemName && itemDescription && itemQuantity && itemCost;

  return (
    <div>
      <h2>Budget </h2>
      {/* Render selected categories */}
      {category?.map((category) => (
        <div key={category.id} style={{ position: "relative" }}>
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
            }}
          >
            <Box
              sx={{
                display: "flex",
                width: "100%",
                justifyContent: "space-between",
                alignItems: "center",
                marginRight: "20px",
              }}
            >
              <p
                style={{
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  marginRight: "8px",
                }}
              >
                {formatCategoryName(category.name)}
              </p>
              <p style={{}}>
                {`Paid Items: ${
                  category.items.filter((item) => item.paid).length
                } / ${category.items.length} `}
                {`  | Total Cost: $${category.items
                  .filter((item) => item.paid)
                  .reduce((acc, item) => acc + item.quantity * item.cost, 0)}`}
              </p>
            </Box>

            {/* Render "Add" icon */}
            <Tooltip title="Add Budget Item">
              <AddIcon
                style={{ cursor: "pointer" }}
                onClick={() => handleAddClick(category)}
              />
            </Tooltip>
          </div>
          <div
            style={{
              maxHeight: "400px",
              overflowY: "scroll",
              scrollbarWidth: "thin",
              scrollbarColor: "#888 transparent",
            }}
          >
            <table
              style={{
                width: "100%",
                backgroundColor: "white",
                borderCollapse: "collapse",
              }}
            >
              <thead
                style={{
                  position: "sticky",
                  top: "0",
                  backgroundColor: "white",
                  textAlign: "left",
                  border: "1px solid #ddd",
                }}
              >
                <tr>
                  <th
                    style={{
                      border: "1px solid #ddd",
                      padding: "8px",
                 
                    }}
                  >
                    Name
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Quantity
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Cost
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Paid
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px" }}>
                    Total Cost
                  </th>
                  <th style={{ border: "1px solid #ddd", padding: "8px",width: "7%" }}>
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {category?.items &&
                  category?.items?.map((item, index) => (
                    <tr key={item.id}>
                      <td
                        style={{
                          border: "1px solid #ddd",
                          padding: "8px",
                      
      
                        }}
                      >
                        {item.name}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {item.quantity}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        ${item.cost}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        {item.paid ? "Yes" : "No"}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        ${item.quantity * item.cost}
                      </td>
                      <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                        <EditIcon
                          style={{
                            marginRight: "10px",
                            cursor: "pointer",
                            color: "black",
                          }}
                          onClick={() => handleEditClick(index, item)}
                        />
                        <DeleteIcon
                          style={{ cursor: "pointer", color: "black" }}
                          onClick={() => handleDeleteClick(item)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
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
          />
        </DialogContent>
        <DialogActions >
          <Button
         
            onClick={handleCloseDialog}
            disabled={!isFormValid}
          >
            Cancel
          </Button>{" "}
          <Button
          style={{backgroundColor: "#13547a", color: "white"}}
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
