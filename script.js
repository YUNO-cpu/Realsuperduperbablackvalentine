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
