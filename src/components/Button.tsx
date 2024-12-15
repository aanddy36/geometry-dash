interface Props {
  text: string;
  handleClick: () => void;
  disabled?: boolean;
}

const Button = ({ text, handleClick, disabled = false }: Props) => {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      className="py-1.5 px-3 bg-transparent rounded-md transition-all duration-200 hover:bg-black text-black
           border-black border hover:text-white disabled:opacity-50 disabled:hover:bg-transparent min-w-[120px]
            disabled:hover:text-black  disabled:cursor-not-allowed"
    >
      {text}
    </button>
  );
};

export default Button;
