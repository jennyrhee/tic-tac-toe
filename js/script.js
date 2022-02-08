const Player = (name='Computer', symbol='O') => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return {
    getName,
    getSymbol
  };
}

const gameBoard = ((doc) => {
  let _board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  const _updateBoard = (e) => {
    const choice = e.target;
    const i = choice.getAttribute('i');
    const j = choice.getAttribute('j');
    _board[i][j] = 'x';
    choice.textContent = 'x'
  };
  const _init = (() => {
    const squares = doc.querySelectorAll('.square');
    squares.forEach(square => {
      square.addEventListener('click', _updateBoard)
    });
  })();
  return {
    
  };
})(document);

const displayController = ((doc) => {
  const _createPlayers = (form) => {
    const playerOne = Player(form.elements['player-one'].value, 'X');
    const playerTwo = form.elements['ai'].checked ?
      Player() : 
      Player(form.elements['player-two-name'].value, 'O');
    return [playerOne, playerTwo]
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
  const _init = (() => {
    const form = doc.getElementById('form');
    form.addEventListener('submit', e => {
      e.preventDefault();

      doc.getElementById('pre-game-display').style.display = 'none';
      doc.getElementById('game-display').style.display = 'flex';
      
      const [playerOne, playerTwo] = _createPlayers(form)
      _displayPlayer(playerOne);
      _displayPlayer(playerTwo);
    })
  })();
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
  return {
    togglePlayerTwo
  };
})(document);