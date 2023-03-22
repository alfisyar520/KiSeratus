import { CategoryScale } from "chart.js";
import Chart from "chart.js/auto";
import BarChart from "./components/BarChart";
import DoughnutChart from "./components/DoughnutChart";
import LineChart from "./components/LineChart";
import PieChart from "./components/PieChart";
import useIndex from "./index.hook";
import styles from "./index.module.scss";

Chart.register(CategoryScale);
const Informasi = () => {
  const { data, loading } = useIndex();

  return (
    <div className={styles.wrapper}>
      <BarChart />
      <LineChart data={data} loading={loading} />
      <div className={styles.wrapperPieDoughnut}>
        <PieChart data={data} loading={loading} />
        <DoughnutChart data={data} loading={loading} />
      </div>
    </div>
  );
};

export default Informasi;
