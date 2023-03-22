import { useEffect, useState } from "react";
import useFetchData from "./hook/useFetchData";

const useIndex = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const { data, loading } = useFetchData(
    "https://api.covid19api.com/country/indonesia/status/confirmed?from=2020-03-01T00:00:00Z&to=2023-04-01T00:00:00Z"
  );

  useEffect(() => {
    if (!loading) {
      const normalizedData = data || [];
      const customData = normalizedData?.reduce((acc, cur) => {
        const year = new Date(cur.Date).getFullYear();
        const existingYear = acc.find((item) => item.year === year);
        if (existingYear) {
          existingYear.Cases += cur.Cases;
        } else {
          acc.push({ year: year, Cases: cur.Cases });
        }
        return acc;
      }, []);
      const chartData = {
        labels: customData.map((el) => el.year),
        datasets: [
          {
            data: customData.map((el) => el.Cases),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: "black",
            borderWidth: 2,
          },
        ],
      };
      setChartData(chartData);
    }
  }, [loading, data]);

  return { data: chartData, loading };
};

export default useIndex;
