// import { useState } from 'react';
// import { AppProvider } from './context/AppContext';
// import CurrencyCard from './components/CurrencyCard/CurrencyCard';
// import CalculatorPad from './components/Calculator/CalculatorPad';
// import Chart from './components/Chart/Chart';
// import ThemeToggle from './components/ThemeToggle/ThemeToggle';
// import './App.css';

// const App = () => {
//   const [selectedCurrency, setSelectedCurrency] = useState('EUR');
//   const [showCalculator, setShowCalculator] = useState(false);
//   const [showChart, setShowChart] = useState(false);
  
//   // Common currencies to display
//   const popularCurrencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY', 'SGD'];

//   return (
//     <AppProvider>
//       <div className="app">
//         <header>
//           <h1>Currency Converter</h1>
//           <ThemeToggle />
//         </header>
        
//         <main>
//           <section className="calculator-section">
//             <button 
//               className="toggle-btn"
//               onClick={() => setShowCalculator(!showCalculator)}
//             >
//               {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
//             </button>
            
//             {showCalculator && <CalculatorPad />}
//           </section>
          
//           <section className="currency-grid">
//             {popularCurrencies.map(currency => (
//               <CurrencyCard 
//                 key={currency}
//                 currency={currency}
//                 onClick={() => {
//                   setSelectedCurrency(currency);
//                   setShowChart(true);
//                 }}
//               />
//             ))}
//           </section>
          
//           {showChart && (
//             <section className="chart-section">
//               <button 
//                 className="close-chart"
//                 onClick={() => setShowChart(false)}
//               >
//                 × Close Chart
//               </button>
//               <Chart 
//                 baseCurrency="USD" 
//                 targetCurrency={selectedCurrency} 
//               />
//             </section>
//           )}
//         </main>
//       </div>
//     </AppProvider>
//   );
// };

// export default App;



import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import CurrencyCard from './components/CurrencyCard/CurrencyCard';
import CalculatorPad from './components/Calculator/CalculatorPad';
import Chart from './components/Chart/Chart';
import ThemeToggle from './components/ThemeToggle/ThemeToggle';
import './App.css';

const App = () => {
  const [selectedCurrency, setSelectedCurrency] = useState('EUR');
  const [showCalculator, setShowCalculator] = useState(false);
  const [showChart, setShowChart] = useState(false);
  
  const popularCurrencies = ['EUR', 'GBP', 'JPY', 'AUD', 'CAD', 'CNY', 'SGD'];

  return (
    <AppProvider>
      <div className="app">
        <header>
          <h1>Currency Converter</h1>
          <ThemeToggle />
        </header>
        
        <main>
          <section className="calculator-section">
            <button 
              className="toggle-btn"
              onClick={() => setShowCalculator(!showCalculator)}
            >
              {showCalculator ? 'Hide Calculator' : 'Show Calculator'}
            </button>
            
            {showCalculator && <CalculatorPad />}
          </section>
          
          <section className="currency-grid">
            {popularCurrencies.map(currency => (
              <CurrencyCard 
                key={currency}
                currency={currency}
                onClick={() => {
                  setSelectedCurrency(currency);
                  setShowChart(true);
                }}
              />
            ))}
          </section>
          
          {showChart && (
            <section className="chart-section">
              <button 
                className="close-chart"
                onClick={() => setShowChart(false)}
              >
                × Close Chart
              </button>
              <Chart 
                baseCurrency="USD" 
                targetCurrency={selectedCurrency} 
              />
            </section>
          )}
        </main>
      </div>
    </AppProvider>
  );
};

export default App;