const articleFavicon = document.querySelector('link[rel="icon"]') || document.createElement('link');
articleFavicon.rel = 'icon';
articleFavicon.type = 'image/png';
articleFavicon.href = '/images/lovelyyx-star-avatar.png';
if (!articleFavicon.parentNode) document.head.appendChild(articleFavicon);

function repairCollapsedCode() {
  document.querySelectorAll('.article-body details').forEach(details => {
    if (details.querySelector('pre')) return;
    const summary = details.querySelector('summary');
    const raw = [...details.childNodes]
      .filter(node => node !== summary)
      .map(node => node.textContent || '')
      .join('\n')
      .trim();
    const match = raw.match(/```([\w+-]*)\s*([\s\S]*?)```/);
    if (!match) return;
    [...details.childNodes].forEach(node => { if (node !== summary) node.remove(); });
    const pre = document.createElement('pre');
    const code = document.createElement('code');
    if (match[1]) code.className = `language-${match[1]}`;
    code.textContent = match[2].trim();
    pre.appendChild(code);
    details.appendChild(pre);
  });
}

function collapseAllCodeBlocks() {
  document.querySelectorAll('.article-body pre').forEach(pre => {
    if (pre.closest('details')) return;
    const details = document.createElement('details');
    details.className = 'code-details';
    const summary = document.createElement('summary');
    summary.textContent = '点击展开代码';
    pre.parentNode.insertBefore(details, pre);
    details.appendChild(summary);
    details.appendChild(pre);
  });
}

async function copyCode(code, button) {
  const text = code.textContent;
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const area = document.createElement('textarea');
    area.value = text;
    area.style.position = 'fixed';
    area.style.opacity = '0';
    document.body.appendChild(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  button.textContent = 'Copied';
  button.classList.add('copied');
  setTimeout(() => {
    button.textContent = 'Copy';
    button.classList.remove('copied');
  }, 1600);
}

function addCopyButtons() {
  document.querySelectorAll('.article-body pre').forEach(pre => {
    if (pre.parentElement?.classList.contains('code-shell')) return;
    const shell = document.createElement('div');
    shell.className = 'code-shell';
    pre.parentNode.insertBefore(shell, pre);
    shell.appendChild(pre);
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'copy-code';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code');
    button.addEventListener('click', () => copyCode(pre.querySelector('code') || pre, button));
    shell.appendChild(button);
  });
}

repairCollapsedCode();
collapseAllCodeBlocks();
addCopyButtons();

const articleCanvas = document.querySelector('.article-canvas');
const articleCtx = articleCanvas.getContext('2d');
const articleParticles = [];

function sizeArticleCanvas() {
  const ratio = devicePixelRatio || 1;
  articleCanvas.width = innerWidth * ratio;
  articleCanvas.height = innerHeight * ratio;
  articleCtx.setTransform(ratio, 0, 0, ratio, 0, 0);
}

document.addEventListener('pointerdown', event => {
  for (let index = 0; index < 14; index += 1) {
    const angle = Math.random() * Math.PI * 2;
    const speed = Math.random() * 2.8 + 1;
    articleParticles.push({
      x: event.clientX,
      y: event.clientY,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      color: ['#f4793f', '#ffb72b', '#8ebf8b'][index % 3]
    });
  }
});

function animateArticle() {
  articleCtx.clearRect(0, 0, innerWidth, innerHeight);
  articleParticles.forEach(particle => {
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.vy += .03;
    particle.life -= .022;
    articleCtx.globalAlpha = Math.max(0, particle.life);
    articleCtx.fillStyle = particle.color;
    articleCtx.beginPath();
    articleCtx.arc(particle.x, particle.y, 3, 0, Math.PI * 2);
    articleCtx.fill();
  });
  for (let index = articleParticles.length - 1; index >= 0; index -= 1) {
    if (articleParticles[index].life <= 0) articleParticles.splice(index, 1);
  }
  articleCtx.globalAlpha = 1;
  requestAnimationFrame(animateArticle);
}

addEventListener('resize', sizeArticleCanvas);
sizeArticleCanvas();
animateArticle();
