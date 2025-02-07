const meta = require("../movie/main")
/**
 * { function_description }
 *
 * @param      {<type>}   req     The request
 * @param      {<type>}   res     The resource
 * @param      {<type>}   url     The url
 * @return     {boolean}  { description_of_the_return_value }
 */
module.exports = function(req, res, url){
	if (req.method != 'GET') return;
	const query = url.query;
	switch(url.pathname){
		case "/embed":{
			res.setHeader('Content-Type', 'text/html; charset=UTF-8');
			if(!query.movieId){
				res.end(`<body><h3>ostrich seats with the frog eyes</h3></body>`)
				return;
			}
			var actualid = ""
			var fixedid = query.movieId
			if(query.movieId.startsWith("m-")){
				actualid = query.movieId.substring(2);
			}
			else{
				fixedid = "m-"+query.movieId
				actualid = query.movieId
			}
			meta.meta(fixedid).then(function(penis){
				res.end(`<!DOCTYPE html>
<html>
	<head>
		<title>${penis.title}</title>
		<style type="text/css">
			html{
				font-family: Helvetica, Arial, sans-serif;
				height: 100%;
				overflow: hidden;
			}
			body{
				margin: 0;
				height: 100%;
				display: flex;
				align-items: center;
				justify-content: center;
				text-align: center;
			}
			#title{

			}
			#id{

			}
		</style>
	</head>
	<body>
		<main>
			<h3>Movie ${actualid}</h3><h2 id="title">${penis.title}</h3><p>${penis.description?penis.description:""}</p><iframe id="player" scrolling="no" allowTransparency="true" frameborder="0" src="/player?movieId=${fixedid}" width="640" height="360"></iframe>
		</main>
	</body>
</html>`)
			});
			return true;
		}
		case "/list":{
			res.setHeader('Content-Type', 'text/html; charset=UTF-8');
			res.writeHead(302, {"Location":"/pages/html/list.html"});
			return true;
		}
		default:
			return;
	}
}