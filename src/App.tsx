import './App.css';
import { BatteryManagerProvider } from './context/BatteryManager/Provider';
import BatteryLevel from './components/BatteryManager/BatteryLevel';

const App = () => {
  return (
    <BatteryManagerProvider>
      <div className='App'>
        <BatteryLevel />
      </div>
    </BatteryManagerProvider>
  );
};

export default App;
