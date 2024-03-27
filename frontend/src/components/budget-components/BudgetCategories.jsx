import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import CloseIcon from "@mui/icons-material/Close";
import BudgetSubcategories from "./BudgetSubcategories";

import AxiosInstance from "../Axios";

function BudgetCategories({
  open,
  onClose,
  onTotalBudgetChange,
  reloadSubcategories,
  budgetID,
  eventID,
}) {
  const [totalBudget, setTotalBudget] = useState("");
  const [categories, setCategories] = useState({
    decor: false,
    foodAndBeverages: false,
    supplies: false,
    entertainment: false,
    rentalsOrFee: false,
    staffingOrVolunteers: false,
    transportation: false,
    merchandiseOrGiveaways: false,
    miscellaneous: false,
  });
  const [customCategory, setCustomCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isAnyCheckboxChecked, setIsAnyCheckboxChecked] = useState(false);
  const [isCustomCategoryOpen, setIsCustomCategoryOpen] = useState(false);

  const formatCategoryName = (name) => {
    if (!name) return ""; // Return an empty string if name is undefined
    return name
      .split(/(?=[A-Z])/)
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalize first letter of each word
      .join(" "); // Join words with spaces
  };
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const budgetResponse = await AxiosInstance.get(`budget/?event_id=${eventID}`);
        const budgetData = budgetResponse.data[0];
        setTotalBudget(budgetData.total)

        const existingCategoriesResponse = await AxiosInstance.get(
          `budgetcategory/?budget=${budgetID}`
        );
        const existingCategories = existingCategoriesResponse.data;
     

        const updatedCategories = { ...categories };
        existingCategories.forEach((category) => {
          updatedCategories[category.name] = true;
        });
        setIsAnyCheckboxChecked(true)
        setCategories(updatedCategories);
      } catch (error) {
        console.error("Error fetching category information:", error);
      }
    };

    fetchData();
  }, [budgetID]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    const updatedCategories = { ...categories, [name]: checked };
    setCategories(updatedCategories);
    setIsAnyCheckboxChecked(
      checked || Object.values(updatedCategories).some(Boolean)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const existingCategoriesResponse = await AxiosInstance.get(
        `budgetcategory/?budget=${budgetID}`
      );
      const existingCategories = existingCategoriesResponse.data;

      const deletedCategories = existingCategories.filter(
        (existingCategory) => {
          return !categories[existingCategory.name];
        }
      );

      await Promise.all(
        deletedCategories.map(async (deletedCategory) => {
          await AxiosInstance.delete(`budgetcategory/${deletedCategory.id}/`);
        })
      );

      // Check if there's an existing budget for the event
      const existingBudgetResponse = await AxiosInstance.get(
        `budget/?event_id=${eventID}`
      );
      const existingBudget = existingBudgetResponse.data;

      if (existingBudget.length !== 0) {
        // Update the existing budget if it exists
        await AxiosInstance.put(`budget/${budgetID}/`, {
          total: totalBudget,
          event_id: eventID,
          leftover: 0,
        });
      } else {
        // Create a new budget if no existing budget is found
        await AxiosInstance.post(`budget/?event_id=${eventID}`, {
          total: totalBudget,
          event_id: eventID,
          leftover: 0,
        });
      }

      const updatedCategoriesResponse = await AxiosInstance.get(
        `budgetcategory/?budget=${budgetID}`
      );
      const updatedCategories = updatedCategoriesResponse.data;

      const newCategories = Object.keys(categories).filter((category) => {
        return (
          categories[category] &&
          !updatedCategories.some(
            (updatedCategory) => updatedCategory.name === category
          )
        );
      });

      // Post only the new categories
      await Promise.all(
        newCategories.map(async (newCategory) => {
          await AxiosInstance.post(`budgetcategory/`, {
            budget: budgetID,
            name: newCategory,
            total: 0.0,
          });
        })
      );

      console.log("New categories posted successfully");
      reloadSubcategories();
      setSubmitted(true);
      onClose();
    } catch (error) {
      console.error("Error saving category information:", error);
    }
  };

  const handleClose = () => {
    onClose();
  };

  const handleAddCustomCategory = () => {
    if (customCategory.trim() !== "") {
      setCategories({
        ...categories,
        [customCategory.toLowerCase()]: true,
      });
      setCustomCategory("");
    }
    setIsCustomCategoryOpen((prevState) => !prevState);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ display: "flex", backgroundColor: "#13547a", justifyContent: "space-between", color: "white" }}>
        <span>Enter Budget Details</span>
        <CloseIcon onClick={handleClose} />
      </DialogTitle>
      <DialogContent sx={{ width: 400, marginTop: "10px" }}>
        <TextField
          type="number"
          label="Total Budget Amount: $"
          value={totalBudget}
          onChange={(e) => setTotalBudget(e.target.value)}
          required
          fullWidth
          InputLabelProps={{ shrink: true, required: false }}
          style={{ marginBottom: "6px", marginTop: "5px" }}
        />

        <div>
          <label>Select all budgeting categories:</label>
          {Object.entries(categories).map(([key, value]) => (
            <div key={key}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={value}
                    onChange={handleCheckboxChange}
                    name={key}
                  />
                }
                label={formatCategoryName(key)}
              />
            </div>
          ))}
        </div>
        <div >
          <Button onClick={handleAddCustomCategory}>Add Custom</Button>
          {isCustomCategoryOpen && (
            <div
              className="custom-category-dialog"
              style={{ marginLeft: "10px" }}
            >
              <TextField
                type="text"
                placeholder="Enter custom category"
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
              />
              <Button onClick={handleAddCustomCategory}>Add</Button>
            </div>
          )}
        </div>
      </DialogContent>
      <DialogActions style={{backgroundColor: " #80d0c7"}}>
      <Button
          type="cancel"
          variant="contained"
          disabled={!isAnyCheckboxChecked}
          onClick={handleClose}
        >
          cancel
        </Button>
        <Button
          type="submit"
          disabled={!isAnyCheckboxChecked}
          onClick={handleSubmit}
          variant="contained"
        >
          Submit
        </Button>
      
      </DialogActions>
    </Dialog>
  );
}

export default BudgetCategories;
