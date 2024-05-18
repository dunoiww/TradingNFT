//SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/utils/Context.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import "@openzeppelin/contracts/access/extensions/AccessControlEnumerable.sol";

interface IOpenFire {
    function mint(address to, uint256 fire_type) external returns (uint256);
}

contract OpenFire is
    ERC721Enumerable,
    Ownable(msg.sender),
    AccessControlEnumerable,
    IOpenFire
{
    uint256 private _tokenIdCounter;
    string private _url;
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    event Mint(address indexed to, uint256 indexed tokenId, uint256 fire_type);

    constructor() ERC721("Open Fire", "Fire") {
        _grantRole(DEFAULT_ADMIN_ROLE, _msgSender());
    }

    function _baseURI()
        internal
        view
        override
        returns (string memory _newBaseURI)
    {
        return _url;
    }

    //mint ftt
    function mint(
        address to,
        uint256 fire_type
    ) external override returns (uint256) {
        require(
            owner() == _msgSender() || hasRole(MINTER_ROLE, _msgSender()),
            "Caller is not a minter"
        );
        uint256 token_id = _tokenIdCounter;
        _mint(to, token_id);
        _tokenIdCounter += 1;
        emit Mint(to, fire_type, token_id);
        return token_id;
    }

    function listTokenIds(
        address owner
    ) external view returns (uint256[] memory tokenIds) {
        uint balance = balanceOf(owner);
        uint256[] memory ids = new uint256[](balance);

        for (uint i = 0; i < balance; i++) {
            ids[i] = tokenOfOwnerByIndex(owner, i);
        }
        return (ids);
    }

    function setBaseUrl(string memory _newUrl) public onlyOwner {
        _url = _newUrl;
    }

    function supportsInterface(
        bytes4 interfaceId
    )
        public
        view
        virtual
        override(ERC721Enumerable, AccessControlEnumerable)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
