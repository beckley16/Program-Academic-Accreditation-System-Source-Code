import * as yup from "yup";
import { useForm } from "react-hook-form";
import { IRegisterDto } from "../../types/auth.type";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import { toast } from "react-hot-toast";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/paths";
import { useNavigate } from "react-router-dom";
import { PATH_AFTER_REGISTER } from "../../utils/globalConfig";
import { REGISTER_URL } from "../../utils/globalConfig";
import axiosInstance from "../../utils/axiosInstance";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import Select from "@mui/material/Select/Select";
import MenuItem from "@mui/material/MenuItem/MenuItem";
import Button from "../../components/general/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import { FormHelperText } from "@mui/material";

const RegisterPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [register, setRegister] = useState<IRegisterDto>({
    userName: "",
    email: "",
    password: "",
    position: "",
    faculty: "",
  });

  const redirect = useNavigate();

  const onSubmitRegisterForm = async () => {
    try {
      if (
        register.userName === "" ||
        register.password === "" ||
        register.email === "" ||
        register.position === "" ||
        register.faculty === ""
      ) {
        alert("Fill in all fields");
      }

      setLoading(true);
      await axiosInstance.post(REGISTER_URL, register);
      setLoading(false);
      toast.success("User created Successfully.");
      redirect(PATH_AFTER_REGISTER);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status, data } = err;
      if (status === 400 || status === 409) {
        toast.error(data);
      } else {
        toast.error("");
      }
    }
  };

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };


  return (
    <div className="pageTemplate1">

      <div className="max-sm:hidden flex-1 min-h-[600px] h-4/5 bg-gradient-to-tr from-[#DAC6FB] via-amber-400 to-[#AAC1F6] flex flex-col justify-center items-center rounded-l-2xl">
        <div className="h-3/5 p-6 rounded-2xl flex flex-col gap-8 justify-center items-start bg-white bg-opacity-20 border border-[#ffffff55] relative">
          <h1 className="text-3xl font-semibold text-white">
            Accreditation System
          </h1>
          <h4 className="text-2xl font-semibold text-white">
            University Malaya
          </h4>
          <div className="absolute -top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#ef32d9]  to-[#89fffd] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#cc2b5e] to-[#753a88] rounded-full blur-3xl"></div>
        </div>
      </div>

      <form className="flex-1 min-h-[600px] h-4/5 bg-[#f0ecf7] flex flex-col justify-center items-center rounded-r-2xl py-9">
        <h1 className="text-4xl font-bold mb-2 text-[#754eb4]">Register</h1>
        <br />
        <TextField className="field-format p-1"
          variant="outlined"
          size="small"
          autoComplete="off"
          label="User Name"
          value={register.userName}
          onChange={(e) =>
            setRegister({ ...register, userName: e.target.value })
          }
        />

        <br />
        <TextField className="field-format"
          variant="outlined"
          size="small"
          autoComplete="off"
          required
          label="Email"
          type="email"
          value={register.email}
          inputMode="email"
          onChange={(e) => setRegister({ ...register, email: e.target.value })}
        />

        <br />
        <FormControl className="field-format" variant="outlined" size="small">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            value={register.password}
            onChange={(e) =>
              setRegister({ ...register, password: e.target.value })
            }
          />
        </FormControl>

        <br />
        <FormControl className="field-format">
          <InputLabel>Position</InputLabel>
          <Select
            variant="outlined"
            size="small"
            value={register.position}
            label="Position"
            onChange={(e) =>
              setRegister({ ...register, position: e.target.value })
            }
          >
            <MenuItem value="UM_STAFF">UM STAFF</MenuItem>
            <MenuItem value="UM_FACULTYSTAFF">UM FACULTY STAFF</MenuItem>
          </Select>
        </FormControl>
        <br />

        {register.position === "UM_FACULTYSTAFF" && (
          <FormControl className="field-format">
            <InputLabel>Faculty</InputLabel>
            <Select
              variant="outlined"
              size="small"
              value={register.faculty}
              label="Faculty"
              onChange={(e) =>
                setRegister({ ...register, faculty: e.target.value })
              }
            >
              <MenuItem value="Academy_of_Islamic_Studies">
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
              <MenuItem value="Faculty of Science">Faculty of SCience</MenuItem>
            </Select>
          </FormControl>
        )}

        {register.position === "UM_STAFF" && (
          <FormControl className="field-format">
            <InputLabel>Faculty</InputLabel>
            <Select
              variant="outlined"
              size="small"
              value={register.faculty}
              label="Faculty"
              onChange={() =>
                setRegister({ ...register, faculty: "NONE" })
              }
            >
              <MenuItem value="NONE">NONE</MenuItem>
            </Select>
          </FormControl>
        )}


        <br />
        <div className="px-4 mt-2 mb-6 w-9/12 flex gap-2">
          <h1>Already have an account?</h1>
          <Link
            to={PATH_PUBLIC.login}
            className="text-[#28B3EC] border border-[#28B3EC] hover:shadow-[0_0_5px_2px_#2BA9DD] px-3 rounded-2xl duration-200"
          >
            Login
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4 mt-0">
          <Button
            label="Register"
            type="button"
            variant="primary"
            onclick={() => onSubmitRegisterForm()}
          >
          </Button>
        </div>
      </form>


    </div>
  );
};

export default RegisterPage;
