document.addEventListener('DOMContentLoaded', () => {
  const appState = {
    letterIndex: 0,
    letterTimer: null,
    timelineIndex: 0,
    birthdayStage: 0,
    audioUnlocked: false,
  };

  const splashAudio = document.getElementById('splashAudio');
  const heartsAudio = document.getElementById('heartsAudio');

  const floatingHearts = document.getElementById('floating-hearts');
  const heartsGrid = document.getElementById('hearts-grid');
  const letterTextEl = document.getElementById('letter-text');
  const letterCursor = document.getElementById('letter-cursor');
  const timelineDate = document.getElementById('timeline-date');
  const timelineText = document.getElementById('timeline-text');
  const timelineMediaWrap = document.getElementById('timeline-media-wrap');
  const timelineDots = document.getElementById('timeline-dots');
  const birthdayPanel = document.getElementById('birthday-panel');

  const heartMessages = [
    'your smile',
    'your laugh',
    'your eyes',
    'your voice',
    'your weirdness',
    'your body',
  ];

  const letterText = `My baby leeks,

I think of you every single day, every hour, every minute, every second and every millisecond of the day.

I'm in love with you, and I want to spend the rest of my life with you. You are the most beautiful, kind, and loving person I've ever met, and I'm so grateful to have you in my life.

I want to go above and beyond to make you happy and to make this perfect. You're my first ever valentine, and I want to make it unforgettable for you. I hope this little surprise makes you feel as special as you truly are.

My baby leeks, I hope you know that I love you. I love every little thing about you. I love your eyes and your smile and your stupid laugh and your weird sense of humor and every little thing about you.

You've made me feel more loved than anyone else has ever managed to, and I hope I can do the same for you too. I know I say it a lot but I can't say it enough. I love you so much.

I love your smile, your laugh, your eyes, your hair, your voice, your personality, your heart, your soul, everything about you. I love you so much that it hurts sometimes, but it's a good kind of hurt because it reminds me how much I care about you.

I want to be with you forever, and I hope you feel the same way about me. I want to make you happy and make this relationship work, no matter what challenges we may face. I love you more than words can express, and I hope you know that.

Yours always,
milo and or batman.`;

  const timelineItems = [
    { type: 'image', date: 'Dec 18', text: 'The day we got close.', src: 'assets/dec18_1.jpg' },
    { type: 'video', date: 'Dec 28', text: 'Our first kiss!!', src: 'assets/dec28.mp4' },
    { type: 'image', date: 'Jan 1', text: 'New years together', src: 'assets/jan1.jpg' },
    { type: 'image', date: 'Jan 22', text: 'The day I asked you out', src: 'assets/jan22_1.jpg' },
    { type: 'image', date: 'Jan 25', text: "when i knew you're the only woman for me", src: 'assets/jan25.jpg' },
    { type: 'video', date: 'Jan 25', text: 'WE HAD SEXX', src: 'assets/jan25_1.mp4' },
    { type: 'video', date: 'Jan 25', text: 'I saw a goddess infront of me', src: 'assets/jan25_2.mp4' },
    { type: 'video', date: 'Ragebait', text: 'i love how you fall for my ragebait everytime', src: 'assets/ragebait.mp4' },
    { type: 'video', date: 'the toilet stalls', text: 'getting stuck in toilet stalls with you is like genuinely so funny', src: 'assets/bathroom.mp4' },
    { type: 'image', date: 'the toilet stalls', text: 'getting stuck in toilet stalls with you is like genuinely so funny', src: 'assets/bathroom1.jpg' },
  ];

  const birthdayStages = [
    { kind: 'text', html: '<div class="birthday-stage">Tap</div>' },
    { kind: 'text', html: '<div class="birthday-stage">March 31st.</div>' },
    { kind: 'text', html: '<div class="birthday-stage">The day you were born.</div>' },
    { kind: 'text', html: '<div class="birthday-stage">The day your presence brought light into the world.<div class="small-note">I\'m so lucky I get to love you.</div></div>' },
    { kind: 'video' },
  ];

  function initFloatingHearts() {
    if (!floatingHearts) return;
    floatingHearts.innerHTML = '';
    for (let i = 0; i < 16; i += 1) {
      const span = document.createElement('span');
      span.className = 'float-heart';
      span.textContent = '♥';
      span.style.left = `${Math.random() * 100}%`;
      span.style.fontSize = `${14 + Math.random() * 18}px`;
      span.style.animationDuration = `${5 + Math.random() * 6}s`;
      span.style.animationDelay = `${Math.random() * 5}s`;
      floatingHearts.appendChild(span);
    }
  }

  function initHeartsGrid() {
    if (!heartsGrid) return;
    heartsGrid.innerHTML = '';
    const heartImages = [1, 2, 3, 4, 5, 6].map((n) => `assets/heart${n}.png`);

    heartMessages.forEach((message, index) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'heart-card';
      button.innerHTML = `
        <img src="${heartImages[index]}" alt="heart ${index + 1}" />
        <span class="heart-label">I love ${message}</span>
      `;
      button.addEventListener('click', () => {
        const open = heartsGrid.querySelector('.heart-card.revealed');
        if (open && open !== button) open.classList.remove('revealed');
        button.classList.toggle('revealed');
      });
      heartsGrid.appendChild(button);
    });
  }

  async function unlockAudio() {
    if (appState.audioUnlocked) return;
    appState.audioUnlocked = true;

    try {
      if (splashAudio) {
        splashAudio.muted = false;
        await splashAudio.play();
        splashAudio.pause();
        splashAudio.currentTime = 0;
      }

      if (heartsAudio) {
        heartsAudio.muted = false;
        await heartsAudio.play();
        heartsAudio.pause();
        heartsAudio.currentTime = 0;
      }
    } catch (err) {}
  }

  function pauseAllTimelineVideos() {
    document.querySelectorAll('.timeline-media-wrap video').forEach((video) => {
      video.pause();
      video.currentTime = 0;
    });
  }

  function stopBirthdayVideo() {
    const birthdayVideo = document.getElementById('birthdayVideo');
    if (birthdayVideo) {
      birthdayVideo.pause();
      birthdayVideo.currentTime = 0;
    }
  }

  function updateAudioForScreen(screenId) {
    if (!heartsAudio) return;

    if (screenId === 'screen-splash' || screenId === 'screen-birthday') {
      heartsAudio.pause();
      heartsAudio.currentTime = 0;
      return;
    }

    if (heartsAudio.paused) {
      heartsAudio.play().catch(() => {});
    }
  }

  function showScreen(screenId) {
    pauseAllTimelineVideos();

    if (screenId !== 'screen-birthday') {
      stopBirthdayVideo();
    }

    document.querySelectorAll('.screen').forEach((screen) => {
      screen.classList.remove('active');
    });

    const nextScreen = document.getElementById(screenId);
    if (nextScreen) {
      nextScreen.classList.add('active');
    }

    updateAudioForScreen(screenId);

    if (screenId === 'screen-letter') {
      startLetter();
    }

    if (screenId === 'screen-timeline') {
      renderTimeline();
    }

    if (screenId === 'screen-birthday') {
      appState.birthdayStage = 0;
      renderBirthdayStage();
    }
  }

  function startLetter() {
    if (!letterTextEl || letterTextEl.dataset.started === 'true') return;
    letterTextEl.dataset.started = 'true';
    typeNextChar();
  }

  function typeNextChar() {
    if (!letterTextEl || !letterCursor) return;

    if (appState.letterIndex >= letterText.length) {
      letterCursor.style.display = 'none';
      return;
    }

    letterTextEl.textContent += letterText[appState.letterIndex];
    appState.letterIndex += 1;

    const char = letterText[appState.letterIndex - 1];
    const delay = char === '\n' ? 12 : char === '.' ? 45 : 18;
    appState.letterTimer = setTimeout(typeNextChar, delay);
  }

  function finishLetter() {
    if (!letterTextEl || !letterCursor) return;
    clearTimeout(appState.letterTimer);
    letterTextEl.textContent = letterText;
    appState.letterIndex = letterText.length;
    letterCursor.style.display = 'none';
  }

  function createTimelineVideo(src) {
    const video = document.createElement('video');
    video.src = src;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;
    video.preload = 'metadata';
    return video;
  }

  function renderTimeline() {
    if (!timelineDate || !timelineText || !timelineMediaWrap || !timelineDots) return;

    const item = timelineItems[appState.timelineIndex];
    timelineDate.textContent = item.date;
    timelineText.textContent = item.text;
    timelineMediaWrap.innerHTML = '';

    let media;
    if (item.type === 'video') {
      media = createTimelineVideo(item.src);
    } else {
      media = document.createElement('img');
      media.src = item.src;
      media.alt = item.text;
    }

    timelineMediaWrap.appendChild(media);

    timelineDots.innerHTML = '';
    timelineItems.forEach((_, idx) => {
      const dot = document.createElement('span');
      dot.className = `timeline-dot${idx === appState.timelineIndex ? ' active' : ''}`;
      timelineDots.appendChild(dot);
    });

    const content = document.getElementById('timeline-content');
    if (content) {
      content.classList.remove('fade-in');
      void content.offsetWidth;
      content.classList.add('fade-in');
    }
  }

  function nextTimeline() {
    const media = timelineMediaWrap?.querySelector('video');
    if (media) {
      media.pause();
      media.currentTime = 0;
    }

    if (appState.timelineIndex < timelineItems.length - 1) {
      appState.timelineIndex += 1;
      renderTimeline();
    } else {
      showScreen('screen-birthday');
    }
  }

  function renderBirthdayStage() {
    if (!birthdayPanel) return;

    const stage = birthdayStages[appState.birthdayStage];
    birthdayPanel.innerHTML = '';

    if (stage.kind === 'text') {
      birthdayPanel.innerHTML = stage.html;
      return;
    }

    const wrap = document.createElement('div');
    wrap.className = 'birthday-stage';
    wrap.innerHTML = `
      <video id="birthdayVideo" class="birthday-video" src="assets/birthday.mp4" controls autoplay playsinline preload="metadata"></video>
      <div class="small-note">Tap one last time</div>
    `;
    birthdayPanel.appendChild(wrap);

    const birthdayVideo = document.getElementById('birthdayVideo');
    if (birthdayVideo) {
      birthdayVideo.muted = false;
      birthdayVideo.controls = true;
      birthdayVideo.playsInline = true;
      birthdayVideo.preload = 'metadata';
      birthdayVideo.play().catch(() => {});
    }
  }

  function nextBirthdayStage() {
    if (appState.birthdayStage < birthdayStages.length - 1) {
      appState.birthdayStage += 1;
      renderBirthdayStage();
    } else {
      stopBirthdayVideo();
      showScreen('screen-playlist');
    }
  }

  function bindEvents() {
    const startBtn = document.getElementById('start-btn');
    const skipLetterBtn = document.getElementById('skip-letter');
    const unlockBtn = document.getElementById('unlock-btn');
    const timelineNextBtn = document.getElementById('timeline-next');

    startBtn?.addEventListener('click', async () => {
      await unlockAudio();

      if (splashAudio) {
        splashAudio.play().catch(() => {});
      }

      setTimeout(() => {
        if (splashAudio) {
          splashAudio.pause();
          splashAudio.currentTime = 0;
        }
        showScreen('screen-hearts');
      }, 800);
    });

    document.querySelectorAll('[data-next]').forEach((button) => {
      button.addEventListener('click', () => {
        const next = button.dataset.next;
        showScreen(next);
      });
    });

    skipLetterBtn?.addEventListener('click', finishLetter);

    unlockBtn?.addEventListener('click', () => {
      document.getElementById('surprise-locked')?.classList.add('hidden');
      document.getElementById('surprise-reveal')?.classList.remove('hidden');
    });

    timelineNextBtn?.addEventListener('click', nextTimeline);
    birthdayPanel?.addEventListener('click', nextBirthdayStage);
  }

  initFloatingHearts();
  initHeartsGrid();
  bindEvents();
  showScreen('screen-splash');
});