var w;

var user;

var grid = [
    /* given position to white  */
    {
        x: 1,
        y: 0,
        occupied: "checker-white",
        king: false
    }, {
        x: 3,
        y: 0,
        occupied: "checker-white",
        king: false
    }, {
        x: 5,
        y: 0,
        occupied: "checker-white",
        king: false
    }, {
        x: 7,
        y: 0,
        occupied: "checker-white",
        king: false
    }, {
        x: 0,
        y: 1,
        occupied: "checker-white",
        king: false
    }, {
        x: 2,
        y: 1,
        occupied: "checker-white",
        king: false
    }, {
        x: 4,
        y: 1,
        occupied: "checker-white",
        king: false
    }, {
        x: 6,
        y: 1,
        occupied: "checker-white",
        king: false
    }, {
        x: 1,
        y: 2,
        occupied: "checker-white",
        king: false
    }, {
        x: 3,
        y: 2,
        occupied: "checker-white",
        king: false
    }, {
        x: 5,
        y: 2,
        occupied: "checker-white",
        king: false
    }, {
        x: 7,
        y: 2,
        occupied: "checker-white",
        king: false
    },

    /* Empty positions of white checkers */
    {
        x: 0,
        y: 3,
        occupied: "",
        king: false
    }, {
        x: 2,
        y: 3,
        occupied: "",
        king: false
    }, {
        x: 4,
        y: 3,
        occupied: "",
        king: false
    }, {
        x: 6,
        y: 3,
        occupied: "",
        king: false
    }, {
        x: 1,
        y: 4,
        occupied: "",
        king: false
    }, {
        x: 3,
        y: 4,
        occupied: "",
        king: false
    }, {
        x: 5,
        y: 4,
        occupied: "",
        king: false
    }, {
        x: 7,
        y: 4,
        occupied: "",
        king: false
    },

    /* positions of black checkers */
    {
        x: 0,
        y: 5,
        occupied: "checker-red",
        king: false
    }, {
        x: 2,
        y: 5,
        occupied: "checker-red",
        king: false
    }, {
        x: 4,
        y: 5,
        occupied: "checker-red",
        king: false
    }, {
        x: 6,
        y: 5,
        occupied: "checker-red",
        king: false
    }, {
        x: 1,
        y: 6,
        occupied: "checker-red",
        king: false
    }, {
        x: 3,
        y: 6,
        occupied: "checker-red",
        king: false
    }, {
        x: 5,
        y: 6,
        occupied: "checker-red",
        king: false
    }, {
        x: 7,
        y: 6,
        occupied: "checker-red",
        king: false
    }, {
        x: 0,
        y: 7,
        occupied: "checker-red",
        king: false
    }, {
        x: 2,
        y: 7,
        occupied: "checker-red",
        king: false
    }, {
        x: 4,
        y: 7,
        occupied: "checker-red",
        king: false
    }, {
        x: 6,
        y: 7,
        occupied: "checker-red",
        king: false
    }
];

var selected = {
    occupied: "",
    x: 0,
    y: 0,
    king: false
};
var turn = 'white';
var white;
var red;
//call the checkers
function loadGrid() {
    printGrid();
    addEvents();
    checkerslbl = document.getElementById('checkerslbl');
    checkerslbl.style.position = "relative";
    animateCSS(checkerslbl, 200, 100, {
        left: function(frame, time) {
            if (frame <= 50) {
                return frame + "px";
            } else if (frame > 100 && frame <= 150) {
                count = (frame - 150) * (-1);
                return count;
            }
        },
        top: function(frame, time) {
            if (frame > 50 && frame <= 100) {
                return (frame - 50) + "px";
            } else if (frame > 150 && frame <= 200) {
                count = (frame - 200) * (-1);
                return count;
            }
        }
    });
}

function printGrid() {
    var board = document.getElementById('row');
    var html = "<table class='grid'>";

    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == 0 || grid[i].x == 1) {
            html += "<tr>";
        }
        if (grid[i].x % 2 == 1) {
            html += "<td class='redcell'></td>";
        }

        html += "<td class='blackcell'><div id=" + grid[i].occupied + "></div></td>";

        if (grid[i].x % 2 == 0 && grid[i].x != 7) {
            html += "<td class='redcell'></td>";
        }
        if (grid[i].x == 6) {
            html += "</tr>";
        }
        if (grid[i].x == 7) {
            html += "</tr>";
        }
    }

    html += "</table>";
    board.innerHTML = html;
}




function addEvents() {
    var gridDiv = document.getElementById('row');
    var tds = gridDiv.getElementsByTagName('td');

    for (var i = 0; i < tds.length; i++) {
        tds[i].onclick = movePiece;
    }
}


