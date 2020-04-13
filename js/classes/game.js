class Game {
    board = null;
    boardSize = null;

    constructor(level = LEVEL.Easy) {
        this.boardSize = level;
        this.initializeBoard();
    }

    initializeBoard() {
        this.board = [];
        this.board = Array(this.boardSize).fill(0).map((item, index) => index + 1);
        this.shuffleBoard();
    }

    shuffleBoard() {
        for (let i = 0; i < this.boardSize; i++) {
            let tempIdx = Math.floor(Math.random() * this.boardSize);
            let temp = this.board[i];
            this.board[i] = this.board[tempIdx];
            this.board[tempIdx] = temp;
        }
    }

    checkWin() {
        return this.board.reduce((a,b)=>{return a+b}) === 0; 
    }
}