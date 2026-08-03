# 如何发布新文章

这个仓库目前是纯静态 GitHub Pages，不需要安装 Hexo。文章直接放在独立目录中，推送到 `master` 后自动上线。

## 1. 新建文章页面

复制 `templates/article-template.html`，放到：

```text
YYYY/MM/DD/文章英文短名/index.html
```

例如：

```text
2026/08/03/my-summer-note/index.html
```

在复制后的文件中修改标题、日期、分类、摘要和 `<article class="article-body">` 内的正文。

正文支持常用 HTML：

- 段落：`<p>正文</p>`
- 二级标题：`<h2>标题</h2>`
- 图片：`<img src="/images/文件名.jpg" alt="说明">`
- 引用：`<blockquote>引用内容</blockquote>`
- 代码：`<pre><code>代码</code></pre>`

## 2. 在首页加入文章

打开根目录 `index.html`，在 `.post-grid` 中复制一张 `.post-card`，然后修改：

- `href`：文章网址
- `data-category`：分类
- `data-date`：发布时间
- `data-featured="true"`：加入“精华三篇”；设为 `false` 则不加入
- 标题、摘要、日期与图标

首页的“最近三篇”会按 `data-date` 排序，“精华三篇”会读取 `data-featured`，“全部文章”会展示所有卡片。

## 3. 增加分类

在首页 `.category-buttons` 中复制一个分类按钮，并在对应文章卡片上填写相同的 `data-category`。

## 4. 发布

提交并推送到 `master`：

```text
git add .
git commit -m "Add a new post"
git push origin master
```

稍等片刻后，文章会出现在 `https://lovelyyx.github.io/`。
