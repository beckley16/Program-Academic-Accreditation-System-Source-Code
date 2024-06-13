import PageAccessTemplate from "../../components/dashboard/page-access/PageAccessTemplate";
import { FaUserCog } from "react-icons/fa";

const SuperAdminPage = () => {
  return (
    <div className="pageTemplate2">
      <PageAccessTemplate color="#7983FF" icon={FaUserCog} role="SuperAdmin" />
    </div>
  );
};

export default SuperAdminPage;
