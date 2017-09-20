var Web3 = require("./node_modules/web3");
var solc = require("solc");
var fs = require("fs");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
var acct1 = web3.eth.accounts[0];
var acct2 = web3.eth.accounts[1];
var acct3 = web3.eth.accounts[2];
var acct4 = web3.eth.accounts[3];
function deploy(fn,cn) {
	var source = fs.readFileSync("/home/lpang/Documents/GitHub/BlockgeeksSolidity/"+fn+".sol").toString();
	var compiled = solc.compile(source);
	var data = compiled.contracts[':'+cn].bytecode;
	var abi = JSON.parse(compiled.contracts[':'+cn].interface);
	var contract = web3.eth.contract(abi);
	var deployed = contract.new({
		from: acct1,
		data: data,
		gas: web3.eth.estimateGas({data:data}), 
		gasPrice: 1 //test value 
	},(error,contract)=>{});
	return deployed;
}
function deploy(fn) {
	return deploy(fn,fn);
}