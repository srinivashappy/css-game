var mo = mo || {};
mo.utils = {};
(function() {
    this.ax = function(e,t) {
   		$.post("http://localhost/cssgame/cons/lib/commands.php",e,
   		function(da){
	 		t(JSON.parse(da));
		});
	};
	this.pta = function() {
		var e = [];
		for(var i in arguments) { e.push(arguments[i]) }
		return JSON.stringify(e);
	};
}).apply(mo.utils); 