import React, { useEffect } from "react";
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
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FlagIcon from '@mui/icons-material/Flag';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import PersonIcon from '@mui/icons-material/Person';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CollectionsIcon from '@mui/icons-material/Collections';
import InfoIcon from '@mui/icons-material/Info';
import HelpRoundedIcon from '@mui/icons-material/HelpRounded';

import {
  BrowserRouter,
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import GeneralInfoPage from "../pages/GeneralInfoPage";
import MarketingPage from "../pages/MarketingPage";
import "../styles/Navigation.css";
import Footer from "./Footer";
import AttendancePage from "../pages/Attendance";
import TasksPage from "../pages/TasksPage";
import GoalsPage from "../pages/GoalsPage";
import GalleryPage from "../pages/GalleryPage";
import { useLocation } from "react-router-dom";
import BudgetPage from "../pages/BudgetPage";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle"; 
import DialogContent from "@material-ui/core/DialogContent"; 
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
      },
  appBar: {
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
      },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
          },
  drawerPaper: {
    width: drawerWidth,
    backgroundColor: "aliceblue"
  },
  drawerHeader: {
    display: "flex",
    alignItems: "center",
    backgroundImage: "linear-gradient(15deg, #13547a 100%, #80d0c7 100%)",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: "space-between",
  },
  content: {
    flexGrow: 1,
    paddingTop: "50px",
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
      },
  contentShift: {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

export default function PersistentDrawerLeft() {
  const classes = useStyles();
  const theme = useTheme();
  const [HeaderName, setHeaderName] = React.useState();
  const [open, setOpen] = React.useState(true);
  const [openDialog, setOpenDialog] = React.useState(false);
  const [dialogContent, setDialogContent] = React.useState("");
  const location = useLocation();

  useEffect(() => {
    updateHeader();
  }, []);
  
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (content) => {
    setDialogContent(content);
    setOpenDialog(true);
  };
  const handleDialogClose = () => {
    setOpenDialog(false); // Close dialog
  };

  const updateHeader = () => {
    let url = location.pathname;
    let sections = url.split("/");
    let name = sections[sections.length - 1];
    switch (name) {
      case "info":
        setHeaderName("General Information");
        break;
      case "goals":
        setHeaderName("Goals");
        break;
      case "gallery":
        setHeaderName("Gallery");
        break;
      case "tasks":
        setHeaderName("Tasks");
        break;
      case "budget":
        setHeaderName("Budget");
        break;
      case "marketing":
        setHeaderName("Marketing");
        break;
      case "attendance":
        setHeaderName("Attendance");
        break;
      default:
        break;
    }
  };

  const getDialogContent = (name) => {
    switch (name) {
      case "General Information":
        return (
          <>
            <Typography variant="h6" style={{ color: "black" }}>
              🎉 Welcome to EventReady! 🎉
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Click on "Edit Info" to customize event details.
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Below, explore other aspects of your event such as goals, tasks, budget, and more.
            </Typography>
                
          </>
        );
      
      case "Goals":
          return (
            <>
              <Typography variant="h6" style={{ color: "black" }}>
                🎯 Welcome to the Goals page! 🎯
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                Here, you can set and track your event goals with ease. Assign names, priorities, statuses, assignees, and deadlines to each goal to keep your event planning on track and your team motivated.
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                Click on the 'Add Goal' button to set and track event objectives, ensuring seamless progress tracking within your organization.
              </Typography>

            </>
          );
      
      case "Tasks":
            return (
              <>
                <Typography variant="h6" style={{ color: "black" }}>
                  📋 Welcome to the Task Board! 📋
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                With our intuitive Task Board, you'll stay organized, efficient, and on top of your event planning tasks.
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  Our Task Board is divided into three sections: To Do, In Progress, and Done.
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                 To add tasks within each section, click on the ➕ button located at the top right corner of the respective column. 
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  Once you've filled in the details such as name, assignee, priority level, etc., click on the 'Add Task' button to finalize.                
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  🔍 Search for tasks by filtering them based on priority, making it easier to tackle high-priority items first.
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  🔄 Move task cards seamlessly between columns to reflect their progress and status changes.
                </Typography>
              </>
            );
             
      case "Budget":
        return (
          <>
            <Typography variant="h6" style={{ color: "black" }}>
              💰 Welcome to the Budget Page! 💰
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              Need to keep track of your event finances? You're in the right place! 💸
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
            With our intuitive Budget Page, you'll have full control over your event expenses, allowing you to plan and execute your event within budget.
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              📊 Easily monitor your spending with our interactive progress bar, which tracks the amount spent from your total budget.
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              📋 Add budget categories and subcategories to organize your expenses effectively.
            </Typography>
            <Typography variant="body1" style={{ color: "black" }}>
              ✅ Mark subcategories as "Paid" to reflect the amount spent and update the progress bar accordingly.
            </Typography>
          </>
        );
      
      case "Marketing":
          return (
            <>
            <Typography variant="h6" style={{ color: "black" }}>
              📷 Welcome to the Marketing Page! 📷
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                Need to promote your event and attract attendees? Look no further! 📣
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                💡 With our comprehensive Marketing Page, you'll have everything you need to create compelling campaigns and maximize attendance at your event.
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                📅 Use the Reminders section to keep your team members on track with marketing tasks and deadlines.
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                🖼️ Upload eye-catching graphics and posters in the Upload Poster section for your audience.
              </Typography>
              <Typography variant="body1" style={{ color: "black" }}>
                🔗 Explore the Helpful Links section to enhance your marketing efforts.
              </Typography>
            </>
          );
        
      case "Attendance":
            return (
              <>
                <Typography variant="h6" style={{ color: "black" }}>
                  👥 Welcome to the Attendance Page! 👥
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  Let's get ready to welcome guests and make your event a success! 🌟
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>                  
                  Two convenient methods are available for tracking attendance:
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  1. 🔗 Insert a link to your attendance form and display the QR code for easy scanning by attendees 📲
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  2. 📥 Import an Excel sheet containing attendee data to view who has checked in ✅
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  🔍 You can also search attendee by filtering the entries.
                </Typography>
                <Typography variant="body1" style={{ color: "black" }}>
                  📋 "Check-In List" will provide you an overview of all attendees' details in a tabular form.
                </Typography>
              </>
            );     
      
      case "Gallery": // add this later
        return "View and manage event photos and videos on this page.";
            
      default:
        return "";
    }
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar style={{ backgroundImage: "linear-gradient(15deg, #13547a 0%, #80d0c7 100%)" }}>
    <IconButton
      color="inherit"
      aria-label="open drawer"
      onClick={handleDrawerOpen}
      edge="start"
      className={clsx(classes.menuButton, open && classes.hide)}
    >
      <MenuIcon />
    </IconButton>
    <Typography variant="h6" noWrap>
      {HeaderName}
    </Typography>
      <IconButton onClick={() => handleDialogOpen(getDialogContent(HeaderName))}>
      <HelpRoundedIcon style={{ color: "white" }} />    
      </IconButton>
    </Toolbar>
  </AppBar>
  
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
          
        }}
      >
        <div className={classes.drawerHeader}>
          <h1>
            {" "}
            <Link className="navigationHeader" to="/dashboard">
              Event Ready!
            </Link>
          </h1>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{ color: "white", fontSize: "larger" }} />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            button
            key="info"
            to="info"
            component={Link}
            onClick={() => {
              setHeaderName("General Information");
            }}
          >
            <ListItemIcon>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="General Information" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="goals"
            to="goals"
            component={Link}
            onClick={() => {
              setHeaderName("Goals");
            }}
          >
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="Goals" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="hello"
            to="tasks"
            component={Link}
            onClick={() => {
              setHeaderName("Tasks");
            }}
          >
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Tasks" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="budget"
            to="budget"
            component={Link}
            onClick={() => {
              setHeaderName("Budget");
            }}
          >
            <ListItemIcon>
              <AttachMoneyIcon />
            </ListItemIcon>
            <ListItemText primary="Budget" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="marketing"
            to="marketing"
            component={Link}
            onClick={() => {
              setHeaderName("Marketing");
            }}
          >
            <ListItemIcon>
              <CameraAltIcon />
            </ListItemIcon>
            <ListItemText primary="Marketing" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="attendance"
            to="attendance"
            component={Link}
            onClick={() => {
              setHeaderName("Attendance");
            }}
          >
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Attendance" />
          </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem
            button
            key="gallery"
            to="gallery"
            component={Link}
            onClick={() => {
              setHeaderName("Gallery");
            }}
          >
            <ListItemIcon>
              <CollectionsIcon />
            </ListItemIcon>
            <ListItemText primary="Gallery" />
          </ListItem>
        </List>
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <Routes>
          <Route path="info" element={<GeneralInfoPage />} />
          <Route path="goals" element={<GoalsPage />} />
          <Route path="budget" element={<BudgetPage />} />
          <Route path="marketing" element={<MarketingPage />} />
          <Route path="Attendance" element={<AttendancePage />} />
          <Route path="tasks" element={<TasksPage />} />
          <Route path="gallery" element={<GalleryPage />} />
        </Routes>
      </main>
      <Footer></Footer>

      <Dialog open={openDialog} onClose={handleDialogClose}>
      <DialogTitle style={{ backgroundColor: '#13547a', color: 'white' }}>
          {HeaderName}
        </DialogTitle>
        <DialogContent>
          <Typography variant="subtitle1" style={{ color: "black" }}>
            <DialogContentText>{dialogContent}</DialogContentText>
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} style={{ backgroundColor: '#13547a', color: 'white' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

    </div>
  );
}
