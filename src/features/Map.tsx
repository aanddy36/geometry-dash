import { useMap } from "../contexts/MapContext";

const Map = () => {
  const { canvas, setIsMousePressed } = useMap();

  return (
    <canvas
      ref={canvas}
      onMouseDown={() => setIsMousePressed(true)}
      onMouseUp={() => setIsMousePressed(false)}
      className=""
    ></canvas>
  );
};

export default Map;
