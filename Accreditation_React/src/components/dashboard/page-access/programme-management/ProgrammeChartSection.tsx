import { IProgramme, FacultyProgramme } from "../../../../types/programme.type";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  plugins,
  elements,
} from "chart.js";
import { Pie } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend, plugins);
interface IProps {
  programmeList: IProgramme[];
}

const ProgrammeChartSection = ({ programmeList }: IProps) => {
  const chartLabels = [
    "Academy of Islamic Studies",
    "Academy of Malay Studies",
    "Asia-Europe Institute",
    "Centre for Sport and Exercise Sciences",
    "Institute for Advanced Studies",
    "International Institute of Public Policy & Management",
    "Faculty of Arts and Social Sciences",
    "Faculty of Built Environment",
    "Faculty of Business and Economics",
    "Faculty of Computer Science and Information Technology",
    "Faculty of Creative Arts",
    "Faculty of Dentistry",
    "Faculty of Education",
    "Faculty of Engineering",
    "Faculty of Languages and Linguistics",
    "Faculty of Law",
    "Faculty of Medicine",
    "Faculty of Pharmacy",
    "Faculty of Science",
  ];

  const ChartValues = [];

  const apiCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Academy of Islamic Studies"])
  ).length;
  ChartValues.push(apiCount);

  const apmCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Academy of Malay Studies"])
  ).length;
  ChartValues.push(apmCount);

  const asiaEuropeCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Asia-Europe Institute"])
  ).length;
  ChartValues.push(asiaEuropeCount);

  const sportCount = programmeList.filter((q) =>
    q.faculty.includes(
      FacultyProgramme["Centre for Sport and Exercise Sciences"]
    )
  ).length;
  ChartValues.push(sportCount);

  const advancedStudiesCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Institute for Advanced Studies"])
  ).length;
  ChartValues.push(advancedStudiesCount);

  const publicPolicyCount = programmeList.filter((q) =>
    q.faculty.includes(
      FacultyProgramme["International Institute of Public Policy & Management"]
    )
  ).length;
  ChartValues.push(publicPolicyCount);

  const fsssCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Arts and Social Sciences"])
  ).length;
  ChartValues.push(fsssCount);

  const builtEnvCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Built Environment"])
  ).length;
  ChartValues.push(builtEnvCount);

  const businessEconCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Business and Economics"])
  ).length;
  ChartValues.push(businessEconCount);

  const fsktmCount = programmeList.filter((q) =>
    q.faculty.includes(
      FacultyProgramme["Faculty of Computer Science and Information Technology"]
    )
  ).length;
  ChartValues.push(fsktmCount);

  const creativeArtsCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Creative Arts"])
  ).length;
  ChartValues.push(creativeArtsCount);

  const dentistryCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Dentistry"])
  ).length;
  ChartValues.push(dentistryCount);

  const eduCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Education"])
  ).length;
  ChartValues.push(eduCount);

  const engineCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Engineering"])
  ).length;
  ChartValues.push(engineCount);

  const fblCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Languages and Linguistics"])
  ).length;
  ChartValues.push(fblCount);

  const lawCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Law"])
  ).length;
  ChartValues.push(lawCount);

  const medicCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Medicine"])
  ).length;
  ChartValues.push(medicCount);

  const pharmaCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Pharmacy"])
  ).length;
  ChartValues.push(pharmaCount);

  const scienceCount = programmeList.filter((q) =>
    q.faculty.includes(FacultyProgramme["Faculty of Science"])
  ).length;
  ChartValues.push(scienceCount);

  const chartData = {
    labels: chartLabels,
    datasets: [
      {
        label: "total programmes per faculty",
        data: ChartValues,
        backgroundColor: [
          "#FBD1D6",
          "#F44057",
          "#F248E6",
          "#9606EC",
          "#0E15F0",
          "#02EAE1",
          "#049A58",
          "#0CE542",
          "#057F23",
          "#EAF5A9",
          "#FDB800",
          "#FE7100",
          "#AC2105",
          "#FD6343",
          "#C0A9E0",
          "#5D0427",
          "#89978A",
          "#A0EBFF",
          "#840062",
        ],
        borderColor: [
          "#FBD1D6",
          "#F44057",
          "#F248E6",
          "#9606EC",
          "#0E15F0",
          "#02EAE1",
          "#049A58",
          "#0CE542",
          "#057F23",
          "#EAF5A9",
          "#FDB800",
          "#FE7100",
          "#AC2105",
          "#FD6343",
          "#C0A9E0",
          "#5D0427",
          "#89978A",
          "#A0EBFF",
          "#840062",
        ],
        borderwidth: 1,
        radius: 400,
      },
    ],
  };

  const pieOptions = {
    responsive: true,
    legend: {
      display: false,
      position: "right",
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  return (
    <div className="col-span-1 lg:col-span-3 bg-white p-2 rounded-md">
      <h1 className="text-center-1 text-2xl font-bold mb-2">
        Number of Programmes Per Faculty Chart
      </h1>
      <div style={{ width: 1000 }}>
        <Pie
          data={chartData}
          options={pieOptions}
          className="bg-white p-2 size-10 rounded-md"
        />
      </div>
    </div>
  );
};

export default ProgrammeChartSection;