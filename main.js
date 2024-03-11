window.addEventListener('load', () => {
    console.log("Tic-Tac-Toe");
    let board_el = document.getElementById("board");
    let form = document.getElementById("tic-tac-toe");
    let input = document.getElementById("board-size");
    let gameZoneEl = document.getElementById("gameZone")


    let player = 'X';
    let board = [];
    let gameOver = false;
    let moveIndex = 1;


    console.log(input)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        let size = input.value;
        console.log(size)
        initializingBoard(size);
        form.style.display = "none";


        function initializingBoard(boardSize) {
            for (let row = 0; row < boardSize; row++) {
                let boardRow = [];
                let container = document.createElement("div");
                container.classList.add("container");
                gameZoneEl.appendChild(container);
                for (let column = 0; column < boardSize; column++) {
                    boardRow.push('_');
                    let cell = document.createElement("span");
                    cell.classList.add('cells');
                    container.appendChild(cell);
                    cell.addEventListener('click', () => {
                        if (board[row][column] == '_') {
                            board[row][column] = player;
                            cell.innerText = player;
                            console.table(board);
                            checkWinner(boardSize, row, column);
                            player = (player == 'X') ? 'O' : 'X';
                            moveIndex++;
                            console.log(player);
                        };
                    })
                }

                board.push(boardRow);
            }
            console.table(board);
        }
        input.value = "";



        function checkWinner(boardSize, positionX, positionY) {
            let rowValues = new Set();
            let columnValues = new Set();
            let diagonal1Values = new Set();
            let diagonal2Values = new Set();
            for (let index = 0; index < boardSize; index++) {
                rowValues.add(board[positionX][index]);
                columnValues.add(board[index][positionY]);
                diagonal1Values.add(board[index][index]);
                diagonal2Values.add(board[index][boardSize - index - 1]);
            }
            console.log("size")
            console.log(rowValues.size);
            if (rowValues.size === 1 && !rowValues.has('_') || columnValues.size === 1 && !columnValues.has('_') || diagonal1Values.size === 1 && !diagonal1Values.has('_') || diagonal2Values.size === 1 && !diagonal2Values.has('_')) {
                let text = document.createElement("h1");
                text.classList.add("success");
                text.innerText = `${player} Wins !!!!`
                board_el.appendChild(text);
                gameOver = true;


            }
            else if (moveIndex == (boardSize * boardSize)) {
                let text = document.createElement("h1");
                text.classList.add("draw");
                text.innerText = "Match Draw!!!"
                board_el.appendChild(text);
                gameOver = true;
            }
            if (gameOver == true) {
                board = [];
                let text = document.createElement("h2");
                text.classList.add("over");
                text.innerText = "Game Over...";
                board_el.appendChild(text);
                gameZoneEl.style.display = "none"
            }

        }
    })
})