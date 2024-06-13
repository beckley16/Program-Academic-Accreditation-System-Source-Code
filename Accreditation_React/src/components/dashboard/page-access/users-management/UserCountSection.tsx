import UserCountCard from "./UserCountCard";
import { IAuthUser, RolesEnum } from "../../../../types/auth.type";
import { FaUser, FaUserCog, FaUserShield, FaUserTie } from "react-icons/fa";
import { color } from "chart.js/helpers";

interface IProps {
  usersList: IAuthUser[];
}

const UserCountSection = ({ usersList }: IProps) => {
  let superAdmin = 0;
  let admin = 0;
  let facultyUser = 0;

  usersList.forEach((item) => {
    if (item.roles.includes(RolesEnum.SUPERADMIN)) {
      superAdmin++;
    } else if (item.roles.includes(RolesEnum.ADMIN)) {
      admin++;
    } else if (item.roles.includes(RolesEnum.FACULTYUSER)) {
      facultyUser++;
    }
  });

  const userCountData = [
    {
      count: superAdmin,
      role: RolesEnum.SUPERADMIN,
      icon: FaUserCog,
      color: "#606060",
    },
    {
      count: admin,
      role: RolesEnum.ADMIN,
      icon: FaUserShield,
      color: "#2834C8",
    },
    {
      count: facultyUser,
      role: RolesEnum.FACULTYUSER,
      icon: FaUserTie,
      color: "#39A5D1",
    },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-4">
      {userCountData.map((item, index) => (
        <UserCountCard
          key={index}
          count={item.count}
          role={item.role}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>
  );
};

export default UserCountSection;
