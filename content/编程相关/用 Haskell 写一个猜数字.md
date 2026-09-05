---
created: "2026-09-05"
updated: "2026-09-05"
---
## 概括

本文面向会编程、但第一次接触 Haskell 的读者：用一个猜数字小程序，感受 Haskell 是怎样组织程序的。Cabal 项目结构、依赖配置和编译运行方式不在本文展开；如果需要从零跑通项目，可以另行研究。

文章按三个部分展开：先观察程序行为，再理解组成它的核心语言构件，最后把这些构件组织成完整的 `Main.hs`。先建立目标，再补齐必要概念，最后完成成品。

## 先看看程序做什么

这个猜数字程序的规则很直接：它会随机生成一个 `1` 到 `100` 之间的整数，然后反复读取用户的猜测。猜大了，提示猜大了；猜小了，提示猜小了；猜中了，就输出目标数字和一共猜了多少次。如果输入根本解析不成数字，程序会要求重新输入，而且这次无效输入不计入猜测次数。

它的运行效果大致是：

```text
Let's play a game, guess number! [1, 100]
50
Your guess is too high!
25
Your guess is too low!
37
Your guess is too low!
40
Your guess is too low!
42
Your guess is too high!
41
You guessed it! The number is 41 and you used 6 times.
```

这段交互可以自然地提出几个问题：怎样从键盘读输入？怎样表示「输入可能解析失败」？怎样表示「大了、小了、猜中」这三种结果？怎样反复猜下去？怎样统计次数？下面先分别解释解决这些问题所需的 Haskell 概念。

## 函数与类型签名

Haskell 程序同样需要函数，但函数不只是「一段可执行代码」。它更强调输入和输出之间的关系。先从一个普通例子看起：

```haskell
square :: Int -> Int
square x = x * x
```

第一行是类型签名，读作：`square` 接收一个 `Int`，返回一个 `Int`。第二行给出函数定义：参数叫 `x`，函数返回 `x * x`。

类型签名不是装饰。它要求你把函数的契约说清楚：它接受什么，返回什么。写 Haskell 时，很多设计会先从类型开始，而不是从控制流开始。

在猜数字程序里，真正需要的一个函数是：

```haskell
stepGuess :: Int -> Int -> GuessResult
```

读法是：接收目标数字和用户猜测这两个 `Int`，返回一个 `GuessResult`。这里还没有给出 `GuessResult` 的定义，但类型签名已经把问题描述出来了：目标值和用户猜测只是数据，判断结果则是另一个明确的类型。

## 自定义类型与模式匹配

猜数字的判断结果不是普通数字，也不是一个字符串。它只有三种情况：

```haskell
data GuessResult
  = Equal
  | GuessTooHigh
  | GuessTooLow
  deriving (Show)
```

这段代码定义了一个新类型 `GuessResult`，它有三个数据构造器：`Equal`、`GuessTooHigh` 和 `GuessTooLow`。它们分别表示猜中、猜大和猜小。

这里的重点不是语法本身，而是表达方式。代码没有用 `0`、`1`、`2` 代表结果，也没有用 `"equal"` 这样的字符串。三种结果在类型层面就是三种不同的值，写代码时不容易把含义弄混。

有了这样的类型，就可以用 `case` 做模式匹配：

```haskell
case result of
  GuessTooHigh -> "too high"
  GuessTooLow  -> "too low"
  Equal        -> "equal"
```

`case` 会检查 `result` 是哪一种情况，然后执行对应分支。这里先让分支返回字符串，避免提前引入输出动作；在最终程序里，这些位置会换成提示用户和继续递归的代码。类型把状态说清楚，模式匹配把状态拆开处理，两者配合得很直接。

## 用 `Maybe` 表达可能失败

用户输入是一行文本，但程序需要一个整数。这个转换并不保证成功：用户可能输入 `abc`，也可能直接按回车。

Haskell 的 `Text.Read` 提供了一个很适合这个场景的函数：

```haskell
readMaybe :: Read a => String -> Maybe a
```

这里不展开 `Read a` 这个约束。只看右侧：`readMaybe` 接收一个字符串，返回 `Maybe a`。在这个程序里，需要明确指定希望得到 `Maybe Int`：

```haskell
let guess = readMaybe line :: Maybe Int
```

`Maybe Int` 有两种可能：

```haskell
Nothing
Just 42
```

`Nothing` 表示没有得到一个整数；`Just 42` 表示成功解析出了整数 `42`。失败不是隐藏起来的异常，也不是一个特殊数字，而是类型中明确写出来的一种情况。

