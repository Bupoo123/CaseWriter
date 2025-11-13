# GitHub Releases 使用说明

## 概述

模板库使用 GitHub Releases 来存储和分发大文件。前端通过 `data/templates.json` 中的元数据来展示文件列表，实际文件从 GitHub Releases 下载。

## 使用步骤

### 1. 准备文件

将所有模板和案例文件整理好，确保文件路径与 `data/templates.json` 中的 `file` 或 `files` 字段匹配。

**注意**：GitHub Releases 下载时使用的是文件名，所以需要确保文件名唯一且不包含特殊字符。

### 2. 创建 GitHub Release

1. 访问仓库：https://github.com/Bupoo123/CaseWriter
2. 点击右侧 "Releases" 链接
3. 点击 "Draft a new release" 或 "Create a new release"
4. 填写 Release 信息：
   - **Tag version**: `v1.0` (建议使用语义化版本号)
   - **Release title**: `CaseWriter Templates v1.0`
   - **Description**: 描述本次发布的内容
5. 上传文件：
   - 点击 "Attach binaries by dropping them here or selecting them"
   - 选择所有需要发布的文件
   - **重要**：文件名必须与 `templates.json` 中的文件名完全匹配

### 3. 更新 templates.json

确保 `data/templates.json` 中的 `releaseInfo` 部分与实际的 Release 版本匹配：

```json
{
  "releaseInfo": {
    "version": "1.0",
    "releaseUrl": "https://github.com/Bupoo123/CaseWriter/releases",
    "downloadBaseUrl": "https://github.com/Bupoo123/CaseWriter/releases/download/v1.0",
    "lastUpdated": "2025-11-13"
  }
}
```

### 4. 文件命名规则

GitHub Releases 下载 URL 格式：
```
https://github.com/Bupoo123/CaseWriter/releases/download/v1.0/文件名
```

**注意事项**：
- 文件名中的空格会被保留，但建议使用下划线或连字符
- 特殊字符需要 URL 编码
- 文件名区分大小写
- 建议使用英文文件名，避免中文文件名可能出现的编码问题

### 5. 批量上传脚本（可选）

如果需要上传大量文件，可以使用 GitHub CLI：

```bash
# 安装 GitHub CLI
brew install gh

# 登录
gh auth login

# 创建 Release 并上传文件
gh release create v1.0 \
  --title "CaseWriter Templates v1.0" \
  --notes "首次发布模板和案例库" \
  /path/to/file1.pdf \
  /path/to/file2.docx \
  ...
```

或者使用 GitHub API：

```bash
# 创建 Release
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Accept: application/vnd.github.v3+json" \
  https://api.github.com/repos/Bupoo123/CaseWriter/releases \
  -d '{
    "tag_name": "v1.0",
    "name": "CaseWriter Templates v1.0",
    "body": "首次发布模板和案例库"
  }'

# 上传文件（需要 Release ID）
curl -X POST \
  -H "Authorization: token YOUR_GITHUB_TOKEN" \
  -H "Content-Type: application/pdf" \
  --data-binary @file.pdf \
  https://uploads.github.com/repos/Bupoo123/CaseWriter/releases/RELEASE_ID/assets?name=file.pdf
```

## 文件组织建议

### 方案A：扁平化结构（推荐）

将所有文件放在 Release 根目录，文件名包含路径信息：

```
Release v1.0/
├── Checklist_2013_CARE_Checklist-英文.docx
├── Checklist_2013_CARE核对清单-中文.docx
├── 杰毅 case_Hu等-2024-Severe_Fever_with_Thrombocy.pdf
└── ...
```

优点：简单直接，下载URL清晰

### 方案B：打包为 ZIP

将相关文件打包为 ZIP 文件：

```
Release v1.0/
├── checklists.zip (包含所有清单文件)
├── guidelines.zip (包含所有指南文件)
├── published-cases.zip (包含所有已发表案例)
└── classic-cases.zip (包含所有经典案例)
```

优点：减少文件数量，但需要用户解压

### 方案C：按分类打包（推荐用于大量文件）

```
Release v1.0/
├── checklists-v1.0.zip
├── guidelines-v1.0.zip
├── published-cases-v1.0.zip
└── classic-cases-v1.0.zip
```

## 更新流程

1. **更新文件**：修改本地文件
2. **更新 templates.json**：更新文件列表和元数据
3. **创建新 Release**：使用新的版本号（如 v1.1）
4. **更新 releaseInfo**：在 templates.json 中更新版本号和下载URL
5. **提交代码**：将更新的 templates.json 提交到仓库

## 文件大小限制

- GitHub Releases 单个文件限制：**2GB**
- 建议单个文件不超过 100MB（下载体验更好）
- 如果文件很大，考虑使用 ZIP 压缩

## 下载速度优化

- GitHub Releases 使用 CDN，全球访问速度较快
- 如果文件很大，可以考虑：
  1. 使用压缩（ZIP）
  2. 分多个 Release 发布
  3. 使用云存储（如方案1）

## 故障排查

### 问题1：文件下载404

**原因**：
- 文件名不匹配
- Release 版本号不对
- 文件未上传到 Release

**解决**：
- 检查 `templates.json` 中的文件名
- 检查 Release 中实际的文件名
- 确保版本号匹配

### 问题2：中文文件名乱码

**原因**：浏览器编码问题

**解决**：
- 使用英文文件名
- 或确保文件名 URL 编码正确

### 问题3：文件太大下载慢

**解决**：
- 使用 ZIP 压缩
- 考虑使用云存储方案

## 自动化建议

可以创建一个脚本来自动化 Release 创建和文件上传：

```bash
#!/bin/bash
# create-release.sh

VERSION="1.0"
REPO="Bupoo123/CaseWriter"

# 创建 Release
gh release create "v${VERSION}" \
  --title "CaseWriter Templates v${VERSION}" \
  --notes "模板和案例库 v${VERSION}" \
  --repo "${REPO}"

# 上传文件
for file in /path/to/files/*; do
  gh release upload "v${VERSION}" "$file" --repo "${REPO}"
done
```

## 参考链接

- [GitHub Releases 文档](https://docs.github.com/en/repositories/releasing-projects-on-github/managing-releases-in-a-repository)
- [GitHub CLI 文档](https://cli.github.com/manual/)
- [GitHub API - Releases](https://docs.github.com/en/rest/releases/releases)

