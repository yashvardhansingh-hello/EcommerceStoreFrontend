import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import TitleCard from '../../components/Cards/TitleCard.jsx';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const LineChart = ({ ordersArray }) => {
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  const labels = ordersArray?.slice(0,10)?.map((i) => i[0]);

  const dataCounts = ordersArray?.slice(0,10)?.map((i) => i[1]);

  const data = {
    labels,
    datasets: [
      {
        fill: true,
        label: "MAU",
        data: dataCounts,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };

  return (
    <TitleCard title={"Top selling products"}>
      <Line data={data} options={options} />
    </TitleCard>
  );
};


export default LineChart