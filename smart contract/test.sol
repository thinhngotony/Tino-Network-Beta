pragma solidity >=0.4.0 <0.9.0;


contract Modify{

    enum JobStatus {Free, Working, Applying}

    mapping (address => JobStatus) public statusView;
    
    event ApplyJob (address _from, address _to);

    constructor() public {
        statusView[msg.sender] = JobStatus.Free;
    }

    function sendApplicant(address _to) public returns(bool){
        statusView[msg.sender] = JobStatus.Applying;
        
        emit ApplyJob(msg.sender, _to);

        return true;
    }



}


