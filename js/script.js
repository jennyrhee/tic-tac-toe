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
  let _winner = false;
  
  const setChoice = (i, j, symbol) => {
    _board[i][j] = symbol;
  };
  const getChoice = (i, j) => _board[i][j];
  const _checkRow = () => {
    for (let i = 0; i < _board.length; i++) {
      let row = _board[i];
      let symbol = row[0] === '' ? null : row[0];
      let match = row.every(square => symbol === square);
      if (match) _winner = symbol;
    };
  };
  const _checkCol = () => {
    for (let j = 0; j < _board.length; j++) {
      let symbol = _board[0][j] === '' ? null : _board[0][j];
      let matches = 0;
      for (let i = 0; i < _board.length; i++) {
        if (symbol === _board[i][j]) matches++
      };
      if (matches === 3) _winner = symbol;
    };
  };
  const _checkDiagonal = () => {
    const diags = [
      [_board[0][0], _board[1][1], _board[2][2]],
      [_board[0][2], _board[1][1], _board[2][0]]
    ];
    for (let i = 0; i < diags.length; i++) {
      let match = diags[i].every(val =>
        val === (diags[i][0] === '' ? null : diags[i][0])
      );
      if (match) _winner = diags[i][0];
    }
  };
  const _isFull = () => {
    for (let i = 0; i < _board.length; i++) {
      for (let j = 0; j < _board[i].length; j++) {
        if (_board[i][j] === '') return false;
      }
    }
    return true;
  };
  const determineGameOver = () => {
    _checkRow();
    _checkCol();
    _checkDiagonal();
    return _winner || _isFull();
  };
  const getWinner = () => _winner;

  return {
    setChoice,
    getChoice,
    determineGameOver,
    getWinner
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
  const _changeTurn = () => {
    _turn = _turn === _players[0] ? _players[1] : _players[0];
  };
  const _updateBoard = (e, symbol) => {
    const choice = e.target;
    const i = choice.getAttribute('i');
    const j = choice.getAttribute('j');
    if (board.getChoice(i, j) === '') {
      board.setChoice(i, j, symbol);
      choice.textContent = symbol;
      _changeTurn();
    }
  };
  const _initializeBoard = () => {
    const squares = doc.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('click', (e) => {
        _updateBoard(e, _turn.getSymbol());
        if (board.determineGameOver()) {
          console.log(board.getWinner())
        };
      });
    });
  };
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