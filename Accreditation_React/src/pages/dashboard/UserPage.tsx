import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { FaUser } from "react-icons/fa";

const UserPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="#F8D82B" icon={FaUser} role="User" />
    </div>
  );
};

export default UserPage;
