pragma solidity 4.0.11;

contract CrowdFund {
	address public to;
	uint public goal;
	uint public deadline;
	mapping(address=>uint) funder;
	address[] allFunders;
	function CrowdFund(address _to, uint _goal, uint _deadline) {
		to = _to;
		goal = _goal;
		deadline = now+_deadline;
	}
	event Contribution(uint _amount, uint _left);
	function currentFunding() constant returns (uint) {
		return this.balance;
	}
	function totalFunders() constant returns (uint) {
		return allFunders.length;
	}
	function contribute() payable returns (bool) {
		if (funder[msg.sender]==0) {
			allFunders.push(msg.sender);
		}
		funders[msg.sender]+=msg.value;
		Contribution(msg.value,goal-this.balance);
	}
	function payout() {
		if (now>deadline&&this.balance>=goal) {
			to.transfer(this.balance);
		}
	}
	function refund() {
		if (now>deadline&&this.balance<goal) {
			msg.sender.transfer(funders[msg.sender]);
			funders[msg.sender] = 0;
		}
	}
	function disable() {
		if (this.balance!=0) throw;
		selfdestruct(to);
	}
}