'use strict'

const Module = require('module');
const path = require('path');
const fs = require('fs');

const Templates = new Map();
const TemplateCompiler = require('./compiler/template.js');

function createModule( filename, source )
{
	let new_module = new Module( filename, module.parent );

	new_module.filename = filename;
	new_module.paths = Module._nodeModulePaths( path.dirname( filename ) );
	new_module._compile( source, filename );

	let module_index = ( module.parent && module.parent.children ? module.parent.children.indexOf(new_module) : -1 );
	if( module_index > -1 )
	{
		module.parent.children.splice( module_index, 1 );
	}

	return new_module.exports;
}

function compile( file )
{
	let code = fs.readFileSync( file, 'utf8' );
	let compiled = TemplateCompiler.compile( code );

	return createModule( file, 'module.exports = function( Template ){ return { render: function( request, scope ){ ' + compiled.code + ' } } }' )( Template );
}

const Template = module.exports = class Template
{
	static render( template, request, scope )
	{
		let instance = Templates.get( template );

		if( !instance )
		{
			Templates.set( template, instance = compile( '/Users/tomaskorenko/Projects/Github/liqd-framework/test/templates/'+template+'.template' ) );
		}

		instance.render.call( scope, request, scope );
	}
}
