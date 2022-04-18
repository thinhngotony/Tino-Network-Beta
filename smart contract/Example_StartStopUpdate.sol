pragma solidity >=0.4.0 <0.9.0;


contract Start{

    address owner;

    constructor() public {
        owner = msg.sender;
    }


    function sendMoney() public payable{
        
    }


    function getBalance() public view returns(uint){
        return address(this).balance;
    }


    function withdrawMoneyTo(address payable _withdrawMoneyTo) public {
        require(msg.sender == owner , "You are not legal");
        _withdrawMoneyTo.transfer(address(this).balance);
    }


    
}



