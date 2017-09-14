contract helloWorld {
	string public message;
	function helloWorld() {
		message = "hello world";
	}
	function sayHi() constant returns (string) {
		return message;
	}
}