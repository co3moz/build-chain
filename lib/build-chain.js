var fs = require('fs');
var error = require('./error.js')();
var exec = require('child_process').exec;

module.exports = function(location, args) {
	var jsonFile = location + '/build.json';
	
	function ignoreArray(chain) {
		var temp = [];
		for(var key in chain) {
			if(chain[key] instanceof Array) {
				temp = temp.concat(chain[key]);
				continue;
			}
			temp.push(chain[key]);
		}
		return temp;
	}
	
	function execute(chain, at) {
		at || (at = 0);
		
		if(chain.length <= at) {
			return;
		}
		
		exec(chain[at], function (err, stdout, stderr) {
			if (err) {
				console.log("------------------------------------------------------");
				error.log2("'" + chain[at] + "'\n------------------------------------------------------\n", stderr,"\n------------------------------------------------------");
				return;
			}
			
			at++
			execute(chain, at);
		}).stdout.on('data', function(data) {
			process.stdout.write(data); 
		});;
	}
	
	if(fs.existsSync(jsonFile)) {
		var fileContent;
		var jsonContent;
		
		error.catch("cantRead", function() {
			fileContent = String(fs.readFileSync(jsonFile));
			
			error.catch("invalidJson", function() {
				jsonContent = JSON.parse(fileContent);
				
				if(args.length == 0) {
					return error.catch("noDefault", function() {
						if(jsonContent.default == undefined) throw "noDefault";
						execute(ignoreArray(jsonContent.default));
					});
				}
				
				return error.catch("unknownChain", function() {
					var chain = [];
					for(var key in args) {
						if(!jsonContent[args[key]]) throw "unknownChain";
						chain.push(jsonContent[args[key]]);
					}
					execute(ignoreArray(chain));
				});
			});			
		});
	} else {
		error.log("notFound");
	}	
};