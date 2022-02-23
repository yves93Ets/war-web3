//SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.11;

contract War {
    address public manager;
    address payable public  casinoWallet;
    mapping(address => Gaming) public gamesList;
    uint public numberOfGames = 0;
    uint public totalOfPlayers = 0;
    uint public amount = 0.005 ether; 

    enum GameState {NotPlaying,Playing}

    struct Gaming {
        uint  amount;
        address payable player;
        GameState state;
    }

    event NewGameEvent(address _sender);
    event GameFinishedEvent(address _sender);
    event CasinoPayedEvent(address _to, uint _amount);
    event CasinoWinsEvent(address _from, uint _amount);
    event RoundEvent(address _from, uint _amount);


    constructor(address payable _casinoWallet) {
        casinoWallet = _casinoWallet; 
        manager = msg.sender;
    }


    modifier isNotOwner(string memory _error) {
        require(msg.sender != manager,_error);
        _;
    }

    modifier onlyOwner() {
        require(msg.sender == manager,"Only owner allowed");
        _;
    }
    
    modifier isAmountOk() {
        require(amount < 0.1 ether);
        _;
    }

    function changeBet(uint _amount) isAmountOk isNotOwner("Owner not allowed to play") public {
        amount = _amount;
    }

    function RoundTriggered() public {
        numberOfGames++;
        emit RoundEvent(msg.sender,amount);
    }

    function getNumberOfActiveGames() onlyOwner public view returns (uint) {
        return numberOfGames;
    }

    function amountInCasinoWallet() onlyOwner public view returns (uint) {
        return casinoWallet.balance;
    }

    function createNewGame() public {
        if(isUserExist()) {
            gamesList[msg.sender].state = GameState.Playing;
           
        }
        else {
            Gaming storage newGame = gamesList[msg.sender];
            totalOfPlayers++;
            newGame.amount = 0.1 ether;
            newGame.player = payable(msg.sender);
            newGame.state = GameState.Playing;
        }
        numberOfGames++;
        
        emit NewGameEvent(msg.sender);
    }

    function isUserExist() private view returns (bool) {
        if (gamesList[msg.sender].amount == 0) return false;
        return true;
    }

    function finishGame () public {
        Gaming storage newGame = gamesList[msg.sender];
        newGame.state = GameState.NotPlaying;
        numberOfGames--;
        emit GameFinishedEvent(msg.sender);
    }

    function payPlayerFromCasinoWallet()  payable public {
        casinoWallet.transfer(amount);
        emit CasinoPayedEvent(msg.sender,amount);
    }

    function payToCasinoWallet()  payable public {
        address payable payee = payable(msg.sender);
        payee.transfer(amount);
        emit CasinoWinsEvent(msg.sender,amount);
    }

    receive() payable external {
        payPlayerFromCasinoWallet();
    }
}