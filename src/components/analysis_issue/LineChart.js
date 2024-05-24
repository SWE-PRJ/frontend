import { Line } from 'react-chartjs-2';
import {Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend } from 'chart.js';
import styles from '../../app/analysis_issue/page.module.css';

Chart.register(CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip);
  

function getDaysInMonth(month, year) { // 달별 날짜수 계산
  switch (month) {
      case '1월': case '3월': case '5월': case '7월':
      case '8월': case '10월': case '12월':
      return 31;
      case '4월': case '6월': case '9월': case '11월':
      return 30;
      case '2월':
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          return 29;
      } else {
          return 28;
      }
      default:
      throw new Error('Invalid month');   
      }
  }

const currentYear = new Date().getFullYear();

export default function LineChart({ data, month }) {
  const daysInMonth = getDaysInMonth(month, currentYear);
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
    scales: {
      x: {
        type: 'category',
        title: { display: true, text: 'Day' },
        ticks: {
          callback: function(val, index) {
            return labels.includes(index+1) ? val+1 : '';
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
