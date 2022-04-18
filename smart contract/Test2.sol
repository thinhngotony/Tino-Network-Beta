pragma solidity >=0.4.0 <0.9.0;


contract Modify{


    // Mapping chỉ hiện uint chưa hiện string!
    mapping (address => JobStatus) public statusView;

    address owner;

    enum JobStatus {Free, Working, Applying}

    JobStatus private status;

    event LogNewAlert(string description);

    constructor() public {
        status = JobStatus.Free;
    }


    function Applying (address _to) public {
        status = JobStatus.Applying;
        emit LogNewAlert("Applying for ");
    }

    
    function Working (address _to) public {
        status = JobStatus.Working;
        emit LogNewAlert("Working for ");
    }
    
    function Free() public {
        status = JobStatus.Free;
        emit LogNewAlert("Left or no working for any company");
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




    