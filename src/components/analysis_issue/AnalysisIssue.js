'use client';
import { useState, useEffect } from 'react';
import styles from '../../app/analysis_issue/page.module.css';
import LineChart from './LineChart';
import BarChart from './BarChart';

const rawData = [
  { date: '2023-01-15T09:50:54.047+00:00', issues: 10 },
  { date: '2023-02-10T09:50:54.047+00:00', issues: 6 },
  { date: '2023-03-20T09:50:54.047+00:00', issues: 7 },
  { date: '2023-04-05T09:50:54.047+00:00', issues: 0 },
  { date: '2023-05-12T09:50:54.047+00:00', issues: 4 },
  { date: '2023-06-25T09:50:54.047+00:00', issues: 2 },
  { date: '2023-07-30T09:50:54.047+00:00', issues: 1 },
  { date: '2023-08-14T09:50:54.047+00:00', issues: 6 },
  { date: '2023-09-23T09:50:54.047+00:00', issues: 7 },
  { date: '2023-10-08T09:50:54.047+00:00', issues: 8 },
  { date: '2023-11-17T09:50:54.047+00:00', issues: 8 },
  { date: '2023-12-25T09:50:54.047+00:00', issues: 9 },
  { date: '2024-01-01T09:50:54.047+00:00', issues: 5 },
  { date: '2024-02-11T09:50:54.047+00:00', issues: 4 },
];

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

const monthlyData = rawData.map(item => ({
  ...parseDate(item.date),
  issues: item.issues,
}));

const priorityData = {
  'blocker': 2,
  'critical': 3,
  'major': 10,
  'minor': 2,
  'trivial': 1,
};

const stateData = {
  'new': 4,
  'assigned': 3,
  'resolved': 2,
  'closed': 2,
  'reopened': 1,
};

const dailyData = {
  '2023-04': {},
  '2023-05': {
    1: 1,
    2: 2,
    31: 1
  },
  '2023-06': {
    1: 1,
    10: 2,
    30: 1
  },
};

export default function AnalysisIssue() {
  const getDefaultStartDate = () => {
    const today = new Date();
    const lastYear = new Date(today.getFullYear() - 1, today.getMonth() + 1);
    return { year: lastYear.getFullYear(), month: lastYear.getMonth() + 1 };
  };

  const getDefaultEndDate = () => {
    const today = new Date();
    return { year: today.getFullYear(), month: today.getMonth() + 1 };
  };

  const [selectedMonth, setSelectedMonth] = useState(null);
  const [startDate, setStartDate] = useState(getDefaultStartDate());
  const [endDate, setEndDate] = useState(getDefaultEndDate());

  useEffect(() => {
    const defaultStartDate = getDefaultStartDate();
    const defaultEndDate = getDefaultEndDate();
    setStartDate(defaultStartDate);
    setEndDate(defaultEndDate);
  }, []);

  const handleStartDateChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setStartDate({ year, month });

    const endYear = year + Math.floor((month + 10) / 12);
    const endMonth = (month + 10) % 12 + 1;
    if (endDate.year > endYear || (endDate.year === endYear && endDate.month > endMonth)) {
      setEndDate({ year: endYear, month: endMonth });
    }

    setSelectedMonth(null);
  };

  const handleEndDateChange = (e) => {
    const [year, month] = e.target.value.split('-').map(Number);
    setEndDate({ year, month });
    setSelectedMonth(null);
  };

  const getEndMonthOptions = () => {
    const options = [];
    const startMonth = startDate.month;
    const startYear = startDate.year;
    for (let i = 0; i < 12; i++) {
      const month = (startMonth + i - 1) % 12 + 1;
      const year = startYear + Math.floor((startMonth + i - 1) / 12);
      options.push({ year, month });
    }
    return options;
  };

  const filteredMonthlyData = monthlyData.filter(data => {
    const date = new Date(data.year, data.month - 1);
    const start = new Date(startDate.year, startDate.month - 1);
    const end = new Date(endDate.year, endDate.month - 1);
    return date >= start && date <= end;
  });

  return (
    <div className={styles.container}>
      <div className={styles.dateSelector}>
        <label>
          Start
          <input type="month" value={`${startDate.year}-${String(startDate.month).padStart(2, '0')}`} onChange={handleStartDateChange} />
        </label>
        <label>
          End
          <input type="month" value={`${endDate.year}-${String(endDate.month).padStart(2, '0')}`} onChange={handleEndDateChange} min={`${startDate.year}-${String(startDate.month).padStart(2, '0')}`} max={`${getEndMonthOptions()[11].year}-${String(getEndMonthOptions()[11].month).padStart(2, '0')}`} />
        </label>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.barChart}>
          {filteredMonthlyData.map((data, index) => (
            <div
              key={index}
              className={styles.bar}
              style={{ height: `${data.issues * 10}%` }}
              onClick={() => setSelectedMonth(`${data.year}-${String(data.month).padStart(2, '0')}`)}
            >
              <span>{data.issues}</span>
              <div>{`${String(data.year).slice(2)}'${data.month}월`}</div>
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
      <div className={styles.barChart}>
        <BarChart data={priorityData} title="Issues by Priority" category="Priority" />
        <BarChart data={stateData} title="Issues by State" category="State" />
      </div>
    </div>
  );
}
