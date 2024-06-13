import { useEffect, useState } from "react";
import { ILogDto } from "../../types/log.types";
import axiosInstance from "../../utils/axiosInstance";
import { LOGS_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import Spinner from "../../components/general/Spinner";
import moment from "moment";

const SystemLogsPage = () => {
  const [myLogs, setMyLogs] = useState<ILogDto[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const getLogs = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get<ILogDto[]>(LOGS_URL); //get is the method for return in typescript get the logs dto from the my logs url using the axios instance with url of the api
      const { data } = response;
      setMyLogs(data);
      setLoading(false);
    } catch (error) {
      toast.error("An error occured. Please contact admin");
      setLoading(false);
    }
  };

  useEffect(() => {
    getLogs(); //get data from backend
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
      <h1 className="text-2x1 font-bold">System Logs</h1>
      <div className="pageTemplate3 items-stretch">
        <div className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg">
          <span>No</span>
          <span>Date</span>
          <span>UserName</span>
          <span className="col-span-3">Description</span>
        </div>
        {myLogs.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-6 p-2 border-2 border-gray-200 rounded-lg"
          >
            <span>{index + 1}</span>
            <span>{moment(item.createdDt).fromNow()}</span>
            <span>{item.userName}</span>
            <span className="col-span-3">{item.description}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SystemLogsPage;
