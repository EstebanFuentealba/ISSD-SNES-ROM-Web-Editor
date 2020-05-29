const {
  parseHexToLetterWithDictionary,
  parseStringToHex,
  parseStringToBuffer,
  keyToValue,
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
  getAttributesBufferArray = () => {
    return parseStringToBuffer(this.hexAttributes);
  };
  setName = (value) => {
    if (value.length > 8) throw new Error("Max length is 8");
    if (value.length < 1) throw new Error("Min length is 1");
    this.hexName = parseStringToHex(value.padEnd(8, "."));
    return this;
  };
  setAcceleration = (value) => {
    this.hexAttributes = `${value - 1}${this.hexAttributes.substr(1)}`;
  };
  setSpeed = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 1)}${
      value - 1
    }${this.hexAttributes.substr(2)}`;
  };
  setShotpower = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 2)}${
      value - 1
    }${this.hexAttributes.substr(3)}`;
  };
  setCurlskill = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 3)}${
      value - 1
    }${this.hexAttributes.substr(4)}`;
  };
  setBalance = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 4)}${
      value - 1
    }${this.hexAttributes.substr(5)}`;
  };
  setIntelligence = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 5)}${
      value - 1
    }${this.hexAttributes.substr(6)}`;
  };
  setDribling = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 6)}${
      value - 1
    }${this.hexAttributes.substr(7)}`;
  };
  setJump = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 7)}${
      value - 1
    }${this.hexAttributes.substr(8)}`;
  };
  setPosition = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(
      0,
      8
    )}${value}${this.hexAttributes.substr(9)}`;
  };
  setEnergy = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 9)}${
      value - 1
    }${this.hexAttributes.substr(10)}`;
  };
  /**
   * value Number 1-20
   */
  setNo = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 10)}${
      keyToValue(numbers)[value]
    }${this.hexAttributes.substr(12)}`;
  };
  setSkin = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(
      0,
      12
    )}${value}${this.hexAttributes.substr(13)}`;
  };
  setHair = (value) => {
    this.hexAttributes = `${this.hexAttributes.substr(0, 13)}${
      keyToValue(hairs)[value]
    }`;
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
      jump: parseInt(jump) + 1,
      dribling: parseInt(dribling) + 1,
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
      /**
       * 1-13
       */
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
