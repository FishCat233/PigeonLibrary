---
tags:
  - Cookie
  - Session
  - Token
  - Http
---
## Cookie
http是无状态的——意味着服务器不知道每一次http请求时用户端的状态情况。

而Cookie的出现，便使得http可以有「状态」。

Cookie的原理大致如下：
1. 客户端向服务器发送http请求
2. 服务器响应请求，并且在响应标头中设定[`Set-Cookie`](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers/Set-Cookie)响应头
3. 客户端收到`Set-Coookie`并设置Cookie（需要指出，Cookie的存储形式是键值对，或者又叫字典）
4. 此后每次客户端发送http请求的时候都在请求头附上设置好的Cookie

大致如图
![[Pasted image 20250226185849.png]]

可以发现，Cookie即可以成为http的「状态」——根据不同的Cookie，服务器可以返回不同的网页内容。

## Session