function movePiece() {
    cell = this;
    x = cell.cellIndex;
    y = cell.parentNode.rowIndex;
    gridPiece = getGridPiece(x, y);
    var location = document.getElementById('location');
    location.innerHTML = 'x: ' + x + ', y: ' + y;

    if (selected.occupied == "" && gridPiece && gridPiece.occupied.indexOf(turn) != -1) {
        selected.occupied = gridPiece.occupied;
        selected.king = gridPiece.king;
        selected.x = x;
        selected.y = y;
        gridPiece.occupied = "";

        cell.innerHTML = "<div id=''></div>";
        cell.onclick = movePiece;
    } else if (selected.occupied.indexOf('white') != -1) {
        if (y == 7) {
            selected.king = true;
            selected.occupied = 'king-white';
        }
        //Move
        if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (gridPiece.occupied == "")) {
            cell.innerHTML = "<div id=" + selected.occupied + "></div>";
            cell.onclick = movePiece;
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = "";
            selected.king = false;
            selected.x = 0;
            selected.y = 0;
            turn = 'red';
        } //Jump left
        else if ((x == selected.x - 2) && (y == selected.y + 2) && (getGridPiece(x, y).occupied == "")) {
            jumped = getGridPiece(x + 1, y - 1);
            if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x + 1, y - 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'red';
                gameFinished();
            }
        } //Jump right
        else if ((x == selected.x + 2) && (y == selected.y + 2) && (gridPiece.occupied == "")) {
            jumped = getGridPiece(x - 1, y - 1);
            if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x - 1, y - 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'red';
                gameFinished();
            }
        } //Drop checker
        else if (x == selected.x && y == selected.y) {
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = '';
            selected.king = false;
            selected.x = 0;
            selected.y = 0;

            cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
            cell.onclick = movePiece;
        } //Move king
        else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (gridPiece.occupied == "") && selected.king) {
            cell.innerHTML = "<div id=" + selected.occupied + "></div>";
            cell.onclick = movePiece;
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = "";
            selected.king = false;
            selected.x = 0;
            selected.y = 0;
            turn = 'red';
        } //Jump left king
        else if ((x == selected.x - 2) && (y == selected.y - 2) && (getGridPiece(x, y).occupied == "") && selected.king) {
            jumped = getGridPiece(x + 1, y + 1);
            if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x + 1, y + 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'red';
                gameFinished();
            }
        } //Jump right king
        else if ((x == selected.x + 2) && (y == selected.y - 2) && (gridPiece.occupied == "") && selected.king) {
            jumped = getGridPiece(x - 1, y + 1);
            if (jumped.occupied.indexOf('white') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x - 1, y + 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'red';
                gameFinished();
            }
        }
    } else if (selected.occupied.indexOf('red') != -1) {
        if (y == 0) {
            selected.king = true;
            selected.occupied = 'king-red';
        }
        //Move
        if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y - 1) && (gridPiece.occupied == "")) {
            cell.innerHTML = "<div id=" + selected.occupied + "></div>";
            cell.onclick = movePiece;
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = "";
            selected.king = false;
            selected.x = 0;
            selected.y = 0;
            turn = 'white';
        } //Jump left
        else if ((x == selected.x - 2) && (y == selected.y - 2) && (getGridPiece(x, y).occupied == "")) {
            jumped = getGridPiece(x + 1, y + 1);
            if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x + 1, y + 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'white';
                gameFinished();
            }
        } //Jump right
        else if ((x == selected.x + 2) && (y == selected.y - 2) && (gridPiece.occupied == "")) {
            jumped = getGridPiece(x - 1, y + 1);
            if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x - 1, y + 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'white';
                gameFinished();
            }
        } //Drop checker
        else if (x == selected.x && y == selected.y) {
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = '';
            selected.king = false;
            selected.x = 0;
            selected.y = 0;

            cell.innerHTML = "<div id=" + gridPiece.occupied + "></div>";
            cell.onclick = movePiece;
        } //Move king
        else if ((x == selected.x - 1 || x == selected.x + 1) && (y == selected.y + 1) && (gridPiece.occupied == "") && selected.king) {
            cell.innerHTML = "<div id=" + selected.occupied + "></div>";
            cell.onclick = movePiece;
            gridPiece.occupied = selected.occupied;
            gridPiece.king = selected.king;
            selected.occupied = "";
            selected.king = false;
            selected.x = 0;
            selected.y = 0;
            turn = 'white';
        } //Jump left king
        else if ((x == selected.x - 2) && (y == selected.y + 2) && (getGridPiece(x, y).occupied == "") && selected.king) {
            jumped = getGridPiece(x + 1, y - 1);
            if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x + 1, y - 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'white';
                gameFinished();
            }
        } //Jump right king
        else if ((x == selected.x + 2) && (y == selected.y + 2) && (gridPiece.occupied == "") && selected.king) {
            jumped = getGridPiece(x - 1, y - 1);
            if (jumped.occupied.indexOf('red') == -1 && jumped.occupied != "") {
                jumpedCell = getGridCell(x - 1, y - 1);
                cell.innerHTML = "<div id=" + selected.occupied + "></div>";
                cell.onclick = movePiece;
                gridPiece.occupied = selected.occupied;
                gridPiece.king = selected.king;
                jumped.occupied = "";
                jumpedCell.innerHTML = "<div id=''></div>";
                jumpedCell.onclick = movePiece;
                selected.occupied = "";
                selected.king = false;
                selected.x = 0;
                selected.y = 0;
                turn = 'white';
                gameFinished();
            }
        }
    }
}




//Ending of the game
function gameFinished() {
    var white_exists = false;
    var red_exists = false;
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].occupied == 'checker-white' || grid[i].occupied == 'king-white') {
            white_exists = true;
        } else if (grid[i].occupied == 'checker-red' || grid[i].occupied == 'king-red') {
            red_exists = true;
        }
    }

    if (!white_exists) {
        alert('Red Wins!');
        location.reload(true);
    } else if (!red_exists) {
        alert('White Wins!');
        location.reload(true);
    }

    return false;
}


//take the checker

function getGridPiece(x, y) {
    for (var i = 0; i < grid.length; i++) {
        if (grid[i].x == x && grid[i].y == y) {
            return grid[i];
        }
    }
}

function getGridCell(x, y) {
    var board = document.getElementById('row');
    var gridTable = board.getElementsByTagName('table');
    return gridTable[0].rows[y].cells[x];
}
