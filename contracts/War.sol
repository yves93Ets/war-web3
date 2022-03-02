contract War is ReentrancyGuard {
    address public manager;
    mapping(address => Gaming) public gamesList;
    uint public activeGames = 0;
    uint public totalOfPlayers = 0;
    uint public amount = 2 ether; 

    enum GameState {NotPlaying,Playing}

    struct Gaming {
        uint  amount;
        address payable player;
        GameState state;
        bool locked;
    }

    event NewGameEvent(address _sender);
    event GameFinishedEvent(address _sender);
    event CasinoPayedEvent(address _to, uint _amount);
    event CasinoWinsEvent(address _from, uint _amount);
    event RoundEvent(address _from, uint _amount);


    constructor() {
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

    function roundTriggered() public {
        activeGames++;
        emit RoundEvent(msg.sender,amount);
    }

    function amountInCasinoWallet() onlyOwner public view returns(uint){
        return address(this).balance;
    }

    function managerWallet () onlyOwner public view returns (uint) {
        return manager.balance;
    }

    function createNewGame() public {
        if(isUserExist()) {
            gamesList[msg.sender].state = GameState.Playing;
        }
        else {
            Gaming storage newGame = gamesList[msg.sender];
            totalOfPlayers++;
            // newGame.amount = 2 ether;
            newGame.player = payable(msg.sender);
            newGame.state = GameState.Playing;
            newGame.locked = false;
        }
        activeGames++;
        
        emit NewGameEvent(msg.sender);
    }

    function isUserExist() private view returns (bool) {
        if (gamesList[msg.sender].amount == 0) return false;
        return true;
    }

    function finishGame () public {
        Gaming storage newGame = gamesList[msg.sender];
        newGame.state = GameState.NotPlaying;
        activeGames--;
        emit GameFinishedEvent(msg.sender);
    }

    function payToCasinoWallet()   nonReentrant  public payable {
        require(msg.value > amount, string(abi.encodePacked("Insuficient funds" ,msg.value)));
        address payable payee = payable(msg.sender);
        (bool success,  ) = payee.call{value:amount}("");
        require(success, "Failed to transfer the funds, aborting.");
        emit CasinoWinsEvent(msg.sender,amount);
    }

     function payPlayerFromCasinoWallet() nonReentrant   public payable {
        require(address(this).balance > amount, string(abi.encodePacked("Insuficient funds" ,address(this).balance)));
        address payable casinoWallet = payable(address(this));
        (bool success,  ) = casinoWallet.call{value:amount}("");
        require(success, "Failed to Withdraw the funds, aborting.");
        emit CasinoPayedEvent(casinoWallet,amount);
    }
}


