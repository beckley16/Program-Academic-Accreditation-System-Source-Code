interface IProps {
  variant: "primary" | "secondary" | "danger" | "light";
  type: "submit" | "button";
  label: string;
  onclick: () => void;
  loading?: boolean;
  disabled?: boolean;
}

const Button = ({
  variant,
  type,
  label,
  onclick,
  loading,
  disabled,
}: IProps) => {
  const primaryClass =
    " text-white bg-[#0047AB]  border=[#0047AB] hover:shadow-[0_0_3px_3px_#6495ED]";

  const secondaryClass =
    " text-white-bg-amber-400 border-amber-400 hover:shadow-[0_0_3px_3px_#9FE2BF]";

  const dangerClass =
    " text-white bg-[#FFC300] hover:shadow-[0_0_3px_3px_#EDDDAB]";

  const lightClass =
    " text-[#A5DBF2] border-[#A5DBF2] hover:shadow-[0_0_3px_3px_#1291C5]";

  const classNameCreator = (): string => {
    let finalClassName =
      "flex justify-center items-center outline-none duration-300 h-8 text-lg font-semibold px-3 rounded-2xl border-2";
    if (variant === "primary") {
      finalClassName += primaryClass;
    } else if (variant === "secondary") {
      finalClassName += secondaryClass;
    } else if (variant === "danger") {
      finalClassName += dangerClass;
    } else if (variant === "light") {
      finalClassName += lightClass;
    }
    finalClassName +=
      " disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300";
    return finalClassName;
  };

  const loadingIconCreator = () => {
    return (
      <div className="w-4 h-4 rounded-full animate-spin border-1 border-gray-400 border-t-gray-800"></div>
    );
  };
  //if else statement
  return (
    <button
      type={type}
      onClick={onclick}
      className={classNameCreator()}
      disabled={disabled}
    >
      {loading ? loadingIconCreator() : label}
    </button>
  );
};

export default Button;
