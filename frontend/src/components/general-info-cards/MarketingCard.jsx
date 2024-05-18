import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";
import "react-circular-progressbar/dist/styles.css";

export default function MarketingCard({ marketingPoster, marketingReminders }) {
  const [hasImage, setHasImage] = useState(false);
  const [hasCaption, setHasCaption] = useState(false);

  useEffect(() => {
    setHasImage(!!marketingPoster?.image);
    setHasCaption(!!marketingPoster?.caption);
  }, [marketingPoster]);

  return (
    <Card sx={{ boxShadow: 3, width: 300, height: 300 }}>
      <Box
        sx={{
          backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)",
          paddingLeft: "10px",
        }}
      >
        <Typography variant="h5" component="div" color="white">
          Marketing
        </Typography>
      </Box>
      <CardContent sx={{ height: 310 }}>
        <Box>
          {hasImage ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckIcon sx={{ color: "green", fontSize: 21, marginRight: 1 }} />
              <Typography component="span">Poster Image Uploaded</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CloseIcon sx={{ color: "red", fontSize: 21, marginRight: 1 }} />
              <Typography component="span">Poster Image Missing</Typography>
            </Box>
          )}
        </Box>
        <Box>
          {hasCaption ? (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CheckIcon sx={{ color: "green", fontSize: 21, marginRight: 1 }} />
              <Typography component="span">Poster Caption Uploaded</Typography>
            </Box>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CloseIcon sx={{ color: "red", fontSize: 21, marginRight: 1 }} />
              <Typography component="span">Poster Caption Missing</Typography>
            </Box>
          )}
        </Box>
        <Typography fontWeight="bold" marginTop="10px" fontSize="18px">
          Reminders:
        </Typography>
        {marketingReminders?.length > 0 ? (
          <Box
            sx={{
              maxHeight: "180px",
              overflowY: "auto",
              marginTop: "5px",
              padding: "5px",
              boxShadow: "inherit",
              "&::-webkit-scrollbar": { width: "5px" },
              "&::-webkit-scrollbar-track": { background: "#f1f1f1" },
              "&::-webkit-scrollbar-thumb": { background: "#888" },
              "&::-webkit-scrollbar-thumb:hover": { background: "#555" },
            }}
          >
            {marketingReminders.map((reminder, index) => (
              <Typography
                key={index}
                component="div"
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                - {reminder.name}
              </Typography>
            ))}
          </Box>
        ) : (
          <Typography>No Marketing Reminders</Typography>
        )}
      </CardContent>
    </Card>
  );
}