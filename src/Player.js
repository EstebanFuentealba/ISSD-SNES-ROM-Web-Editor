const {
  parseHexToLetterWithDictionary,
  parseStringToHex,
  parseStringToBuffer,
} = require("./Utils");
const { letters, numbers, hairs } = require("./Dictionary");

class Player {
  constructor() {
    this.hexName = "";
    this.hexAttributes = "";
    this.meta = {};
  }

  setHexName = (value) => {
    this.hexName = value;
    return this;
  };
  setHexAttributes = (value) => {
    this.hexAttributes = value;
    return this;
  };
  setMetaData = (value) => {
    this.meta = value;
    return this;
  };
  getMeta = () => this.meta;
  getName = () => {
    return parseHexToLetterWithDictionary(this.hexName, letters);
  };
  getNameBufferArray = () => {
    return parseStringToBuffer(this.hexName);
  };
  setName = (value) => {
    if (value.length > 8) throw new Error("Max length is 8");
    this.hexName = parseStringToHex(value);
    return this;
  };
  getAttributes = () => {
    const [
      acceleration,
      speed,
      shotpower,
      curlskill,
      balance,
      intelligence,
      dribling,
      jump,
      position,
      energy,
      no1,
      no2,
      skin,
      hair,
    ] = this.hexAttributes.split("");
    return {
      acceleration: parseInt(acceleration) + 1,
      speed: parseInt(speed) + 1,
      shotpower: parseInt(shotpower) + 1,
      curlskill: parseInt(curlskill) + 1,
      balance: parseInt(balance) + 1,
      intelligence: parseInt(intelligence) + 1,
      dribling: parseInt(dribling) + 1,
      jump: parseInt(jump) + 1,
      /**
       * Posiciones:
       * 1 = Portero
       * 2 = Defensor
       * 3 = Medio Defensor
       * 4 = Medio Campo
       * 5 = Medio Atacante
       * 6 = Atacante
       */
      position: parseInt(position),
      energy: parseInt(energy) + 1,
      no: numbers[`${no1}${no2}`.toUpperCase()],
      skin: parseInt(skin),
      hair: hairs[hair],
    };
  };
  toJSON() {
    return {
      name: this.getName(),
      attributes: this.getAttributes(),
      meta: this.meta,
    };
  }
}

module.exports = Player;
