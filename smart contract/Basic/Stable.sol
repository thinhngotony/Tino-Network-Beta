pragma solidity >=0.4.0 <0.9.0;

import "https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/access/Ownable.sol";

contract Job is Ownable{

    //Delete renounceOwnership default function - reject Ownership function

    function renounceOwnership() public override onlyOwner{
        revert("I don't want this!");
    }

    //End function

    mapping (address => JobStatus) public statusView;

    enum JobStatus {Free, Working, Applying}

    JobStatus private status;

    event LogNewAlert(address _from, string description, address _to);

    constructor() public {
        status = JobStatus.Free;
    }

    function Applying (address _to) public {
        status = JobStatus.Applying;
        emit LogNewAlert(msg.sender, "Applying for ", _to);
    }

    
    function Working (address _to) public {
        status = JobStatus.Working;
        emit LogNewAlert(msg.sender, "Working ", _to);
    }
    
    function Free(address _to) public {
        status = JobStatus.Free;
        emit LogNewAlert(msg.sender, "Lefting ", _to);
    }


    function getStatus(JobStatus _JobStatus) internal pure returns (string memory){
        if(JobStatus.Free == _JobStatus) return "Free";
        if(JobStatus.Applying == _JobStatus) return "Applying";
        if(JobStatus.Working == _JobStatus) return "Working";
        
    }


    function Status() public view returns (string memory){
        JobStatus _JobStatus = status;
        return getStatus(_JobStatus);
    }

}




    