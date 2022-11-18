// SPDX-License-Identifier: MIT

// @title gmTree

pragma solidity ^0.8.17;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Pausable.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Base64.sol";
import "./Trigonometry.sol";

contract gmTree is ERC721Pausable, Ownable {
    mapping(address => address[]) public connectionsList;
    mapping(address => uint16) public numberOfConnections;
    mapping(address => uint256) public tokenOf;
    mapping(address => mapping(address => bool)) public isConnected;

    using Counters for Counters.Counter;
    Counters.Counter private _nextTokenId;

    string[] connectionColor;

    function setConnectionsColors(string[5] memory colors) private {
        for (uint8 i = 0; i < colors.length; i++) {
            connectionColor.push(colors[i]);
        }
    }

    constructor() ERC721("gmTree", "GMT") {
        //start tokens at 1
        _nextTokenId.increment();

        setConnectionsColors(
            ["#264653", "#2a9d8f", "#e9c46a", "#f4a261", "#e76f51"]
        );
        _pause();
    }

    function pause() public onlyOwner whenNotPaused {
        _pause();
    }

    function unpause() public onlyOwner whenNotPaused {
        _unpause();
    }

    // function createTree(address _new) onlyOwner public {
    //     //TODO
    // }
    function makeConnection(address _connection) public {
        require(!isConnected[msg.sender][_connection], "Already connected");
        require(!isConnected[_connection][msg.sender], "Already connected");
        uint256 senderToken = getTokenOf(msg.sender);
        require(_exists(senderToken), "Sender doesn't have a tree");
        uint256 recipientToken = getTokenOf(_connection);
        require(_exists(recipientToken), "Recipient doesn't have a tree");

        isConnected[msg.sender][_connection] = true;
        isConnected[_connection][msg.sender] = true;
        connectionsList[msg.sender].push(_connection);
        connectionsList[_connection].push(msg.sender);
        numberOfConnections[msg.sender] += 1;
        numberOfConnections[_connection] += 1;
    }

    function totalSupply() public view returns (uint256) {
        return _nextTokenId.current() - 1;
    }

    function getTree() public {
        _unpause();
        require(tokenOf[msg.sender] == 0, "Already has a tree");
        uint256 tokenId = _nextTokenId.current();
        tokenOf[msg.sender] = tokenId;
        _safeMint(msg.sender, tokenId);
        _nextTokenId.increment();
        _pause();
    }

    function getTokenOf(address adr) public view returns (uint256) {
        return tokenOf[adr];
    }

    function getNumberOfConnections(address _adr) public view returns (uint16) {
        return numberOfConnections[_adr];
    }

    function getConnections(address _adr)
        public
        view
        returns (address[] memory)
    {
        return connectionsList[_adr];
    }

    // Math functions

    function levelOf(uint16 connectionNumber) public pure returns (uint16) {
        if (connectionNumber < 2) {
            return 1;
        }
        if (connectionNumber < 3) {
            return 2;
        }
        if (connectionNumber < 5) {
            return 3;
        }
        if (connectionNumber < 9) {
            return 4;
        }
        if (connectionNumber < 17) {
            return 5;
        }
        if (connectionNumber < 33) {
            return 6;
        }
        if (connectionNumber < 65) {
            return 7;
        }
        if (connectionNumber < 129) {
            return 8;
        }
        if (connectionNumber < 257) {
            return 9;
        }
    }

    function getYCoors(uint16 connectionNumber) public pure returns (uint16) {
        if (connectionNumber <= 1) {
            uint16 yCoor = 20;
            return yCoor;
        }
        uint16 level = levelOf(connectionNumber);
        uint16 kMin = uint16((2**(level - 2)) + 1);
        //scaled up to 1e18 and added 2PI to be within 2PI-4PI recommended range for using the Trig library
        uint256 angle = (((connectionNumber - kMin + 1) * Trigonometry.PI) /
            ((2**(level - 1)) - (2**(level - 2)) + 1)) + 2 * Trigonometry.PI;
        uint256 sineScaledDown = uint256(Trigonometry.sin(angle) / 1e18);
        uint16 yCoor = uint16((level - 1 + sineScaledDown) * 20);
        return yCoor;
    }

    function getXCoors(uint16 connectionNumber) public pure returns (uint16) {
        /* uint16 xCoor;
        if (connectionNumber <= 2) {
            xCoor = 180;
            return xCoor;
        }

        uint16 level = levelOf(connectionNumber);

        uint8 isEven = uint8(connectionNumber % 2);
        if (isEven == 0) {
            xCoor = uint16(180 + 20 * level);
            return xCoor;
        }
        if (isEven == 1) {
            xCoor = uint16(180 - 20 * level);
            return xCoor;
        } */
        uint16[] memory xCoorArr;

        for (uint16 i = 1; i <= connectionNumber; i++) {
            if (i <= 2) {
                xCoorArr[i - 1] = 180;
            } else {
                /* let num = Math.ceil(Math.log2(i) + 1); */
                uint16 lvl = levelOf(i);
                uint16 kMin = uint16((2**(lvl - 2)) + 1);
                /* xCoor[i] = i; */
                uint256 angle = (((i - kMin + 1) * Trigonometry.PI) /
                    ((2**(lvl - 1)) - (2**(lvl - 2)) + 1)) +
                    2 *
                    Trigonometry.PI;
                uint256 cosScaledDown = uint256(Trigonometry.cos(angle) / 1e18);

                xCoorArr[i - 1] = xCoorArr[((i - 1) / 2)] + uint16(20 * cosScaledDown);
            }
            /* xCoor[i] = num + i + kMin */
        }
        /* } */
        return xCoorArr[connectionNumber];
    }

    function getTreeBase(uint16 color)
        private
        view
        returns (string memory treeBase)
    {
        return
            string(
                abi.encodePacked(
                    '<line stroke="silver" x1="180" y1="0" x2="180" y2="120"/>',
                    '<circle fill="',
                    connectionColor[color % 3],
                    '" cx="180" cy="120" r="24"/>'
                )
            );
    }

    function drawBranch(
        uint16 x1,
        uint16 x2,
        uint16 y1,
        uint16 y2,
        uint16 color
    ) private view returns (string memory treeBranch) {
        return
            string(
                abi.encodePacked(
                    '<line stroke="#90ee90" x1="',
                    Strings.toString(x1),
                    '" y1="',
                    Strings.toString(y1),
                    '" x2="',
                    Strings.toString(x2),
                    '" y2="',
                    Strings.toString(y2),
                    '" /> <circle fill="',
                    connectionColor[color % 5],
                    '" cx="',
                    Strings.toString(x2),
                    '" cy="',
                    Strings.toString(y2),
                    '" r="12"/>'
                )
            );
    }

    function getTreeBranches(uint16 color, address[] memory connections)
        private
        view
        returns (bytes memory treeBranches)
    {
        bytes memory treeBranches;
        if (color > 1) {
            for (uint16 i = 0; i < color; i++) {
                uint16 x1 = getXCoors(i);
                uint16 x2 = getXCoors(i + 1);
                uint16 y1 = getYCoors(i);
                uint16 y2 = getYCoors(i + 1);

                uint16 collectionsColor = getNumberOfConnections(
                    connections[i]
                );
                string memory branch = drawBranch(x1, x2, y1, y2, color);

                treeBranches = abi.encodePacked(treeBranches, branch);
            }
            return treeBranches;
        }
    }

    function getTokenIdTreeSVG(uint256 tokenId)
        public
        view
        returns (string memory svg)
    {
        require(_exists(tokenId));
        address _adr = ownerOf(tokenId);
        uint16 color = getNumberOfConnections(_adr);
        address[] memory connections = getConnections(_adr);
        svg = string(
            abi.encodePacked(
                getTreeBase(color),
                getTreeBranches(color, connections)
            )
        );

        return
            string(
                abi.encodePacked(
                    '<svg width="100%" height="100%" viewBox="0 0 360 150" xmlns="http://www.w3.org/2000/svg">',
                    svg,
                    "</svg>"
                )
            );
    }

    function getTokenIdTreeMetadata(uint256 tokenId)
        public
        view
        returns (string memory metadata)
    {
        require(_exists(tokenId));
        address _adr = ownerOf(tokenId);
        uint16 color = getNumberOfConnections(_adr);
        metadata = string(
            abi.encodePacked(
                metadata,
                '{"trait_type":"connection color", "value":"',
                connectionColor[color % 5],
                '"},',
                '{"trait_type":"connections count", "value":"',
                Strings.toString(color),
                '"}'
            )
        );
        return string(abi.encodePacked("[", metadata, "]"));
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override
        returns (string memory)
    {
        return
            string(
                abi.encodePacked(
                    "data:application/json;base64,",
                    Base64.encode(
                        bytes(
                            string(
                                abi.encodePacked(
                                    '{"name": "gmTree #',
                                    Strings.toString(tokenId),
                                    '", "description": "Temporary SoulBound tokens that evolved into collectibles for IRL events based on human interactions", "image": "data:image/svg+xml;base64,',
                                    Base64.encode(
                                        bytes(getTokenIdTreeSVG(tokenId))
                                    ),
                                    '","attributes":',
                                    getTokenIdTreeMetadata(tokenId),
                                    "}"
                                )
                            )
                        )
                    )
                )
            );
    }
}
