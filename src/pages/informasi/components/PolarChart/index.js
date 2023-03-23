import { PolarArea } from "react-chartjs-2";
import styles from "./index.module.scss";

const PolarChart = (props) => {
  const { data } = props;

  return (
    <div className={styles.contentWrapper}>
      <div className={styles.titleWrapper}>
        <h1>Jumlah Terkonfirmasi Covid</h1>
        <h1>2020 - 2023 di Indonesia</h1>
      </div>
      <PolarArea
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

export default PolarChart;
