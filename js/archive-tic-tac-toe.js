
function capitalize(string)
{
    return string[0].toUpperCase();
}
// Get the modal
var winning_message = document.getElementById("winning_popup");
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
};
var dimensions = prompt('What should the dimensions be? (X by X)');
var dimensions = parseInt(dimensions);
var win_con = prompt('How many in a row to win?');

var players = prompt('How many players?');



var EMPTY = '&nbsp;',
    boxes = [],
    turn;
    // score,
    var moves;

// circularly linked list
//module.exports = LinkedList;
LinkedList.Node = Node;

function Node(data) {
    this.prev = null;
    this.next = null;
    this.data = data;
}

function LinkedList() {
    this.length = 0;
    this.first = null;
    this.last = null;
}

LinkedList.prototype.append = function(node) {
    if (this.first === null) {
        this.first = node.prev = node;
        this.last = node.next = node;
    } else {
        node.prev = this.last;
        node.next = this.first;
        this.first.prev = node;
        this.last.next = node;
        this.last = node;
    }

    this.length += 1;
};

LinkedList.prototype.insert = function(node, inserted) {
    inserted.prev = node;
    inserted.next = node.next;
    node.next.prev = inserted;
    node.next = inserted;
    if (inserted.prev === this.last) this.last = inserted;

    this.length += 1;
};

LinkedList.prototype.remove = function(node) {
    if (this.length > 1) {
        node.prev.next = node.next;
        node.next.prev = node.prev;
        if (node === this.first) this.first = node.next;
        if (node === this.last) this.last = node.prev;
    } else
    if (this.first === node) {
        this.first = null;
        this.last = null;
    }
    node.prev = null;
    node.next = null;

    this.length -= 1;
};

LinkedList.prototype.each = function(cb) {
    var p = this.first;
    var n = this.length;

    while (n--) {
        cb(p.data);
        p = p.next;
    }
};

var player_list = new LinkedList();
for (var i = 0; i < players; i++) {
    var a_player = prompt('Name of player ' + (i + 1) + '?');
    var node = new LinkedList.Node(new Player(a_player));
    player_list.append(node);
}
var current_player = player_list.first;

// i made cell the object
function Cell(row, column) {
    this.row = row;
    this.column = column;
    this.symbol = 'EMPTY';
    this.player = new Player('dfsaojlkfdsajldsfajkcdklmewqewqdfa')

}
Cell.prototype.getRow = function () {
    return this.row;
};
Cell.prototype.getColumn = function () {
    return this.column;
};
Cell.prototype.setCross = function () {
    this.symbol = 'X';
};
Cell.prototype.setNought = function () {
    this.symbol = 'O';
};
Cell.prototype.setSymbol = function (symbol) {
    this.symbol = symbol;
};
Cell.prototype.setEmpty = function () {
    this.symbol = 'EMPTY';
    this.player = new Player('afdsakljfjdsojfwofjojqokqefkj')
};
Cell.prototype.isSymbol = function (symbol) {
    return (this.symbol == symbol);
};
Cell.prototype.getPlayer = function () {
    return this.player;
};
Cell.prototype.setPlayer = function (player) {
    this.player = player;
};
Cell.prototype.isPlayer = function (player) {
    return (this.player == player);
};


function Player(name){
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    this.name = name;
    // this.symbol = alphabet[Math.floor(Math.random()*alphabet.length)];
    this.symbol = capitalize(this.name);
    this.color = ('00000'+(Math.random()*(1<<24)|0).toString(16)).slice(-6);


}
Player.prototype.getName = function () {
    return this.name;
};
Player.prototype.getSymbol = function () {
    return this.symbol;
};
Player.prototype.getColor = function () {
    return this.color;
};
Player.prototype.getColorName = function () {
    return this.name.fontcolor(this.color);
};
Player.prototype.getColorSymbol = function () {
    return this.symbol.fontcolor(this.color)
};
// i thought about assigning the element to the object, but decided to
// do it the other way around
/*
Cell.prototype.setAttr = function (the_class, value) {
    this.curr_cell.setAttribute(the_class, value);
}
*/
// Game Class
/*
function Game(dimensions, win_condition) {
    this.dimensions = dimensions;
    this.win_condition = win_condition;
    this.moves = 0;
    this.turn = 'X';
    this.squares = []
}
Game.prototype.getDimensions = function () {
    return this.dimensions;
}
Game.prototype.getWinCon = function () {
    return this.win_condition;
}
Game.prototype.getMoves = function () {
    return this.moves;
}
Game.prototype.getTurn = function () {
    return this.turn;
}
*/


