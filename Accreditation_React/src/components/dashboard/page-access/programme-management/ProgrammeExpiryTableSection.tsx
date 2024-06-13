import { IProgramme } from "../../../../types/programme.type";
import moment from "moment";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

interface IProps {
  programmeList: IProgramme[];
}

const ProgrammeTableSection = ({ programmeList }: IProps) => {
  const chartLabels = ["1 month", "3 months", "2 weeks"];
  let todayDate: Date = new Date();
  const chartValues = [];

  const finalList1month = programmeList.filter(
    (q) => moment(q.expiryDate).month() == moment(todayDate).month() + 1
  ).length;
  chartValues.push(finalList1month);

  const final3months = programmeList.filter(
    (q) => moment(q.expiryDate).month() == moment(todayDate).month() + 3
  ).length;
  chartValues.push(final3months);

  const finalList2weeks = programmeList.filter(
    (q) => moment(q.expiryDate).week() == moment(todayDate).week() + 2
  ).length;
  chartValues.push(finalList2weeks);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "Duration of Expiry",
        data: chartValues,
        borderColor: "#4F5AE1",
        backgroundColor: "#868EF7",
        borderWidth:1,
      },
    ],
  };

  return (
    <div className="col-span-1 lg:col-span-3 bg-white p-2 rounded-md">
      <h1 className="text-x1 font-bold mb-2">Programme Expiry Chart</h1>
      <Bar
        options={chartOptions}
        data={chartData}
        className="bg-white p-2 rounded-md"
      />
    </div>
  );
};

export default ProgrammeTableSection;
