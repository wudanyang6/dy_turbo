---
{"dg-publish":true,"permalink":"/000 inbox/python 虚拟环境/","noteIcon":"2","created":"2025-02-26T14:57:27+08:00","updated":"2025-03-28T15:14:28+08:00"}
---


# python 虚拟环境

venv： python 内置的模块，用于创建隔离的python环境

Conda：一个开源的包管理系统和环境管理系统，用于安装多种包，且可以创建多个独立的环境

## venv

jetbrains 会自动创建 venv 环境

vscode中，需要执行命令`Python: Create Environment` 进行创建

创建完之后，会在项目根目录创建一个文件夹 `.venv` 

```sh
# 终端开启虚拟环境
source .venv/bin/activate
# 安装依赖， -i 使用镜像
pip3 install -r requirements.txt -i 镜像源 https://pip.baidu-int.com/simple/
```

vscode 的python扩展会在打开内置terminal的时候自动加载虚拟环境

![594](/img/user/attachs/Pasted image 20250328151348.png)

## 参考

[Python虚拟环境venv（和我一起玩Python）_哔哩哔哩_bilibili](https://www.bilibili.com/video/BV1eM411D7rR/?spm_id_from=333.337.search-card.all.click&vd_source=cdeb63885c1e7687c8d443ba7d3f4fd9)