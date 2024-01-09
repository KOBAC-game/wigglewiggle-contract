// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract WiggleClothing is ERC721URIStorage, Ownable{
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    struct ClothingInfo {
        string name;
        uint price;
        string URI;
        address creator;
    }

    mapping(string => address) private _creatorOfClothingURI;
    mapping(address => uint256[]) private _tokenIdsByOwnerAddress;
    mapping(address => uint256[]) private _tokenIdsByCreatorAddress;
    mapping(uint256 => ClothingInfo) private _clothingInfoByTokenId;

    

    event TokenMinted(address indexed to, uint256 tokenId);
    event ClothingInfoRegistered(address indexed creator, string indexed clothingURI,string indexed clothingName ,uint256 clothingPrice, uint tokenId);
    
    event TokenURISet(uint256 tokenId, string indexed clothingURI);

    constructor() ERC721("WiggleClothing", "WGGCTH") {}

    function registerClothingInfo(address _creator, string memory _clothingURI, string memory _clothingName ,uint _clothingPrice,uint _tokenId) public payable {
        _creatorOfClothingURI[_clothingURI]= _creator;
        _tokenIdsByCreatorAddress[_creator].push(_tokenId);
        ClothingInfo memory clothingInfo = ClothingInfo(_clothingName, _clothingPrice, _clothingURI, _creator);
        _clothingInfoByTokenId[_tokenId] = clothingInfo;
        emit ClothingInfoRegistered(_creator,_clothingURI, _clothingName, _clothingPrice, _tokenId);
    }


    function safeMint(address _to) public onlyOwner returns (uint256){
    uint256 tokenId = _tokenIdCounter.current();
    _tokenIdCounter.increment();
    _safeMint(_to, tokenId);

    _tokenIdsByOwnerAddress[_to].push(tokenId) ;

    emit TokenMinted(_to, tokenId); // 이벤트 발행
    
    return tokenId;
    }


    function setTokenURI(uint256 _tokenId, string memory _tokenURI) onlyOwner public { //아무나 막 tokenURI를 바꾸면 안되기 때문
        _setTokenURI(_tokenId, _tokenURI);
    }

    // get functions
    function getCreatorOfClothingByURI(string memory clothingURI) public view returns(address){
    return(_creatorOfClothingURI[clothingURI]);
    }

    function getTokenIdsByOwnerAddress(address _address) public view returns ( uint256[] memory) {
        return _tokenIdsByOwnerAddress[_address];
    }

    function getTokenURI(uint256 tokenId) public view returns (string memory){
        return(tokenURI(tokenId));
    } 

    //transfer 관련 함수 추가해야함
    function withdraw(uint amount, address to) onlyOwner() public {
        require(address(this).balance >= amount, "Insufficient funds");

        payable(to).transfer(amount);
    }

// ETH를 받을 수 있도록 receive 함수 구현
    receive() external payable {}

    
}