/**
 * Initializes the Tic Tac Toe board and starts the game.
 */
function init() {
    let board = document.createElement('table');
    board.setAttribute('border', 1);
    board.setAttribute('cellspacing', 0);

    // iterate through row
    for (var i = 0; i < dimensions; i++) {
        var row = document.createElement('tr');
        board.appendChild(row);
        // iterate through column
        for (var j = 0; j < dimensions; j++) {
            var cell = document.createElement('td');
            cell.setAttribute('height', String(39.375 / dimensions) + '%');
            cell.setAttribute('width', String(39.375 / dimensions) + '%');
            cell.setAttribute('align', 'center');
            cell.setAttribute('valign', 'center');

            cell.cell_data = new Cell(i, j);
/*
            cell.classList.add('col' + j, 'row' + i);
            if (i == j) {
                cell.classList.add('diagonal0');
            }
            if (j == dimensions - i - 1) {
                cell.classList.add('diagonal1');
            }
*/
            cell.addEventListener('click', set);
            row.appendChild(cell);
            boxes.push(cell);
        }
    }
    document.getElementById('tictactoe').appendChild(board);
    startNewGame();
}

/**
 * New game
 */

function startNewGame() {

    moves = 0;
    turn = current_player.data.getSymbol();
    boxes.forEach(function (square) {
        square.innerHTML = EMPTY;
        // modified the cell class to turn the cell's corresponding object's trait for symbol back to empty
        square.cell_data.setEmpty();


    });
    document.getElementById('move_number').textContent = 'Turn ' + (moves + 1);
    document.getElementById('turn').textContent = 'Current player: ' + current_player.data.getName();
    document.getElementById('turn').style.color = current_player.data.getColor();
    document.getElementById('next_turn').textContent = 'Next Up: ' + current_player.next.data.getName();
    document.getElementById('next_turn').style.color = current_player.next.data.getColor();
}

/**
 * Check if a win or not
 */




function CheckRow(row_number, symbol) {
    var countdown = win_con;
    var selected_row = boxes.filter(function(the_cell) {
        return the_cell.cell_data.getRow() == row_number;
    });

    for (var i = 0; i < dimensions; i++) {
        if (selected_row[i].cell_data.isPlayer(current_player.data)) {
            countdown = countdown - 1;
        } else {
            countdown = win_con;
        }
        if (countdown == 0) {
            return true;
        }
    }
    return false;
}

function CheckCol(col_number, symbol) {
    var countdown = win_con;
    var selected_col = boxes.filter(function(the_cell) {
        return the_cell.cell_data.getColumn() == col_number;
    });

    for (var i = 0; i < dimensions; i++) {
        if (selected_col[i].cell_data.isPlayer(current_player.data)) {
            countdown = countdown - 1;
        } else {
            countdown = win_con;
        }
        if (countdown == 0) {
            return true;
        }
    }
    return false;
}