接下来可以继续用模式匹配处理：

```haskell
case guess of
  Nothing -> "invalid input"
  Just _  -> "valid input"
```

`Just _` 中的 `_` 表示这个分支不关心解析出的具体整数，只关心“确实解析成功了”。这里同样先让分支返回字符串；到了最终程序里，`Nothing` 会提示重新输入，`Just num` 会取出数字并继续判断。

`Maybe` 体现了 Haskell 处理错误的一种常见思路：把失败放回类型里，让调用者无法假装失败不存在。

## 用 `IO` 组织输入输出

读取一行输入、输出一段文字，这些动作都不只是「算出某个值」。它们会影响外部世界：程序要等待键盘输入，也要向终端写出内容。Haskell 用 `IO` 类型标记这种带副作用的计算。

这个程序的入口是：

```haskell
main :: IO ()
```

`main` 本身是一个 `IO` 动作，而不是一个普通值。`()` 可以直观理解成「没有有意义的返回结果」。这个程序真正重要的不是 `main` 最后返回了什么值，而是它在执行过程中做了什么。

在 `do` 代码块里，动作可以按顺序组织：

```haskell
main = do
  putStrLn "Let's play a game, guess number! [1, 100]"
  n <- randomRIO (1, 100) :: IO Int
  gameLoop n 0
```

`putStrLn` 会输出一行文字。`randomRIO (1, 100) :: IO Int` 是一个会产生 `Int` 结果的随机数动作。因为目标数字是这个动作的结果，所以使用 `<-`：

```haskell
n <- randomRIO (1, 100) :: IO Int
```

这行可以直观理解为：执行这个 `IO Int` 动作，把得到的整数命名为 `n`。与此不同，`let` 不是执行动作，而是给表达式起名字：

```haskell
let guess = readMaybe line :: Maybe Int
```

这里只是给解析表达式命名，不需要执行输入输出动作，所以用 `let`。

`<-` 与 `let` 背后牵涉的内容并不简单，尤其涉及 `IO`、类型推导和 `do` 代码块的展开方式。本文不进入这些细节，只抓住一个直观区别：`<-` 取出动作的结果，`let` 给普通表达式命名。

## 递归与纯逻辑分离

猜数字需要重复进行：读输入，判断，提示，再读下一行。在命令式语言里，很多人自然想到循环和可变变量：先记录一个猜测次数，猜错就加一，猜中就结束。

Haskell 常用递归表达这种重复。函数每执行一轮，如果没猜中，就再次调用自己：

```haskell
gameLoop target (guessTime + 1)
```

这个调用把目标数字和更新后的猜测次数传给下一轮。这里不是靠修改某个外部变量来保存状态，而是把状态作为函数参数继续传下去。

程序里还有两个函数的职责值得区分：

- `gameLoop`：读取输入、输出提示、递归继续游戏，属于 `IO ()`
- `stepGuess`：只比较两个整数，返回一个 `GuessResult`，是纯函数

`stepGuess` 不读键盘，不写终端，也不依赖外部状态。给它同样的 `target` 和 `guess`，它永远返回同样的结果。这种函数容易理解，也容易测试。

这是本文最值得带走的一点：Haskell 并没有禁止复杂逻辑，它更鼓励把「纯粹的判断」和「带副作用的交互」分开。前者由纯函数处理，后者交给 `IO` 组织。

## 逐步组装程序

核心概念已经具备。接下来按实际写程序的顺序，把代码逐步推导出来。

### 第一步：写出模块和导入

程序入口文件使用 `Main` 模块，并导出 `main`：

```haskell
module Main (main) where
```

还需要两个库能力：

```haskell
import System.Random
import Text.Read
```

`System.Random` 提供随机数，这里用的是 `randomRIO`。`Text.Read` 提供安全解析字符串的 `readMaybe`。

### 第二步：写出程序入口

先写一个最简单的目标：告诉用户游戏开始，然后生成目标数字：

```haskell
main :: IO ()
main = do
  putStrLn "Let's play a game, guess number! [1, 100]"
  n <- randomRIO (1, 100) :: IO Int
  gameLoop n 0
```

`main` 的类型是 `IO ()`，因为它执行输入输出动作，而不是返回一个普通值。`randomRIO (1, 100)` 生成一个随机整数，`:: IO Int` 明确说明这个动作的结果是 `Int`。

最后一行调用 `gameLoop n 0`。这里有两个参数：目标数字 `n`，以及当前猜测次数 `0`。游戏还没开始，所以次数从零开始。

