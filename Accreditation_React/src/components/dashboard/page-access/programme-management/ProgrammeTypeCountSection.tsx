import ProgrammeTypeCountCard from "./ProgrammeTypeCountCard";
import { IProgramme,TypeAccreditation } from "../../../../types/programme.type";
import { FaUniversity, FaFile, FaFileArchive } from "react-icons/fa";
import { color } from "chart.js/helpers";

interface IProps {
  programmeList: IProgramme[];
}

const ProgrammeTypeAcCountSection = ({ programmeList }: IProps) => {
  let fullacProgramme = 0;
  let reacProgramme = 0;

  programmeList.forEach((item) => {
    if (item.accreditationType.includes(TypeAccreditation["Full Accreditation"])) {
        fullacProgramme++;
    } else if (item.accreditationType.includes(TypeAccreditation["Re-Accreditation"])) {
        reacProgramme++;
    }
  });

  const programmeCountData = [
    {
      count: fullacProgramme,
      programTypeAc: "Full Accreditation",
      icon: FaFile,
      color: "#2834C8",
    },
    {
      count: reacProgramme,
      programTypeAc: "Re-Accreditation",
      icon: FaFileArchive,
      color: "#39A5D1",
    },
  ];
  return (
    <div className="col-span-1 bg-white p-2 rounded-md">
      {programmeCountData.map((item, index) => (
        <ProgrammeTypeCountCard
          key={index}
          count={item.count}
          programmeTypeAccreditation={item.programTypeAc}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default ProgrammeTypeAcCountSection;