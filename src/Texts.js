const { parseStringToBuffer, parseStringToHex } = require("./Utils");

class Texts {
  setHexFriendlymatch(value) {
    this.hexFriendlymatch = value;
    return this;
  }
  setHexFriendlymatchDescription(value) {
    this.hexFriendlymatchDescription = value;
    return this;
  }
  setFriendlymatch(value) {
    if (value.length > 8) throw new Error("Max length is 8");
    if (value.length < 1) throw new Error("Min length is 1");
    this.hexFriendlymatch = parseStringToHex(value.padEnd(8, "."));
  }
  setFriendlymatchDescription(value) {
    if (value.length > 15) throw new Error("Max length is 16");
    if (value.length < 1) throw new Error("Min length is 1");
    this.hexFriendlymatchDescription = parseStringToHex(
      value.replace(/ /g, ".").padEnd(15, ".")
    );
  }
  getFriendlymatchBufferArray() {
    return parseStringToBuffer(this.hexFriendlymatch);
  }
  getFriendlymatchDescriptionBufferArray() {
    return parseStringToBuffer(this.hexFriendlymatchDescription);
  }
}

module.exports = Texts;
