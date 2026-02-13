// --- 1. Үндсэн удирдлагын хэсэг ---
function openGame(gameId) {
    // Үндсэн цэсийг нуух
    document.getElementById('main-menu').style.display = 'none';
    
    // Бүх тоглоомын хэсгийг нууж, идэвхгүй болгох
    const views = document.querySelectorAll('.game-view');
    views.forEach(v => v.classList.remove('active'));
    
    // Сонгосон тоглоомыг харуулах
    const target = document.getElementById('game-' + gameId);
    if (target) {
        target.classList.add('active');
        window.scrollTo(0, 0);
        initGameLogic(gameId); // Тоглоомыг эхлүүлэх
    }
}

function goHome() {
    document.querySelectorAll('.game-view').forEach(v => v.classList.remove('active'));
    document.getElementById('main-menu').style.display = 'block';
}

function initGameLogic(id) {
    if (id === 'memory') initMemory();
    if (id === 'clicker') initClicker();
    if (id === 'tictac') initTicTac();
    if (id === 'words') initWordsGame();
    if (id === 'calculator') {
        document.getElementById('calc-res').innerText = "";
        document.getElementById('name1').value = "";
        document.getElementById('name2').value = "";
    }
}

// --- 2. Санах ой (Memory Game) ---
function initMemory() {
    const board = document.getElementById('memory-board');
    board.innerHTML = "";
    const icons = ['❤️', '💖', '🎁', '🌹', '✨', '🍭', '🧸', '💌'];
    const deck = [...icons, ...icons].sort(() => Math.random() - 0.5);
    let flipped = [];
    let matched = 0;

    deck.forEach(icon => {
        const tile = document.createElement('div');
        tile.className = 'tile';
        tile.dataset.icon = icon;
        tile.onclick = function() {
            if (flipped.length < 2 && !this.classList.contains('flipped')) {
                this.classList.add('flipped');
                this.innerText = icon;
                flipped.push(this);

                if (flipped.length === 2) {
                    if (flipped[0].dataset.icon === flipped[1].dataset.icon) {
                        matched++;
                        flipped = [];
                        if (matched === icons.length) showModal("Баяр хүргэе!", "Та бүх хосыг оллоо!");
                    } else {
                        setTimeout(() => {
                            flipped.forEach(t => { t.classList.remove('flipped'); t.innerText = ""; });
                            flipped = [];
                        }, 700);
                    }
                }
            }
        };
        board.appendChild(tile);
    });
}

// --- 3. Хайрын Тооцоолуур ---
function runCalc() {
    const n1 = document.getElementById('name1').value.trim();
    const n2 = document.getElementById('name2').value.trim();
    if(!n1 || !n2) return alert("Нэрсээ оруулна уу!");
    
    const percent = Math.floor(Math.random() * 41) + 60; // 60-100%
    document.getElementById('calc-res').innerText = percent + "% ❤️";
}

// --- 4. Зүрх товших (Clicker) ---
function initClicker() {
    const area = document.getElementById('click-area');
    const scoreSpan = document.getElementById('click-score');
    let score = 0;
    area.innerHTML = "";
    scoreSpan.innerText = "0";

    const gameInterval = setInterval(() => {
        if (!document.getElementById('game-clicker').classList.contains('active')) {
            clearInterval(gameInterval);
            return;
        }

        const heart = document.createElement('div');
        heart.innerHTML = "❤️";
        heart.style.cssText = `position:absolute; left:${

// 1. initGameLogic дотор нэмэх хэсэг:
// if (id === 'quiz') initQuiz();

// 2. Quiz-ийн үндсэн логик
const quizData = [
    { q: "Хайрын бэлгэдэл цэцэг юу вэ?", a: ["Сарнай", "Лили", "Алтанзул"], c: 0 },
    { q: "Валентины өдөр хэзээ болдог вэ?", a: ["2-р сарын 13", "2-р сарын 14", "3-р сарын 8"], c: 1 },
    { q: "Хамгийн романтик жимс?", a: ["Алим", "Гүзээлзгэнэ", "Банана"], c: 1 }
];

let currentQ = 0;

function initQuiz() {
    currentQ = 0;
    showQuestion();
}

function showQuestion() {
    const area = document.getElementById('quiz-area');
    const data = quizData[currentQ];
    
    let html = `<div class="quiz-question">${data.q}</div>`;
    data.a.forEach((ans, idx) => {
        html += `<div class="quiz-option" onclick="checkQuiz(${idx})">${ans}</div>`;
    });
    
    area.innerHTML = html;
}

function checkQuiz(idx) {
    if (idx === quizData[currentQ].c) {
        currentQ++;
        if (currentQ < quizData.length) {
            showQuestion();
        } else {
            showModal("Баяр хүргэе!", "Та бүх асуултанд зөв хариуллаа! ❤️");
        }
    } else {
        alert("Буруу байна, дахин оролдоорой! 💔");
    }
}

// initGameLogic функц дотор if (id === 'claw') initClaw(); нэмээрэй

let clawScore = 0;
let isClawing = false;
let armPos = 50; // хувиар
let moveDir = 1;

function initClaw() {
    clawScore = 0;
    document.getElementById('claw-score').innerText = "0";
    const area = document.getElementById('claw-items-area');
    area.innerHTML = "";
    
    // Найзуудыг (item) үүсгэх
    const friends = ['🧸', '🐶', '🐱', '🐰', '🐼', '🦊'];
    for(let i=0; i<6; i++) {
        const item = document.createElement('div');
        item.className = 'claw-item';
        item.innerText = friends[i];
        item.style.left = (i * 15 + 10) + "%";
        area.appendChild(item);
    }

    // Гар хөдлөх хөдөлгөөн
    const clawInterval = setInterval(() => {
        if (!document.getElementById('game-claw').classList.contains('active')) {
            clearInterval(clawInterval);
            return;
        }
        if (!isClawing) {
            armPos += (2 * moveDir);
            if (armPos > 85 || armPos < 10) moveDir *= -1;
            document.getElementById('claw-arm').style.left = armPos + "%";
        }
    }, 50);
}

function dropClaw() {
    if (isClawing) return;
    isClawing = true;
    const arm = document.getElementById('claw-arm');
    const hand = document.getElementById('claw-hand');
    
    // Доошоо буух
    arm.style.height = "180px";
    
    setTimeout(() => {
        // Барих оролдлого
        const items = document.querySelectorAll('.claw-item');
        items.forEach(item => {
            const itemPos = parseInt(item.style.left);
            if (Math.abs(itemPos - armPos) < 10) {
                item.style.bottom = "150px"; // Дээшээ татах
                item.style.transition = "bottom 0.5s ease-in-out";
                setTimeout(() => {
                    item.remove();
                    clawScore++;
                    document.getElementById('claw-score').innerText = clawScore;
                    if(clawScore === 6) showModal("Мундаг!", "Та бүх найзуудыг барилаа!");
                }, 500);
            }
        });

        // Дээшээ буцах
        arm.style.height = "30px";
        setTimeout(() => { isClawing = false; }, 500);
    }, 500);
}
