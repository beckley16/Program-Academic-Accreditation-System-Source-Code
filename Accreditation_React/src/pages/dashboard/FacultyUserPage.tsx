import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { FaUserTie } from "react-icons/fa";

const FacultyUserPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="#6EED98" icon={FaUserTie} role="FacultyUser" />
    </div>
  );
};

export default FacultyUserPage;
