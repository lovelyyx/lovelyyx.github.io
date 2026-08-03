const shell = document.querySelector('#siteShell');
const front = document.querySelector('.front-face');
const back = document.querySelector('.back-face');
const searchDialog = document.querySelector('#searchDialog');
const searchInput = document.querySelector('#searchInput');
const searchResults = document.querySelector('#searchResults');
const tagCloud = document.querySelector('#tags');
const articleItems = [...document.querySelectorAll('.year-group li')];
const filterStatus = document.querySelector('#filterStatus');
const emptyFilter = document.querySelector('#emptyFilter');

const posts = [
  { title: '我的个人网站，终于见面了', meta: '2024 · GitHub · 项目实践', url: '/2024/07/27/newpapername/' },
  { title: 'A Quick Start for Blog Writing — Markdown', meta: '2024 · Markdown · 学习笔记', url: '/2024/07/27/A-Quick-Start-for-Blog-Writing-Markdown/' },
  { title: 'Hello World', meta: '2024 · Hexo · 前端', url: '/2024/07/27/hello-world/' }
];

function flip(showBack) {
  shell.classList.toggle('flipped', showBack);
  front.setAttribute('aria-hidden', String(showBack));
  back.setAttribute('aria-hidden', String(!showBack));
}

function filterPosts(filter, selectedButton) {
  let visibleCount = 0;
  articleItems.forEach(item => {
    const visible = filter === 'all' || item.dataset.tags.split(' ').includes(filter);
    item.hidden = !visible;
    if (visible) visibleCount += 1;
  });
  tagCloud.querySelectorAll('button').forEach(button => button.classList.toggle('active', button === selectedButton));
  filterStatus.textContent = filter === 'all' ? `正在显示全部 ${visibleCount} 篇文章` : `标签「${filter}」· ${visibleCount} 篇文章`;
  emptyFilter.hidden = visibleCount !== 0;
  document.querySelector('#posts').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function renderSearch(term = '') {
  const query = term.trim().toLowerCase();
  const found = posts.filter(post => `${post.title} ${post.meta}`.toLowerCase().includes(query));
  searchResults.innerHTML = found.length
    ? found.map(post => `<a href="${post.url}">${post.title}<small>${post.meta}</small></a>`).join('')
    : '<p>没有找到匹配的文章。</p>';
}

document.querySelector('#flipButton').addEventListener('click', () => flip(!shell.classList.contains('flipped')));
document.querySelector('#backButton').addEventListener('click', () => flip(false));
document.querySelector('#searchButton').addEventListener('click', () => { searchDialog.showModal(); renderSearch(); searchInput.focus(); });
document.querySelector('.close-search').addEventListener('click', () => searchDialog.close());
searchDialog.addEventListener('click', event => { if (event.target === searchDialog) searchDialog.close(); });
searchInput.addEventListener('input', event => renderSearch(event.target.value));
tagCloud.addEventListener('click', event => {
  const button = event.target.closest('button[data-filter]');
  if (button) filterPosts(button.dataset.filter, button);
});
document.querySelector('#categoryButton').addEventListener('click', () => {
  tagCloud.classList.remove('attention');
  void tagCloud.offsetWidth;
  tagCloud.classList.add('attention');
  tagCloud.scrollIntoView({ behavior: 'smooth', block: 'center' });
});
document.querySelector('#tagButton').addEventListener('click', () => tagCloud.scrollIntoView({ behavior: 'smooth', block: 'center' }));
document.querySelector('#currentYear').textContent = new Date().getFullYear();
