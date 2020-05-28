const Dictionaries = require("./Dictionary");

const getHexFromRom = (rom, start, length) => {
  return rom.slice(start, start + length).toString("hex");
};
const strToHexArray = (value) => {
  return value.split(/(?=(?:..)*..$)/);
};
const parseHexToLetterWithDictionary = (hex, dictionary) => {
  return strToHexArray(hex)
    .map((group) => dictionary[group.toString().toUpperCase()])
    .join("");
};
const keyToValue = (dictionary) =>
  Object.keys(dictionary).reduce((prev, hex) => {
    prev[dictionary[hex]] = hex;
    return prev;
  }, {});

const parseLetterToHexWithDictionary = (dictionary, letter) => {
  return keyToValue(dictionary)[letter];
};

const parseStringToHex = (value) =>
  value
    .split("")
    .map((letter) =>
      parseLetterToHexWithDictionary(Dictionaries.letters, letter)
    )
    .join("");
const parseStringToBuffer = (value) => Buffer.from(value, "hex");

module.exports = {
  getHexFromRom,
  strToHexArray,
  parseHexToLetterWithDictionary,
  parseLetterToHexWithDictionary,
  parseStringToBuffer,
  parseStringToHex,
};
