// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <8.10.0;
import "./Client.sol";

contract Server {

    Job parentContract;

    enum JobStatus {Free, Working, Applying, Quitting}

    struct ID{
        Server.JobStatus _status;
        address _id;
    }
    
    mapping (address => ID) public status;
    address owner;
     

    event LogNewAlert(address _from, string description, address _to);

    constructor() public {
        
        status[owner]._id = msg.sender; 

        status[owner]._status = JobStatus.Free;
        
        owner = msg.sender; // Thiếu cái này sẽ không thay đổi trạng thái khi search thông tin của người ta 
    }

    function Working(address _to) public {
        require (status[owner]._status == JobStatus.Applying, "Please apply first");
        status[owner]._status = JobStatus.Working;
        status[owner]._id = owner;
        // status[owner]._id = msg.sender ;
        emit LogNewAlert(_to, "now working for ", msg.sender);
    }

    function Free(address _to) public {
        require (status[owner]._status == JobStatus.Quitting, "Please request quit first");
        status[owner]._status = JobStatus.Free;
        status[owner]._id = msg.sender;
        emit LogNewAlert(_to, "Lefting ", msg.sender);
    }
}
