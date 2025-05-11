import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BarChart2, PieChart, LineChart, Download } from 'lucide-react';
import DatasetInsightsChart from '../components/charts/DatasetInsightsChart';

type ChartConfig = {
  title: string;
  type: 'bar' | 'pie' | 'line';
  dataKey: 'genre' | 'year' | 'rating' | 'publisher';
};

const DataInsights: React.FC = () => {
  const [selectedChartType, setSelectedChartType] = useState<string>('all');

  const chartConfigs: ChartConfig[] = [
    { title: 'Book Distribution by Genre', type: 'pie', dataKey: 'genre' },
    { title: 'Publication Year Distribution', type: 'bar', dataKey: 'year' },
    { title: 'Rating Distribution', type: 'bar', dataKey: 'rating' },
    { title: 'Books by Publisher', type: 'pie', dataKey: 'publisher' }
  ];

  const filteredCharts = selectedChartType === 'all' 
    ? chartConfigs 
    : chartConfigs.filter(chart => chart.type === selectedChartType);

  const datasetStats = {
    totalBooks: 2703,
    totalAuthors: 1243,
    uniqueGenres: 32,
    avgRating: 3.87,
    yearRange: "1892-2023",
    missingValues: "2.3%",
    dataPoints: 21624
  };

  return (
    <div className="pt-20 bg-dark-50 min-h-screen">
      <section className="bg-gradient-to-r from-dark-800 to-dark-900 text-white py-12">
        <div className="container-custom mx-auto">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-serif font-bold mb-4"
          >
            Dataset Insights & Visualizations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg opacity-90 max-w-3xl"
          >
            Explore the characteristics and patterns of our book dataset through interactive visualizations
          </motion.p>
        </div>
      </section>

      <div className="container-custom mx-auto py-8">
        {/* Dataset Overview Stats */}
        <section className="mb-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Dataset Overview</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(datasetStats).map(([key, value], index) => (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-4 rounded-lg shadow-md"
              >
                <p className="text-dark-500 text-sm">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</p>
                <p className="text-2xl font-semibold text-primary-700">{value}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Chart Type Filters */}
        <div className="mb-8 flex flex-wrap gap-2">
          <button
            onClick={() => setSelectedChartType('all')}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedChartType === 'all'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-dark-600 hover:bg-primary-50'
            }`}
          >
            <BarChart2 size={18} className="mr-2" />
            All Charts
          </button>
          <button
            onClick={() => setSelectedChartType('bar')}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedChartType === 'bar'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-dark-600 hover:bg-primary-50'
            }`}
          >
            <BarChart2 size={18} className="mr-2" />
            Bar Charts
          </button>
          <button
            onClick={() => setSelectedChartType('pie')}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedChartType === 'pie'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-dark-600 hover:bg-primary-50'
            }`}
          >
            <PieChart size={18} className="mr-2" />
            Pie Charts
          </button>
          <button
            onClick={() => setSelectedChartType('line')}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedChartType === 'line'
                ? 'bg-primary-600 text-white'
                : 'bg-white text-dark-600 hover:bg-primary-50'
            }`}
          >
            <LineChart size={18} className="mr-2" />
            Line Charts
          </button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {filteredCharts.map((chart, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md p-4"
            >
              <DatasetInsightsChart
                title={chart.title}
                chartType={chart.type}
                dataKey={chart.dataKey}
              />
            </motion.div>
          ))}
        </div>

        {/* Dataset Information */}
        <section className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-serif font-bold mb-4">About the Dataset</h2>
          <div className="prose max-w-none">
            <p className="mb-4">
              This dataset contains information about books collected from various online sources and libraries. 
              It includes details such as book title, author, publication year, genre, rating, and more.
            </p>
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">Dataset Characteristics</h3>
            <ul className="list-disc pl-6 mb-4">
              <li>Over 2,700 book records</li>
              <li>8+ attributes per book</li>
              <li>Books spanning from 1892 to 2023</li>
              <li>Covers 32 different genres</li>
              <li>Includes both fiction and non-fiction</li>
              <li>Data is cleaned with minimal missing values</li>
            </ul>
            <h3 className="text-xl font-serif font-semibold mt-6 mb-2">Data Processing</h3>
            <p>
              The dataset underwent extensive preprocessing, including:
            </p>
            <ul className="list-disc pl-6">
              <li>Missing value imputation using statistical methods</li>
              <li>Standardization of author names and book titles</li>
              <li>Genre categorization and normalization</li>
              <li>Text preprocessing for description fields</li>
              <li>Feature extraction for use in machine learning algorithms</li>
            </ul>
          </div>
          <div className="mt-6">
            <button className="btn btn-outline flex items-center">
              <Download size={18} className="mr-2" />
              Download Dataset Information
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DataInsights;