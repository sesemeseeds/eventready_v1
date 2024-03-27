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
  onClose,
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
  const [onItemPaid, setOnItemPaid] = useState(() => () => {});
  

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

      setTotalCost(totalPaid)
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

      if (item.paid) {
        const itemCost = item.quantity * item.cost;
        onItemPaid((prev) => prev - paidCost); 
      }
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
     const cost =  totalCost + itemQuantity * itemCost;
    if (cost > totalBudget) {
      alert(
        `Total cost $${cost} cannot exceed the total budget $${totalBudget}`
      );
      return;
    }
    if (itemPaid) { 
      const paidCost = itemQuantity * itemCost; 
      onItemPaid((prev) => prev + paidCost); 
    }
    try {
      if (editIndex !== null) {
        const response = await AxiosInstance.put(`budgetitems/${editIndex}/`, {
          name: itemName,
          description: itemDescription,
          quantity: itemQuantity,
          cost: itemCost,
          paid: itemPaid,
        });
      } else {
        const response = await AxiosInstance.post("budgetitems/", {
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
      <h2>Selected Budget Categories</h2>
      {/* Render selected categories */}
      {category?.map((category) => (
        <div key={category.id} style={{ position: "relative" }}>
          <div
            style={{
              position: "sticky",
              top: "0",
              backgroundColor: "white",
              padding: "10px",
              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
              display: "flex",
              borderRadius: "10px",
              alignItems: "center",
              justifyContent: "space-between",
              marginTop: "10px"
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
            {category?.items &&
              category?.items?.map((item, index) => (
                <Box
                  key={item.id}
                  padding={2}
                  marginTop={2}
                  borderRadius={10}
                  position="relative"
                  style={{
                    backgroundColor: "#80d0c7",
                    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.25)",
                  }}
                >
                  {/* Edit and delete icons */}
                  <EditIcon
                    style={{
                      position: "absolute",
                      top: 15,
                      right: 15,
                      cursor: "pointer",
                      color: "#456236",
                    }}
                    onClick={() => handleEditClick(index, item)}
                  />
                  <DeleteIcon
                    style={{
                      position: "absolute",
                      bottom: 15,
                      right: 15,
                      cursor: "pointer",
                      color: "#456236",
                    }}
                    onClick={() => handleDeleteClick(item)}
                  />
                  {/* Render item details */}
                  <Typography>Name: {item.name}</Typography>
                  <Typography>Quantity: {item.quantity}</Typography>
                  <Typography>Cost: ${item.cost}</Typography>
                  <Typography>Paid: {item.paid ? "Yes" : "No"}</Typography>
                  <Typography>
                    Total Cost: ${item.quantity * item.cost}
                  </Typography>
                </Box>
              ))}
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
        <DialogContent style={{ backgroundColor: "#F0FFF0" }}>
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
        <DialogActions style={{ backgroundColor: "#80d0c7" }}>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleCloseDialog}
            disabled={!isFormValid}
          >
            Cancel
          </Button>{" "}
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
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
