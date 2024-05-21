document.addEventListener('DOMContentLoaded', () => {
    const ball = document.getElementById('ball');
    const message = document.getElementById('message');
    const extraMessage = document.getElementById('extraMessage');
    const counter = document.getElementById('counter');
    const moveSound = document.getElementById('moveSound');
    const startMessage = document.getElementById('startMessage');
    const body = document.body;
    let hoverCount = 0;
    let gameStarted = false;
    let baseDuration = 0.5; 

    function moveBall(ball, body) {
        const maxWidth = body.clientWidth - ball.offsetWidth;
        const maxHeight = body.clientHeight - ball.offsetHeight;

        const randomX = Math.floor(Math.random() * maxWidth);
        const randomY = Math.floor(Math.random() * maxHeight);

        ball.style.left = `${randomX}px`;
        ball.style.top = `${randomY}px`;
    }

    function startGame() {
        gameStarted = true;
        startMessage.style.display = 'none';
        ball.style.display = 'block';

        ball.addEventListener('mouseover', () => {
            hoverCount++;
            const newDuration = Math.max(baseDuration - (hoverCount * 0.05), 0.1); 
            ball.style.transitionDuration = `${newDuration}s`; 

            moveBall(ball, body);
            moveSound.currentTime = 0; 
            moveSound.play().then(() => {
                console.log("Sound played successfully.");
            }).catch(error => {
                console.error("Error playing sound:", error);
            });

            counter.innerText = `Touched: 0 times`;
            message.style.display = 'block';

            if (hoverCount % 4 === 0) {
                extraMessage.style.display = 'block';
                setTimeout(() => {
                    extraMessage.style.display = 'none';
                }, 400); // 
            }
        });
    }

    document.addEventListener('click', () => {
        if (!gameStarted) {
            startGame();
        }
    });

    module.exports = { moveBall };
});
