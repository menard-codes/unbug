import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { ThemeProvider, createTheme } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import Snapshot from './Snapshot';


function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          {children}
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const theme = createTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: {
      main: grey[300]
    }
  }
})

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: 'max-content',
    margin: '50px 0'
  },
}));

export default function SimpleTabs({ tabs, pending, retest, verified, defered, duplicate, rejected }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            {
              tabs.map((tab, i) => (
                <Tab label={tab} key={i} {...a11yProps(i)} />
              ))
            }
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <ul>
            {
              pending.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <ul>
            {
              retest.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <ul>
            {
              verified.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
        <TabPanel value={value} index={3}>
          <ul>
            {
              defered.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <ul>
            {
              duplicate.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <ul>
            {
              rejected.map(pend => (
                <li key={pend.id} style={{listStyle: 'none'}}>
                  <Snapshot title={pend.title} id={pend.id} />
                </li>
              ))
            }
          </ul>
        </TabPanel>
      </div>
    </ThemeProvider>
  );
}