const Dictionaries = require("./Dictionary");
const Rom = require("./Rom");

const rom = new Rom({
  romPath: `${__dirname}/../rom/fecic.1.smc`,
});
//  read ROM
const { teams } = rom.read();

//  update player info
teams[0].getPlayers()[0].setName("Coronavi");

//  write ROM
rom.write(`${__dirname}/../out/fecic.1_EDITED.smc`);

console.log("🎉 Saved ROM!");
