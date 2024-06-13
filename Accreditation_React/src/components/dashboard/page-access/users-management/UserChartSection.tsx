import { IAuthUser, RolesEnum } from "../../../../types/auth.type";
import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
ChartJs.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

interface IProps {
  usersList: IAuthUser[];
}

const UserChartSection = ({ usersList }: IProps) => {
  const chartLabels = [
    RolesEnum.SUPERADMIN,
    RolesEnum.ADMIN,
    RolesEnum.FACULTYUSER,
  ];
  const chartValues = [];

  const superAdminCount = usersList.filter((q) =>
    q.roles.includes(RolesEnum.SUPERADMIN)
  ).length;
  chartValues.push(superAdminCount);

  const adminCount = usersList.filter((q) =>
    q.roles.includes(RolesEnum.ADMIN)
  ).length;
  chartValues.push(adminCount);

  const facultyUserCount = usersList.filter((q) =>
    q.roles.includes(RolesEnum.FACULTYUSER)
  ).length;
  chartValues.push(facultyUserCount);

  const chartOptions = {
    responsive: true,
    scales: {
      x: {
        grid: { display: false },
      },
      y: {
        ticks: { stepSize: 5 },
      },
    },
  };

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "count",
        data: chartValues,
        borderColor: "#4F5AE1",
        backgroundColor: "#868EF7",
        pointBorderColor: "transparent",
        tension: 0.25,
      },
    ],
  };

  return (
    <div className="col-span-1 lg:col-span-3 bg-white p-2 rounded-md">
      <h1 className="text-x1 font-bold mb-2">Users Chart</h1>
      <Line
        options={chartOptions}
        data={chartData}
        className="bg-white p-2 rounded-md"
      />
    </div>
  );
};

export default UserChartSection;
