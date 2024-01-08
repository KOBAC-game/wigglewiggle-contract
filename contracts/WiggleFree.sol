// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WiggleFree is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    mapping(address => uint256) private _tokenIdByAddress;
    
    address[] private _userList;
    string private _customBaseURI;

    event TokenMinted(address indexed to, uint256 tokenId);

constructor(string memory customBaseURI_) ERC721("WiggleFree", "WGGFR") {
        _customBaseURI = customBaseURI_;
    }

    function safeMint(address _to) public onlyOwner returns (uint256){
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(_to, tokenId);

        _userList.push(_to);
        _tokenIdByAddress[_to] = tokenId;

        emit TokenMinted(_to, tokenId); // 이벤트 발행
        
        return tokenId;
    }


    function setBaseURI (string memory customBaseURI_) public onlyOwner(){
         _customBaseURI = customBaseURI_;
    }

    function _baseURI() internal override view virtual returns (string memory) {
        return _customBaseURI;
    }

    function getUserList() public view onlyOwner returns (address[] memory) {
        return _userList;
    }

    function getTokenIdByAddress(address _address) public view returns (uint256) {
        return _tokenIdByAddress[_address];
    }

    function getBaseURI() public view onlyOwner returns (string memory){
    string memory __baseURI = _baseURI();
    return(__baseURI);
    }   

    
    //deactivate functions
    function safeTransferFrom(address from, address to, uint256 tokenId, bytes memory data) public override(IERC721, ERC721) view onlyOwner{
    }

    function transferFrom(address from, address to, uint256 tokenId) public override(IERC721,ERC721) view onlyOwner{
    }

    function renounceOwnership() public override(Ownable) view onlyOwner {
    }

}