function CheckDiag(symbol) {
    var countdown = win_con;
    row_box = [];
    for (var i = 0; i < dimensions; i++) {
        col_box = [];
        for (var j = 0; j < dimensions; j++) {
            col_box.push(boxes[j + i * dimensions]);
        }
        row_box.push(col_box);
    }
/*
    for (var j = i; j < dimensions + 1; j += dimensions+1) {
           if (boxes[j].cell_data.isSymbol(symbol)) {
               countdown -= 1;
           } else {
               countdown = win_con;
           }
           if (countdown == 0) {
               return true;
           }
       }

    var countdown = win_con;
    for (var j = dimensions - i; j > -1; j -= dimensions - 1) {
            if (boxes[j].cell_data.isSymbol(symbol)) {
                countdown -= 1;
            } else {
                countdown = win_con;
            }
            if (countdown == 0) {
                return true;
            }

    }
*/


    // regular TL to BR diagonals - top
    for (var i = 0; i < dimensions; i++) {
        var k = i;
        for (var j = 0; j < (dimensions - i); j++) {

            //console.log(row_box[k][j].cell_data);
            if (row_box[k][j].cell_data.isPlayer(current_player.data)) {
                countdown = countdown - 1;
                //console.log('regular diagonal - bottom' + countdown);
            } else {
                countdown = win_con;
            }
            if (countdown == 0) {
                console.log('RDB win');
                return true;
            }
            k += 1;
            if (k >= dimensions) {
                break;
            }
        }
    }
    // regular TL to BR diagonals - bottom
    var countdown_top = win_con;
    for (var i = 0; i < dimensions; i++) {
        var k = i;
        for (var j = 0; j < (dimensions - i); j++) {

            //console.log(row_box[j][k].cell_data);

            if (row_box[j][k].cell_data.isPlayer(current_player.data)) {
                countdown_top = countdown_top - 1;
               // console.log('RD-T ' + countdown_top);
            } else {
                countdown_top = win_con;
            }
            if (countdown_top == 0) {
                console.log('RDT win');
                return true;
            }
            k += 1;
            if (k >= dimensions) {
                break;
            }
        }
    }
    /*
    var counter = 0;
    var number = dimensions * dimensions;
    var manual_index = 0;
    while (number > 0) {
        number -= 1;
        manual_index = number;
        for (var x = 0; x < win_con; x++) {
            if (boxes[manual_index].cell_data.isSymbol(symbol)) {
                counter += 1;
            }
            if (counter == win_con) {
                return true;
            }

        }
        manual_index = manual_index - dimensions + 1;
        counter = 0;

    }
    var counter = 0;
    var number = dimensions * dimensions;
    var manual_index = 0;
    while (number > 0) {
        number -= 1;
        manual_index = number;
        for (var x = 0; x < win_con; x++) {
            if (boxes[manual_index].cell_data.isSymbol(symbol)) {
                counter += 1;
            }
            if (counter == win_con) {
                return true;
            }

        }
        manual_index = manual_index - dimensions - 1;
        counter = 0;

    }

*/
    // antidiagonal

    for (var i = 0; i < dimensions; i++) {
        var k = i;
        for (var j = dimensions - 1; j > (-1 + i); j--) {

            console.log(row_box[k][j].cell_data);
            if (row_box[k][j].cell_data.isPlayer(current_player.data)) {
                countdown = countdown - 1;
                console.log('AD-1 ' + countdown);
            } else {
                countdown = win_con;
            }
            if (countdown == 0) {
                console.log('AD 1 win');
                return true;
            }
            k += 1;
            if (k > dimensions) {
                break;
            }
        }
    }
    // other antidiagonal
    for (var i = 0;  i < dimensions; i++) {
        var k = i;
        for (var j = dimensions-1; j > (-1 + i); j--) {

            // console.log(row_box[j][k].cell_data);
            if (row_box[j][k].cell_data.isPlayer(current_player.data)) {
                countdown = countdown - 1;
                // console.log('AD-2 ' +  countdown);
            } else {
                countdown = win_con;
            }
            if (countdown == 0) {
                console.log('AD 2 win');
                return true;
            }
            k += 1;
            if (k > dimensions) {
                break;
            }
        }
    }

    return false;

}

function CheckWinning() {
    // check rows
    for (var cheddar = 0; cheddar < dimensions; cheddar++) {
        if(CheckRow(cheddar, turn)) {
            return true;
        }
    }
    // check columns
    for (var cheddar = 0; cheddar < dimensions; cheddar++) {
        if(CheckCol(cheddar, turn)) {
            return true;
        }
    }

    return CheckDiag(turn);

}

/**
 * Sets clicked square and also updates the turn.
 */
function set() {
    if (this.innerHTML !== EMPTY) {
        return;
    }
    this.innerHTML = current_player.data.getColorSymbol();
    console.log('placed symbol ' + current_player.data.getSymbol());
    // adjust cell_data trait of the object accordingly, and also modify the score array accordingly
    this.cell_data.setSymbol(turn);
    this.cell_data.setPlayer(current_player.data);
    moves += 1;

    if (CheckWinning()) {

        // alert('Winner: ' + current_player.data.getName());

        winning_message.innerHTML = 'The winner is ' + current_player.data.getName() + '!';

        modal.style.display = "block";

        startNewGame();

    } else if (moves === dimensions * dimensions) {
        alert('Draw');
        startNewGame();
    } else {
        current_player = current_player.next;
        turn = current_player.data.getSymbol();
//        turn = turn === 'X' ? 'O' : 'X';
        document.getElementById("move_number").textContent = 'Turn ' + (moves + 1);
        document.getElementById("turn").textContent = 'Current player: ' + current_player.data.getName();
        document.getElementById("turn").style.color = current_player.data.getColor();
        document.getElementById("next_turn").textContent = 'Next Up: ' + current_player.next.data.getName();
        document.getElementById("next_turn").style.color = current_player.next.data.getColor();
    }

}
/*
//testing stuff
var current = player_list.first;
console.log((current).data.getName());
console.log(current.next);
console.log(player_list);
*/


init();