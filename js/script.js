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
    ['x', 'o', 'x'],
    ['x', 'x', 'o'],
    ['o', 'o', 'x']
  ];
  const display = () => {
    const rows = doc.querySelectorAll('.row');
    rows.forEach((row, i) => {
      _board[i].forEach(choice => {
        let square = doc.createElement('div');
        square.classList.add('square');
        square.textContent = choice;
        row.appendChild(square);
      });
    });
  };
  return {
    display
  };
})(document);

const displayController = (() => {
  return {

  };
})();

gameBoard.display();