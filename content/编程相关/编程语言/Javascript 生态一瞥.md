---
created: "2026-03-27"
updated: "2026-03-27"
---
## 语言标准
*准确说，ECMAScript 是一种语言规范，而 Javascript 实现了这种规范。*

Javascript 的标准由 **ECMA 国际** 的 **TC39** 技术委员会 维护，Javascript 是 **ECMAScript**（简称 ES）标准的一种实现。ES 标准版本号从 ES5（2009）到 ES6（2015，大改版），之后改为按年命名：ES2016、ES2017等等，目前最新的是 ES2026。

- **ES5**：基础，至今很多兼容性代码仍以它为目标。
- **ES6 / ES2015**：现代 JavaScript 的基石，引入了 `class`、`let/const`、箭头函数、模块、Promise 等。
- **ESNext**：泛指尚未正式发布的候选特性，通常通过 Babel 等工具提前使用。

新特性通过 **TC39 提案流程** 推进，分为 stage 0~4，stage 4 才会被纳入下一年标准。

模块化方面，CommonJS（`require`）和 ES Module（`import/export`）两种模块化规范并存，现在新项目大多直接使用 ES Module，Node.js 从 12 开始原生支持，并在 package.json 中用 `"type": "module"` 声明。*建议新的直接使用 ES Module 来写。*

## 引擎 / 运行时环境
*引擎是运行代码的，运行时环境在包装引擎的基础上加了其他功能。*

JavaScript 的引擎是语言的核心实现，负责解析、编译和执行 JS 代码。

主流引擎：
- V8（Google）：Chrome、Node.js、Deno、Bun 的底层引擎，性能极强，采用 JIT 编译。
- SpiderMonkey（Mozilla）：Firefox 的引擎，也是 JS 的第一个引擎。
- JavaScriptCore（Apple）：Safari 的引擎，也叫 Nitro。
- Hermes（Facebook）：专为 React Native 优化的轻量引擎，支持预编译字节码。

而运行时环境则在引擎之上还会提供额外的 API（如文件系统、网络等）。

主流的 Javascript 运行时环境：
- Node.js：基于 V8 的服务端运行时，拥有庞大的 npm 生态。
- Deno：同样基于 V8，由 Node 之父创建，原生支持 TypeScript，强调安全（默认无文件/网络权限）。
- Bun：新兴的“一体化”运行时（基于 JavaScriptCore），内置打包器、包管理器，速度极快。
- 浏览器：各浏览器引擎本身就是完整的 JS 运行环境，并提供 DOM、BOM 等 API。

通常，前端开发直接跑在浏览器引擎上，后端 / 工具链则是在 Node / Deno / Bun 等运行时环境上。

## 包管理
*没有版本答案。*

- npm：Node.js 默认包管理器，全球最大开源注册表。
- yarn：Facebook 推出的改进版，早期以速度和确定性 lockfile 胜出。
- pnpm：现代选择，通过硬链接节省磁盘空间，严格隔离依赖。

包源（registry）主要是 npm registry，也有公司内部私有源（如 Verdaccio）。

*pnpm 还是挺香的，npm 包管理下的 node_module 实在是太难蚌了。可惜 pnpm 并不是适合所有项目。*

不过不管用哪个，都会有一个 `lockfile` 这样的东西来锁定版本。

## 格式化器 / 代码检查

- Prettier：主流代码格式化器，支持配置规则。*还可以格式化 JavaScript、TypeScript、CSS、HTML、Vue。*
- ESLint：代码检查（linter），可配置规则，常与 Prettier 配合使用。
- Biome：Rust 编写新兴工具，集格式化、lint 代码检查于一体，旨在替代 ESLint + Prettier。

*常见的组合是 Prettier + ESLint.*

## 项目和依赖管理
*我个人比较推荐是 pnpm 管理依赖， Vite 构建， ESLint + Prettier 负责代码规范。*

比较传统的是 `npm` 进行包管理，用 `package.json` 声明依赖。新一点的是 `pnpm` 进行包管理（能降低磁盘占用同时解决幽灵依赖问题），或者用 `yarn` 也行。

构建工具方面：
- Vite：现代前端构建工具，基于 esbuild 预打包依赖，开发时极速热更新，生产构建用 Rollup，配置简单。
- Webpack：老牌构建工具，配置复杂但生态成熟，仍在许多项目中服役。
- Bun：如果使用 Bun 运行时，它内置了包管理、打包、运行一体化，可以完全替代 npm + Vite。

TypeScript 支持方面：
- tsx：基于 esbuild 的 TypeScript 执行器，快速。
- ts-node：传统 TypeScript 执行器，与 Node.js 深度集成。
- bun：原生支持运行 `.ts` 文件。

*虽然很乱但会一个 `pnpm create vite` 然后自己选 vue/react 也够用了。*

## 额外的 TypeScript

TypeScript 是 JS 的超集，增加了静态类型。它没有自己的运行时，而是编译成 JavaScript 执行。

- 几乎所有现代大型前端项目都采用 TypeScript。
- 工具链大多原生支持 TS（如 Vite、Bun、tsx），不需要额外配置。
- 核心配置文件 `tsconfig.json` 控制编译目标、严格模式等，推荐开启 `"strict": true`。

类型定义文件（`.d.ts`）用于描述已有 JS 库的类型，社区通过 `@types/xxx` 提供。

*如果没有类型定义文件的话那就是无 ts 版本的库了。*