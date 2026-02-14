// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/*
IPRRegistry
Stores ownership proof of digital files using hash + timestamp
*/

contract IPRRegistry {

    uint256 public totalAssets = 0;

    struct Asset {
        uint256 id;
        address owner;
        string fileHash;
        string ipfsCID;
        uint256 timestamp;
    }

    // assetId → asset data
    mapping(uint256 => Asset) public assets;

    // fileHash → already registered?
    mapping(string => bool) private hashRegistered;

    event AssetRegistered(
        uint256 indexed assetId,
        address indexed owner,
        string fileHash,
        string ipfsCID,
        uint256 timestamp
    );

    // Register ownership
    function registerIP(string memory _fileHash, string memory _ipfsCID) public {

        require(!hashRegistered[_fileHash], "File already registered");

        totalAssets++;

        assets[totalAssets] = Asset(
            totalAssets,
            msg.sender,
            _fileHash,
            _ipfsCID,
            block.timestamp
        );

        hashRegistered[_fileHash] = true;

        emit AssetRegistered(totalAssets, msg.sender, _fileHash, _ipfsCID, block.timestamp);
    }

    // Verify ownership using file hash
    function verifyOwnership(string memory _fileHash)
        public
        view
        returns (bool, address, uint256)
    {
        for(uint256 i = 1; i <= totalAssets; i++){
            if(keccak256(bytes(assets[i].fileHash)) == keccak256(bytes(_fileHash))){
                return (true, assets[i].owner, assets[i].timestamp);
            }
        }
        return (false, address(0), 0);
    }
}
