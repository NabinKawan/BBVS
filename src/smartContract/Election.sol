//SPDX-License-Identifier: UNLICENSED
pragma solidity >=0.4.22 <0.9.0;

    contract Election{
        uint _start;
        uint _end;

        address account;
        Candidate[] public candidates;

    function getAccounts() public view returns(address){
    return account;
 }

    uint public totalVotes;

        function start() public{
            require(candidates.length!=0);
            _start = block.timestamp;
        
        }

        function end(uint totalTime) public{
            _end = totalTime + _start;
             
        }

        function getLeftTime() public view returns(uint){
            return _end - block.timestamp;
        }


    struct Candidate{

            string firstname;
            string midname;
            string lastname;
            uint id;
            uint votecount;
            string post;

 

    }
    struct Voter{
        bool authorized; //if the voter is eligibel
        bool voted;//to check if voter has already voted?
        uint vote; // this is to specify the voter to whom he/she votes according to the number.i.e candadidate ram has number 1 so voter votes 1 for ram candidate
    }
    address payable public owner;//this is owner user account i.e bacisally a wallet address
    string public electionName;// election name for which election is done ;say CR of this class or Prime Minister of a country

    mapping(address => Voter) public voters; //basically a key value pair where address is key. to keep track of voters

    modifier ownerOnly(){
        require(msg.sender==owner); //checks if the persion accessing the function is owner or not
        _; 
    }

    constructor(string memory _name){
        owner = payable(msg.sender); //address of user account that deploys the contract
        electionName =_name;
    }


    //owner can add the candidates ,for this we will use modifier
    function addCandidate(string memory _fname,string memory _midname,string memory _lname,uint _id,string memory _post) ownerOnly public{
        candidates.push(Candidate(_fname,_midname,_lname,_id,0,_post));  
    }

    function getCandidatesNum() public view returns(uint){
        return candidates.length;
    } 

    function authorize(address _person) ownerOnly public{
        voters[_person].authorized=true;
    }


    function vote(uint _candidateId)public{
        if(_end>0){
        require(!voters[msg.sender].voted);//checking if the voter already voted or not
        require(voters[msg.sender].authorized);// checking if the voter is authorized

        voters[msg.sender].vote = _candidateId; //checking whom did the voter vote
        voters[msg.sender].voted = true;
        for(uint i=0; i<2; i++){
        if(candidates[i].id==_candidateId){
        candidates[i].votecount += 1; //increase the voter count of voted candidate
                totalVotes +=1;//increase total vote count
        }
        }
        
        
        }
    }

// function end() ownerOnly public{
//     selfdestruct(owner);
// }




}