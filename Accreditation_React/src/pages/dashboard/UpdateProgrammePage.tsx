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
import { PictureAsPdf, SpaceBar } from "@mui/icons-material";
import moment from "moment";

const UpdateProgrammePage = () => {
  const { programID } = useParams();
  let expiryDate: Date = new Date();
  let approvedDateSenate: Date = new Date();
  let approvedDateSenateReAccreditation: Date = new Date();
  const [oriProgramme, setProgrammeOri] = useState<IGetProgrammeDto>();
  const [programme, setProgramme] = useState<IAdminUpdateProgrammeDto>({
    programID: "",
    programNameEng: "",
    programNameMalay: "",
    faculty: "",
    accreditationType: "",
    expiryDate: expiryDate,
    status: "",
    mqrNum: 0,
    referredMQRNum: "",
    registeredMQR: "",
    studyMode: "",
    necCode: "",
    minDurationOfStudy: 0,
    maxDurationOfStudy: 0,
    creditHrs: "",
    approvedDateSenate: approvedDateSenate,
    accreditationStatus: "",
    approvalCertJPT: "",
    remarks: "",
    phaseReAccreditation: "",
    approvedDateSenateReAccreditation: approvedDateSenateReAccreditation,
    durationReAccreditation: "",
    remarksReAccreditation: "",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [expirydate, setExpiryDate] = useState(new Date());
  const [approvedsenatedate, setApprovedSenateDate] = useState(new Date());
  const [reaccreditationdate, setreaccreditationDate] = useState(new Date());
  const [postloading, setPostLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const today = new Date();
  const selectDateHandler = (d: Date) => {
    setExpiryDate(d);
    programme.expiryDate = d;
  };
  const selectApprovedDateSenateReAccreditationHandler = (d: Date) => {
    setreaccreditationDate(d);
    programme.approvedDateSenateReAccreditation = d;
  };
  const selectApprovedDateSenateHandler = (d: Date) => {
    setApprovedSenateDate(d);
    programme.approvedDateSenate = d;
  };

  const getProgramByProgramID = async () => {
    try {
      setLoading(true);
      const response = await axiosInstance.get(
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
      navigate("/dashboard/Programme");
    }
  };

  const UpdateProgrammeData = async () => {
    try {
      setPostLoading(true);
      var localTimeExpiryDate = new Date(
        Date.UTC(
          expirydate.getFullYear(),
          expirydate.getMonth(),
          expirydate.getDate()
        )
      );

      var localTimeReAccreditationDate = new Date(
        Date.UTC(
          reaccreditationdate.getFullYear(),
          reaccreditationdate.getMonth(),
          reaccreditationdate.getDate()
        )
      );

      var localTimeApprovedSenateDate = new Date(
        Date.UTC(
          approvedsenatedate.getFullYear(),
          approvedsenatedate.getMonth(),
          approvedsenatedate.getDate()
        )
      );

      const updatedProgramData: IAdminUpdateProgrammeDto = {
        programID: programme.programID,
        programNameEng: programme.programNameEng,
        programNameMalay: programme.programNameMalay,
        faculty: programme.faculty,
        accreditationType: programme.accreditationType,
        expiryDate: localTimeExpiryDate,
        status: programme.status,
        mqrNum: programme.mqrNum,
        referredMQRNum: programme.referredMQRNum,
        registeredMQR: programme.registeredMQR,
        studyMode: programme.studyMode,
        necCode: programme.necCode,
        minDurationOfStudy: programme.minDurationOfStudy,
        maxDurationOfStudy: programme.maxDurationOfStudy,
        creditHrs: programme.creditHrs,
        approvedDateSenate: localTimeApprovedSenateDate,
        accreditationStatus: programme.accreditationStatus,
        approvalCertJPT: programme.approvalCertJPT,
        remarks: programme.remarks,
        phaseReAccreditation: programme.phaseReAccreditation,
        approvedDateSenateReAccreditation: localTimeReAccreditationDate,
        durationReAccreditation: programme.durationReAccreditation,
        remarksReAccreditation: programme.remarksReAccreditation,
      };
      await axiosInstance.put(
        `${UPDATE_PROGRAMME_URL}/${programID}`,
        updatedProgramData
      );
      setPostLoading(false);
      toast.success("Prorgramme updated Successfully.");
      navigate("/dashboard/Programme");
    } catch (error) {
      setPostLoading(false);
      toast.error("An Error occurred. Please contact admins");
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
          <h3 className="h3-format">Registered to MQR:</h3>
          <FormControl className="field-format">
            <Select
              variant="filled"
              size="small"
              placeholder="Registered to MQR"
              value={programme.registeredMQR}
              onChange={(e) =>
                setProgramme({ ...programme, registeredMQR: e.target.value })
              }
            >
              <MenuItem value="0">Yes</MenuItem>
              <MenuItem value="1">No</MenuItem>
            </Select>
          </FormControl>
          <br />
          <h3 className="h3-format">Programme Name in English:</h3>
          <TextField
            autoComplete="off"
            variant="filled"
            size="small"
            value={programme.programNameEng}
            onChange={(e) =>
              setProgramme({ ...programme, programNameEng: e.target.value })
            }
          />
          <br />
          <h3 className="h3-format">Programme Name in Malay</h3>
          <TextField
            autoComplete="off"
            variant="filled"
            size="small"
            value={programme.programNameMalay}
            onChange={(e) =>
              setProgramme({ ...programme, programNameMalay: e.target.value })
            }
          />
          <br />
          <h3 className="h3-format">Faculty:</h3>
          <TextField className="field-format"
            disabled
            variant="filled"
            size="small"
            value={programme.faculty}
          />

          <br />

          <h3 className="h3-format">
            Senate Approved Date :
            <span> {"\t"}
              <TextField
                hiddenLabel
                disabled
                className="bg-white px-4 my-1 w-1/4"
                variant="filled"
                size="small"
                value={moment(programme.approvedDateSenate).format("DD/MM/yyyy")}
              />
            </span>
          </h3>

          <br />
          <h3 className="h3-format">Status:</h3>
          <FormControl className="field-format">
            <Select
              variant="filled"
              size="small"
              value={programme.status}
              onChange={(e) =>
                setProgramme({ ...programme, status: e.target.value })
              }
            >
              <MenuItem value="ACTIVE">ACTIVE</MenuItem>
              <MenuItem value="INACTIVE">INACTIVE</MenuItem>
              <MenuItem value="FROZEN">FROZEN</MenuItem>
            </Select>
          </FormControl>
          <br />
          <h3 className="h3-format">Accreditation Type:</h3>
          <FormControl className="field-format">
            <Select
              variant="filled"
              size="small"
              value={programme.accreditationType}
              placeholder="Accreditation Type"
              onChange={(e) =>
                setProgramme({
                  ...programme,
                  accreditationType: e.target.value,
                })
              }
            >
              <MenuItem value="Full Accreditation">Full Accreditation</MenuItem>
              <MenuItem value="Re-Accreditation">Re-Accreditation</MenuItem>
            </Select>
          </FormControl>
          <br />
          <h3 className="h3-format">MQR Certifcate Number:</h3>
          <TextField
            className="field-format"
            type="number"
            variant="filled"
            size="small"
            autoComplete="off"
            value={programme.mqrNum}
            onChange={(e) =>
              setProgramme({
                ...programme,
                mqrNum: parseInt(e.target.value, 10),
              })
            }
          />
          <br />
          <h3 className="h3-format">MQR Reference Number:</h3>
          <TextField
            className="field-format"
            variant="filled"
            size="small"
            autoComplete="off"
            value={programme.referredMQRNum}
            onChange={(e) =>
              setProgramme({
                ...programme,
                referredMQRNum: e.target.value,
              })
            }
          />
          <br />
          <h3 className="h3-format">Mode of Study:</h3>
          <FormControl className="field-format">
            <Select
              variant="filled"
              size="small"
              value={programme.studyMode}
              onChange={(e) =>
                setProgramme({
                  ...programme,
                  studyMode: e.target.value,
                })
              }
            >
              <MenuItem value="0">Coursework</MenuItem>
              <MenuItem value="1">Research</MenuItem>
              <MenuItem value="2">Mix Mode</MenuItem>
            </Select>
          </FormControl>
          <br />
          <h3 className="h3-format">NEC Code:</h3>
          <TextField
            className="field-format"
            variant="filled"
            size="small"
            autoComplete="off"
            value={programme.necCode}
            onChange={(e) =>
              setProgramme({
                ...programme,
                necCode: e.target.value,
              })
            }
          />
          <br />
          <h3 className="h3-format">Minimum and Maximum Duration of Study (Semester):</h3>
          <h3 className="h3-format"> Minimum  {"\t"}: 
            <span> {"\t"}
            <TextField 
              hiddenLabel
              className="bg-white px-4 my-1 w-1/4"
              variant="filled"
              size="small"
              autoComplete="off"
              placeholder="Minimum Semester"
              type="number"
              value={programme.minDurationOfStudy}
              onChange={(e) =>
                setProgramme({
                  ...programme,
                  minDurationOfStudy: parseInt(e.target.value, 10),
                })
              }
            />
            </span>
          </h3>
          <h3 className="h3-format"> Maximum{"\t"}: 
            <span> {"\t"}
            <TextField 
              hiddenLabel
              className="bg-white px-4 my-1 w-1/4"
              variant="filled"
              size="small"
              autoComplete="off"
              placeholder="Maximum Semester"
              type="number"
              value={programme.maxDurationOfStudy}
              onChange={(e) =>
                setProgramme({
                  ...programme,
                  maxDurationOfStudy: parseInt(e.target.value, 10),
                })
              }
            />
            </span>
          </h3>
          <br />
          <h3 className="h3-format">Credit Hours:</h3>
          <TextField
            className="field-format"
            type="number"
            variant="filled"
            size="small"
            autoComplete="off"
            placeholder="Credit Hours"
            value={programme.creditHrs}
            onChange={(e) =>
              setProgramme({
                ...programme,
                creditHrs: e.target.value,
              })
            }
          />
          <br />
          <h3 className="h3-format">
            Expiry Date :
            <DatePicker
              className="bg-white px-4 my-1 w-2/3 font-normal"
              dateFormat="dd/MM/yyyy"
              selected={programme.expiryDate}
              minDate={today}
              onChange={selectDateHandler}
              todayButton={"Today"}
            />
          </h3>

          <br />
          <h3 className="h3-format">Accreditation Status:</h3>
          <FormControl className="field-format">
            <Select
              variant="filled"
              size="small"
              value={programme.accreditationStatus}
              placeholder="Accreditation Status"
              onChange={(e) =>
                setProgramme({
                  ...programme,
                  accreditationStatus: e.target.value,
                })
              }
            >
              <MenuItem value="Homegrown">Homegrown</MenuItem>
              <MenuItem value="Professional Body">Professional Body</MenuItem>
            </Select>
          </FormControl>
          <br />
          <h3 className="h3-format">JPT Approval Certificate:</h3>
          <TextField
            className="field-format"
            variant="filled"
            size="small"
            autoComplete="off"
            placeholder="JPT Approval Certificate"
            value={programme.approvalCertJPT}
            onChange={(e) =>
              setProgramme({
                ...programme,
                approvalCertJPT: e.target.value,
              })
            }
          />
          <br />
          <h3 className="h3-format">Remarks:</h3>
          <TextField
            className="field-format"
            multiline
            rows={6}
            variant="filled"
            size="small"
            autoComplete="off"
            placeholder="Remarks"
            value={programme.remarks}
            onChange={(e) =>
              setProgramme({
                ...programme,
                remarks: e.target.value,
              })
            }
          />

          {programme.accreditationType === "Re-Accreditation" && (
            <div className="create-form">
              <br />
              <h3 className="h3-format">Phase of Accreditation:</h3>
              <FormControl className="bg-white px-4 my-1 w-1/4">
                  <Select
                    hiddenLabel
                    variant="filled"
                    size="small"
                    value={programme.phaseReAccreditation}
                    onChange={(e) =>
                      setProgramme({
                        ...programme,
                        phaseReAccreditation: e.target.value,
                      })
                    }
                  >
                    <MenuItem value="Phase 1">Phase 1</MenuItem>
                    <MenuItem value="Phase 2">Phase 2</MenuItem>
                    <MenuItem value="Phase 3">Phase 3</MenuItem>
                    <MenuItem value="Phase 4">Phase 4</MenuItem>
                    <MenuItem value="Phase 5">Phase 5</MenuItem>
                    <MenuItem value="Phase 6">Phase 6</MenuItem>
                  </Select>
                </FormControl>
              <br />
              <h3 className="h3-format">
                Approved Date Senate Re-accreditation:
                <DatePicker
                  dateFormat="dd/MM/yyyy"
                  selected={programme.approvedDateSenateReAccreditation}
                  onChange={selectApprovedDateSenateReAccreditationHandler}
                  todayButton={"Today"}
                />
              </h3>

              <br />
              <h3 className="h3-format">Re-Accreditation Duration:</h3>
              <TextField
                className="field-format"
                variant="filled"
                size="small"
                autoComplete="off"
                placeholder="Re-Accreditation Duration"
                value={programme.durationReAccreditation}
                onChange={(e) =>
                  setProgramme({
                    ...programme,
                    durationReAccreditation: e.target.value,
                  })
                }
              />
              <br />
              <h3 className="h3-format">Re-Accreditation Remarks:</h3>
              <TextField
                className="field-format"
                multiline
                rows={6}
                variant="filled"
                size="small"
                autoComplete="off"
                placeholder="Re-Accreditation Remarks"
                value={programme.remarksReAccreditation}
                onChange={(e) =>
                  setProgramme({
                    ...programme,
                    remarksReAccreditation: e.target.value,
                  })
                }
              />
            </div>
          )}

          <div className="button-format">
            <Button
              label="Cancel"
              onclick={() => navigate("/dashboard/Programme")}
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

export default UpdateProgrammePage;
