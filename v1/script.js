
    const tossBtn = document.getElementById('tossBtn');
    const coin = document.getElementById('coin');
    const resultDiv = document.getElementById('result');
    let currentRotation = 0;

    tossBtn.addEventListener('click', () => {
      tossBtn.disabled = true; // Prevent multiple taps during animation
      resultDiv.textContent = '';

      const isHeads = Math.random() < 0.5;

      // Coin rotation effect
      currentRotation += 360 * 5 + (isHeads ? 0 : 180);
      coin.style.transform = `rotateY(${currentRotation}deg)`;

      setTimeout(() => {
        resultDiv.textContent = isHeads ? 'Heads!' : 'Tails!';
        tossBtn.disabled = false;
      }, 1000); // Reduced time for better mobile experience
    });
 