---
created: "2026-03-16"
updated: "2026-03-16"
---
由于游戏开发，遇到了需要 LFS 来存储素材的场景，但是某站点网络状况简直一言难尽，又因为各种原因不想自建 git，于是选择了折中的方案——自建一个 LFS 服务器。

吉米你推荐了 Giftless (python) 和 Rudolfs (rust)，出于对 Rust 的好奇以及 star 数的领先，我选择了 Rudolfs。

链接在这：[jasonwhite/rudolfs: A high-performance, caching Git LFS server with an AWS S3 and local storage back-end.](https://github.com/jasonwhite/rudolfs)

## 部署

虽然 `README.md` 看得我一懵一懵的，但是通过 *俺寻思* 之力结合 README.md 表达的意思，摸索出了一个可行的部署方法。

我直接复制了仓库的 `docker-compose.yml`，由于是本地存储，所以复制的是 `docker-compose.local.yml`。

复制到服务器单独的文件夹里，然后简单按照 README.md 创建了 `.env` 文件并配置了`LFS_ENCRYPTION_KEY`，最后 `docker compose up -d` 完成。

最后在客户端（也就是 git）这边配置 lfs 服务器的地址（记得先`git install lfs` 安装 lfs）。

正常配置好 `.lfsconfig` ``

然后直接爽爽推送。

## 坑

### 8081

其实是我的问题，一开始没仔细看，以为在 `8080` 端口运行，结果后面看了眼 `docker-compose.yml`，发现是 `8081` 端口。

### lock verify

这个服务器不支持 `lock verify`，会有这样的字样：

```bash
$ git push origin main

Pushing to github.com:xxx/xxxx.git
Remote "origin" does not support the Git LFS locking API. Consider disabling it with:
  $ git config lfs.http://i.p.h.e.r.e/api/xxx/xxxx.locksverify false
batch response: Post "http://i.p.h.e.r.e/api/xxx/xxxx/objects/batch": proxyconnect tcp: EOF
error: failed to push some refs to 'github.com:xxx/xxxx.git'
```

其实提示已经写清楚了，用命令配置一下吧 `locksverify` 禁用了就行。

注意更换命令中的 IP 地址。

```bash
git config lfs.http://i.p.h.e.r.e/api/xxx/xxxx.locksverify false
```

## End

之后就是爽爽使用。