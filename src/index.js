const { spawn } = require("child_process");
const Dictionaries = require("./Dictionary");
const Rom = require("./Rom");
const rom = new Rom({
  romPath: `${__dirname}/../rom/fecic.1.smc`,
});
// //  read ROM
const { teams, texts } = rom.read();

//  update player info
//  Edit goalkeeper name of Cruzeiro
console.log("before", {
  name: teams[0].getPlayers()[0].getName(),
  attributes: teams[0].getPlayers()[0].getAttributes(),
  texts: texts.toJSON(),
});
//  update name of first player
teams[0].getPlayers()[0].setName("Coronavi");
//  update attributes of first player
teams[0].getPlayers()[0].setAcceleration(1);
teams[0].getPlayers()[0].setSpeed(2);
teams[0].getPlayers()[0].setShotpower(3);
teams[0].getPlayers()[0].setCurlskill(4);
teams[0].getPlayers()[0].setBalance(5);
teams[0].getPlayers()[0].setIntelligence(6);
teams[0].getPlayers()[0].setJump(7);
teams[0].getPlayers()[0].setDribling(8);
teams[0].getPlayers()[0].setPosition(1);
teams[0].getPlayers()[0].setEnergy(9);
teams[0].getPlayers()[0].setNo(1);
teams[0].getPlayers()[0].setSkin(0);
teams[0].getPlayers()[0].setHair(0);

texts.setFriendlymatch("AMISTOSO");
texts.setFriendlymatchDescription("Solo amistoso");
texts.setShortLeague("LIGA CORTA");
texts.setShortLeagueDescription("Liga de seis     equipos");
texts.setShortTournament("TORNEO CORTO");
texts.setShortTournamentDescription("Torneo de ocho   equipos");
texts.setPress("Apreta");

console.log("after", {
  name: teams[0].getPlayers()[0].getName(),
  attributes: teams[0].getPlayers()[0].getAttributes(),
  texts: texts.toJSON(),
});
//  write ROM
rom.write(`${__dirname}/../out/fecic.1_EDITED.smc`);

console.log("🎉 Saved ROM!");

spawn("open", ["-a", "OpenEmu", "./out/fecic.1_EDITED.smc"]);
