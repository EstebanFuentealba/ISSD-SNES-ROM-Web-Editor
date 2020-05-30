//  constantes
const TEAMS_LENGTH = 36;
const TEAM_PLAYERS_LENGTH = 20;
const TEAM_PLAYER_NAME_HEX_LENGTH = 8;
const TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH = 7;

const OFFSET_INDEX = {
  texts: {
    friendlymatch: {
      start: 252937,
      end: 252937 + 8,
    },
    friendlymatch_description: {
      start: 252985,
      end: 252985 + 15,
    },
  },
  team: {
    uniform: {
      shirt: {
        primary: {
          rgb: {
            start: 296398,
            end: 296398 + 2,
          },
        },
        secondary: {
          rgb: 266398,
        },
        tertiary: {
          rgb: 266398,
        },
      },
    },
  },
  players: {
    name: { start: 230286, end: 230286 + TEAM_PLAYER_NAME_HEX_LENGTH }, // bloque de nombres
    attributes: {
      start: 328192,
      end: 328192 + TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH,
    }, // [acceleration|speed] [shotpower|curlskill] [balance|intelligence] [dribling|jump] [position|energy] [bloque de atributos Nº] [piel y pelo (0-1) | forma de cabello (0-13)] // + 7 * 20 (140) // bloque de posición del jugador
  },
};

module.exports = {
  TEAMS_LENGTH,
  OFFSET_INDEX,
  TEAM_PLAYERS_LENGTH,
  TEAM_PLAYER_NAME_HEX_LENGTH,
  TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH,
};
