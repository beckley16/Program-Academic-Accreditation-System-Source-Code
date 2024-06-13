import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Spinner from "../../components/general/Spinner";
import { ICreateProgrammeDto, ProgramStatus } from "../../types/programme.type";
import axiosInstance from "../../utils/axiosInstance";
import { PROGRAMME_LIST_URL } from "../../utils/globalConfig";
import { toast } from "react-hot-toast";
import useAuth from "../../hooks/useAuth.hook";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PATH_DASHBOARD } from "../../routes/paths";
import { CREATE_PROGRAMME_URL } from "../../utils/globalConfig";
import { isAuthorizedForCreateProgram } from "../../auth/auths.utils";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "../../components/general/Button";

const AddProgrammePage = () => {
  //empty string for the user state in an empty array
  const { user: loggedInUser } = useAuth();
  const [expireddate, setExpiredDate] = useState(new Date());
  const [approvedSenatedate, setApprovedSenateDate] = useState(new Date());
  const [reaccreditationdate, setreaccreditationDate] = useState(new Date());
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const [programme, setProgramme] = useState<ICreateProgrammeDto>({
    programID: "",
    programNameEng: "",
    programNameMalay: "",
    faculty: "",
    accreditationType: "",
    expiryDate: new Date(),
    status: "ACTIVE",
    mqrNum: 0,
    referredMQRNum: "",
    registeredMQR: "",
    studyMode: "",
    necCode: "",
    minDurationOfStudy: 0,
    maxDurationOfStudy: 0,
    creditHrs: "",
    approvedDateSenate: new Date(),
    accreditationStatus: "",
    approvalCertJPT: "",
    remarks: "",
    phaseReaccreditation: "",
    approvedDateSenateReaccreditation: new Date(),
    durationReaccreditation: "",
    remarksReaccreditation: "",
  });
  const today = new Date();
  const selectDateHandler = (d: Date) => {
    setExpiredDate(d);
    programme.expiryDate = d;
  };
  const selectApprovedDateSenateReAccreditationHandler = (d: Date) => {
    setreaccreditationDate(d);
    programme.approvedDateSenateReaccreditation = d;
  };
  const selectApprovedDateSenateHandler = (d: Date) => {
    setApprovedSenateDate(d);
    programme.approvedDateSenate = d;
  };

  //check validation
  const createProgrammeSchema = Yup.object().shape({
    programID: Yup.string().required("Programme ID is required"),
    programName: Yup.string().required("Programme Name is required"),
    programDescription: Yup.string().required(
      "Programme Description is required"
    ),
    faculty: Yup.string().required("Faculty is required"),
    expiryDate: Yup.date().required("Expiry Date is required"),
    status: Yup.string().required("Status is required"),
  });

  /*
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ICreateProgrammeDto>({
    resolver: yupResolver(createProgrammeSchema),
    defaultValues: {
      programID: "",
      programName: "",
      programDescription: "",
      faculty: "",
      expiryDate: date,
      status: "ACTIVE",
    },
  });
  */
  const onCancelClick = () => {
    navigate("/dashboard/Programme");
  };

  const onSubmitProgramForm = async () => {
    try {
      setLoading(true);
      if (
        programme.programID === "" ||
        programme.programNameEng === "" ||
        programme.programNameMalay === "" ||
        programme.faculty === "" ||
        programme.status === "" ||
        programme.accreditationType === "" ||
        programme.mqrNum === null ||
        programme.referredMQRNum === "" ||
        programme.studyMode === "" ||
        programme.necCode === "" ||
        programme.minDurationOfStudy === null ||
        programme.maxDurationOfStudy === null ||
        programme.creditHrs === "" ||
        programme.accreditationStatus === "" ||
        programme.approvalCertJPT === ""
      ) {
        alert("Fill in all fields");
        setLoading(false);
        return;
      }

      if (!isAuthorizedForCreateProgram(loggedInUser!.roles[0])) {
        setLoading(false);
        toast.error("You are not allowed to create program");
        navigate(PATH_DASHBOARD.programme);
      } else {
        var localTimeExpiryDate = new Date(
          Date.UTC(
            expireddate.getFullYear(),
            expireddate.getMonth(),
            expireddate.getDate()
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
            approvedSenatedate.getFullYear(),
            approvedSenatedate.getMonth(),
            approvedSenatedate.getDate()
          )
        );
        if(programme.accreditationType =="Full Accreditation")
          {
            const newProgramData: ICreateProgrammeDto = {
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
              phaseReaccreditation: "",
              approvedDateSenateReaccreditation: localTimeReAccreditationDate,
              durationReaccreditation: programme.durationReaccreditation,
              remarksReaccreditation: programme.remarksReaccreditation,
            };
            await axiosInstance.post(CREATE_PROGRAMME_URL, newProgramData);
          }
          else
          {
            const newProgramData: ICreateProgrammeDto = {
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
              phaseReaccreditation: programme.phaseReaccreditation,
              approvedDateSenateReaccreditation: localTimeReAccreditationDate,
              durationReaccreditation: programme.durationReaccreditation,
              remarksReaccreditation: programme.remarksReaccreditation,
            };
            await axiosInstance.post(CREATE_PROGRAMME_URL, newProgramData);
          }
        
        
        setLoading(false);
        toast.success("New Programme is created successfully.");
        navigate(PATH_DASHBOARD.programme);
      }
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      //refer backend status
      if (err.status === 400 || err.status === 409) {
        toast.error(err.data);
      } else {
        toast.error("An error occured. Please contact admins");
      }
    }
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
      <h1 className="text-4xl font-bold text-center">Create Programme</h1>
      <div className="container mx-auto px-60">
        <div className="create-program">
          <h2 className="text-[#6a6d6f] text-2xl font-semibold">
            {" "}
            Enter Programme Details
          </h2>
          <form className="create-form">
            <h3 className="h3-format">Programme ID:</h3>
            <TextField
              className="field-format"
              variant="filled"
              size="small"
              autoComplete="off"
              placeholder="Programme ID"
              value={programme.programID}
              onChange={(e) =>
                setProgramme({ ...programme, programID: e.target.value })
              }
            />
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
              className="field-format w-full"
              variant="filled"
              size="small"
              autoComplete="off"
              placeholder="English Programme Name"
              value={programme.programNameEng}
              onChange={(e) =>
                setProgramme({ ...programme, programNameEng: e.target.value })
              }
            />
            <br />
            <h3 className="h3-format">Programme Name in Malay:</h3>
            <TextField
              className="field-format w-full"
              variant="filled"
              size="small"
              autoComplete="off"
              placeholder="Malay Programme Name"
              value={programme.programNameMalay}
              onChange={(e) =>
                setProgramme({ ...programme, programNameMalay: e.target.value })
              }
            />
            <br />
            <h3 className="h3-format">Faculty:</h3>
            <FormControl className="field-format">
              <Select
                variant="filled"
                size="small"
                value={programme.faculty}
                placeholder="Faculty"
                onChange={(e) =>
                  setProgramme({ ...programme, faculty: e.target.value })
                }
              >
                <MenuItem value="Academy of Islamic Studies">
                  Academy of Islamic Studies
                </MenuItem>
                <MenuItem value="Academy of Malay Studies">
                  Academy of Malay Studies
                </MenuItem>
                <MenuItem value="Asia-Europe Institute">
                  Asia-Europe Institute
                </MenuItem>
                <MenuItem value="Centre for Sport and Exercise Sciences">
                  Centre for Sport and Exercise Sciences
                </MenuItem>
                <MenuItem value="Institute for Advanced Studies">
                  Institute for Advanced Studies
                </MenuItem>
                <MenuItem value="International Institute of Public Policy & Management">
                  International Institute of Public Policy & Management
                </MenuItem>
                <MenuItem value="Faculty of Arts and Social Sciences">
                  Faculty of Arts and Social Sciences
                </MenuItem>
                <MenuItem value="Faculty of Built Environment">
                  Faculty of Built Environment
                </MenuItem>
                <MenuItem value="Faculty of Business and Economics">
                  Faculty of Business and Economics
                </MenuItem>
                <MenuItem value="Faculty of Computer Science and Information Technology">
                  Faculty of Computer Science and Information Technology
                </MenuItem>
                <MenuItem value="Faculty of Creative Arts">
                  Faculty of Creative Arts
                </MenuItem>
                <MenuItem value="Faculty of Dentistry">
                  Faculty of Dentistry
                </MenuItem>
                <MenuItem value="Faculty of Education">
                  Faculty of Education
                </MenuItem>
                <MenuItem value="Faculty of Engineering">
                  Faculty of Engineering
                </MenuItem>
                <MenuItem value="Faculty of Languages and Linguistics">
                  Faculty of Languages and Linguistics
                </MenuItem>
                <MenuItem value="Faculty of Law">Faculty of Law</MenuItem>
                <MenuItem value="Faculty of Medicine">
                  Faculty of Medicine
                </MenuItem>
                <MenuItem value="Faculty of Pharmacy">
                  Faculty of Pharmacy
                </MenuItem>
                <MenuItem value="Faculty of Science">
                  Faculty of SCience
                </MenuItem>
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
                <MenuItem value="Full Accreditation">
                  Full Accreditation
                </MenuItem>
                <MenuItem value="Re-Accreditation">Re-Accreditation</MenuItem>
              </Select>
            </FormControl>
            <br />
            <h3 className="h3-format">
              Senate Approved Date:
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={approvedSenatedate}
                onChange={selectApprovedDateSenateHandler}
                todayButton={"Today"}
              />
            </h3>

            <br />
            <h3 className="h3-format">MQR Certifcate Number:</h3>
            <TextField
              className="field-format"
              type="number"
              autoComplete="off"
              placeholder="MQR Certifcate Number"
              variant="filled"
              size="small"
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
              placeholder="MQR Reference Number"
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
              placeholder="NEC Code"
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
            <h3 className="h3-format"> Maximum  {"\t"}:
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
              Expiry Date:
              <DatePicker
                dateFormat="dd/MM/yyyy"
                selected={expireddate}
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
                    value={programme.phaseReaccreditation}
                    onChange={(e) =>
                      setProgramme({
                        ...programme,
                        phaseReaccreditation: e.target.value,
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
                    selected={reaccreditationdate}
                    minDate={today}
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
                  value={programme.durationReaccreditation}
                  onChange={(e) =>
                    setProgramme({
                      ...programme,
                      durationReaccreditation: e.target.value,
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
                  value={programme.remarksReaccreditation}
                  onChange={(e) =>
                    setProgramme({
                      ...programme,
                      remarksReaccreditation: e.target.value,
                    })
                  }
                />
              </div>
            )}
            <div className="button-format">
              <Button
                label="Cancel"
                type="button"
                variant="secondary"
                onclick={() => onCancelClick()}
              ></Button>
              <Button
                label="Save"
                type="button"
                variant="primary"
                onclick={() => onSubmitProgramForm()}
              ></Button>
            </div>
            <br />
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddProgrammePage;
