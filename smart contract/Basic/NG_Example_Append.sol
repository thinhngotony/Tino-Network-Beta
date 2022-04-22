pragma solidity >=0.4.0 <0.9.0;


contract Modify{


library Search{
    function indexOf(uint[], storage self, uint value)
        public
        view
        returns(uint)
    {
        for int (uint i = 0; i < self.length; i++)
            if (self[i] == value )
                returns i;
        return uint(-1);
    }
}

contract Append(
    uint[] = data;

    function append(uint value) public{
        data.push(value)
    }


    function replace(uint old_value, uint new_value) public{
        uint index = Search.indexOf(data,old_value);
        if (index = uint(-1))
            data.push(new_value);
        else
            data[index] = new_value;
    }
)

}




    