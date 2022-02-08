const Player = (name, symbol) => {
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

const displayController = (() => {
  return {

  };
})();

// gameBoard.makeDisplay();