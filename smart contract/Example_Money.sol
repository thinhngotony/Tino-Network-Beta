pragma solidity >=0.4.0 <0.9.0;


contract Balance{

uint public balanceReceived;

    function receivedMoney() public payable {
        balanceReceived +=msg.value;
    }


    function getBalance() public view returns(uint){
        return address(this).balance;
    }


    function withdrawMoneyTo(address payable _withdrawMoneyTo) public {
        _withdrawMoneyTo.transfer(this.getBalance());
    }
}