### 第三步：定义游戏结果类型

要判断「大了、小了、猜中」，最好先定义一个结果类型，而不是在代码里到处写字符串：

```haskell
data GuessResult
  = Equal
  | GuessTooHigh
  | GuessTooLow
  deriving (Show)
```

这里补充说明 `deriving (Show)`：它让 `GuessResult` 的值能够被转换成字符串显示。这段代码没有直接打印 `GuessResult`，所以这一行可以删掉；保留它通常是开发时为了方便观察。`deriving` 背后的类型类机制本文不展开。

### 第四步：开始设计递归循环

循环函数有两个输入：目标数字和已经猜了几次。它要做输入输出，所以类型是：

```haskell
gameLoop :: Int -> Int -> IO ()
```

第一个 `Int` 是目标数字，第二个 `Int` 是猜测次数，最后的 `IO ()` 表示它会执行动作，不返回一个有意义的普通值。

函数体可以这样开始：

```haskell
gameLoop target guessTime = do
  line <- getLine
  let guess = readMaybe line :: Maybe Int
```

`getLine` 从终端读取一行输入，因此使用 `<-` 得到字符串。接着用 `readMaybe` 把这一行解析成 `Maybe Int`。

### 第五步：处理解析失败

如果用户输入无法解析成整数，程序不结束，而是提示重新输入，并继续递归：

```haskell
case guess of
  Nothing -> do
    putStrLn "You entered something that can't be resolved as a number. Please guess again."
    gameLoop target guessTime
```

注意这里递归时传入的是原来的 `guessTime`，不是 `guessTime + 1`。原因很直接：这次输入没有得到有效数字，不能算作一次真正猜测。这个细节正好说明递归参数如何承担状态：什么时候增加次数，应该在代码里被明确写出来。

### 第六步：处理解析成功

如果解析成功，`Just num` 中的 `num` 就是用户猜测的整数。此时先调用纯函数判断结果：

```haskell
Just num -> do
  let result = stepGuess target num
```

`stepGuess` 还没有实现，但它的类型已经确定：接收目标值和猜测值，返回 `GuessResult`。这里只负责得到结果，然后继续拆解：

```haskell
case result of
  GuessTooHigh -> do
    putStrLn "Your guess is too high!"
    gameLoop target (guessTime + 1)
  GuessTooLow -> do
    putStrLn "Your guess is too low!"
    gameLoop target (guessTime + 1)
  Equal -> do
    putStrLn
      ( "You guessed it! The number is "
          ++ show target
          ++ " and you used "
          ++ show (guessTime + 1)
          ++ " times."
      )
```

猜大或猜小时，输出提示并进入下一轮，同时把次数加一。猜中时，不再递归，游戏结束。

`show target` 把 `Int` 转换为字符串。`++` 用于拼接多个字符串。最终 `putStrLn` 接收一个完整字符串并输出。

### 第七步：完成纯判断函数

最后实现前面已经确定类型的 `stepGuess`：

```haskell
stepGuess :: Int -> Int -> GuessResult
stepGuess target guess
  | guess > target = GuessTooHigh
  | guess < target = GuessTooLow
  | otherwise = Equal
```

竖线后面是 guards，可以理解为按顺序检查条件：

- 如果 `guess > target`，说明用户猜大了
- 如果 `guess < target`，说明用户猜小了
- 否则两个数字相等

`stepGuess` 没有做输入输出，也没有自己决定下一轮怎么做。它只负责判断。这种职责很窄，也很稳定：比较逻辑放在这里，交互和递归放在 `gameLoop` 里。

到这里，代码已经完整了。它生成随机数字，处理输入失败，判断大小，统计次数，并在猜中时输出结果。每个概念只承担一小部分职责，组合起来就构成了完整程序。

## 完整代码

最终的 `Main.hs` 是：

```haskell
module Main (main) where

import System.Random
import Text.Read

main :: IO ()
main = do
  putStrLn "Let's play a game, guess number! [1, 100]"
  n <- randomRIO (1, 100) :: IO Int
  gameLoop n 0

data GuessResult
  = Equal
  | GuessTooHigh
  | GuessTooLow
  deriving (Show)

gameLoop :: Int -> Int -> IO ()
gameLoop target guessTime =
  do
    line <- getLine
    let guess = readMaybe line :: Maybe Int
    case guess of
      Nothing -> do
        putStrLn "You entered something that can't be resolved as a number. Please guess again."
        gameLoop target guessTime
      Just num -> do
        let result = stepGuess target num
        case result of
          GuessTooHigh -> do
            putStrLn "Your guess is too high!"
            gameLoop target (guessTime + 1)
          GuessTooLow -> do
            putStrLn "Your guess is too low!"
            gameLoop target (guessTime + 1)
          Equal -> do
            putStrLn
              ( "You guessed it! The number is "
                  ++ show target
                  ++ " and you used "
                  ++ show (guessTime + 1)
                  ++ " times."
              )

stepGuess :: Int -> Int -> GuessResult
stepGuess target guess
  | guess > target = GuessTooHigh
  | guess < target = GuessTooLow
  | otherwise = Equal
```

