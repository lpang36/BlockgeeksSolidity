var Web3 = require("Web3");
var solc = require("solc");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var acct1 = web3.eth.accounts[0];
var source = `contract helloWorld {
	string public message;
	function helloWorld() {
		message = "hello world";
	}
	function sayHi() constant returns (string) {
		return message;
	}
}
`
var compiled = solc.compile(source);
var data = compiled.contracts.helloWorld.bytecode;
var api = JSON.parse(compiled.contracts.helloWorld.interface);
var contract = web3.eth.contract(api);
var deployed = contract.new({
	from: acct1,
	data: data,
	gas: 10000; //test value
	gasPrice: 1; //test value 
},(error,contract)=>{})
deployed.sayHi(); //test