pragma solidity >=0.4.0 < 0.9.0;


contract Mapping{

    mapping(uint => bool) public MyMapping;
    mapping(address => bool) public MyAddress;


    function setValueLegit(uint _set) public{
        MyMapping[_set] = true;
    }

    function setMyAddressLegit() public {
        MyAddress[msg.sender] = true;
    }
}