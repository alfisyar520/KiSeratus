import { useEffect, useState } from "react";
import useFetchData from "../../hook/useFetchData";

const useIndex = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  const { data, loading } = useFetchData(
    "https://kipi.covid19.go.id/api/get-faskes-vaksinasi?skip=0&province=JAWA+TENGAH&city=SURAKARTA"
  );

  useEffect(() => {
    if (!loading) {
      const newData = data?.data || [];
      const normalizedData = newData.map((element) => {
        return {
          name: element.nama,
          divaksin: element.detail.reduce((acc, cur) => acc + cur.divaksin, 0),
          divaksin_1: element.detail.reduce(
            (acc, cur) => acc + cur.divaksin_1,
            0
          ),
          divaksin_2: element.detail.reduce(
            (acc, cur) => acc + cur.divaksin_2,
            0
          ),
        };
      });
      const chartData = {
        labels: normalizedData.map((el) => el.name),
        datasets: [
          {
            label: "Divaksin",
            data: normalizedData.map((el) => el.divaksin),
            backgroundColor: "#2a71d0",
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "Divaksin 1",
            data: normalizedData.map((el) => el.divaksin_1),
            backgroundColor: "#F2DE76",
            borderColor: "black",
            borderWidth: 2,
          },
          {
            label: "Divaksin 2",
            data: normalizedData.map((el) => el.divaksin_2),
            backgroundColor: "#00F7F7",
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
