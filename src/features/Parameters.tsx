import { useMap } from "../contexts/MapContext";

const Parameters = () => {
  const { playerStats } = useMap();

  return (
    <div className=" flex flex-col items-center gap-4">
      <h4 className=" text-2xl font-semibold">Jugador</h4>
      <div className=" grid grid-cols-1 gap-2 ">
        <div className=" flex gap-1 items-center justify-between">
          <h5>Posición X (px): </h5>
          <span className=" px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.positionX}
          </span>
        </div>

        <div className=" flex gap-1 items-center justify-between">
          <h5>Posición Y (px): </h5>
          <span className="px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.positionY}
          </span>
        </div>

        <div className=" flex gap-1 items-center justify-between">
          <h5>Velocidad X (px/fps): </h5>
          <span className="px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.speedX}
          </span>
        </div>

        <div className=" flex gap-1 items-center justify-between">
          <h5>Velocidad Y (px/fps): </h5>
          <span className="px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.speedY}
          </span>
        </div>

        <div className=" flex gap-1 items-center justify-between">
          <h5>Ángulo (°): </h5>
          <span className="px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.angle}
          </span>
        </div>

        <div className=" flex gap-1 items-center justify-between">
          <h5>Tasa de rotación (°/fps): </h5>
          <span className="px-2 py-1 rounded-lg bg-[#c6c6c6]/40 w-32 overflow-hidden">
            {playerStats.rotationRate}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Parameters;
