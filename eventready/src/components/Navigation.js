import React from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core";
import Drawer from "@material-ui/core/Drawer";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from '@mui/icons-material/Inbox';
import MailIcon from '@mui/icons-material/Mail';
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router-dom";
import GeneralInfoPage from "../pages/GeneralInfoPage";
import HelloWorld from "../HelloWorld";
import MarketingPage from "../pages/MarketingPage";
import "../styles/Navigation.css";
import Footer from "./Footer";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex"
  },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: "none"
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundColor: "red",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between"
  },
  content: {
    flexGrow: 1,
    paddingTop: "50px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [HeaderName, setHeaderName] = React.useState("General Info");
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (

      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="fixed"
          className={clsx(classes.appBar, {
            [classes.appBarShift]: open
          })}
        >
          <Toolbar style={{backgroundColor:"red"}}>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, open && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap >
              {HeaderName}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={open}
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={classes.drawerHeader}>
          <h1> <Link class="navigationHeader" to="/">Event Ready!</Link></h1> 
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === "ltr" ? (
                <ChevronLeftIcon style={{color: "white", fontSize: "larger"}}/>
              ) : (
                <ChevronRightIcon />
              )}
            </IconButton>
          </div>
          <Divider />
          <List>
            <ListItem button key="generalinfo" to="generalinfo" component={Link} onClick={()=>{setHeaderName("General Information")}}>
              <ListItemIcon>
                <MailIcon />
              </ListItemIcon>
              <ListItemText primary="General Information" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="hello" to="helloworld" component={Link} onClick={()=>{setHeaderName("Goals")}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Goals" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="hello" to="helloworld" component={Link} onClick={()=>{setHeaderName("Tasks")}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Tasks" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="hello" to="helloworld" component={Link} onClick={()=>{setHeaderName("Budget")}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Budget" />
            </ListItem>
          </List>
          <Divider />
          <List>
            <ListItem button key="marketing" to="marketing" component={Link} onClick={()=>{setHeaderName("Marketing")}}>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText primary="Marketing" />
            </ListItem>
          </List>
        </Drawer>
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: open
          })}
        >
      
          <Routes>                  
          <Route path="generalinfo" element={<GeneralInfoPage />} />
          <Route path="helloworld" element={<HelloWorld />} />
          <Route path="marketing" element={<MarketingPage />} />
          </Routes>
 
        </main>
        <Footer></Footer>
      </div>
    
  );
}
