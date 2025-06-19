
import { AppProvider } from './context/appContext';
import './App.css';
import CurrencyConverter from './components/CurrencyConverter/CurrencyConverter';


function App() {
  return (
    <AppProvider>
      <div className="app">
        <h1>Currency Converter</h1>
        <CurrencyConverter />
      </div>
    </AppProvider>
  );
}

export default App;