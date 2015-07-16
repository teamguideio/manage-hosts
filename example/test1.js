var bouncyMgr = require("../");
var server = require("./server");

var hostMap = {
	"group2-test1.develop": "127.0.0.1:8671",
	"group2-test2.develop": "127.0.0.1:8672",
	"group2-test3.develop": "127.0.0.1:8673"
};

function exit(code) {
	bouncyMgr.remove(hostMap, function() {
		process.exit();
	});
}

process.on("beforeExit", exit);
process.on('SIGINT', exit);


bouncyMgr.add(hostMap, function(err) {
	if(err) {
		console.log("Please start bouncy-manager");
		return;
	}

  [8671, 8672, 8673].forEach(function(port) {
    server(port);
  });
})
