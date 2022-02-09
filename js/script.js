const Player = (name='Computer', symbol='O') => {
  const getName = () => name;
  const getSymbol = () => symbol;

  return {
    getName,
    getSymbol
  };
}

const board = (() => {
  let _board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  
  const setChoice = (i, j, symbol) => {
    _board[i][j] = symbol;
  }

  return {
    setChoice
  };
})();

const game = ((doc) => {
  let _players = [];
  let _turn = null;

  const togglePlayerTwo = () => {
    const optionalInput = doc.getElementById('player-two-optional');
    const name = doc.getElementById('player-two-name');
    if (doc.getElementById('player').checked) {
      optionalInput.style.display = 'block';
      name.required = true;
    } else {
      optionalInput.style.display = 'none';
      name.required = false;
    }
  };
  const _addDiv = (card, fn) => {
    let div = doc.createElement('div');
    div.textContent = fn();
    card.appendChild(div);
  };
  const _displayPlayer = (player) => {
    const container = doc.querySelector('.player-container');
    const card = doc.createElement('div');
    card.classList.add('player-card');
    _addDiv(card, player.getName);
    _addDiv(card, player.getSymbol);
    container.appendChild(card);
  };
  const _createPlayers = (form) => {
    _players.push(Player(form.elements['player-one'].value, 'X'));
    _turn = _players[0];
    _players.push(form.elements['ai'].checked ?
      Player() : 
      Player(form.elements['player-two-name'].value, 'O')
    );
    _players.forEach(player => _displayPlayer(player));
  };
  const _updateBoard = (e, symbol) => {
    const choice = e.target;
    const i = choice.getAttribute('i');
    const j = choice.getAttribute('j');
    board.setChoice(i, j, symbol);
    choice.textContent = symbol;
  };
  const _changeTurn = () => {
    _turn = _turn === _players[0] ? _players[1] : _players[0];
  };
  const _initializeBoard = () => {
    const squares = doc.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('click', (e) => {
        _updateBoard(e, _turn.getSymbol())
        _changeTurn();
      });
    });
  }
  (() => {
    const form = doc.getElementById('form');
    form.addEventListener('submit', e => {
      e.preventDefault();

      doc.getElementById('pre-game-display').style.display = 'none';
      doc.getElementById('game-display').style.display = 'flex';
      
      _createPlayers(form);
      _initializeBoard();
    })
  })();

  return {
    togglePlayerTwo
  };
})(document);