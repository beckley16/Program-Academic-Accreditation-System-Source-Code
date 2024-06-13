import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/general/Spinner";
import {
  IAdminUpdateProgrammeDto,
  IGetProgrammeDto,
} from "../../types/programme.type";
import axiosInstance from "../../utils/axiosInstance";
import {
  UPDATE_PROGRAMME_URL,
  PROGRAMME_LIST_URL,
  PROGRAMME_URL_DOWNLOAD,
} from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "../../components/general/Button";
import moment from "moment";
import useAuth from "../../hooks/useAuth.hook";
import { RolesEnum } from "../../types/auth.type";

const ProgrammeDetailPage = () => {
  const { user: loggedInUser } = useAuth();
  const { programID } = useParams();
  const [oriProgramme, setProgrammeOri] = useState<IGetProgrammeDto>();
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const onCancelClick = () => {
    if (loggedInUser?.roles[0] === RolesEnum.ADMIN)
        navigate("/dashboard/Programme");
    else
        navigate("/dashboard/faculty-user/programme");
  };

  const getProgramByProgramID = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
        `${PROGRAMME_LIST_URL}/${programID}`
      );
      const { data } = response;
      setProgrammeOri(data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 404) {
        toast.error("Program not Found!!!!!!!!!!!");
      } else {
        toast.error("An Error occured. Please contact admins");
      }
      navigate("/dashboard/Programme");
    }
  };


  useEffect(() => {
    getProgramByProgramID();
  }, []);

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <h1 className="text-4xl font-bold text-center">Update Programme</h1>
      <div className="container mx-auto px-60">
        <div className="create-program">
          <h3 className="h3-format">
            Programme ID:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {programID}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Registered to MQR:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.registeredMqr}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Programme Name in English:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.programNameEng}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Programme Name in Malay:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.programNameMalay}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Faculty:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.faculty}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">
            Senate Approved Date :
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {moment(oriProgramme?.approvedDateSenate).format("DD/MM/yyyy")}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Status:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.status}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Accreditation Type:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.accreditationType}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">MQR Certifcate Number:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.mqrNum}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">MQR Reference Number:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.referredMQRNum}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Mode of Study:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.studyMode}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">NEC Code:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.necCode}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Minimum and Maximum Duration of Study (Semester):</h3>
          <h3 className="h3-format"> Minimum  {"\t"}: 
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.minDurationOfStudy}
            </span>
          </h3>
          <h3 className="h3-format"> Maximum{"\t"}: 
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.maxDurationOfStudy}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Credit Hours:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.creditHrs}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">
            Expiry Date :
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {moment(oriProgramme?.expiryDate).format("DD/MM/yyyy")}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Accreditation Status:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.accreditationStatus}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">JPT Approval Certificate:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.approvalCertJPT}
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Remarks:
            <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
              {oriProgramme?.remarks}
            </span>
          </h3>
          {oriProgramme?.accreditationType === "Re-Accreditation" && (
            <div className="create-form">
              <br />
              <h3 className="h3-format">Phase of Accreditation:
                <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
                {oriProgramme?.phaseReAccreditation}
                </span>
              </h3>
              <br />
              <h3 className="h3-format">
                Approved Date Senate Re-accreditation:
                <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
                    {moment(oriProgramme?.approvedDateSenateReAccreditation).format("DD/MM/yyyy")}
                </span>
              </h3>
              <br />
              <h3 className="h3-format">Re-Accreditation Duration:
                <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
                {oriProgramme?.durationReaccreditation}
                </span>
              </h3>
              <br />
              <h3 className="h3-format">Re-Accreditation Remarks:
                <span className="text-2xl font ml-2 px-2 py-1 text-black-400 rounded-md">
                {oriProgramme?.remarksReAccreditation}
                </span>
              </h3>
            </div>
          )}

            <Button
              label="Cancel"
              onclick={() => onCancelClick()}
              type="button"
              variant="secondary"
            />
           
        </div>
      </div>
    </div>
  );
};

export default ProgrammeDetailPage;
