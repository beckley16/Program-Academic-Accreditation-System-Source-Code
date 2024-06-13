import { PiDetective } from "react-icons/pi";

const AuthSpinner = () => {
  return (
    <div className="w-80 h-80 mx-auto flex justify-center items-center relative">
      <div className="absolute w-full h-full inset-0 border-8 border-blue-300 border-t-blue-500 rounded-full animate-spin">
        <h1>
          <PiDetective className="w-40 h-40 text-blue-200"></PiDetective>
        </h1>
      </div>
    </div>
  );
};

export default AuthSpinner;
