const fs = require("fs");
const Player = require("./Player");
const Team = require("./Team");
const Texts = require("./Texts");
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
        //  update name
        temporalBuffer = Buffer.concat([
          temporalBuffer.slice(0, player.getMeta().name.start),
          player.getNameBufferArray(),
          temporalBuffer.slice(player.getMeta().name.end),
        ]);
        //  update player attributes
        temporalBuffer = Buffer.concat([
          temporalBuffer.slice(0, player.getMeta().attributes.start),
          player.getAttributesBufferArray(),
          temporalBuffer.slice(player.getMeta().attributes.end),
        ]);
      });
    });
    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(0, OFFSET_INDEX.texts.friendlymatch.start),
      this.texts.getFriendlymatchBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.friendlymatch.end),
    ]);
    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(
        0,
        OFFSET_INDEX.texts.friendlymatch_description.start
      ),
      this.texts.getFriendlymatchDescriptionBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.friendlymatch_description.end),
    ]);

    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(0, OFFSET_INDEX.texts.shortleague.start),
      this.texts.getShortLeagueBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.shortleague.end),
    ]);
    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(0, OFFSET_INDEX.texts.shortleague_description.start),
      this.texts.getShortLeagueDescriptionBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.shortleague_description.end),
    ]);

    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(0, OFFSET_INDEX.texts.shorttournament.start),
      this.texts.getShortTournamentBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.shorttournament.end),
    ]);
    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(
        0,
        OFFSET_INDEX.texts.shorttournament_description.start
      ),
      this.texts.getShortTournamentDescriptionBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.shorttournament_description.end),
    ]);
    temporalBuffer = Buffer.concat([
      temporalBuffer.slice(0, OFFSET_INDEX.texts.press.start),
      this.texts.getPressBufferArray(),
      temporalBuffer.slice(OFFSET_INDEX.texts.press.end),
    ]);

    fs.writeFileSync(filePath, temporalBuffer);
  }
  read() {
    //  read texts
    this.texts = new Texts()
      .setHexFriendlymatch(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.friendlymatch.start,
          OFFSET_INDEX.texts.friendlymatch.end -
            OFFSET_INDEX.texts.friendlymatch.start
        )
      )
      .setHexFriendlymatchDescription(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.friendlymatch_description.start,
          OFFSET_INDEX.texts.friendlymatch_description.end -
            OFFSET_INDEX.texts.friendlymatch_description.start
        )
      )
      .setHexShortLeague(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.shortleague.start,
          OFFSET_INDEX.texts.shortleague.end -
            OFFSET_INDEX.texts.shortleague.start
        )
      )
      .setHexShortLeagueDescription(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.shortleague_description.start,
          OFFSET_INDEX.texts.shortleague_description.end -
            OFFSET_INDEX.texts.shortleague_description.start
        )
      )
      .setHexShortTournament(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.shorttournament.start,
          OFFSET_INDEX.texts.shorttournament.end -
            OFFSET_INDEX.texts.shorttournament.start
        )
      )
      .setHexShortTournamentDescription(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.shorttournament_description.start,
          OFFSET_INDEX.texts.shorttournament_description.end -
            OFFSET_INDEX.texts.shorttournament_description.start
        )
      )
      .setHexPress(
        getHexFromRom(
          this.rom,
          OFFSET_INDEX.texts.press.start,
          OFFSET_INDEX.texts.press.end - OFFSET_INDEX.texts.press.start
        )
      );
    // read team data
    //  TODO: implement read team name
    let teamName = "";
    this.teams = new Array(TEAMS_LENGTH).fill("").map((team, index) => {
      //  read shirt
      //  TODO
      //  read players
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
      texts: this.texts,
    };
  }
}

module.exports = Rom;
