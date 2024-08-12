// SPDX-License-Identifier: GPL-3.0
pragma solidity >=0.8.2 <0.9.0;

contract Election {
    address host;

    address[] users;
    mapping(address => bool) isUserLogged;

    // when candidates enter their ID to verify
    uint8 userID;
    function setID(uint8 id) external { userID = id; }

    constructor() {
        host = msg.sender;                                          // set the initial deployed person as host
    }

    modifier isHost {
        require(msg.sender == host);
        _;
    }

    function logUser() public {
        if(!isUserLogged[msg.sender]) {
            users.push(msg.sender);
            isUserLogged[msg.sender] = true;
        }
    }

    function getHost() external view returns(address) {
        return host;
    }

    function getUsers() external view returns(address[] memory) {
        return users;
    }
}

contract Candidates is Election {
    struct Candidate {
        address id_hash;
        string name;
        uint8 id;                                                  // IC
        uint8 voteCount;
    } Candidate[] public candidate;

    function setCandidates(address[] memory address_, string[] memory name, uint8[] memory id) external {
        for(uint i=0; i<name.length; i++) {
            candidate[i].id_hash = address_[i];
            candidate[i].name = name[i];
            candidate[i].id = id[i];
            candidate[i].voteCount = 0;
        }
        emit CandidatesUpdated(candidate);                               // save the candidate details inside the transaction log
    }

    event CandidatesUpdated (
        Candidate[]
    );

    modifier isCandidate {
        bool isCandidate_ = false;
        for(uint i=0; i<candidate.length; i++) {
            if(candidate[i].id_hash == msg.sender && candidate[i].id == userID) {
                isCandidate_ = true;
                break;
            }
        }
        require(isCandidate_);
        _;
    }
}

contract Voters is Election {
    struct Voter {
        address id_hash;
        string name;
        uint8 id;                                                  // IC
        uint8 phone;
        string address_;
        int TAC;
    } Voter[] public voter;

    mapping(address => bool) public isVoted;
}