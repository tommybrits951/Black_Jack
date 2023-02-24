 const deck = ["deck/back.jpg", "deck/ace_of_clubs.png", "deck/ace_of_diamonds.png", "deck/ace_of_hearts.png", "deck/ace_of_spades.png", "deck/2_of_clubs.png", "deck/2_of_diamonds.png", "deck/2_of_hearts.png", "deck/2_of_spades.png", "deck/3_of_clubs.png", "deck/3_of_diamonds.png", "deck/3_of_hearts.png", "deck/3_of_spades.png", "deck/4_of_clubs.png", "deck/4_of_diamonds.png", "deck/4_of_hearts.png", "deck/4_of_spades.png", "deck/5_of_clubs.png", "deck/5_of_diamonds.png", "deck/5_of_hearts.png", "deck/5_of_spades.png", "deck/6_of_clubs.png", "deck/6_of_diamonds.png", "deck/6_of_hearts.png", "deck/6_of_spades.png", "deck/7_of_clubs.png", "deck/7_of_diamonds.png", "deck/7_of_hearts.png", "deck/7_of_spades.png", "deck/8_of_clubs.png", "deck/8_of_diamonds.png", "deck/8_of_hearts.png", "deck/8_of_spades.png", "deck/9_of_clubs.png", "deck/9_of_diamonds.png", "deck/9_of_hearts.png", "deck/9_of_spades.png", "deck/10_of_clubs.png", "deck/10_of_diamonds.png", "deck/10_of_hearts.png", "deck/10_of_spades.png", "deck/jack_of_clubs.png", "deck/jack_of_diamonds.png", "deck/jack_of_hearts.png", "deck/jack_of_spades.png", "deck/king_of_clubs.png", "deck/king_of_diamonds.png", "deck/king_of_hearts.png", "deck/king_of_spades.png", "deck/queen_of_clubs.png", "deck/queen_of_diamonds.png", "deck/queen_of_hearts.png", "deck/queen_of_spades.png"];
 const points = ["points", 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 6, 6, 6, 6, 7, 7, 7, 7, 8, 8, 8, 8, 9, 9, 9, 9, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10, 10];
const betDisp = document.querySelector("#betDisp")
const walletDisp = document.querySelector("#walletDisp")
const userDisp = document.querySelector("#user")
const dealerDisp = document.querySelector("#dealer")
const userScoreDisp = document.querySelector("#userScoreDisp")
const dealerScoreDisp = document.querySelector("#dealerScoreDisp")
const betBtns = Array.from(document.querySelectorAll(".betBtn"))
const gameBtns = Array.from(document.querySelectorAll(".gameBtn"));
const playBtns = Array.from(document.querySelectorAll(".playBtn"));
const allBtns = Array.from(document.querySelectorAll(".btn"));

const user = {
    wallet: 100000,
    bet: 0,
    hand: [],
    ace: false,
    score: 0
}
const table = {
    hand: [],
    split: false
}
const dealer = {
    hand: [],
    ace: false,
    score: 0
}


function displayMoney() {
    betDisp.innerText = user.bet;
    walletDisp.innerText = user.wallet;
    return user;
}
displayMoney()


function hideBtns() {
    betBtns.map(btn => {
        btn.classList.remove('show')
        btn.classList.add('hidden')
    })
    gameBtns.map(btn => {
        btn.classList.add("show")
        btn.classList.remove("hidden")
    })
    playBtns.map((btn, idx) => {
        if (idx === 0) {
            btn.classList.add('show')
            btn.classList.remove('hidden')
        } else {
            btn.classList.add("hidden")
        }
    })
    console.log(betBtns)
}

function showBtns() {
    betBtns.map(btn => {
        btn.classList.remove('hidden')
        btn.classList.add('show')
    })
    gameBtns.map(btn => {
        btn.classList.remove('show')
        btn.classList.add('hidden')

    })
    playBtns.map(btn => {
        btn.classList.add('hidden')
    })
}

showBtns()

function zerot() {
    user.hand.map(num => {
        userDisp.removeChild(document.querySelector('.card'))
    })
    dealer.hand.map(num => {
        dealerDisp.removeChild(document.querySelector('.card'))
    })
    user.hand = [];
    user.ace = false;
    user.score = 0;
    table.hand = [];
    table.split = false;
    dealer.hand = [];
    dealer.ace = false;
    dealer.score = 0;   
}





 function changeBet(num) {
    if (num === 1 && user.wallet >= 10) {
        user.wallet -= 10;
        user.bet += 10
    } else if (num === 0 && user.bet >= 10) {
        user.wallet += 10;
        user.bet -= 10
    }
    displayMoney()
    return user;
 }




function getDealerCard(playerDisp) {
    const card = document.createElement("img")
    card.classList.add("card")
    card.src = deck[0];
    playerDisp.append(card)
}



