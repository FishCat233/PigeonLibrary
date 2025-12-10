---
created: 2025-03-31
updated: 2025-03-31
---
argparse 适用于命令行参数的解析，例如常用的

```
run --help
```

就可以解析 --help 参数，并进行相关的操作。

## 指定参数和参数类型

基本的参数。

``` python
import argparse # 导入包

parser = argparse.ArgumentParser() # 添加参数解析器

parser.add_argument("echo", help="打印你输入的字符串") # 添加 echo 参数（对应命令行 python exe.py echo），并添加说明（供 --help 使用）

args = parser.parse_args() # 解析参数并存储到变量 args

# 使用参数
print(args.echo)
```

指定参数的类型。

```python
import argparse # 导入包

parser = argparse.ArgumentParser()

parser.add_argument("square", help="返回输入的平方", type=int) # 默认的命令行参数类型是str，指定type后就能自动转换类型。

args = parser.parse_args() # 解析参数并存储到变量 args

print(args.square**2)
```

## 可选参数和旗标Flag
原理很简单，判断参数是否为 None 就行。

```python
import argparse # 导入包

parser = argparse.ArgumentParser() # 添加参数解析器

parser.add_argument("--verbosity", help="increase output verbosity")

args = parser.parse_args() # 解析参数并存储到变量 args

if args.verbosity: # 判断参数是否为 None
    print("verbosity turned on")
```

可以将其作为一个旗标（如果有这个参数就是True，没有就是False）。通过 `action="store_true"` 来指定。

```python
import argparse # 导入包

parser = argparse.ArgumentParser() # 添加参数解析器

parser.add_argument("--verbose", help="increase output verbosity",
                    action="store_true")

args = parser.parse_args() # 解析参数并存储到变量 args

if args.verbosity: # 判断参数是否为 None
    print("verbosity turned on")
```

## 缩写版本（短选项）
很简单。

```python
import argparse # 导入包

parser = argparse.ArgumentParser() # 添加参数解析器

parser.add_argument("-v", "--verbose", help="increase output verbosity",
                    action="store_true")

args = parser.parse_args() # 解析参数并存储到变量 args

if args.verbose: # 判断参数是否为 None
    print("verbosity turned on")
```

## 其他
action count类似store_true，用来统计特定选项出现的次数。

```python
import argparse
parser = argparse.ArgumentParser()

parser.add_argument("square", type=int,
                    help="display the square of a given number")
parser.add_argument("-v", "--verbosity", action="count",
                    help="increase output verbosity")

args = parser.parse_args()

answer = args.square**2
if args.verbosity == 2:
    print(f"the square of {args.square} equals {answer}")
elif args.verbosity == 1:
    print(f"{args.square}^2 == {answer}")
else:
    print(answer)
```

```bash
$ python prog.py 4
16
$ python prog.py 4 -v
4^2 == 16
$ python prog.py 4 -vv
the square of 4 equals 16
$ python prog.py 4 --verbosity --verbosity
the square of 4 equals 16
$ python prog.py 4 -vvv
16
```

default 可以指定参数的初始值。

```python
import argparse
parser = argparse.ArgumentParser()

parser.add_argument("square", type=int,
                    help="display the square of a given number")
parser.add_argument("-v", "--verbosity", action="count", default=0,
                    help="increase output verbosity")

args = parser.parse_args()

answer = args.square**2
if args.verbosity == 2:
    print(f"the square of {args.square} equals {answer}")
elif args.verbosity == 1:
    print(f"{args.square}^2 == {answer}")
else:
    print(answer)
```

choices 可以指定可选的值（类似枚举）

```python
import argparse
parser = argparse.ArgumentParser()
parser.add_argument("square", type=int,
                    help="display a square of a given number")
parser.add_argument("-v", "--verbosity", type=int, choices=[0, 1, 2],
                    help="increase output verbosity")
args = parser.parse_args()
answer = args.square**2
if args.verbosity == 2:
    print(f"the square of {args.square} equals {answer}")
elif args.verbosity == 1:
    print(f"{args.square}^2 == {answer}")
else:
    print(answer)
```

## 参考
- [argparse 教程 — Python 3.13.2 文档](https://docs.python.org/zh-cn/3/howto/argparse.html)