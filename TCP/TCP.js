//###START### File - TCP.js //###->###
/**
*#############################################################################*
*##                                                                         ##*
*##     ~   {                    TCP.JS                           }   ~     ##*
*##                                                                         ##*
*#############################################################################*
**/
/**
 * Version : 3
 * Revision : 07/01/2023
 * Auteur : Mathaus Leth
 */
//#!Debut!#
//
//--!--
//  ##  LES CONSTANTES  ##  //
//--!--
//  ##  LA DEFINITION  ##   //
(function () {
//--!--
// -> Les Namespaces (MAJUSCULES et ANGLAIS):
//#region
//#endregion
//--!--
// -> Les Fonctions (UpperCamelCase et FRANCAIS):
//#region
//#endregion
//--!--
// -> Les Fonctions 'booléennes' (lowerCamelCase et ANGLAIS):
//#region
//#endregion
//--!--
// -> Les Fonctions 'this' (UpperCamelCase et ANGLAIS):
//#region
//#endregion
//--!--
// -> Les Objets (MAJUSCULES et FRANCAIS):
//#region
SOBRE.TCP.CLIENT = class {
	constructor (distantHost = N, distantPort = -1) {
		this.client = N;
		this.ip = distantHost;
		this.port = distantPort;
		this.Resoudre = function (data) { return (data); };
		this.Interrompre = function (error) { console.error(error); };
		this.Initialiser = function () {
			this.client = N;
			try {
				this.client = SOBRE.TCP.driver.createConnection(this.port, this.ip, () => {});
				this.client.on('error', (error) => { this.Interrompre(error); });
			} catch (error) {
				this.client = N;
				this.Interrompre(error);
			}
		};
		this.Envoyer = function (data) {
			if (typeof data === 'string' || Buffer.isBuffer(data) || data instanceof Uint8Array) {
				this.Initialiser();
				this.client.end(this.Resoudre(data));
				this.client = N;
			}
		};
	}
    static isTcpClient (object) { return (object instanceof SOBRE.TCP.CLIENT); };
};
SOBRE.TCP.DONNEES = class {
	constructor () {
    	this.source = [];
    	this.onChange = () => {};
		this.onInsert = (data) => { return (data); };
		this.set = function (dataSource) {
			this.source = [];
			if (dataSource instanceof Array) {
				dataSource.forEach((data, index) => {
					data = this.onInsert(data);
					if (SOBRE.exists(data)) { this.source.push(data); }
					else { console.warn(`invalid data at index: ${index}`); }
				});
			}
			this.onChange(this.source);
		};
		this.get = function () { return (this.source); };
    	this.insert = function (data) {
			data = this.onInsert(data);
			if (SOBRE.exists(data)) {
				this.source.push(data);
				this.onChange(data);
			} else { console.warn('invalid data'); }
		};
		this.delete = function (index) { this.source.splice(index, 1); };
	}
    static isData (object) { return (object instanceof SOBRE.TCP.DONNEES && object.source instanceof Array); };
};
SOBRE.TCP.SERVEUR = class {
    constructor (localHost = N, localPort = -1) {
		this.donnees = new SOBRE.TCP.DONNEES();
		this.ip = localHost;
		this.port = localPort;
		this.serveur = N;
		this.Interrompre = function (error) { console.error(error); };
		this.Initialiser = function () {
			try {
				const dataset = this.donnees;
				this.serveur = SOBRE.TCP.driver.createServer(
					function (socket) {
						var data = '';
						socket.on('data', (buffer) => { data += buffer; });
						socket.on('end', () => { dataset.insert(data); });
						socket.pipe(socket);
				});
				this.serveur.on('error', (error) => { this.Interrompre(error); });
			} catch (error) { this.Interrompre(error); }
		};
		this.Ecouter = function () {
			if (this.serveur === N) this.Initialiser();
			//todo : control port et ip ? try .. catch ? laisser le serveur crash ?
			this.serveur.listen(this.port, this.ip);
		};
    };
    static isTcpServer (object) { return (object instanceof SOBRE.TCP.SERVEUR); };
};
//#endregion
//--!--
// -> Les Variables (minuscules et FRANCAIS):
//#region
//#endregion
//--!--
// -> Les Variables 'require' (minuscules et ANGLAIS):
//#region
SOBRE.TCP.driver = N;
//#endregion
//--!--
}());
//--!--
//#!Fin!#
//###<-### File - TCP.js //###END###