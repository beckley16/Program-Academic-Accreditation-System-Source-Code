import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/general/Spinner";
import {
  IFacultyUserUpdateProgrammeDto,
  IGetProgrammeDto,
} from "../../types/programme.type";
import axiosInstance from "../../utils/axiosInstance";
import {
  FACULTYUSER_UPDATE_PROGRAMME_URL,
  PROGRAMME_LIST_URL,
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
import { Http } from "@mui/icons-material";

const FacultyUserUpdateProgrammePage = () => {
  const { programID } = useParams();
  const [pdfFile, setPdfFile] = useState<File | null>();
  const [oriProgramme, setProgrammeOri] = useState<IGetProgrammeDto>();
  const [programme, setProgramme] = useState<IFacultyUserUpdateProgrammeDto>({
    programID: "",
    programmeDocUrl: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [date, setDate] = useState(new Date());
  const [postloading, setPostLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const getProgramByProgramID = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<IGetProgrammeDto>(
        `${PROGRAMME_LIST_URL}/${programID}`
      );
      const { data } = response;
      setProgramme(data);
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
      navigate("/dashboard/faculty-user/programme");
    }
  };

  const UpdateProgrammeData = async () => {
    if (!pdfFile) {
      alert("Upload the file");
      return;
    }
    try {
      setPostLoading(true);
      const updatedProgramme = new FormData();
      updatedProgramme.append("programmeID", programme.programID);
      updatedProgramme.append("pdfFile", pdfFile);
      await axiosInstance.put(
        `${FACULTYUSER_UPDATE_PROGRAMME_URL}/${programID}`,
        updatedProgramme
      );
      setPostLoading(false);
      toast.success("Prorgramme updated Successfully.");
      navigate("/dashboard/faculty-user/programme");
    } catch (error) {
      setPostLoading(false);
      toast.error("An Error occurred. Please contact admins");
      navigate("/dashboard/faculty-user/programme");
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
    <div className="p-4 w-2/4 mx-auto flex flex-col gap-4">
      <div className="bg-white p-2 rounded-md flex flex-col gap-4">
        <h1 className="text-2xl font-bold">Update Programme</h1>
        <div className="border border-dashed border-blue-300 rounded-md">
          <h6 className="text-xl">
            Program ID:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {programID}
            </span>
          </h6>
          <h6 className="text-xl">
            Program Name English:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {oriProgramme?.programNameEng}
            </span>
          </h6>
          <h6 className="text-xl">
            Program Name Malay:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {oriProgramme?.programNameMalay}
            </span>
          </h6>
          <h6 className="text-xl">
            Faculty:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {oriProgramme?.faculty}
            </span>
          </h6>
          <h6 className="text-xl">
            Expiry Date:
            <span className="text-2xl font-bold ml-2 px-2 py-1 text-blue-600 rounded-md">
              {moment(oriProgramme?.expiryDate).format("DD/MM/yyyy")}
            </span>
          </h6>
          <br/>
          <h6 className="text-xl">
            Upload your file here (Only <b>one pdf file</b> is accepted):
          </h6>
          <input
            type="file"
            onChange={(event) =>
              setPdfFile(event.target.files ? event.target.files[0] : null)
            }
          />
          <div className="grid grid-cols-2 gap-4 mt-12">
            <Button
              label="Cancel"
              onclick={() => navigate("/dashboard/faculty-user/programme")}
              type="button"
              variant="secondary"
            />
            <Button
              label="Update"
              onclick={() => UpdateProgrammeData()}
              type="button"
              variant="primary"
              loading={postloading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyUserUpdateProgrammePage;
