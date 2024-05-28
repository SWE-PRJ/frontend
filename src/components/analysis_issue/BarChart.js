import { Bar } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import styles from '../../app/analysis_issue/page.module.css';

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export default function BarChart({ data, title, category }) {
  const labels = Object.keys(data);
  const values = Object.values(data);

  const chartData = {
    labels,
    datasets: [
      {
        label: title,
        data: values,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const options = {
    scales: {
      x: {
        title: { display: true, text: category },
      },
      y: {
        beginAtZero: true,
        title: { display: true, text: 'Issues' },
      },
    },
  };

  return (
    <div className={styles.barChart}>
      <Bar data={chartData} options={options} />
    </div>
  );
}
