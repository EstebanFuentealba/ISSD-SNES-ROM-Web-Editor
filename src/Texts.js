const {
  parseStringToBuffer,
  parseStringToHex,
  parseHexToLetterWithDictionary,
} = require("./Utils");
const { letters } = require("./Dictionary");
class Texts {
  /**
   *
   * Friendly match
   */
  setHexFriendlymatch(value) {
    this.hexFriendlymatch = value;
    return this;
  }
  setHexFriendlymatchDescription(value) {
    this.hexFriendlymatchDescription = value;
    return this;
  }
  setHexShortLeague(value) {
    this.hexShortLeague = value;
    return this;
  }
  setHexShortLeagueDescription(value) {
    this.hexShortLeagueDescription = value;
    return this;
  }
  setHexShortTournament(value) {
    this.hexShortTournament = value;
    return this;
  }
  setHexShortTournamentDescription(value) {
    this.hexShortTournamentDescription = value;
    return this;
  }
  setHexPress(value) {
    this.hexPress = value;
    return this;
  }
  setFriendlymatch(value) {
    this.hexFriendlymatch = parseStringToHex(value.padEnd(8, "."));
  }
  setFriendlymatchDescription(value) {
    this.hexFriendlymatchDescription = parseStringToHex(value.padEnd(16, "."));
  }
  setShortLeague(value) {
    this.hexShortLeague = parseStringToHex(value.padEnd(16, "."));
  }
  setShortLeagueDescription(value) {
    this.hexShortLeagueDescription = parseStringToHex(value.padEnd(31, "."));
  }
  setShortTournament(value) {
    this.hexShortTournament = parseStringToHex(value.padEnd(16, "."));
  }
  setShortTournamentDescription(value) {
    this.hexShortTournamentDescription = parseStringToHex(
      value.padEnd(31, ".")
    );
  }
  setPress(value) {
    this.hexPress = parseStringToHex(value.padEnd(6, "."));
  }

  getFriendlymatchBufferArray() {
    return parseStringToBuffer(this.hexFriendlymatch);
  }
  getFriendlymatchDescriptionBufferArray() {
    return parseStringToBuffer(this.hexFriendlymatchDescription);
  }
  getShortLeagueBufferArray() {
    return parseStringToBuffer(this.hexShortLeague);
  }
  getShortLeagueDescriptionBufferArray() {
    return parseStringToBuffer(this.hexShortLeagueDescription);
  }
  getShortTournamentBufferArray() {
    return parseStringToBuffer(this.hexShortTournament);
  }
  getShortTournamentDescriptionBufferArray() {
    return parseStringToBuffer(this.hexShortTournamentDescription);
  }
  getPressBufferArray() {
    return parseStringToBuffer(this.hexPress);
  }
  toJSON() {
    return {
      friendlymatch: parseHexToLetterWithDictionary(
        this.hexFriendlymatch,
        letters
      ),
      friendlymatch_description: parseHexToLetterWithDictionary(
        this.hexFriendlymatchDescription,
        letters
      ),
      shortleague: parseHexToLetterWithDictionary(this.hexShortLeague, letters),
      shortleague_description: parseHexToLetterWithDictionary(
        this.hexShortLeagueDescription,
        letters
      ),
      shorttournament: parseHexToLetterWithDictionary(
        this.hexShortTournament,
        letters
      ),
      shorttournament_description: parseHexToLetterWithDictionary(
        this.hexShortTournamentDescription,
        letters
      ),
      press: parseHexToLetterWithDictionary(this.hexPress, letters),
    };
  }
}

module.exports = Texts;
