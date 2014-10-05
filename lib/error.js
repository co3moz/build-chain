module.exports = function() {
	return {
		notFound: "File isn't exists",
		cantRead: "There is some problem on reading build.json",
		invalidJson: "invalid json, please check build.json",
		noDefault: "you called build-chain as default, but there is no default chain in build.json",
		unknownChain: "you called some chain but it isn't defined in build.json",
		
		log: function(x) {
			console.log("build-chain-error ", this[x]);
		},
		
		log2: function() {
			var temp = ["build-chain-error "];
			for(var key in arguments) {
				temp.push(arguments[key]);	
			}
			console.log.apply(console, temp);
		},
		
		catch: function(error, callback) {
			try {
				callback();	
			} catch(err) {
				this.log(error);	
			}
		}
	}
};