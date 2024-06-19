const GameEnd = {
    Null: 0,
    Tie: 1,
    Win: 2
};

let turn;
let game_end;
let board;
let board_elem;
let cells;

const Restart = _ => {
    turn = 1;
    game_end = GameEnd.Null;
    board = 
        new Array(9)
            .fill(' ');

    board_elem = document.getElementById("board");
    board_elem.innerHTML = "";
    // Getting each cell of grid
    cells =
        new Array(9)
            .fill()
            .map((v, i) => {
                // Initialize row
                if (i % 3 == 0)
                    board_elem.append(document.createElement("tr"));

                // Initialize cell
                const elem = document.createElement("td");
                {
                    if (game_end != GameEnd.Null)
                        return;

                    elem.id = `#td${i}`;
                    elem.onclick = _ => {
                        const turn_piece = turn % 2 == 0 ? 'X' : 'O';

                        // Render move
                        const txt = document.createElement('p')
                        {
                            txt.className = "choice";
                            txt.innerText = board[i] = turn_piece;
                        }
                        elem.appendChild(txt);

                        // Display element
                        elem.onclick = _ => {};
                        turn++;

                        // Check for win
                        if ((() => {
                            { // Check current row
                                const row_start = 3 * Math.floor(i / 3);
                                const row_end = row_start + 3;

                                let j = row_start;
                                for (;j < row_end && board[j] == turn_piece; j++);
                                if (j >= row_end) return true;
                            }

                            { // Check current column
                                const col_start = i % 3;
                                const col_end = col_start + 6

                                let j = col_start;
                                for (;j <= col_end && board[j] == turn_piece; j += 3);
                                if (j > col_end) return true;
                            }

                            if (i % 4 == 0) { // Check top left to bottom right diagnol
                                let j = 0;
                                for (; j < 9 && board[j] == turn_piece; j += 4);
                                if (j >= 9) return true;
                            }

                            if ((i - 2) % 2 == 0) { // Check top right to bottom left diagnol
                                let j = 2;
                                for (; j < 7 && board[j] == turn_piece; j += 2);
                                if (j >= 7) return true;
                            }

                            return false;
                        })()) {
                            game_end = GameEnd.Win;
                            alert(`${turn_piece} won!`);
                        }

                        // Check for tie
                        if (turn > 9) {
                            game_end = GameEnd.Tie;
                            alert("You've tied!");
                            return;
                        }
                    }
                }
                board_elem.lastElementChild.appendChild(elem);
            });
}
Restart();