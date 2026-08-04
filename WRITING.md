# 如何发布新文章

博客现在使用 GitHub Pages 自带的 Jekyll 自动生成系统。以后发布文章，只需要在 `_posts` 文件夹中新增 **一个 Markdown 文件**；首页卡片、日期、分类、搜索结果、最近三篇、精华三篇和文章详情页都会自动更新。

## 最简单的 GitHub 网页发布步骤

1. 打开仓库：`https://github.com/lovelyyx/lovelyyx.github.io`。
2. 点击 `_posts` 文件夹。
3. 点击右上方 **Add file**。
4. 点击 **Create new file**。
5. 在文件名输入框填写：`年-月-日-英文短名.md`。

例如，2026 年 8 月 4 日发布一篇夏日随笔：

```text
2026-08-04-summer-note.md
```

日期必须写在文件名最前面，网站会自动把它显示成发布时间，不需要在文章内容里再次填写日期。

6. 复制 `templates/article-template.md` 的内容并粘贴到编辑框。
7. 修改标题、分类和正文。
8. 点击 **Commit changes...**。
9. 提交说明可填写 `Publish summer note`。
10. 选择直接提交到 `master`，点击 **Commit changes**。
11. 等待约 1～3 分钟，刷新博客首页。

## 一篇文章只需要这样写

```markdown
---
title: 夏天的一点记录
category: 生活
subcategory: 日常记录
featured: false
---

这里写开头。首页会自动把第一段作为文章简介。

<!--more-->

## 今天发生的事

直接写正文即可，不需要 HTML 标签。

## 一些想法

- 第一件事
- 第二件事

> 想突出显示的话，可以这样写。
```

只有三个设置：

- `title`：文章标题。
- `category`：目前使用 `生活`、`学习` 或 `开始`。
- `subcategory`：可选的子分类，例如 `论文分享`、`实验复现` 或 `日常记录`；填写后首页会自动生成筛选按钮。
- `featured`：写 `true` 会进入精华文章候选；写 `false` 则只出现在最近文章和全部文章中。

`<!--more-->` 前面的第一段会自动成为首页摘要，后面的内容是正文。

## 精华三篇如何计算

网站会从所有 `featured: true` 的文章中，按日期自动选择最新的三篇。标记超过三篇也没有关系，首页始终只展示最新三篇；“全部文章”仍会显示所有文章。

## 插入图片

1. 回到仓库首页，点击 `images` 文件夹。
2. 点击 **Add file → Upload files**。
3. 上传图片并提交。
4. 在文章中填写：

```markdown
![图片说明](/images/summer-photo.jpg)
```

图片文件名建议只使用小写英文字母、数字和连字符，不要包含空格。

## 修改已有文章

1. 打开 `_posts` 文件夹。
2. 点击要修改的 `.md` 文件。
3. 点击右上角的铅笔图标。
4. 修改正文。
5. 点击 **Commit changes...** 保存。

如果需要修改发布日期，请重命名文件最前面的日期，例如把：

```text
2026-08-04-summer-note.md
```

改为：

```text
2026-08-05-summer-note.md
```

## 不再需要手动修改的文件

发布普通文章时，不要修改这些文件：

- `index.html`
- `js/dream.js`
- `_layouts/post.html`
- `css/article.css`

它们是公共页面和样式。以后每次发文章，通常只会新增或修改 `_posts` 中的一个 `.md` 文件。

## 可折叠并可复制的代码

所有多行代码都会自动变成折叠代码框并显示“复制”按钮，只需要写普通代码块：

````markdown
```bash
python -m pip install torch
```
````

## 自定义表格列宽并隐藏表头

在普通 Markdown 表格后增加一行属性：

```markdown
|  |  |
| --- | --- |
| 论文题目 | M3DocRAG: Multi-modal Retrieval is What You Need... |
| 作者与单位 | Jaemin Cho 等；UNC Chapel Hill、Bloomberg |
{: .custom-cols .no-header style="--col-1:22%;--col-2:78%;" }
```

`22%` 是左列宽度，`78%` 是右列宽度，可以自行修改；`.no-header` 会隐藏空表头。
