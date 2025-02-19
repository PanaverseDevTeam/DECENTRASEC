// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

contract ResearchPaperRegistry {
    struct Paper {
        string title;
        address author;  // Store as `address` instead of `string`
        string hash;     // IPFS Hash
        bool verified;
    }

    mapping(address => Paper[]) public userPapers;
    event PaperUploaded(address indexed user, string title, string hash);

    function uploadPaper(string memory _title, string memory _hash) public {
        userPapers[msg.sender].push(Paper(_title, msg.sender, _hash, false));
        emit PaperUploaded(msg.sender, _title, _hash);
    }

    function verifyPaper(address _user, uint256 _index) public {
        require(_index < userPapers[_user].length, "Invalid paper index");
        userPapers[_user][_index].verified = true;
    }

    function getPapers(address _user) public view returns (Paper[] memory) {
        return userPapers[_user];
    }
}
