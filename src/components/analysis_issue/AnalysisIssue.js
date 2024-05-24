'use client';
import { useState } from 'react';
import styles from '../../app/analysis_issue/page.module.css';
import LineChart from './LineChart';

const monthlyData = [
  { month: '4월', issues: 0 },
  { month: '5월', issues: 4 },
  { month: '6월', issues: 2 },
  { month: '7월', issues: 1 },
  { month: '8월', issues: 6 },
  { month: '9월', issues: 7 },
  { month: '10월', issues: 8 },
  { month: '11월', issues: 8 },
  { month: '12월', issues: 9 },
];

const dailyData = {
    '4월' : {},
    '5월': {
      1: 1,
      2: 2,
      31: 1
    },
    '6월': {
        1: 1,
        10: 2,
        30: 1
      },
  };

export default function AnalysisIssue() {
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <div className={styles.container}>
      <div className={styles.chartContainer}>
        <div className={styles.barChart}>
          {monthlyData.map((data, index) => (
            <div
              key={index}
              className={styles.bar}
              style={{ height: `${data.issues * 10}%` }}
              onClick={() => setSelectedMonth(data.month)}
            >
              <span>{data.issues}</span>
              <div>{data.month}</div>
            </div>
          ))}
        </div>
        <br></br>
        <div className={styles.barLabel}>
            {selectedMonth ? `Issues/${selectedMonth}` : 'Issues/month'}
        </div>
        <hr className={styles.divider} />
        {selectedMonth && (
          <LineChart data={dailyData[selectedMonth]} month={selectedMonth} />
        )}
      </div>
    </div>
  );
}
