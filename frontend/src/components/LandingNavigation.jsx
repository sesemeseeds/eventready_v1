import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

import MailIcon from "@mui/icons-material/Mail";
import { LandingPage } from "../pages/LandingPage";
import EventIcon from "@mui/icons-material/Event";
import ArchiveIcon from "@mui/icons-material/Archive";
import PersonIcon from "@mui/icons-material/Person"
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { UserButton, useUser } from "@clerk/clerk-react";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  minHeight: "80px",

  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const [display, setDisplay] = React.useState("ActiveEvents");
  const [openDialog, setOpenDialog] = React.useState(false);
  const { signOut } = useClerk();
  const navigate = useNavigate();
  const { isSignedIn, user, isLoaded } = useUser();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleSignOutConfirm = () => {
    setOpenDialog(false);
    signOut();
    navigate("/");
  };

  const handleSignOutCancel = () => {
    setOpenDialog(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)" }}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            fontWeight="bold"
            width="95%"
            textAlign="center"
            variant="h5"
            noWrap
            component="div"
            // color="black"
          >
            Event Ready!
          </Typography>
          <div className="user-info">
        {isLoaded && isSignedIn ? (
          <div>
            <UserButton />
          </div>
        ) : (
          <span>Not signed in</span>
        )}
      </div>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
           backgroundColor: "aliceblue"
          },
  
        }}
     
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader sx={{backgroundImage: "linear-gradient(15deg, #80d0c7 0%,  #13547a 0%)" }}>
        <div className="logo-container">
        <img src="../src/images/ERlogo.png" alt="Event Ready Logo" className="logo" />
        </div>          
      <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white", fontSize: "larger" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItemButton onClick={() => setDisplay("ActiveEvents")}>
            <ListItemIcon>
              <EventIcon />
            </ListItemIcon>
            <ListItemText primary="Events" />
          </ListItemButton>
        </List>
        <Divider />
        <List>
          <ListItemButton onClick={() => setDisplay("InactiveEvents")}>
            <ListItemIcon>
              <ArchiveIcon />
            </ListItemIcon>
            <ListItemText primary="Archived Events" />
          </ListItemButton>
        </List>
        <Divider />
        {/* <List>
          <ListItemButton onClick={() => setOpenDialog(true)}>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Sign Out" />
          </ListItemButton>
        </List>
        <Divider /> */}
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        <LandingPage display={display}></LandingPage>
      </Main>

      <Dialog open={openDialog} onClose={handleSignOutCancel}>
        <DialogTitle>Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out?
          </DialogContentText>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#009CDF" }}>
          <Button
            variant="contained"
            onClick={handleSignOutCancel}
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={handleSignOutConfirm}
            color="primary"
            autoFocus
          >
            Sign Out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
