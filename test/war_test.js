const War = artifacts.require('War');

contract('War Contract', (accounts) => {
  let war;
  const user1 = accounts[1];
  const user2 = accounts[2];
  const owner = accounts[0];
  beforeEach(async function () {
    war = await War.deployed();
    await war.createNewGame({ from: user1 });
    await war.createNewGame({ from: user2 });
  });

  it('Pay player', async () => {
    const prvBalance = await war.amountInCasinoWallet();
    await war.payPlayerFromCasinoWallet({ from: user2 });
    const newBalance = await war.amountInCasinoWallet();
    console.log(111, prvBalance, newBalance);
    expect(prvBalance).toBeGreaterThan(newBalance);
  });

  // it('Pay Casino', async () => {
  //   war.payToCasinoWallet({ from: user1 });
  //   const user = await war.gamesList(user2);
  //   //   const userGame = await war.gamesList(user2);
  //   const a = user.player;
  // });

  // it('manage is the owner', async () => {
  //   const manager = await war.manager();
  //   assert.equal(manager, owner);
  //   await war.createNewGame({ from: user1 });
  //   await war.createNewGame({ from: user2 });
  // });

  // it('should test create new game and finish finishGame, return proper count for total of players and active of games', async () => {
  //   await war.finishGame({ from: user2 });
  //   const players = await war.totalOfPlayers();
  //   const activeGames = await war.activeGames();
  //   const one = 1;
  //   assert.equal(players, 2);
  //   assert.equal(activeGames, one);
  // });

  // it('get the users game and  check playing state', async () => {
  //   const notPlaying = 0;
  //   const playing = 1;

  //   const userPlayingGame = await war.gamesList(user2);
  //   assert.equal(userPlayingGame.state.toString(), playing);

  //   await war.finishGame({ from: user2 });
  //   const userGame = await war.gamesList(user2);
  //   assert.equal(userGame.state.toString(), notPlaying);
  //   assert.equal(userGame.player, user2);
  // });

  // it('user is  exist not callable', async () => {
  //   try {
  //     await war.isUserExist();
  //   } catch (error) {
  //     assert.equal(error.message, 'war.isUserExist is not a function');
  //   }
  // });
});
