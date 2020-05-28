const Player = require("./Player");

class Team {
  constructor({ name, players = [] }) {
    this.name = name;
    this.players = players;
  }
  getPlayers() {
    return this.players;
  }
  toJSON() {
    return {
      name: this.name,
      players: this.players.map((player) => player.toJSON()),
    };
  }
}

module.exports = Team;
