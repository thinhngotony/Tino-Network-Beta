// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;

contract Job {

    enum JobStatus {Free, Working, Applying, Quitting}

    struct ID{
        Job.JobStatus _status;
        address _id;
    }
    
    mapping (address => ID) public statusView;
    address owner;
    
    JobStatus private status;  

    event LogNewAlert(address _from, string description, address _to);

    constructor() public {
        status = JobStatus.Free;
        owner = msg.sender; // Co van de
        // ID._id = owner;
    }

    function Applying(address _to) public {
        require (statusView[owner]._status == JobStatus.Free, "You are not free");
        status = JobStatus.Applying;
        statusView[owner]._status = status;
        statusView[owner]._id = owner ;
        emit LogNewAlert(msg.sender, "Applying for ", _to);
    }


    function Working(address _to) public {
        require (statusView[owner]._status == JobStatus.Applying, "Please apply first");
        status = JobStatus.Working;
        statusView[owner]._status = status;
        // statusView[owner]._id = msg.sender ;
        emit LogNewAlert(_to, "now working for ", msg.sender);
    }

    
    function Quitting(address _to) public {
        require (statusView[owner]._status == JobStatus.Working, "You're not working now");
        status = JobStatus.Free;
        statusView[owner]._status = status;
        statusView[owner]._id = owner ;
        emit LogNewAlert(msg.sender, "Lefting ", _to);
    }



    function Free(address _to) public {
        require (statusView[owner]._status == JobStatus.Quitting, "Please request quit first");
        status = JobStatus.Free;
        statusView[owner]._status = status;
        emit LogNewAlert(_to, "Lefting ", msg.sender);
    }



    function getStatus(JobStatus _JobStatus) internal pure returns (string memory){
        if(JobStatus.Free == _JobStatus) return "Free";
        if(JobStatus.Applying == _JobStatus) return "Applying";
        if(JobStatus.Working == _JobStatus) return "Working";
        if(JobStatus.Quitting == _JobStatus) return "Quitting";
        
    }


    function Status() public view returns (string memory){
        JobStatus _JobStatus = status;
        return getStatus(_JobStatus);
    }

}
