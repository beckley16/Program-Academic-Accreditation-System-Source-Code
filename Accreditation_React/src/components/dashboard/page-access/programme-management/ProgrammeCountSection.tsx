import ProgrammeCountCard from "./ProgrammeCountCard";
import { IProgramme, ProgramStatus } from "../../../../types/programme.type";
import { FaUniversity, FaFile, FaFileArchive, FaFileAlt } from "react-icons/fa";
import { color } from "chart.js/helpers";

interface IProps {
  programmeList: IProgramme[];
}

const ProgrammeCountSection = ({ programmeList }: IProps) => {
  let ProgrammeCount = 0;
  let activeProgramme = 0;
  let inactiveProgramme = 0;
  let frozenProgramme = 0;

  programmeList.forEach((item) => {
    if (item.status.includes(ProgramStatus["INACTIVE"])) {
      inactiveProgramme++;
    } else if (item.status.includes(ProgramStatus["ACTIVE"])) {
      activeProgramme++;
    } else if (item.status.includes(ProgramStatus["FROZEN"])) {
      frozenProgramme++;
    }
    ProgrammeCount++;
  });

  const programmeCountData = [
    {
      count: ProgrammeCount,
      programmeStatus: "TOTAL PROGRAMMES",
      icon: FaUniversity,
      color: "#606060",
    },
    {
      count: activeProgramme,
      programmeStatus: "ACTIVE",
      icon: FaFile,
      color: "#2834C8",
    },
    {
      count: inactiveProgramme,
      programmeStatus: "INACTIVE",
      icon: FaFileArchive,
      color: "#39A5D1",
    },
    {
      count: frozenProgramme,
      programmeStatus: "FROZEN",
      icon: FaFileAlt,
      color: "#ADC0C4",
    },
  ];
  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4">
      {programmeCountData.map((item, index) => (
        <ProgrammeCountCard
          key={index}
          count={item.count}
          programmeStatus={item.programmeStatus}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default ProgrammeCountSection;