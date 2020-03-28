---
title: 版本控制-git
date: 2020-03-28 12:17:11
categories: git
tags: 版本控制
---

# 1. git 的作用

- 版本控制
- 协同开发

# 2. 文件的状态

- untracked  (新建的文件)
- unmodified  （提交后进入仓库的文件与当前文件相同，即没修过）
- modified  (commit 之前)
- staged  （commit 之后）

# 3. 一般使用流程

#### 初始化仓库
- `git init`

#### 变更的文件加入暂存区
- `git add .`

#### 提交变更
- `git commit -m`

#### 查看commit日志, 并返回某一次提交的版本
- `git log`   (### 弹出commit id)
- `git reset 7hdadsu2qe21e921821e --hard`
- 如果想恢复最新的   ` git  relog`

#### 从暂存区 移除某些文件（add 的文件有多余）
- `git reset <fileName>`

# 4. 分支合作管理

- 创建分支
    - `git checkout -b <分支name> <template继承的commit,默认当前> `
- 切换分支
    - `git checkout master`
- 查看所有分支
    - `git branch `
- 合并分支的变更（合并到当前master）
    - `git meger  branch-2  `
    - 有冲突时，会提示======

# 5. remote 仓库的使用

- 下载远端仓库到本地
  
    - `git clone  ......git`
    
- 创建本地的分支
  
    - `git checkout -b local-A`
    
- 在远端仓库设置分支(第一次需要)
  
    - `git push -set-upstream origin local-A`
    
- 提交本地分支到远端
  
    - `git push `
    
- 第一次拉取远端仓库的分支，到本地
    - `git fetch`    
    - `git checkout -b <name> `origin` <template继承的commit,默认当前> `
    
- 以后再从远端更新本地
  
    - `git pull ` （自动fetch + merge）  
    
    

# 其他命令

- `git merge`
- `git pull`
- `git fetch`
- `git rebase` （版本合并时。。）

 

