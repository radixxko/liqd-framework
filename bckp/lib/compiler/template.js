'use strict';

const fs = require('fs');

const Parser = require('liqd-parser');
const TemplateParser = new Parser( fs.readFileSync( __dirname + '/syntax/template.syntax', 'utf8') );

function escape( string )
{
	return string.replace(/\//g,'//').replace(/\n/g,'\\n').replace(/\t/g,'\\t').replace(/\r/g,'\\r').replace(/"/g,'\\"');
}

const TemplateCompiler = module.exports = class TemplateCompiler
{
	static compile( parsed_code, compiled = null )
	{
		if( !compiled )
		{
			if( typeof parsed_code === 'string' )
			{
				parsed_code = TemplateParser.parse( parsed_code );

				//console.log( JSON.stringify( parsed_code, null, '  ' ) );
			}

			compiled =
			{
				code: '',
				requirements: {}
			};
		}

		if( parsed_code.block )
		{
			for( let command of parsed_code.block )
			{
				TemplateCompiler.compile( command, compiled );
			}
		}
		else if( parsed_code.markup )
		{
			compiled.code += 'request.response += "<!' + parsed_code.markup.content + '>"; \n';
		}
		else if( parsed_code.style )
		{
			let style = parsed_code.style;

			compiled.code += 'request.response += "<style"; \n';

			for( let attribute of style.attributes )
			{
				compiled.code += 'request.response += " ' + attribute.attribute + '=\\\"' + attribute.value + '\\\""; \n';
			}

			compiled.code += 'request.response += ">"; \n';

			//console.log(style.css);

			if( style.css )
			{
				compiled.code += 'request.response += "' + escape( style.css ) + '"; \n';
			}

			compiled.code += 'request.response += "</style>"; \n';
		}
		else if( parsed_code.tag )
		{
			let tag = parsed_code.tag;

			compiled.code += 'request.response += "<' + tag.name + '"; \n';

			for( let attribute of tag.attributes )
			{
				compiled.code += 'request.response += " ' + attribute.attribute + '=\\\"' + attribute.value + '\\\""; \n';
			}

			if( tag.block )
			{
				compiled.code += 'request.response += ">"; \n';

				for( let command of tag.block )
				{
					this.compile( command, compiled );
				}

				compiled.code += 'request.response += "</' + tag.name +  '>"; \n';
			}
			else{ compiled.code += 'request.response += " />"; \n'; }
		}
		else if( parsed_code.template )
		{
			compiled.code += 'Template.render( "' + parsed_code.template.name + '", request, scope ); \n';
		}
		else if( parsed_code.for )
		{
			let block = { block: parsed_code.for.block };

			compiled.code += 'for( let ' + parsed_code.for.iterator + ' of this.' + parsed_code.for.list + ' ){ \n';

			this.compile( block, compiled );

			compiled.code += ' } \n';
		}
		else if( parsed_code.definition )
		{
			compiled.code += 'request.response += "' + parsed_code.definition + '"; \n';
		}
		else if( parsed_code.model )
		{
			console.log('modelo');

			return Model[parsed_code.model.model][parsed_code.model.method]();
		}

		return compiled;
	}
}
