const Liqd = require('../lib/liqd');

Liqd.init();

console.log('   janko    hrasko   '.collapseWhitespace().capitalize());

const server = new Liqd.Server();

server.use( '/', ( req, res, next ) =>
{
	res.end('Ola');
});

server.listen(8085);
