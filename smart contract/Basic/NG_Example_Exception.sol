pragma solidity >=0.4.0 <0.9.0;


contract Exeption{

    mapping (address => uint64) public balanceReceived;

    function initMoney() public payable{
        assert(balanceReceived[msg.sender] + uint64(msg.value) >= balanceReceived[msg.sender]);
        balanceReceived[msg.sender] += uint64(msg.value);
    }

    function sendMoney(address payable _to, uint64 _amount) public{
        require(_amount <= balanceReceived[msg.sender],"You don't have enough money");
        assert(balanceReceived[msg.sender] > balanceReceived[msg.sender] - _amount);
        {
            balanceReceived[msg.sender] -=  _amount;
            _to.transfer(_amount);
        }
    }
 
}