// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract IoTMarket is ERC721URIStorage, Ownable, ReentrancyGuard {
    uint256 private _tokenIds;
    mapping(uint256 => uint256) public listings; // tokenId => price

    event IoTDataCreated(uint256 indexed tokenId, string tokenURI);
    event IoTDataListed(uint256 indexed tokenId, uint256 price);
    event IoTDataBought(uint256 indexed tokenId, address indexed buyer, uint256 price);
    event ListingCanceled(uint256 indexed tokenId);

    constructor() ERC721("IoTDataToken", "IOTDT") Ownable() {}

    function createIoTData(string calldata tokenURI) public onlyOwner returns (uint256) {
        _tokenIds++;
        uint256 newItemId = _tokenIds;
        _mint(msg.sender, newItemId);
        _setTokenURI(newItemId, tokenURI);

        emit IoTDataCreated(newItemId, tokenURI);

        return newItemId;
    }

    function listIoTData(uint256 tokenId, uint256 price) public {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");
        require(price > 0, "Price must be greater than zero");

        listings[tokenId] = price;

        emit IoTDataListed(tokenId, price);
    }

    function buyIoTData(uint256 tokenId) public payable nonReentrant {
        uint256 price = listings[tokenId];
        require(price > 0, "This item is not listed for sale");
        require(msg.value >= price, "Insufficient funds to buy this item");

        address seller = ownerOf(tokenId);

        _transfer(seller, msg.sender, tokenId);

        // Transfer funds to the seller
        payable(seller).transfer(msg.value);

        // Remove the listing
        delete listings[tokenId];

        emit IoTDataBought(tokenId, msg.sender, price);
    }

    function cancelListing(uint256 tokenId) public {
        require(ownerOf(tokenId) == msg.sender, "Caller is not the owner");
        require(listings[tokenId] > 0, "This item is not listed for sale");

        delete listings[tokenId];

        emit ListingCanceled(tokenId);
    }
}
