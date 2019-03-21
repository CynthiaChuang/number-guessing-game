let round = 0;
let number = Math.floor(Math.random() * 100) + 1;
const guessField = document.querySelector(".guessField");
const guessSubmit = document.querySelector(".guessSubmit");

const guesses = document.querySelector(".guesses");
const result = document.querySelector(".result");
const history = document.querySelector(".history");


guessSubmit.addEventListener("click", checkGuess);
guessField.addEventListener("keyup", function (event) {
    if (event.keyCode === 13 && guessField.value.length > 0) {
        console.log(guessField.value);
        guessSubmit.click();
    }
});


function checkGuess() {
    let input = Number(guessField.value);

    if (!isIegalInput(input)) {
        alert("請輸1~100的整數");
        return
    }

    if (input === number) {
        showResult("恭喜你！猜對了！", "green");
        setGameOver();
        return;
    }

    let message = input < number ? "太低了！再高一點" : "高了!高了！往低的猜！";
    let color = input < number ? "orange" : "red";
    showResult(message, color);
    showHistory(round, input);

    round += 1;
    guessField.value = "";
    guessField.focus();

    if (round >= 10) {
        showResult("還是錯！答案是" + number + "啦！", "black");
        setGameOver()
        return;
    }
}


function resetGame() {
    round = 0;
    number = Math.floor(Math.random() * 100) + 1;

    history.innerText = ""
    showResult("", "transparent")

    guessField.disabled = false;
    guessSubmit.disabled = false;
    guessField.value = "";
    guessField.focus();

    resetButton.parentNode.removeChild(resetButton);
}


function setGameOver() {
    guessField.disabled = true;
    guessSubmit.disabled = true;

    resetButton = document.createElement("button");
    resetButton.textContent = "開始新遊戲";
    result.after(resetButton);
    resetButton.addEventListener("click", resetGame);
    return;
}


function showHistory(round, input) {
    message = "第" + (round + 1) + "回你猜：" + input + "\n";
    history.innerText = message + history.innerText;
    return;
}


function showResult(message, bgColor) {
    result.textContent = message;
    result.style.backgroundColor = bgColor;
    return;
}


function isIegalInput(input) {
    if (input == 0 || isNaN(input) || !Number.isInteger(input)) {
        return false;
    }

    if (input > 100 || input < 1) {
        return false;
    }

    return true;
}