function dealerCard (player, playerDisp) {
    for (let i = 0; i < 1; i++){
        const num = Math.ceil(Math.random() * 52);
        if (table.hand.includes(num)) {
            i--;
        } else {
            table.hand.push(num);
            player.hand.push(num);
           getDealerCard(playerDisp)
        }
    }
    console.log(dealer.hand)
}

function aceCheck() {
    const {hand, score} = user;
    hand.map(num => {
        if (score < 11 && num < 6) {
            user.score += 10
            user.ace = true;
            userScoreDisp.innerText = user.score;
        } else if (user.ace === true && score > 21) {
            user.ace = false
            user.score -= 10;
            userScoreDisp.innerText = user.score
        }
    })
    checkBust(user, userDisp)
}

 function dealCard(player, playerDisp, scoreDisp, nom) {
    
        for (let i = 0; i < 1; i++) {
            const rand = Math.ceil(Math.random() * 52);
            if (table.hand.includes(rand)) {
                i--
            } else {
            dealHand(rand, player);
            getCard(rand, playerDisp, nom);
            getScore(rand, player, scoreDisp)
            }
        }
        return player;
    }


function checkBust(player, playerDisp) {
    const {score} = player;
    if (score === 21) {
        const message = "21!";
        const cont = document.createElement('h5')
        cont.classList.add("alert")
        cont.innerText = message
        playerDisp.append(cont)
        stand()
    } else if (score > 21) {
        const message = "Bust!";
        const cont = document.createElement('h5')
        cont.classList.add("alert")
        cont.innerText = message
        playerDisp.append(cont)
        stand()

    }
}



function dealHand(num, player) {
    table.hand.push(num);
    player.hand.push(num)
    return player;
}
function getCard(num, playerDisp, nom) {
    const card = document.createElement('img');
    nom === 1 ? card.src = deck[0] : card.src = deck[num]
    card.classList.add('card');
    playerDisp.appendChild(card)
}

function getScore(num, player, scoreDisp) {
    player.score += points[num];
    scoreDisp.innerText = player.score;
    return player;
}
function newGame() {
    zerot()
dealCard(user, userDisp, userScoreDisp, 0)
dealCard(user, userDisp, userScoreDisp, 0)
aceCheck(user, userScoreDisp)
dealCard(dealer, dealerDisp, dealerScoreDisp, 0)
dealCard(dealer, dealerDisp, dealerScoreDisp, 1)
dealerScoreDisp.innerText = '';
hideBtns()
aceCheck(dealer, dealerScoreDisp)

}
function dealerCard(num) {
    if (num === 0) {
        dealer.hand.map((pic, idx) => {
            if (idx === 0) {
                dealerDisp.removeChild(document.querySelector(".card"))
                const card = document.createElement('img')
                card.classList.add('card')
                card.src = deck[0]
                dealerDisp.append(card)
            }
        })
        console.log(deals)
    } else {
        dealer.hand.map((pic, idx) => {
            if (idx === 1) {
                dealerDisp.removeChild(document.querySelector(".card"))
                const card = document.createElement('img')
                card.classList.add('card')
                card.src = deck[dealer.hand[0]]
                dealerDisp.append(card)
            }
        })

    }
}


function stand() {
    const nums = Array.from(dealerDisp.childNodes)
    nums[2].src = deck[dealer.hand[1]]
    
    allBtns.map(btn => {
        if (btn.classList = "show") {
            btn.classList.remove('show')
            btn.classList.add('hidden')
        }
    })
    dealersTurn()

}


function chickenDinner () {
    if (user.score <= 21 && user.score > dealer.score) {
        user.wallet = user.wallet + user.bet;
    } else if (dealer.score <= 21 && user.score < dealer.score) {
        user.wallet = user.wallet = user.bet;
    }
    showBtns()
}




function hit() {
    dealCard(user, userDisp, userScoreDisp, 0)
    aceCheck()
    console.log(dealerDisp.childNodes)
    checkBust(user, userDisp)
}
function checkDealer() {
    dealer.hand.map(card => {
        if (dealer.score < 11 && card < 5) {
            dealer.score += 10;
            dealerScoreDisp.innerText = dealer.score;
            dealer.ace = true;
        } else if (dealer.ace === true && dealer.score > 21) {
            dealer.ace = false;
            dealer.score -= 10;
        }
    })
}
function dealersTurn() {
    setInterval(() => {

        if (dealer.score < 17) {
            
            dealCard(dealer, dealerDisp, dealerScoreDisp, 0)
            checkDealer()
        } else if (dealer.score >= 17) {
            dealerScoreDisp.innerText = dealer.score;
            checkDealer()
            clearInterval()
            chickenDinner()
        }
    }, 500)
}


