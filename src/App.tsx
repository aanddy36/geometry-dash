import { MapProvider } from "./contexts/MapContext";
import Game from "./features/Game";

function App() {
  return (
    <MapProvider>
      <Game />
    </MapProvider>
  );
}

export default App;
