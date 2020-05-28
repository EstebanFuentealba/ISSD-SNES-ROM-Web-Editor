const fs = require("fs");
const Player = require("./Player");
const Team = require("./Team");
const { getHexFromRom } = require("./Utils");
const {
  TEAMS_LENGTH,
  OFFSET_INDEX,
  TEAM_PLAYERS_LENGTH,
  TEAM_PLAYER_NAME_HEX_LENGTH,
  TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH,
} = require("./Config");

class Rom {
  constructor({ romPath }) {
    this.romPath = romPath;
    if (!this.romPath) throw new Error("no rom path");
    this.rom = fs.readFileSync(this.romPath);
    this.teams = [];
  }
  write(filePath) {
    if (!filePath) throw new Error("no file path");
    let temporalBuffer = Buffer.alloc(this.rom.length);
    this.rom.copy(temporalBuffer, 0, 0, this.rom.length);
    this.teams.map((team) => {
      team.getPlayers().map((player) => {
        temporalBuffer = Buffer.concat([
          temporalBuffer.slice(0, player.getMeta().name.start),
          player.getNameBufferArray(),
          temporalBuffer.slice(player.getMeta().name.end),
        ]);
      });
    });
    fs.writeFileSync(filePath, temporalBuffer);
  }
  read() {
    // read team data
    //  TODO: implement read team name
    let teamName = "";
    //  read players
    this.teams = new Array(TEAMS_LENGTH).fill("").map((team, index) => {
      let players = [];
      for (
        let nameIndex =
            OFFSET_INDEX.players.name.start +
            index * TEAM_PLAYERS_LENGTH * TEAM_PLAYER_NAME_HEX_LENGTH,
          attributesIndex =
            OFFSET_INDEX.players.attributes.start +
            index * TEAM_PLAYERS_LENGTH * TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH;
        nameIndex <
        OFFSET_INDEX.players.name.end +
          index * TEAM_PLAYERS_LENGTH * TEAM_PLAYER_NAME_HEX_LENGTH;
        nameIndex += TEAM_PLAYER_NAME_HEX_LENGTH,
          attributesIndex += TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH
      ) {
        const player = new Player()
          .setHexName(
            getHexFromRom(this.rom, nameIndex, TEAM_PLAYER_NAME_HEX_LENGTH)
          )
          .setHexAttributes(
            getHexFromRom(
              this.rom,
              attributesIndex,
              TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH
            )
          )
          .setMetaData({
            name: {
              start: nameIndex,
              end: nameIndex + TEAM_PLAYER_NAME_HEX_LENGTH,
            },
            attributes: {
              start: attributesIndex,
              end: attributesIndex + TEAM_PLAYER_ATTRIBUTES_HEX_LENGTH,
            },
          });
        players.push(player);
      }
      return new Team({ name: teamName, players });
    });
    return {
      teams: this.teams,
    };
  }
}

module.exports = Rom;
