pragma solidity >=0.4.0 <0.9.0;

contract Init{
    uint256 public myUinit;
    
    function AddMoney(uint _uint) public{
        myUinit = _uint;
    }

    bool public TrueOrFalse;

    function Set(bool _setBool) public{
        TrueOrFalse = _setBool;
    }


    address public myAddress;

    function SetAddress(address _SetAddress) public{
        myAddress = _SetAddress;
    }

    function getBalance() public view returns (uint) {
        return myAddress.balance;
    }


    string public myString;

    function setString(string memory _setString) public {
        myString = _setString;
        
    }



    

}