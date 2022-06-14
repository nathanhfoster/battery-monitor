import logo from './logo.svg';
import './App.css';
import { BatteryManagerProvider } from './context/BatteryManager/Provider';

const App = () => {
  return (
    <BatteryManagerProvider>
      <div className='App'>
        <header className='App-header'>
          <img src={logo} className='App-logo' alt='logo' />
          <p>
            Edit <code>src/App.tsx</code> and save to reload.
          </p>
          <a
            className='App-link'
            href='https://reactjs.org'
            target='_blank'
            rel='noopener noreferrer'
          >
            Learn React
          </a>
        </header>
      </div>
      </BatteryManagerProvider>
  );
};

export default App;
