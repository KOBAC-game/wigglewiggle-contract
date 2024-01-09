// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WiggleFreeClothing is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256[]) private _tokenIdsByOwnerAddress;
    mapping(address => string[]) private _clothingURIsByOwner;

    event TokenMinted(address indexed to, uint256 tokenId);
    event TokenURISet(uint256 tokenId, string indexed clothingURI);

    constructor() ERC721("WiggleFreeClothing", "WGFRCTH") {}


    function safeMint(address _to, string memory _tokenURI) public onlyOwner returns (uint256){
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(_to, tokenId);

    _tokenIdsByOwnerAddress[_to].push(tokenId) ;

    emit TokenMinted(_to, tokenId); // 이벤트 발행

    setTokenURI(tokenId, _tokenURI);
    
    return tokenId;
    }


    function setTokenURI(uint256 _tokenId, string memory _tokenURI) onlyOwner public { //아무나 막 tokenURI를 바꾸면 안되기 때문
        _setTokenURI(_tokenId, _tokenURI);
        emit TokenURISet(_tokenId, _tokenURI);
    }

    // get functions
    function getTokenIdsByOwnerAddress(address _address) public view returns ( uint256[] memory) {
        return _tokenIdsByOwnerAddress[_address];
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory){
        return(tokenURI(tokenId));
    } 

    function getClothingURIsByOwner(address owner) public view returns (string[] memory) {
        return (_clothingURIsByOwner[owner]);
    }


    
}