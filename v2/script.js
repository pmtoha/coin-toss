
    const tossBtn   = document.getElementById('tossBtn');
    const coin      = document.getElementById('coin');
    const resultDiv = document.getElementById('result');
    const container = document.getElementById('coinContainer');
    const shadow    = document.getElementById('coinShadow');
    const headsEl   = document.getElementById('headsCount');
    const tailsEl   = document.getElementById('tailsCount');
    const totalEl   = document.getElementById('totalCount');

    const SPINS = 6;
    let currentRotation = 0;
    let spinning = false;

    const stats = { heads: 0, tails: 0, total: 0 };

    // Read the real transition duration from CSS so JS always stays in sync
    function spinMs() {
      const s = parseFloat(getComputedStyle(coin).transitionDuration);
      return (isNaN(s) ? 1.5 : s) * 1000;
    }

    function updateScoreboard() {
      headsEl.textContent = stats.heads;
      tailsEl.textContent = stats.tails;
      totalEl.textContent = stats.total;
    }

    function toss() {
      if (spinning) return;
      spinning = true;
      tossBtn.disabled = true;
      resultDiv.textContent = '';
      resultDiv.classList.remove('pop');

      const isHeads = Math.random() < 0.5;

      // FIX: always spin forward AND always finish on the chosen face
      const targetMod  = isHeads ? 0 : 180;
      const currentMod = ((currentRotation % 360) + 360) % 360;
      let delta = targetMod - currentMod;
      if (delta < 0) delta += 360;

      currentRotation += delta + 360 * SPINS;
      coin.style.transform = `rotateY(${currentRotation}deg)`;

      container.classList.add('tossing');
      shadow.classList.add('tossing');

      setTimeout(() => {
        container.classList.remove('tossing');
        shadow.classList.remove('tossing');

        stats.total++;
        isHeads ? stats.heads++ : stats.tails++;
        updateScoreboard();

        resultDiv.textContent = isHeads ? 'Heads!' : 'Tails!';
        void resultDiv.offsetWidth; // restart the pop animation
        resultDiv.classList.add('pop');

        spinning = false;
        tossBtn.disabled = false;
      }, spinMs());
    }

    tossBtn.addEventListener('click', toss);

    document.getElementById('resetBtn').addEventListener('click', () => {
      if (spinning) return;
      stats.heads = stats.tails = stats.total = 0;
      updateScoreboard();
      resultDiv.textContent = '';
    });

    // Keyboard shortcut
    document.addEventListener('keydown', (e) => {
      if ((e.key === 't' || e.key === 'T') && !e.repeat) toss();
    });
