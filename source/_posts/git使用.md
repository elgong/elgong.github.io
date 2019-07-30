---
title: eclipse-and-github
date: 2019-01-19 22:28:19
categories: git
tags: git
---
# 内容概要


- `本地`  首次上传到  `github`
- `本地`  更新到   `github`
- `github` 首次下载到  `本地`
- `github`  更新到  `本地`

## 本地首次上传到 **github**
1. 进入 `github官网`，选择 `New repository`


2. 复制地址  `http:XXXXXXXXXX.git`


3. `本地` 右键自己的项目文件夹，选择 `git bash here`


4. 克隆 `github` 仓库到本地(执行如下命令), 会在本地产生一个 github 上仓库同名的文件夹 `XXX`，<code>将工程所有内容移入文件夹内</code>

	`git clone http:XXXXXXXXXX.git`

5.  `cd XXX`, 进入该目录，执行以下操作：

	
	git add .  

	// git status   

	git commit -m "此次提交的备注信息"

	git push -u origin  master


## 本地更新到 github

方法与上节中的5一致。


## 首次下载到本地

`git clone http:XXXXXXXXXX.git`

## 更新到本地

`git pull`
	


