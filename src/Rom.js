const fs = require("fs");
const Player = require("./Player");
const Team = require("./Team");
const { getHexFromRom } = require("./Utils");
const { TEAMS_LENGTH, OFFSET_INDEX } = require("./Config");

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
        let nameIndex = OFFSET_INDEX.players.name.start + index * 160,
          attributesIndex = OFFSET_INDEX.players.attributes.start + index * 140;
        nameIndex < OFFSET_INDEX.players.name.end + index * 160;
        nameIndex += 8, attributesIndex += 7
      ) {
        const player = new Player()
          .setHexName(getHexFromRom(this.rom, nameIndex, 8))
          .setHexAttributes(getHexFromRom(this.rom, attributesIndex, 7))
          .setMetaData({
            name: {
              start: nameIndex,
              end: nameIndex + 8,
            },
            attributes: {
              start: attributesIndex,
              end: attributesIndex + 7,
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
