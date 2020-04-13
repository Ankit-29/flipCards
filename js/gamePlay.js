let currentLevel = localStorage.getItem('level');
let gameObj = new Game(LEVEL[currentLevel]);
let cardArray = new Array();
let lastElement = null;
let moves = 0;

main = () => {
    gameObj.board.forEach((value, index) => {
        cardArray.push(new Card(ICON[value % (gameObj.boardSize / 2)], index));
    });
    console.table(cardArray);
    render(currentLevel);
}

render = () => {
    switch (currentLevel) {
        case 'Easy': renderEasy(); break;
        case 'Medium': renderMedium(); break;
        case 'Hard': renderHard(); break;
        default: renderEasy(); break;
    }
}


renderEasy = () => {
    let gameDiv = document.querySelector('#gameDiv');
    gameDiv.innerHTML = "";
    cardArray.forEach(card => {
        str = '';
        str += '<div class="cols-easy">';
        str += '<div id="flip_' + card.pos + '" data=' + JSON.stringify(card) + '  class="flip-container flip-container-easy" onclick="clickEvent(this)">';
        str += '<div class="flipper">';
        str += '<div class="front front-easy"></div>';
        str += '<div class="back back-easy d-flex" style="background-color:white; color:black;align-items: center; justify-content: center;">';
        str += '<i class="icon-font fa ' + card.icon + '"></i>';
        str += '</div></div></div></div>';
        gameDiv.innerHTML += str;
    });
}

renderMedium = () => {
    let gameDiv = document.querySelector('#gameDiv');
    gameDiv.innerHTML = "";
    cardArray.forEach((card) => {
        str = '';
        str += '<div class="cols-medium">';
        str += '<div id="flip_' + card.pos + '" data=' + JSON.stringify(card) + '  class="flip-container flip-container-medium" onclick="clickEvent(this)">';
        str += '<div class="flipper">';
        str += '<div class="front front-medium"></div>';
        str += '<div class="back back-medium d-flex" style="background-color:white; color:black;align-items: center; justify-content: center;">';
        str += '<i class="icon-font fa ' + card.icon + '"></i>';
        str += '</div></div></div></div>';
        gameDiv.innerHTML += str;
    });
}

renderHard = () => {
    let gameDiv = document.querySelector('#gameDiv');
    gameDiv.innerHTML = "";
    cardArray.forEach(card => {
        str = '';
        str += '<div class="cols-hard">';
        str += '<div id="flip_' + card.pos + '" data=' + JSON.stringify(card) + '  class="flip-container flip-container-hard" onclick="clickEvent(this)">';
        str += '<div class="flipper">';
        str += '<div class="front front-hard"></div>';
        str += '<div class="back back-hard d-flex" style="background-color:white; color:black;align-items: center; justify-content: center;">';
        str += '<i class="icon-font fa ' + card.icon + '"></i>';
        str += '</div></div></div></div>';
        gameDiv.innerHTML += str;
    });
}

clickEvent = (ele) => {
    ele.classList.toggle('flipped');
    moves++;
    setTimeout(() => {
        if (lastElement === null) {
            lastElement = ele;
        }
        else if (lastElement !== null && lastElement !== ele) {
            let lastCardValue = JSON.parse(lastElement.attributes.data.value);
            let currentCardValue = JSON.parse(ele.attributes.data.value)
            if (lastCardValue.icon === currentCardValue.icon) {
                lastElement.style = "opacity:0";
                ele.style = "opacity:0";
                gameObj.board[lastCardValue.pos] = 0;
                gameObj.board[currentCardValue.pos] = 0;
                if (gameObj.checkWin()) {
                    setTimeout(() => {
                        localStorage.setItem('moves',moves);
                        window.location.href = "gameEnding.html";
                        reset();
                    }, 1001);
                }
            } else {
                ele.classList.toggle('flipped');
                lastElement.classList.toggle('flipped');
                lastElement = null;
            }
            lastElement = null;
        }
        else {
            ele.classList.toggle('flipped');
            lastElement.classList.toggle('flipped');
            lastElement = null;
        }
    }, 1000);
}

reset = () => {
    let currentLevel = localStorage.getItem('level');
    let gameObj = new Game(LEVEL[currentLevel]);
    let cardArray = new Array();
    let lastElement = null;
    let moves = 0;
}

main();
