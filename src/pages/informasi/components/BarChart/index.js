import { Bar } from "react-chartjs-2";
import useIndex from "./index.hook";
import styles from "./index.module.scss";

const BarChart = () => {
  const { data, loading } = useIndex();


  if(loading) return <div>Loading...</div>
  return (
    <div>
      <div className={styles.titleWrapper}>
        <h1>Jumlah Rumah Sakit Penerima Vaksin</h1>
        <h1>Kota Surakarta</h1>
      </div>
      <Bar
        data={data}
        options={{
          plugins: {
            legend: {
              display: false,
            },
          },
        }}
      />
    </div>
  );
};

export default BarChart;
