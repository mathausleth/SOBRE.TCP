const { SOBRE } = require('../SOBRE.js.js');
SOBRE.TCP.driver = require('net');
var serveur = new SOBRE.TCP.SERVEUR('127.0.0.1', 5000);
serveur.donnees.onInsert = (data) => {
	if (Number.isInteger(Number.parseInt(data))) return (data); // exemple bete de control : on insert que si c'est un nombre.
};
serveur.donnees.onChange = (data) => console.log(`${data} a été inséré dans ${serveur.donnees.get()}.`);
serveur.Ecouter();