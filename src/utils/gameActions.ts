// Con esta función indicaremos en qué sección vamos y por ende qué obstáculos escoger.

import { MAP_WIDTH } from "../constants/initialValues";
import { Section, SectionsPair, Speeds } from "../types";

// La idea es siempre estar analizando los obstáculos de la sección actual y de la siguiente
export function moveCamera(
  speed: Speeds,
  isMapMoving: React.MutableRefObject<boolean>,
  distanceTracker: React.MutableRefObject<number>,
  mapSection: React.MutableRefObject<number>,
  allSections: Section[],
  sections: React.MutableRefObject<SectionsPair>
) {
  const distanceLimit = MAP_WIDTH; // El límite de la sección será 20 * GRID_SIZE
  distanceTracker.current += speed.x; // Cada avance lo acumulamos.

  //Si superamos el límite, cambiamos de sección. Lo hará cuando la sección actual desaparezca.
  if (distanceTracker.current > distanceLimit) {
    mapSection.current += 1; //Subimos de sección
    distanceTracker.current = 0; //Reiniciamos el contador
    console.log(mapSection.current);

    if (mapSection.current == allSections.length) {
      isMapMoving.current = false;
      return;
    }

    //Este if no lo pasará si es la última sección
    if (sections.current.next) {
      sections.current.current = sections.current.next; // Indicamos que ACTUALMENTE vamos en esta sección
      sections.current.next = allSections[mapSection.current]; // Esta será la SIGUIENTE sección
      console.log(sections.current);
    }
  }
}