## 按文件顺序走一遍

`module Main (main) where` 声明当前模块是 `Main`，并导出程序入口 `main`。两个 `import` 分别带来随机数生成和字符串安全解析能力。

`main :: IO ()` 给出程序入口的类型。它会执行动作，所以返回类型是 `IO ()`。`putStrLn` 输出游戏提示。`randomRIO (1, 100) :: IO Int` 生成目标数字，`<-` 把这个动作的结果取出来并命名为 `n`。然后 `gameLoop n 0` 进入游戏，初始次数为零。

`GuessResult` 用三个数据构造器表达游戏判断结果。这个类型让三种结果明确区分开，不需要借助数字编码或字符串。

`gameLoop :: Int -> Int -> IO ()` 表示它接收目标数字和猜测次数，执行一系列动作。函数读取一行输入，用 `readMaybe` 得到 `Maybe Int`。`Nothing` 时提示重新输入，并用原来的次数递归；`Just num` 时先调用 `stepGuess`，再对判断结果做模式匹配。

猜大或猜小时，程序输出提示，然后用 `gameLoop target (guessTime + 1)` 进入下一轮。猜中时，程序输出目标数字和总次数。这里使用的是 `guessTime + 1`，因为 `guessTime` 保存的是这次猜测之前已经猜过多少次，而当前这次也应当计入总数。

`stepGuess` 是程序中的纯逻辑部分。它接收两个 `Int`，通过 guards 返回 `GuessResult`。它不读输入、不输出，也不关心游戏是否继续，只负责把两个数比较成三种结果。

这里还有一个容易让新读者疑惑的地方：`gameLoop` 写在 `stepGuess` 之前，却可以调用它。Haskell 的顶层声明不要求按照调用顺序排列，编译器会把它们作为一个整体来检查。因此，把入口和主循环写在前面，把辅助函数写在后面，是完全正常的组织方式。

## 这些概念如何组成完整程序

回头看，这个程序并不长，但每个概念都有明确职责。

类型签名描述了函数契约：`main` 和 `gameLoop` 返回 `IO` 动作，`stepGuess` 返回纯数据结果。`GuessResult` 表达游戏内部的三种状态。`Maybe Int` 表达输入解析可能失败。`case` 把 `Maybe` 和 `GuessResult` 中的不同情况拆出来处理。`IO` 和 `do` 把输入输出动作组织成顺序清晰的流程。递归承担重复执行，并把目标值和猜测次数传给下一轮。纯函数和 `IO` 函数分开，让判断逻辑不被交互细节淹没。

因此，Haskell 在这里体现的重点不是「语法很奇特」，而是「每个部分都有类型上的位置」。程序不是靠隐藏的状态不断推进，而是把状态、失败和结果都写进类型和函数调用里。

## 本文没有展开的内容

本文没有展开 Cabal 项目配置、依赖管理和编译运行，也没有展开 `do` 的底层展开方式、Monad 理论、惰性求值、类型类和随机数库的实现。

这些主题并非不重要，而是超出了本文范围。先写出一个完整程序，知道 `IO`、`Maybe`、模式匹配和递归在代码里长什么样，比一开始就进入抽象理论更容易建立坐标。后续学习自然会追问：`do` 到底是什么？`IO` 为什么能表示副作用？`deriving (Show)` 背后的类型类是什么？这些问题都值得单独讨论。

## 结语

猜数字只是一个足够小的练习，但它恰好能展示 Haskell 的组织方式：用类型描述数据，用纯函数表达判断，用 `Maybe` 明确失败，用 `IO` 组织交互，用递归完成重复。

本文没有覆盖 Haskell 的全貌，也不应该把一个小程序夸大成入门捷径。它只完成一个目标：让还没接触过 Haskell 的程序员看到，这门语言不是把命令式代码换一种语法重写，而是用类型、纯函数和明确的副作用边界，把一个简单程序组织得更清楚。