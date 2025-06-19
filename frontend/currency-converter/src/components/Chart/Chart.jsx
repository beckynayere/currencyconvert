import { useEffect, useState } from 'react';
import { fetchHistoricalRates } from '../../services/api';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import './Chart.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const Chart = ({ baseCurrency, targetCurrency }) => {
  const [historicalData, setHistoricalData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [timeRange, setTimeRange] = useState('7d');

  useEffect(() => {
    const getHistoricalData = async () => {
      try {
        setLoading(true);
        const endDate = new Date();
        let startDate = new Date();
        
        switch(timeRange) {
          case '7d':
            startDate.setDate(endDate.getDate() - 7);
            break;
          case '1m':
            startDate.setMonth(endDate.getMonth() - 1);
            break;
          case '3m':
            startDate.setMonth(endDate.getMonth() - 3);
            break;
          case '1y':
            startDate.setFullYear(endDate.getFullYear() - 1);
            break;
          default:
            startDate.setDate(endDate.getDate() - 7);
        }
        
        const data = await fetchHistoricalRates(
          baseCurrency,
          targetCurrency,
          startDate,
          endDate
        );
        
        setHistoricalData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    
    getHistoricalData();
  }, [baseCurrency, targetCurrency, timeRange]);

  const chartData = {
    labels: historicalData?.labels || [],
    datasets: [
      {
        label: `${baseCurrency} to ${targetCurrency}`,
        data: historicalData?.rates || [],
        borderColor: '#3498db',
        backgroundColor: 'rgba(52, 152, 219, 0.1)',
        tension: 0.4,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            return `1 ${baseCurrency} = ${context.parsed.y.toFixed(4)} ${targetCurrency}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

  return (
    <div className="chart-container">
      <div className="chart-controls">
        <button 
          className={timeRange === '7d' ? 'active' : ''}
          onClick={() => setTimeRange('7d')}
        >
          1W
        </button>
        <button 
          className={timeRange === '1m' ? 'active' : ''}
          onClick={() => setTimeRange('1m')}
        >
          1M
        </button>
        <button 
          className={timeRange === '3m' ? 'active' : ''}
          onClick={() => setTimeRange('3m')}
        >
          3M
        </button>
        <button 
          className={timeRange === '1y' ? 'active' : ''}
          onClick={() => setTimeRange('1y')}
        >
          1Y
        </button>
      </div>
      
      {loading ? (
        <div className="loading">Loading chart data...</div>
      ) : error ? (
        <div className="error">{error}</div>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default Chart;