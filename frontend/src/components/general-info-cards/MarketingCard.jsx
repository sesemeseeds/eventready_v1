import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import { useState, useEffect } from "react";
import CardHeader from "@mui/material/CardHeader";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { Tooltip } from "@mui/material";
import { Box, Container } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CheckIcon from "@mui/icons-material/Check";

export default function MarketingCard({ marketingPoster, marketingReminders }) {
  const [hasImage, setHasImage] = useState(false);
  const [hasCaption, setHasCaption] = useState(false);

  useEffect(() => {
    if (marketingPoster?.image) {
      setHasImage(true);
    } else {
      setHasImage(false);
    }

    if (marketingPoster?.caption) {
      setHasCaption(true);
    } else {
      setHasCaption(false);
    }
  }, [marketingPoster]);

  return (
    <Card sx={{ boxShadow: 3, width: 300 }}>
        <Box sx={{ backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)", paddingLeft: "10px" }}>
        {" "}
        <Typography fontWeight="bold" variant="h5" component="div" color="white">
          Marketing
        </Typography>
      </Box>

      <CardActionArea>
        <CardContent sx={{ height: 310}}>
          <Typography>
            {hasImage ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckIcon
                  sx={{ color: "green", fontSize: 21, marginRight: 1 }}
                />
                <Typography component="span">Poster Image Uploaded</Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloseIcon
                  sx={{ color: "red", fontSize: 21, marginRight: 1 }}
                />
                <Typography component="span">Poster Image Missing</Typography>
              </Box>
            )}
          </Typography>
          <Typography>
            {hasCaption ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CheckIcon
                  sx={{ color: "green", fontSize: 21, marginRight: 1 }}
                />
                <Typography component="span">
                  Poster Caption Uploaded
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CloseIcon
                  sx={{ color: "red", fontSize: 21, marginRight: 1 }}
                />
                <Typography component="span">Poster Caption Missing</Typography>
              </Box>
            )}
          </Typography>
          <Typography fontWeight="bold" marginTop="10px" fontSize="18px">
            {" "}
            Reminders:
          </Typography>
          {marketingReminders?.length > 0 && (
            <Box
              sx={{
                maxHeight: "180px",
                overflowY: "auto",
                marginTop: "5px",

                padding: "5px",
                boxShadow: "inherit",
                "&::-webkit-scrollbar": {
                  width: "5px",
                },
                "&::-webkit-scrollbar-track": {
                  background: "#f1f1f1",
                },
                "&::-webkit-scrollbar-thumb": {
                  background: "#888",
                },
                "&::-webkit-scrollbar-thumb:hover": {
                  background: "#555",
                },
              }}
            >
              {marketingReminders?.map((reminder, index) => (
                <Typography
                  key={index}
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
          )}

          {marketingReminders?.length === 0 && (
            <Typography>No Marketing Reminders</Typography>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
