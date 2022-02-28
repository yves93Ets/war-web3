const War = artifacts.require('War');

contract('War Contract', (accounts) => {
  let instance;
  const user1 = accounts[1];
  const user2 = accounts[2];
  const owner = accounts[0];
  beforeEach(async function () {
    instance = await War.deployed();
  });

  it('manage is the owner', async () => {
    const manager = await instance.manager();
    assert.equal(manager, owner);
  });

  it('should test create new game and finish finishGame, return proper count for total of players and active of games', async () => {
    await instance.createNewGame({ from: user1 });
    await instance.createNewGame({ from: user2 });
    await instance.finishGame({ from: user2 });
    const players = await instance.totalOfPlayers();
    const activeGames = await instance.activeGames();
    const one = 1;
    assert.equal(players, 2);
    assert.equal(activeGames, one);
  });

  it('get the users game and  check playing state', async () => {
    const notPlaying = 0;
    const playing = 1;

    await instance.createNewGame({ from: user2 });
    const userPlayingGame = await instance.gamesList(user2);
    assert.equal(userPlayingGame.state.toString(), playing);

    await instance.finishGame({ from: user2 });
    const userGame = await instance.gamesList(user2);
    assert.equal(userGame.state.toString(), notPlaying);
    assert.equal(userGame.player, user2);
  });

  it('user is  exist not callable', async () => {
    try {
      await instance.isUserExist();
    } catch (error) {
      assert.equal(error.message, 'instance.isUserExist is not a function');
    }
  });
});
