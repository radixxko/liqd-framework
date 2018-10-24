'use strict';

class DS
{
	static get Heap(){ return require('liqd-ds-heap'); }
}

module.exports = class Liqd
{
	static init( options )
	{
		require('liqd-string')('');
	}

	static get Cache(){ return require('liqd-cache'); }
	static get Cluster(){ return require('liqd-cluster'); }
	static get DS(){ return DS; }
	static get Event(){ return require('liqd-event'); }
	static get Flow(){ return require('liqd-flow'); }
	static get FS(){ return require('liqd-fs'); }
	static get I18N(){ return require('liqd-internationalization'); }
	static get IPC(){ return require('liqd-ipc'); }
	static get MultiBuffer(){ return requre('liqd-multibuffer'); }
	static get Options(){ return require('liqd-options'); }
	static get Parser(){ return require('liqd-parser'); }
	static get Promise(){ return require('liqd-timed-promise'); }
	static get Server(){ return require('liqd-server'); }
	static get Session(){ return require('liqd-session'); }
	static get SQL(){ return require('liqd-sql'); }
	static get String(){ return require('liqd-string'); }
	static get Style(){ return require('liqd-style'); }
	static get Template(){ return require('liqd-template'); }
	static get TimedPromise(){ return require('liqd-timed-promise'); }
	static get Timer(){ return require('liqd-timer'); }
	static get UniqueID(){ return require('liqd-unique-id'); }
	static get Websocket(){ return require('liqd-websocket'); }
	static get Worker(){ return require('liqd-worker'); }
	static get XMLParser(){ return require('liqd-xml-parser'); }
}
