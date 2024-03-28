import React, { useState, useEffect } from "react";
import "../styles/Budget.css";
import BudgetCategories from "../components/budget-components/BudgetCategories";
import Button from "@mui/material/Button";
import AxiosInstance from "../components/Axios";
import { useParams } from "react-router-dom";
import BudgetSubcategories from "../components/budget-components/BudgetSubcategories";

function BudgetPage() {
  const [currentSpent, setCurrentSpent] = useState(0);
  const [totalBudget, setTotalBudget] = useState(1000); // Initialize with a default value
  const [budgetID, setBudgetID] = useState(0);

  // Progress percentage
  const progress = (currentSpent / totalBudget) * 100;
  const remainingBudget = totalBudget - currentSpent;

  const MyParam = useParams();
  const MyId = MyParam.id;

  // Position of pointer
  const pointerPosition = progress > 100 ? "100%" : `${progress}%`;

  // State to manage whether to show tooltip
  const [showTooltip, setShowTooltip] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    AxiosInstance.get(`budget/?event_id=${MyId}`)
      .then((res) => {
        const budgetData = res.data[0];
        if (budgetData) {
          setTotalBudget(budgetData.total);
          setCurrentSpent(budgetData.leftover);
          setBudgetID(budgetData.id);
        } else {
          createBudget();
        }
      })
      .catch((error) => {
        console.error("Error fetching budget:", error);
      });

  }, [MyId]);

  useEffect(() => {
    if (budgetID !== 0) {
      AxiosInstance.patch(`budget/${budgetID}/`, { leftover: currentSpent })
        .then((res) => {
          console.log("Leftover updated successfully");
        })
        .catch((error) => {
          console.error("Error updating leftover:", error);
        });
    }
  }, [ currentSpent]);

  const createBudget = () => {
    AxiosInstance.post("budget/", { event_id: MyId, total: 1000 })
      .then((res) => {
        const newBudgetID = res.data.id;
        setBudgetID(newBudgetID);
      })
      .catch((error) => {
        console.error("Error creating budget:", error);
      });
  };

  const openDialog = () => {
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
  };

  const reloadSubcategories = () => {
    console.log("Reloading subcategories...");
  };

  return (
    <div className="container" style={{ marginBottom: "5%" }}>

      <div
        className="progress-bar-container"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <div className="progress-bar">
          <div
            className="progress-bar-inner"
            style={{ width: pointerPosition }}
          ></div>
          {showTooltip && (
            <div
              className="tooltip"
              style={{ left: `calc(${pointerPosition} - 20px)` }}
            >
              Left over amount: ${remainingBudget}
            </div>
          )}
          <div className="pointer" style={{ left: pointerPosition }}></div>
        </div>
      </div>
      <div
        className="budget-info"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <div className="spent-info">Spent: ${currentSpent}</div>
        <div className="total-info">Total: ${totalBudget}</div>
      </div>
      <div
        style={{
          marginTop: "20px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="contained"
          style={{
            backgroundColor: "#13547a",
            color: "white",
            borderRadius: "7px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
          onClick={openDialog}
        >
          Budget Categories
        </Button>
        <Button
          variant="contained"
          style={{
            backgroundColor: "#13547a",
            color: "white",
            borderRadius: "7px",
            fontWeight: "bold",
            fontSize: "16px",
          }}
        >
          Upload Budget
        </Button>
      </div>

      <BudgetCategories
        totalBudget={totalBudget}
        open={isDialogOpen}
        onClose={closeDialog}
        budgetID={budgetID}
        eventID={MyId}
        reloadSubcategories={reloadSubcategories}
      />

      {budgetID !== 0 && (
        <BudgetSubcategories
          totalBudget={totalBudget}
          currentSpent={setCurrentSpent}
          reloadSubcategories={reloadSubcategories}
          budgetID={budgetID}
        />
      )}
    </div>
  );
}

export default BudgetPage;
