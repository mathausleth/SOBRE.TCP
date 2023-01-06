const { SOBRE } = require('../SOBRE.js.js');
SOBRE.TCP.driver = require('net');
var client = new SOBRE.TCP.CLIENT('127.0.0.1', 5000);
client.Envoyer("g"); // ne sera pas ajouté aux données.
client.Envoyer("1"); // sera ajouté aux données.
client.Envoyer(0); // ne sera pas envoyé.
client.Envoyer(null); // ne sera pas envoyé.
client.Envoyer("210"); // sera ajouté aux données.