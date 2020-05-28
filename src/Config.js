//  constantes
const TEAMS_LENGTH = 36;
const OFFSET_INDEX = {
  players: {
    name: { start: 230286, end: 230446 }, // bloque de nombres
    attributes: { start: 328192, end: 328199 }, // [acceleration|speed] [shotpower|curlskill] [balance|intelligence] [dribling|jump] [position|energy] [bloque de atributos Nº] [piel y pelo (0-1) | forma de cabello (0-13)] // + 7 * 20 (140) // bloque de posición del jugador
  },
};

module.exports = {
  TEAMS_LENGTH,
  OFFSET_INDEX,
};
