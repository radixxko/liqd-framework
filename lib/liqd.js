'use strict';

require('liqd-string')('');

module.exports = class Liqd
{
	static init( options )
	{
		
	}

	static get SQL()
	{
		return require('liqd-sql');
	}

	static get Flow()
	{
		return require('liqd-flow');
	}

	static get Event()
	{
		return require('liqd-event');
	}

	static get Promise()
	{
		return require('liqd-timed-promise');
	}

	static get UniqueID()
	{
		return require('liqd-unique-id');
	}

	static get Server()
	{
		return require('liqd-server');
	}

	static get Parser()
	{
		return require('liqd-parser');
	}
}
