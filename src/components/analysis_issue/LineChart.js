import { Line } from 'react-chartjs-2';
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip } from 'chart.js';
import styles from '../../app/analysis_issue/page.module.css';

Chart.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip);

function getDaysInMonth(month, year) {
  switch (month) {
    case 1: case 3: case 5: case 7:
    case 8: case 10: case 12:
      return 31;
    case 4: case 6: case 9: case 11:
      return 30;
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    default:
      throw new Error('Invalid month');
  }
}

export default function LineChart({ data, month }) {
  const [year, monthNumber] = month.split('-');
  const numericYear = parseInt(year, 10);
  const numericMonth = parseInt(monthNumber, 10);
  const daysInMonth = getDaysInMonth(numericMonth, numericYear);
  const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
  const issueDays = Object.keys(data).map(Number).filter(day => data[day] > 0);
  const labels = [1, daysInMonth, ...issueDays];

  const chartData = {
    labels: days,
    datasets: [
      {
        label: `Issues/day in ${month}`,
        data: days.map(day => data[day] || 0),
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 2,
        fill: false,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        display: false  
      }
    },
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Day' },
        ticks: {
          callback: function (val, index) {
            return labels.includes(index + 1) ? val + 1 : '';
          },
          autoSkip: false,
          maxRotation: 90,
          maxTicksLimit: 10
        }
      },
      y: {
        type: 'linear',
        title: { display: true, text: 'Issues' },
        beginAtZero: true,
        ticks: {
          stepSize: 1,
          precision: 0
        }
      },
    },
  };

  return (
    <div className={styles.lineChart}>
      <Line data={chartData} options={options} />
    </div>
  );
}

