import { FC, ReactNode } from "react";
import { frameX, frameY, GRID_SIZE } from "../constants/initialValues";

interface Props {
  children: ReactNode;
}

const Frame: FC<Props> = ({ children }) => {
  return (
    <section
      className="relative border-2 border-gray-800 overflow-hidden"
      style={{
        height: `${frameY * GRID_SIZE}px`,
        width: `${frameX * GRID_SIZE}px`,
      }}
    >
      {children}
    </section>
  );
};

export default Frame;
