import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie, Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'pie' | 'line';

interface DatasetInsightsChartProps {
  title: string;
  chartType: ChartType;
  dataKey: 'genre' | 'year' | 'rating' | 'publisher';
}

const DatasetInsightsChart: React.FC<DatasetInsightsChartProps> = ({ 
  title, 
  chartType, 
  dataKey 
}) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Simulated data - in a real app, this would come from the API
    const genreDistribution = {
      labels: ['Fiction', 'Non-Fiction', 'Science Fiction', 'Fantasy', 'Mystery', 'Romance', 'Biography', 'History', 'Horror', 'Thriller'],
      datasets: [
        {
          label: 'Number of Books',
          data: [532, 423, 287, 321, 198, 246, 187, 165, 143, 201],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(217, 70, 239, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(99, 102, 241, 0.7)',
            'rgba(20, 184, 166, 0.7)',
            'rgba(37, 99, 235, 0.7)',
            'rgba(124, 58, 237, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };
    
    const yearDistribution = {
      labels: ['Before 1950', '1950-1970', '1971-1990', '1991-2000', '2001-2010', '2011-2020', 'After 2020'],
      datasets: [
        {
          label: 'Number of Books',
          data: [156, 287, 465, 523, 678, 745, 246],
          backgroundColor: 'rgba(59, 130, 246, 0.7)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
    
    const ratingDistribution = {
      labels: ['1-2', '2-3', '3-3.5', '3.5-4', '4-4.5', '4.5-5'],
      datasets: [
        {
          label: 'Number of Books',
          data: [87, 256, 432, 876, 654, 321],
          backgroundColor: 'rgba(249, 115, 22, 0.7)',
          borderColor: 'rgb(249, 115, 22)',
          borderWidth: 1,
        },
      ],
    };
    
    const publisherDistribution = {
      labels: ['Penguin', 'Random House', 'HarperCollins', 'Simon & Schuster', 'Hachette', 'Macmillan', 'Others'],
      datasets: [
        {
          label: 'Number of Books',
          data: [578, 654, 432, 321, 287, 198, 623],
          backgroundColor: [
            'rgba(59, 130, 246, 0.7)',
            'rgba(249, 115, 22, 0.7)',
            'rgba(16, 185, 129, 0.7)',
            'rgba(217, 70, 239, 0.7)',
            'rgba(245, 158, 11, 0.7)',
            'rgba(239, 68, 68, 0.7)',
            'rgba(99, 102, 241, 0.7)',
          ],
          borderWidth: 1,
        },
      ],
    };

    switch (dataKey) {
      case 'genre':
        setChartData(genreDistribution);
        break;
      case 'year':
        setChartData(yearDistribution);
        break;
      case 'rating':
        setChartData(ratingDistribution);
        break;
      case 'publisher':
        setChartData(publisherDistribution);
        break;
      default:
        setChartData(genreDistribution);
    }
  }, [dataKey]);

  if (!chartData) {
    return <div className="flex justify-center items-center py-12"><div className="loader"></div></div>;
  }

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: title,
        font: {
          size: 16,
          weight: 'bold' as const,
          family: "'Inter', sans-serif",
        }
      },
    },
  };

  const renderChart = () => {
    switch (chartType) {
      case 'pie':
        return <Pie options={options} data={chartData} />;
      case 'line':
        return <Line options={options} data={chartData} />;
      default:
        return <Bar options={options} data={chartData} />;
    }
  };

  return (
    <div className="chart-container">
      {renderChart()}
    </div>
  );
};

export default DatasetInsightsChart;