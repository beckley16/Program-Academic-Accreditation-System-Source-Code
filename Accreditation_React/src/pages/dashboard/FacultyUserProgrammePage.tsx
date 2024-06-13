import { useCallback, useEffect, useState } from "react";
import { IGetProgrammeDto, ProgramStatus } from "../../types/programme.type";
import axiosInstance from "../../utils/axiosInstance";
import { PROGRAMME_LIST_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";
import Button from "../../components/general/Button";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth.hook";

const FacultyUserProgrammePage = () => {
  const { user: loggedInUser } = useAuth();
  const [data, setMyProgramme] = useState<IGetProgrammeDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [records, setRecords] = useState(data);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  const getProgramme = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance
        .get<IGetProgrammeDto[]>(PROGRAMME_LIST_URL)
        .then((res) => {
          setMyProgramme(
            res.data.filter((q) => q.faculty == loggedInUser?.faculty)
          );
          setRecords(
            res.data.filter((q) => q.faculty == loggedInUser?.faculty)
          );
        }); //get is the method for return in typescript get the logs dto from the my logs url using the axios instance with url of the api
      //const { data } = response;

      //setMyProgramme(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error occured. Please contact admin");
      setLoading(false);
    }
  };

  useEffect(() => {
    getProgramme(); //get data from backend
  }, []);

  const Filter = (data: any) => {
    return data.filter((d:any) => 
      d.programID.toLowerCase().includes(query) || 
      d.programNameEng.toLowerCase().includes(query) ||
      d.faculty.toLowerCase().includes(query) ||
      d.status.toLowerCase().includes(query)
    );
  };

  if (loading) {
    return (
      <div className="w-full">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="pageTemplate2">
      <div className="flex items-center gap-4">
        <h1 className="text-2x1 font-bold">Programme</h1>
      </div>
      <div className="pageTemplate3 items-stretch">
        <input
          type="text"
          className="form-control"
          onChange={e => setQuery(e.target.value)}
          placeholder="Search Programme Status"
        />
        <div className="grid grid-cols-7 p-2 border-2 border-gray-200 rounded-lg">
          <span>No</span>
          <span>Program ID</span>
          <span>Program Name</span>
          <span>Faculty</span>
          <span>Status</span>
          <span>Expiry Date</span>
          <span>Operation</span>
        </div>
        {Filter(records).map((d: any, index: any) => (
          <div
            key={index}
            className="grid grid-cols-7 p-2 border-2 border-gray-200 rounded-lg"
          >
            <div className="flex items-center">{index + 1}</div>
            <div className="flex items-center">{d.programID}</div>
            <div className="flex items-center">{d.programNameEng}</div>
            <div className="flex items-center">{d.faculty}</div>
            <div className="flex items-center">{d.status}</div>
            <div className="flex items-center">
              {moment(d.expiryDate).format("DD/MM/yyyy")}
            </div>
            <div className="flex items-center">
              <Button
                label="Upload File"
                onclick={() =>
                  navigate(
                    `/dashboard/facultyuser-update-programme/${d.programID}`
                  )
                }
                type="button"
                variant="primary"
              />
              <Button
                label="View"
                onclick={() =>
                  navigate(`/dashboard/viewprogramme/${d.programID}`)
                }
                type="button"
                variant="primary"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacultyUserProgrammePage;
