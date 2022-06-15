import './App.css';
import { BatteryManagerProvider } from './context/BatteryManager/Provider';
import BatteryLevel from './components/BatteryManager/BatteryLevel';
import Grid from '@mui/material/Grid';

const App = () => {
  return (
    <BatteryManagerProvider>
      <Grid container sx={{ height: '100vh', alignItems: 'center', padding: 4 }}>
        <Grid item xs={12}><BatteryLevel /></Grid>
      </Grid>
    </BatteryManagerProvider>
  );
};

export default App;
