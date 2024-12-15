import Map from "./Map";
import Parameters from "./Parameters";
import Actions from "./Actions";

const Game = () => {
  return (
    <main className="relative w-[100wh] h-[100vh] p-8 flex flex-col items-center gap-10">
      {/* Botones de control */}
      <section className=" flex w-full justify-around items-center">
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
