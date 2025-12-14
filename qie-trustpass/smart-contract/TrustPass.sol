// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract TrustPass {

    struct Identity {
        bool exists;
        uint256 trustScore;
        string didHash;
    }

    mapping(address => Identity) private identities;

    event IdentityRegistered(address indexed user, string didHash);
    event TrustIncreased(address indexed user, uint256 newScore);

    function registerIdentity(string calldata didHash) external {
        require(!identities[msg.sender].exists, "Identity already exists");

        identities[msg.sender] = Identity({
            exists: true,
            trustScore: 1,
            didHash: didHash
        });

        emit IdentityRegistered(msg.sender, didHash);
    }

    function increaseTrust(address user) external {
        require(identities[user].exists, "Identity not found");

        identities[user].trustScore += 1;

        emit TrustIncreased(user, identities[user].trustScore);
    }

    function getTrustScore(address user) external view returns (uint256) {
        require(identities[user].exists, "Identity not found");
        return identities[user].trustScore;
    }

    function verifyIdentity(address user) external view returns (bool) {
        return identities[user].exists;
    }

    function getDID(address user) external view returns (string memory) {
        require(identities[user].exists, "Identity not found");
        return identities[user].didHash;
    }
}
