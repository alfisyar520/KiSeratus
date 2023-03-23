import { Pie } from "react-chartjs-2";
import styles from "./index.module.scss";

const PieChart = (props) => {
  const { data } = props;

  return (
    <div>
      <div className={styles.titleWrapper}>
        <h1>Jumlah Terkonfirmasi Covid</h1>
        <h1>2020 - 2023 di Indonesia</h1>
      </div>

      <Pie
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

export default PieChart;
