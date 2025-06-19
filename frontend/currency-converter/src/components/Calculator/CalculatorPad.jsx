import { useAppContext } from '../../context/AppContext';

const CalculatorPad = () => {
  const { amount, setAmount } = useAppContext();
  
  const handleButtonClick = (value) => {
    switch(value) {
      case 'C':
        setAmount(0);
        break;
      case '←':
        setAmount(prev => {
          const str = prev.toString();
          return str.length > 1 ? parseFloat(str.slice(0, -1)) : 0;
        });
        break;
      case '.':
        setAmount(prev => {
          const str = prev.toString();
          return str.includes('.') ? prev : parseFloat(str + '.');
        });
        break;
      default:
        setAmount(prev => {
          const str = prev.toString();
          return str === '0' ? parseFloat(value) : parseFloat(str + value);
        });
    }
  };

  const buttons = [
    '7', '8', '9',
    '4', '5', '6',
    '1', '2', '3',
    '0', '.', '←',
    'C'
  ];

  return (
    <div className="calculator-pad">
      {buttons.map(btn => (
        <button 
          key={btn}
          onClick={() => handleButtonClick(btn)}
          className={btn === 'C' ? 'clear-btn' : ''}
        >
          {btn}
        </button>
      ))}
    </div>
  );
};

export default CalculatorPad;