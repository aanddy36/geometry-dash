import Actions from "./Actions";
import Map from "./Map";
import Parameters from "./Parameters";

const Game = () => {
  return (
    <main className="relative w-[100wh] h-[100vh] p-8 flex items-center gap-10 bg-[#ebebeb]">
      {/* Botones de control */}
      <section className=" flex flex-col w-full gap-12 py-6 items-center bg-white/80 rounded-xl h-full shadow-lg">
        {/* Acciones */}
        <Actions />

        {/* Posicion inicial */}
        <Parameters />
      </section>

      {/* Pantalla de juego */}
      <Map />
    </main>
  );
};

export default Game;
