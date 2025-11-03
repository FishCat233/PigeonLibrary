---
created: "2025-10-25"
updated: "2025-10-25"
---
> *最讨厌 python 的动态类型和无声明。
> 
> ——鸽子 2025/10/25*

[typing --- 对类型提示的支持 — Python 3.14.0 文档](https://docs.python.org/zh-cn/3/library/typing.html#)

所以要写多多标记变量 `type`，不然在大项目不知道类型就要吃亏。
- 没有类型提示
- 写错也没提示
- 看不懂别人代码

需要知道的是 `typing hinting` 本质上还是 **标注**，所以并不是真的会强制进行类型检查，比如说下面的代码实际上可以运行。

```python

def get_text():
	a: str = 1 # 虽然标记为 str，但是实际上是 int
	return a
	
string = get_text() # 调用代码的时候 IDE 类型推导 string 也应该是 str 类型，然鹅实际上是 int
```

乱标记后面报错就老实了。

> [!WARNING]
> 本文大写的类型标注都来自于 `typing` 模块。小写的类型是已经内置的类型。
> 
> 此外 `T` 代表可以用其他类型替代。

## No Pain

常见的基本类型就 `float` `int` `str` 之类这种。`class` 定义的类型也可以是类型的一种。

```python
a: str = 'abs'

def sum(a: int, b: int) -> int:
	return a + b;
```

## Mild

稍微复杂点的是 `collections` 集合类型。比如说 `dict` `list` 等。

一般可以用 `[]` 来进行具体的类型指定，比如说 `dict[str, int]` 代表 key 为 str 类型，value 为 int 类型的字典。 *可以类比 C++ 的 <>*

```python
a: list[str] = [1,2,3]
b: dict[str, float] = {"apple": 0.75, "banana": 1.25}
c: tuple[int, ...] = (1, 2, 3) # ... 意思就是后面的和前面的一样 tuple[int, int, int]
d: set[int] = {101, 102, 103}
```

有一个 TypedDict 也不错，使用类来定义字典的类型。

```python
from typing import TypedDict, List

# 1. 定义 TypedDict 结构
class UserProfile(TypedDict):
    """
    定义一个字典接口，必须包含 'name' 和 'age' 两个键。
    默认情况下，所有声明的键都是必需的 (required=True)。
    """
    name: str
    age: int
    # 也可以定义可选的键（需要 Python 3.11+ 或使用 NotRequired/Required）
    # is_active: bool  # 假设是必需的
    hobbies: List[str] # 假设是必需的

# 2. 使用 TypedDict 作为函数参数的类型约束
def process_user_data(user_data: UserProfile) -> str:
    """
    接受符合 UserProfile 结构的字典作为参数。
    """
    if user_data['age'] >= 18:
        return f"{user_data['name']} 是一个成年人。"
    else:
        return f"{user_data['name']} 是一个未成年人。"

# 3. 传入符合条件的字典 (运行时是一个普通的 dict)
valid_user = {
    'name': 'Alice',
    'age': 25,
    'hobbies': ['reading', 'coding']
}
print(process_user_data(valid_user))
# 输出: Alice 是一个成年人。

# 4. 静态类型检查示例（不会在运行时报错，但 mypy 会捕获）：
# invalid_user_missing_key = {
#     'name': 'Bob',
#     'age': 30
#     # 缺少 'hobbies' 键，mypy 会报错
# }
# process_user_data(invalid_user_missing_key) 

# invalid_user_wrong_type = {
#     'name': 'Charlie',
#     'age': 'twenty', # 值的类型错误，mypy 会报错
#     'hobbies': ['hiking']
# }
# process_user_data(invalid_user_wrong_type)
```

## Moderate

### 集合类型

typing 模块有很多很好用的类型。

- `Option[T]`: 要么是 T 类型，要么是 None
- `Union[T1, T2, ...]`: 类型是 `T1, T2, ...` 其中一个。上面的 `Option[T]` 等同 `Union[T, None]`
- `Any`：任何类型，相当于不标注类型。（慎用）
- `Callable[[T1, T2, ...], T3]`: 可调用的对象（例如函数），其中 `T1, T2, ...` 是参数列表，`T3` 是返回类型。
- `Literal[v1, v2, ...]`: 只会是其中一个字面值。

### 类型别名

用 `type` 标注类型别名。

```python
type Vector = list[float]

def scale(scalar: float, vector: Vector) -> Vector:
    return [scalar * num for num in vector]

# 通过类型检查；浮点数列表是合格的 Vector。
new_vector = scale(2.0, [1.0, -4.2, 5.4])
```

`type` 语句是 3.12 加的，如果要向下兼容可以用 `Vector = list[float]` 直接赋值。

### NewType

可以用 NewType 创建与原类型不同的类型。

```python
from typing import NewType

UserId = NewType('UserId', int)
some_id = UserId(524313)
```

```python
def get_user_name(user_id: UserId) -> str:
    ...

# 通过类型检查
user_a = get_user_name(UserId(42351))

# 未通过类型检查；整数不能作为 UserId
user_b = get_user_name(-1)
```

### TYPE_CHECKING

一个在类型检查时会被检查器当成 `True`

### 类对象类型

`type[T]` 表示 class T 的类型。（类型本身，而非实例）

## Severe

### 懒加载

在遇到定义同时需要类型注解的时候会产生先有鸡还是先有蛋的问题。

为此，使用 `from __future__ import annotations` 解决。在使用后，类型检查会推迟到文档定义完才进行。

### 为了类型提示而导致循环引用

本身只想导入模块来获取类型提示，但是两个模块互相需要类型的话，就会产生循环引用。

为此，可以用下面这个小巧思。

```python
from __future__ import annotaions
from typing import TYPE_CHECKING

if TYPE_CHECKING:
	from module_a import ClassA
```

这样在实际运行时不会导入模块，而在类型检查时检查器会进行类型导入。

## Very Severe

### Generic 泛型

懒得写。

```python
from __future__ import annotations

from collections.abc import Mapping
from typing import Iterable, Protocol, TypeVar

T = TypeVar('T')


class Addable[T](Protocol):
    def __add__(self: T, other: T) -> T: ...


def sum[T: Addable](a: T, b: T) -> T:
    return a + b


def print_iter(iterable: Iterable) -> None:
    for item in iterable:
        print(item)


def print_map(mapping: Mapping) -> None:
    for key, value in mapping.items():
        print(key, value)
```

## Worst Pain Possible

pass