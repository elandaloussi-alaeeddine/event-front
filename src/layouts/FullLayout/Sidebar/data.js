import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import EventIcon from '@mui/icons-material/Event';
import PeopleIcon from "@mui/icons-material/People"; // For managing users
import LogoutIcon from "@mui/icons-material/Logout"; // For logout
import EditCalendarIcon from '@mui/icons-material/EditCalendar';

const Menuitems = [
  {
    title: "Dashboard",
    icon: DashboardOutlinedIcon,
    href: "/app/dashboard",
    href2:"",
  },
  {
    title: "Events",
    icon: EventIcon,
    href: "/app/event",
    href2:"/app/event-details",
  },
  {
    title: "Manage Event",
    icon: EditCalendarIcon,
    href: "/app/manage-event",
    href2:"",
    
  },
  {
    title: "Manage Organization",
    icon: PeopleIcon,
    href: "/app/manage-organizers",
    href2:"",
  },
  {
    title: "Log out",
    icon: LogoutIcon,
    href: "/login",
    href2:"",
  },
];

export default Menuitems;
