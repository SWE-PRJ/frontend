"use client";
import { useState, useEffect } from "react";
import styles from "../../app/analysis_issue/page.module.css";
import LineChart from "./LineChart";
import BarChart from "./BarChart";
import { getIssueStatisticsAPI } from "@/api/IssueAPI";

const parseDate = (dateString) => {
  const date = new Date(dateString);
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
  };
};

function getDaysInMonth(month, year) {
  switch (month) {
    case 1:
    case 3:
    case 5:
    case 7:
    case 8:
    case 10:
    case 12:
      return 31;
    case 4:
    case 6:
    case 9:
    case 11:
      return 30;
    case 2:
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        return 29;
      } else {
        return 28;
      }
    default:
      throw new Error("Invalid month");
  }
}

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
  const [issueStatistics, setIssueStatistics] = useState({
    totalIssues: 0,
    issuesByStatus: {},
    issuesByPriority: {},
    issuesByMonth: {},
    issuesByDayPerMonth: {},
  });

  useEffect(() => {
    const fetchIssueStatistics = async () => {
      try {
        const startDateString = `${startDate.year}-${String(
          startDate.month
        ).padStart(2, "0")}-01`;
        const endDay = getDaysInMonth(endDate.month, endDate.year);
        const endDateString = `${endDate.year}-${String(endDate.month).padStart(
          2,
          "0"
        )}-${endDay}`;
        console.log(
          "Fetching issue statistics with start date:",
          startDateString,
          "and end date:",
          endDateString
        );
        const data = await getIssueStatisticsAPI(
          1,
          startDateString,
          endDateString
        ); // Assuming projectId is 1 for example
        console.log("Fetched issue statistics:", data);
        setIssueStatistics(data);
      } catch (error) {
        console.error("Error fetching issue statistics:", error);
      }
    };

    fetchIssueStatistics();
  }, [startDate, endDate]);

  const handleStartDateChange = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setStartDate({ year, month });

    const endYear = year + Math.floor((month + 10) / 12);
    const endMonth = ((month + 10) % 12) + 1;
    if (
      endDate.year > endYear ||
      (endDate.year === endYear && endDate.month > endMonth)
    ) {
      setEndDate({ year: endYear, month: endMonth });
    }

    setSelectedMonth(null);
  };

  const handleEndDateChange = (e) => {
    const [year, month] = e.target.value.split("-").map(Number);
    setEndDate({ year, month });
    setSelectedMonth(null);
  };

  const getEndMonthOptions = () => {
    const options = [];
    const startMonth = startDate.month;
    const startYear = startDate.year;
    for (let i = 0; i < 12; i++) {
      const month = ((startMonth + i - 1) % 12) + 1;
      const year = startYear + Math.floor((startMonth + i - 1) / 12);
      options.push({ year, month });
    }
    return options;
  };

  const filteredMonthlyData = Object.keys(issueStatistics.issuesByMonth)
    .map((key) => {
      const [year, month] = key.split("-").map(Number);
      return { year, month, issues: issueStatistics.issuesByMonth[key] };
    })
    .filter((data) => {
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
          <input
            type="month"
            value={`${startDate.year}-${String(startDate.month).padStart(
              2,
              "0"
            )}`}
            onChange={handleStartDateChange}
          />
        </label>
        <label>
          End
          <input
            type="month"
            value={`${endDate.year}-${String(endDate.month).padStart(2, "0")}`}
            onChange={handleEndDateChange}
            min={`${startDate.year}-${String(startDate.month).padStart(
              2,
              "0"
            )}`}
            max={`${getEndMonthOptions()[11].year}-${String(
              getEndMonthOptions()[11].month
            ).padStart(2, "0")}`}
          />
        </label>
      </div>
      <div className={styles.chartContainer}>
        <div className={styles.barChartContainer}>
          {" "}
          {/* New container for bar chart */}
          <div className={styles.barChart}>
            {filteredMonthlyData.map((data, index) => (
              <div
                key={index}
                className={styles.bar}
                style={{ height: `${data.issues * 10}%` }}
                onClick={() =>
                  setSelectedMonth(
                    `${data.year}-${String(data.month).padStart(2, "0")}`
                  )
                }
              >
                <span>{data.issues}</span>
                <div>{`${String(data.year).slice(2)}'${data.month}월`}</div>
              </div>
            ))}
          </div>
          <br></br>
          <div className={styles.barLabel}>
            {selectedMonth ? `Issues/${selectedMonth}` : "Issues/month"}
          </div>
          <hr className={styles.divider} />
          {selectedMonth && (
            <LineChart
              data={issueStatistics.issuesByDayPerMonth[selectedMonth]}
              month={selectedMonth}
            />
          )}
        </div>
      </div>
      <div className={styles.barChart}>
        <BarChart
          data={issueStatistics.issuesByPriority}
          title="Issues by Priority"
          category="Priority"
        />
        <BarChart
          data={issueStatistics.issuesByStatus}
          title="Issues by State"
          category="State"
        />
      </div>
    </div>
  );
}
