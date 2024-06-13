import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { ILoginDto } from "../../types/auth.type";
import InputField from "../../components/general/InputField";
import { yupResolver } from "@hookform/resolvers/yup";
import useAuth from "../../hooks/useAuth.hook";
import Button from "../../components/general/Button";
import { toast } from "react-hot-toast";
import { useState } from "react";
import { Link } from "react-router-dom";
import { PATH_PUBLIC } from "../../routes/paths";
import TextField from "@mui/material/TextField/TextField";
import FormControl from "@mui/material/FormControl/FormControl";
import InputLabel from "@mui/material/InputLabel/InputLabel";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


const LoginPage = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { login } = useAuth();

  const loginSchema = Yup.object().shape({
    userName: Yup.string().required("User Name is required"),
    password: Yup.string()
      .required("Password is required"),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ILoginDto>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      userName: "",
      password: "",
    },
  });

  const onSubmitLoginForm = async (data: ILoginDto) => {
    try {
      setLoading(true);
      await login(data.userName, data.password);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      const err = error as { data: string; status: number };
      const { status } = err;
      if (status === 401) {
        toast.error("Invalid Username or Password");
      } else {
        toast.error("An Error occurred. Please contact admins");
      }
    }
  };

  return (
    <div className="pageTemplate1">
      
      <div className="max-sm:hidden flex-1 min-h-[600px] h-4/5 bg-gradient-to-tr from-[#DAC6FB] via-amber-400 to-[#AAC1F6] flex flex-col justify-center items-center rounded-l-2xl">
        <div className="h-3/5 p-6 rounded-2xl flex flex-col gap-8 justify-center items-start bg-white bg-opacity-20 border border-[#ffffff55] relative">
          <h4 className="text-3xl font-semibold text-white">
            Accreditation System
          </h4>
          <h4 className="text-2xl font-semibold text-white">
            University Malaya
          </h4>
          <div className="absolute -top-20 right-20 w-48 h-48 bg-gradient-to-br from-[#ef32d9]  to-[#89fffd] rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 right-20 w-32 h-32 bg-gradient-to-br from-[#cc2b5e] to-[#753a88] rounded-full blur-3xl"></div>
        </div>
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmitLoginForm)}
        className="flex-1 min-h-[600px] h-4/5 bg-[#f0ecf7] flex flex-col justify-center items-center rounded-r-2xl"
      >
        <h1 className="text-4xl font-bold mb-2 text-[#754eb4]">Login</h1>

        <InputField
          control={control}
          label="User Name"
          inputName="userName"
          error={errors.userName?.message}
        />
        <InputField
          control={control}
          label="Password"
          inputName="password"
          inputType="password"
          error={errors.password?.message}
        />

        <div className="px-4 mt-2 mb-6 w-9/12 flex gap-2">
          <h1>Don't have an account?</h1>
          <Link
            to={PATH_PUBLIC.register}
            className="text-[#754eb4] border border-[#754eb4] hover:shadow-[0_0_5px_2px_#754eb44c] px-3 rounded-2xl duration-200"
          >
            Register
          </Link>
        </div>

        <div className="flex justify-center items-center gap-4 mt-6">
          <Button
            variant="secondary"
            type="button"
            label="Reset"
            onclick={() => reset()}
          />
          <Button
            variant="primary"
            type="submit"
            label="Login"
            onclick={() => {}}
            loading={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default LoginPage;
