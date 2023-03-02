import * as React from 'react';
import { styled, useTheme, Theme, CSSObject } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { palette } from '../theme/palette';
import { Paper, Tooltip } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import AssessmentIcon from '@mui/icons-material/Assessment';
import SettingsIcon from '@mui/icons-material/Settings';
import { IconBreadcrumbs } from './Breadcrumbs';

export interface BasePageProps {
    title: string;
    children: JSX.Element;
    inProject: boolean;
}

const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  backgroundColor: palette.primary.main,
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    backgroundColor: palette.secondary.main,
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  }),
);

export default function BasePage(props: BasePageProps) {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  
  const drawerNavigate = {
    'Geral': {
      pathname: `/projeto/${id}`,
      icon: <SettingsIcon />,
    }, 
    'Logs': {
      pathname: `/projeto/${id}/logs`,
      icon: <AssessmentIcon />,
    }
  }

  const drawerGeneralNavigate = {
    'Home': {
      pathname: `/`,
      icon: <SettingsIcon />,
    }, 
    'Projetos': {
      pathname: `/projetos`,
      icon: <SettingsIcon />,
    }, 
    'Dashboard': {
      pathname: `/dashboard`,
      icon: <AssessmentIcon />,
    }
  }

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              color: palette.primary.contrastText,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {props.title}
          </Typography>
        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
            { props.inProject ?
                Object.keys(drawerNavigate).map((text: string, index) => (
                  <Tooltip title={text}>
                    <ListItem 
                      key={text} 
                      disablePadding 
                      sx={{ display: 'block' }}
                      onClick={() => {
                        navigate(drawerNavigate[text as keyof typeof drawerNavigate].pathname);
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {drawerNavigate[text as keyof typeof drawerNavigate].icon}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                ))
              :
                Object.keys(drawerGeneralNavigate).map((text: string, index) => (
                  <Tooltip title={text}>
                    <ListItem 
                      key={text} 
                      disablePadding 
                      sx={{ display: 'block' }}
                      onClick={() => {
                        navigate(drawerGeneralNavigate[text as keyof typeof drawerGeneralNavigate].pathname);
                      }}
                    >
                      <ListItemButton
                        sx={{
                          minHeight: 48,
                          justifyContent: open ? 'initial' : 'center',
                          px: 2.5,
                        }}
                      >
                        <ListItemIcon
                          sx={{
                            minWidth: 0,
                            mr: open ? 3 : 'auto',
                            justifyContent: 'center',
                          }}
                        >
                          {drawerGeneralNavigate[text as keyof typeof drawerGeneralNavigate].icon}
                        </ListItemIcon>
                        <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
                      </ListItemButton>
                    </ListItem>
                  </Tooltip>
                ))
            }
        </List>
      </Drawer>
      <Box component="main" sx={{ flexGrow: 1, p: 3, minHeight: "100vh", backgroundColor: palette.secondary.main }}>
        <DrawerHeader />
        <Paper 
          elevation={3} 
          sx={{ minHeight: 'calc(100% - 90px)'}}>
            {props.children}
        </Paper>
      </Box>
    </Box>
  );
}

export { BasePage };