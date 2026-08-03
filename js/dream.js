const canvas = document.querySelector('#sparkCanvas');
const ctx = canvas.getContext('2d');
const particles = [];
const icons = ['✿', '♪', '☀', '·', '♫'];

function resizeCanvas() {
  const ratio = window.devicePixelRatio || 1;
  canvas.width = innerWidth * ratio;
  canvas.height = innerHeight * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

function burst(x, y, amount = 16) {
  for (let i = 0; i < amount; i += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 3.4 + 1;
    particles.push({
      x, y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 1,
      rotation: Math.random() * Math.PI,
      spin: (Math.random() - .5) * .13,
      icon: icons[Math.floor(Math.random() * icons.length)],
      color: ['#f4793f', '#ffb72b', '#8ebf8b', '#9a79ae'][Math.floor(Math.random() * 4)]
    });
  }
}

function animateParticles() {
  ctx.clearRect(0, 0, innerWidth, innerHeight);
  particles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += .035;
    particle.life -= .018;
    particle.rotation += particle.spin;
    ctx.save();
    ctx.globalAlpha = Math.max(0, particle.life);
    ctx.translate(particle.x, particle.y);
    ctx.rotate(particle.rotation);
    ctx.fillStyle = particle.color;
    ctx.font = '18px Georgia';
    ctx.fillText(particle.icon, 0, 0);
    ctx.restore();
  });
  for (let i = particles.length - 1; i >= 0; i -= 1) if (particles[i].life <= 0) particles.splice(i, 1);
  requestAnimationFrame(animateParticles);
}

document.addEventListener('pointerdown', event => {
  if (!event.target.closest('dialog')) burst(event.clientX, event.clientY, 20);
});

const scene = document.querySelector('#characterScene');
scene.addEventListener('pointermove', event => {
  const rect = scene.getBoundingClientRect();
  const x = (event.clientX - rect.left) / rect.width - .5;
  const y = (event.clientY - rect.top) / rect.height - .5;
  scene.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 3}deg)`;
});
scene.addEventListener('pointerleave', () => { scene.style.transform = ''; });

const musicBubble = document.querySelector('#musicBubble');
musicBubble.addEventListener('click', event => {
  event.stopPropagation();
  musicBubble.classList.toggle('is-playing');
  const playing = musicBubble.classList.contains('is-playing');
  musicBubble.querySelector('i').className = playing ? 'fa-solid fa-pause' : 'fa-solid fa-play';
  musicBubble.querySelector('span').textContent = playing ? '快乐正在播放中' : '点我听见快乐';
  const rect = musicBubble.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top, 28);
});

const posts = [
  { title: '我的个人网站，终于见面了', meta: '2024 · 生活', url: '/2024/07/27/newpapername/' },
  { title: 'A Quick Start for Blog Writing', meta: '2024 · 学习 · Markdown', url: '/2024/07/27/A-Quick-Start-for-Blog-Writing-Markdown/' },
  { title: 'Hello World', meta: '2024 · 开始 · Hexo', url: '/2024/07/27/hello-world/' }
];

const searchDialog = document.querySelector('#searchDialog');
const aboutDialog = document.querySelector('#aboutDialog');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');

function renderSearch(value = '') {
  const query = value.trim().toLowerCase();
  const matches = posts.filter(post => `${post.title} ${post.meta}`.toLowerCase().includes(query));
  searchResults.innerHTML = matches.length
    ? matches.map(post => `<a href="${post.url}">${post.title}<small>${post.meta}</small></a>`).join('')
    : '<p>没有找到匹配的文章。</p>';
}

document.querySelector('#searchButton').addEventListener('click', () => { searchDialog.showModal(); renderSearch(); searchInput.focus(); });
document.querySelector('#aboutButton').addEventListener('click', () => aboutDialog.showModal());
document.querySelectorAll('.close-dialog').forEach(button => button.addEventListener('click', () => button.closest('dialog').close()));
[searchDialog, aboutDialog].forEach(dialog => dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); }));
searchInput.addEventListener('input', event => renderSearch(event.target.value));
document.querySelector('#currentYear').textContent = new Date().getFullYear();

const categoryButtons = [...document.querySelectorAll('.category-buttons button')];
const postCards = [...document.querySelectorAll('.post-card')];
categoryButtons.forEach(button => button.addEventListener('click', () => {
  const category = button.dataset.category;
  categoryButtons.forEach(item => {
    const active = item === button;
    item.classList.toggle('active', active);
    item.setAttribute('aria-pressed', String(active));
  });
  postCards.forEach(card => {
    const matches = category === 'all' || card.dataset.category === category;
    card.classList.toggle('category-muted', !matches);
    card.classList.toggle('category-match', matches && category !== 'all');
  });
  const target = category === 'all' ? document.querySelector('#posts') : postCards.find(card => card.dataset.category === category);
  target?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  const rect = button.getBoundingClientRect();
  burst(rect.left + rect.width / 2, rect.top + rect.height / 2, 12);
}));

window.addEventListener('resize', resizeCanvas);
resizeCanvas();
animateParticles();
