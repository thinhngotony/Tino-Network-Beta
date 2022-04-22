pragma solidity >=0.4.0 <0.9.0;


contract Init{
    struct StatusNow{
        uint timestamp;
        uint status;
    }

    struct Status{
        uint Free;
        uint Pending;
        uint Left;
    }

    mapping(address => StatusNow) public Applicant;


    function getStatus() public view returns(uint){
    //     return address(this).StatusNow;
    }

    function Apply() public payable{
        // Applicant[msg.sender].StatusNow = msg.Status;

    }

    

}