import { IconType } from "react-icons";
interface IProps {
  count: number;
  role: string;
  icon: IconType;
  color: string;
}

const UserCountCard = ({ count, role, icon: Icon, color }: IProps) => {
  return (
    <div
      className="px-4 py-6 rounded-lg flex justify-between items-center text-white"
      style={{ backgroundColor: color }}
    >
      <div>
        <h2 className="text-4x1">{count}</h2>
        <h2 className="text-x1">{role}</h2>
      </div>
      <div>{<Icon className="text-white fill-white text-6x1" />}</div>
    </div>
  );
};

export default UserCountCard;
