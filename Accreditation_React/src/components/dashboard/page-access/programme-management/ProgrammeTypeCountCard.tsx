import { IconType } from "react-icons";
interface IProps {
  count: number;
  programmeTypeAccreditation: string;
  icon: IconType;
  color: string;
}

const ProgrammeTypeCountCard = ({
  count,
  programmeTypeAccreditation,
  icon: Icon,
  color,
}: IProps) => {
  return (
    <div className="col-span-1 bg-white p-2 rounded-md">
        <div className="px-4 py-3 rounded-lg flex justify-between items-center text-white"
            style={{ backgroundColor: color }}
            >
      <div>
        <h2 className="text-4x1">{count}</h2>
        <h2 className="text-x1">{programmeTypeAccreditation}</h2>
      </div>
      <div>{<Icon className="text-white fill-white text-6x1" />}</div>
    </div>
    </div>
    
  );
};

export default ProgrammeTypeCountCard;
