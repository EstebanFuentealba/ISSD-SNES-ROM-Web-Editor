const fs = require("fs");

const rom = fs.readFileSync(`${__dirname}/../rom/fecic.1.smc`);

class Palette {
  constructor() {
    this.rd = new Array(16).fill(null);
    this.gd = new Array(16).fill(null);
    this.bd = new Array(16).fill(null);
    this.rd[0] = 0;
    this.gd[0] = 0;
    this.bd[0] = 0;

    this.rd[1] = 10;
    this.gd[1] = 10;
    this.bd[1] = 10;

    this.rd[2] = 31;
    this.gd[2] = 0;
    this.bd[2] = 0;

    this.rd[3] = 0;
    this.gd[3] = 31;
    this.bd[3] = 0;

    this.rd[4] = 0;
    this.gd[4] = 0;
    this.bd[4] = 31;

    this.rd[5] = 31;
    this.gd[5] = 31;
    this.bd[5] = 0;

    this.rd[6] = 0;
    this.gd[6] = 31;
    this.bd[6] = 31;

    this.rd[7] = 31;
    this.gd[7] = 0;
    this.bd[7] = 31;

    this.rd[8] = 31;
    this.gd[8] = 31;
    this.bd[8] = 31;

    this.rd[9] = 20;
    this.gd[9] = 20;
    this.bd[9] = 20;

    this.rd[10] = 15;
    this.gd[10] = 0;
    this.bd[10] = 0;

    this.rd[11] = 0;
    this.gd[11] = 15;
    this.bd[11] = 0;

    this.rd[12] = 0;
    this.gd[12] = 0;
    this.bd[12] = 15;

    this.rd[13] = 15;
    this.gd[13] = 15;
    this.bd[13] = 0;

    this.rd[14] = 0;
    this.gd[14] = 15;
    this.bd[14] = 15;

    this.rd[15] = 15;
    this.gd[15] = 0;
    this.bd[15] = 15;
  }
  getColor(number) {
    if (number < 0 || number > 15) {
      throw new Error();
    }
    return [
      Math.round(this.rd[number] * 8),
      Math.round(this.gd[number] * 8),
      Math.round(this.bd[number] * 8),
    ];
  }
}

let binString = "";
let outputBitString = "";
let tileInputArray = new Array(32).fill(0);
let byte1 = 0,
  byte2 = 0,
  byte17 = 0,
  byte18 = 0;
let tileData = new Array(64).fill(0);
let tile = [];
// let squareCounter = 0;
const starTileIndex = 0; //224822;
let first = true;
for (
  let start = 0, end = 1, count32BytesRead = 1;
  start <= rom.length;
  start++, end++
) {
  if (!first) break;
  tileInputArray[count32BytesRead - 1] = rom.slice(
    starTileIndex + start,
    starTileIndex + end
  );
  count32BytesRead++;
  if (count32BytesRead === 33) {
    for (let k = 0; k <= 7; k++) {
      byte1 = tileInputArray[k * 2];
      byte2 = tileInputArray[k * 2 + 1];
      byte17 = tileInputArray[k * 2 + 16];
      byte18 = tileInputArray[k * 2 + 17];
      for (let l = 0; l <= 7; l++) {
        binString = "";

        if ((new Uint8Array(byte18) & (1 << l)) != 0) {
          binString = binString + "1";
        } else {
          binString = binString + "0";
        }
        if ((new Uint8Array(byte17) & (1 << l)) != 0) {
          binString = binString + "1";
        } else {
          binString = binString + "0";
        }
        // console.log((l & (1 << byte2)) != 0);
        if ((new Uint8Array(byte2) & (1 << l)) != 0) {
          binString = binString + "1";
        } else {
          binString = binString + "0";
        }
        if ((new Uint8Array(byte1) & (1 << l)) != 0) {
          binString = binString + "1";
        } else {
          binString = binString + "0";
        }
        outputBitString = parseInt(binString, 2);
        // console.log(binString);
        tileData[k * 8 + l] = parseInt(outputBitString.toString(10));
      }
    }

    if (tileData.length == 64) {
      let rows = [];
      let counter = 0;
      for (let ix = 0; ix < tileData.length; ix++) {
        rows.push(
          `<div style="background-color: rgb(${new Palette().getColor(
            tileData[ix]
          )})"></div>`
        );
        if (counter == 6) {
          tile.push(`<div class="row">${rows.reverse().join("")}</div>`);
          rows = [];
          counter = -1;
        }
        // console.log(
        //   "[x:" +
        //     (7 - (ix % 8)) +
        //     "] [y: " +
        //     Math.floor(ix / 8) +
        //     "] [color:" +
        //     tileData[ix] +
        //     "]"
        // );
        counter++;
      }
    }
    // console.log(
    //   "tileInputArray",
    //   // tileInputArray,
    //   // byte1,
    //   // byte2,
    //   // byte17,
    //   // byte18,
    //   // binString,
    //   // outputBitString,
    //   tileData,
    //   tile
    // );
    count32BytesRead = 1;
    // squareCounter++;
    // if (squareCounter == 50) first = false;
  }
}

fs.writeFileSync(
  `${__dirname}/../out/tiles.html`,
  `
<html>
<head></head>
<body>
<style>
div {
    display: inline-block;
    height: 4px;
    width:5px;
        }
        .row {
          display: flex;
          flex-direction: row;
          width: 100%;
        }
        .square {
          width: 100%;
        }
</style>
${tile.map((square) => `<div class="square">${square}</div>`).join("")}
</body>

</html>
`
);
