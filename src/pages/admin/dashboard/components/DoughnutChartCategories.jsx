import {
  Chart as ChartJS,
  Filler,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
// import TitleCard from '../../../components/Cards/TitleCard';
// import Subtitle from '../../../components/Typography/Subtitle';
import TitleCard from '../../components/Cards/TitleCard.jsx'

ChartJS.register(ArcElement, Tooltip, Legend,
    Tooltip,
    Filler,
    Legend);

const DoughnutChartCategories = ({ productsByCategory }) => {

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // const labels = ["views", "buy", "cart", "rating"];
  const labels = productsByCategory.slice(1).map(category => category.name);

  const data = {
    labels,
    datasets: [
      {
        label: "",
        data: productsByCategory.slice(1).map((category) => {
          return category.count;
        }),
        backgroundColor: [
          "rgba(255, 99, 132, 0.8)",
          "rgba(54, 162, 235, 0.8)",
          "rgba(255, 206, 86, 0.8)",
          "rgba(75, 192, 192, 0.8)",
          "rgba(153, 102, 255, 0.8)",
          "rgba(255, 159, 64, 0.8)",
          "rgba(100, 149, 237, 0.8)",
          "rgba(255, 0, 0, 0.8)",
          "rgba(0, 255, 0, 0.8)",
          "rgba(135, 206, 235, 0.8)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
          "rgba(100, 149, 237, 1)",
          "rgba(255, 0, 0, 1)",
          "rgba(0, 255, 0, 1)",
          "rgba135, 206, 235,  1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <TitleCard title={"Categories Data"} TopSideButtons={productsByCategory.length}>
      <Doughnut options={options} data={data} />
    </TitleCard>
  );
};


export default DoughnutChartCategories;