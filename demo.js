var fs = require("fs");

//  constantes
const TEAMS_LENGTH = 36;
const offsetIndexs = {
  name: "",
  players: {
    name: { start: 230286, end: 230446 }, // bloque de nombres
    hair: { start: 328198, end: 328199 }, // bloque de dato de 1 valor para cabello
    attributes: { start: 328197, end: 328337 }, // + 7 * 20 (140) // bloque de atributos Nº, Speed, etc
    position: { start: 328196, end: 328196 }, // + 7 * 20 (140) // bloque de posición del jugador
  },
};

//  player dictionaries
const numbers = {
  "00": "1",
  "01": "2",
  "02": "3",
  "03": "4",
  "04": "5",
  "05": "6",
  "06": "7",
  "07": "8",
  "08": "9",
  "09": "10",
  "0A": "11",
  "0B": "12",
  "0C": "13",
  "0D": "14",
  "0E": "15",
  "0F": "16",
  "10": "17",
  "11": "18",
  "12": "19",
  "13": "20",
};
const speeds = {
  "90": "1",
  "91": "2",
  "92": "3",
  "93": "4",
  "94": "5",
  "95": "6",
  "96": "7",
  "97": "8",
  "98": "9",
  "99": "10",
};
const hairs = {
  "00": "0",
  "01": "1",
  "02": "2",
  "03": "3",
  "04": "4",
  "05": "5",
  "06": "6",
  "07": "7",
  "08": "8",
  "09": "9",
  "0A": "10",
  "0B": "11",
  "0C": "12",
  "0D": "13",
};
const letters = {
  "00": ".",
  "68": "A",
  "69": "B",
  "70": "I",
  "71": "J",
  "72": "K",
  "73": "L",
  "74": "M",
  "75": "N",
  "76": "O",
  "77": "P",
  "78": "Q",
  "79": "R",
  "80": "Y",
  "81": "Z",
  "82": "a",
  "83": "b",
  "84": "c",
  "85": "d",
  "86": "e",
  "87": "f",
  "88": "g",
  "89": "h",
  "90": "o",
  "91": "p",
  "92": "q",
  "93": "r",
  "94": "s",
  "95": "t",
  "96": "u",
  "97": "v",
  "98": "w",
  "99": "x",
  "00": ".",
  "6A": "C",
  "6B": "D",
  "6C": "E",
  "6D": "F",
  "6E": "G",
  "6F": "H",
  "7A": "S",
  "7B": "T",
  "7C": "U",
  "7D": "V",
  "7E": "W",
  "7F": "X",
  "8A": "i",
  "8B": "j",
  "8C": "k",
  "8D": "l",
  "8E": "m",
  "8F": "n",
  "9A": "y",
  "9B": "z",
};

class Rom {
  constructor(romPath) {
    this.romPath = romPath;
    this.rom = fs.readFileSync(this.romPath);
  }
  parseHexToLetter(dictionary, value, length = 1) {
    return this.rom
      .slice(value, length)
      .toString("hex")
      .split(/(?=(?:..)*..$)/)
      .map((group) => {
        return dictionary[group.toString().toUpperCase()];
      })
      .join("");
  }
  getName = (index, length = 8) => {
    return this.parseHexToLetter(letters, index, index + length);
  };
  getNo = (index, length = 1) => {
    return this.parseHexToLetter(numbers, index, index + length);
  };
  getHair = (index, length = 1) => {
    return this.parseHexToLetter(hairs, index, index + length);
  };
  getSpeed = (index, length = 1) => {
    return this.parseHexToLetter(speeds, index, index + length);
  };
  getPosition = (index, length = 1) => {
    return this.rom
      .slice(index, index + length)
      .toString("hex")
      .substr(0, 1);
  };
  load() {
    // cargar teams
    //  TODO:
    const teamName = "";
    //teams
    let teams = new Array(TEAMS_LENGTH).fill("").map((team, index) => {
      let players = [];
      for (
        let name = offsetIndexs.players.name.start + index * 160,
          attrib = offsetIndexs.players.attributes.start + index * 140,
          hair = offsetIndexs.players.hair.start + index * 140,
          position = offsetIndexs.players.position.start + index * 140;
        name < offsetIndexs.players.name.end + index * 160;
        name += 8, attrib += 7, hair += 7, position += 7
      ) {
        players.push({
          name: this.getName(name),
          no: this.getNo(attrib, 1),
          hair: this.getHair(hair, 1),
          position: this.getPosition(position, 1),
        });
      }
      return { name: teamName, players };
    });

    return teams;
  }
}

const rom = new Rom(`${__dirname}/fecic.1.smc`);
const romData = rom.load();

console.log("load", JSON.stringify(romData));
