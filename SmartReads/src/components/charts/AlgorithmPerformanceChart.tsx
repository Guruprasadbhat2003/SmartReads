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
  RadialLinearScale,
  ArcElement,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  RadialLinearScale,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

type ChartType = 'bar' | 'line' | 'radar';

interface AlgorithmPerformanceChartProps {
  title: string;
  chartType?: ChartType;
}

const AlgorithmPerformanceChart: React.FC<AlgorithmPerformanceChartProps> = ({ 
  title, 
  chartType = 'bar' 
}) => {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    // Simulated data - in a real app, this would come from the API
    const labels = ['Cosine Similarity', 'KNN', 'Matrix Factorization', 'Clustering'];
    
    const accuracyData = {
      labels,
      datasets: [
        {
          label: 'Accuracy (%)',
          data: [87, 82, 91, 79],
          backgroundColor: 'rgba(59, 130, 246, 0.5)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
      ],
    };
    
    const precisionRecallData = {
      labels,
      datasets: [
        {
          label: 'Precision',
          data: [0.84, 0.78, 0.88, 0.76],
          backgroundColor: 'rgba(249, 115, 22, 0.5)',
          borderColor: 'rgb(249, 115, 22)',
          borderWidth: 1,
        },
        {
          label: 'Recall',
          data: [0.82, 0.75, 0.86, 0.74],
          backgroundColor: 'rgba(16, 185, 129, 0.5)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
        }
      ],
    };
    
    const performanceMetricsData = {
      labels: ['Accuracy', 'Precision', 'Recall', 'F1 Score', 'Coverage', 'Diversity'],
      datasets: [
        {
          label: 'Cosine Similarity',
          data: [87, 84, 82, 83, 76, 68],
          backgroundColor: 'rgba(59, 130, 246, 0.2)',
          borderColor: 'rgb(59, 130, 246)',
          borderWidth: 1,
        },
        {
          label: 'KNN',
          data: [82, 78, 75, 76, 72, 81],
          backgroundColor: 'rgba(249, 115, 22, 0.2)',
          borderColor: 'rgb(249, 115, 22)',
          borderWidth: 1,
        },
        {
          label: 'Matrix Factorization',
          data: [91, 88, 86, 87, 85, 74],
          backgroundColor: 'rgba(16, 185, 129, 0.2)',
          borderColor: 'rgb(16, 185, 129)',
          borderWidth: 1,
        },
        {
          label: 'Clustering',
          data: [79, 76, 74, 75, 81, 86],
          backgroundColor: 'rgba(107, 114, 128, 0.2)',
          borderColor: 'rgb(107, 114, 128)',
          borderWidth: 1,
        }
      ],
    };

    if (title.includes('Accuracy')) {
      setChartData(accuracyData);
    } else if (title.includes('Precision')) {
      setChartData(precisionRecallData);
    } else {
      setChartData(performanceMetricsData);
    }
  }, [title]);

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
      case 'line':
        return <Line options={options} data={chartData} />;
      case 'radar':
        return <Radar options={options} data={chartData} />;
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

export default AlgorithmPerformanceChart;