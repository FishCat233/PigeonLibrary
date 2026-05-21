---
created: 2026-04-26
updated: 2026-04-26
---
> [!WARNING]
> 本文使用 AI 生成，人类校对，如有反感请勿阅读。
> 

*写测试是程序员的自我修养——虽然很多时候我们都是「先写代码，后补测试」，甚至「只写代码，不写测试」。咳咳，但这不是好习惯。*

## pytest：现代 Python 测试框架

**pytest** 是 Python 生态中最流行的测试框架。相比 Python 内置的 **unittest**，pytest 提供了更简洁的语法、更强大的功能和更丰富的插件生态。

### 简单测试

pytest 的测试用例写起来非常直观——就是普通的 Python 函数，只要函数名以 `test_` 开头即可：

```python
# test_math.py

def test_addition():
    assert 1 + 1 == 2

def test_subtraction():
    assert 5 - 3 == 2

def test_list_operations():
    items = [1, 2, 3]
    items.append(4)
    assert len(items) == 4
    assert 4 in items
```

运行测试只需要执行 `pytest` 命令：

```bash
pytest test_math.py
```

pytest 会自动发现并运行所有以 `test_` 开头的函数。如果断言失败，pytest 会给出详细的错误信息，包括变量值和上下文。

### Fixture：测试的「基础设施」

**Fixture** 是 pytest 的核心特性之一，用于为测试提供预设的环境和数据。你可以把它理解为测试的「基础设施」——比如数据库连接、临时文件、测试数据等。

```python
import pytest

@pytest.fixture
def sample_data():
    """提供一个测试用的数据字典"""
    return {
        "name": "Alice",
        "age": 30,
        "hobbies": ["reading", "coding"]
    }

@pytest.fixture
def empty_list():
    """提供一个空列表"""
    return []

def test_sample_data_name(sample_data):
    assert sample_data["name"] == "Alice"

def test_sample_data_age(sample_data):
    assert sample_data["age"] == 30

def test_empty_list_append(empty_list):
    empty_list.append(1)
    assert len(empty_list) == 1
```

Fixture 的优势在于**复用和隔离**。每个测试函数都会获得一个独立的 fixture 实例，避免了测试之间的相互影响。

更强大的用法是**作用域控制**和**清理逻辑**：

```python
import pytest
import tempfile
import os

@pytest.fixture(scope="function")  # 每个测试函数都创建新的 fixture
def temp_file():
    """创建一个临时文件，测试结束后自动清理"""
    fd, path = tempfile.mkstemp()
    yield path  # yield 之前的代码是 setup，之后的是 teardown
    os.close(fd)
    os.unlink(path)

@pytest.fixture(scope="module")  # 整个测试模块只创建一次
def database_connection():
    """模拟数据库连接"""
    conn = create_connection()
    yield conn
    conn.close()
```

*scope 可以是 `function`（默认）、`class`、`module`、`package` 或 `session`，根据实际需求选择。*

### 参数化测试：一次写，多次跑

**参数化测试（parametrize）** 允许你用不同的输入数据运行同一个测试逻辑，避免写大量重复的测试代码：

```python
import pytest

def is_even(n):
    return n % 2 == 0

@pytest.mark.parametrize("number,expected", [
    (2, True),
    (3, False),
    (0, True),
    (-4, True),
    (-3, False),
    (100, True),
])
def test_is_even(number, expected):
    assert is_even(number) == expected
```

上面的代码会生成 6 个独立的测试用例，每个元组都是一组测试数据。如果其中某组数据失败，pytest 会明确指出是哪一组。

参数化也可以用于 fixture：

```python
@pytest.fixture(params=["chrome", "firefox", "safari"])
def browser(request):
    """为每个浏览器运行测试"""
    return Browser(request.param)

def test_homepage_loads(browser):
    browser.navigate("/")
    assert browser.title == "Home"
```

### 测试标记：灵活组织测试

**Markers（标记）** 让你可以给测试打上标签，以便选择性地运行或跳过某些测试：

```python
import pytest

@pytest.mark.slow  # 自定义标记
def test_heavy_computation():
    """这是一个耗时的测试"""
    result = sum(range(10000000))
    assert result > 0

@pytest.mark.skip(reason="功能尚未实现")
def test_future_feature():
    """暂时跳过的测试"""
    pass

@pytest.mark.skipif(
    sys.platform == "win32",
    reason="Windows 不支持此功能"
)
def test_unix_only_feature():
    """只在非 Windows 平台运行"""
    pass

@pytest.mark.xfail(reason="已知 bug，待修复")
def test_known_bug():
    """预期会失败的测试"""
    assert buggy_function() == expected_result
```

运行时可以按标记筛选：

```bash
pytest -m slow          # 只运行标记为 slow 的测试
pytest -m "not slow"    # 跳过 slow 测试
pytest -m "fast or unit" # 运行 fast 或 unit 标记的测试
```

### 配置 pyproject.toml

pytest 的配置可以写在 `pyproject.toml` 中，保持项目配置的一致性：

```toml
[tool.pytest.ini_options]
minversion = "7.0"
testpaths = ["tests"]
python_files = ["test_*.py", "*_test.py"]
python_classes = ["Test*"]
python_functions = ["test_*"]
addopts = "-v --tb=short --strict-markers"
markers = [
    "slow: marks tests as slow (deselect with '-m \"not slow\"')",
    "integration: marks tests as integration tests",
    "unit: marks tests as unit tests",
]
filterwarnings = [
    "ignore::DeprecationWarning",
]
```

常用选项说明：

- `-v`：详细输出，显示每个测试的名称和结果
- `--tb=short`：失败时显示简短的 traceback
- `--strict-markers`：未注册的标记会报错，防止拼写错误
- `--cov=src`：启用覆盖率检查（需要 pytest-cov 插件）

### 并行测试

当测试数量很多时，可以使用 **pytest-xdist** 插件并行运行测试：

```bash
pip install pytest-xdist

pytest -n auto      # 自动检测 CPU 核心数并并行
pytest -n 4         # 指定使用 4 个进程
pytest -n auto --dist=loadfile  # 按文件分配测试
```

*注意：并行测试要求测试之间完全独立，不能共享状态。*

## coverage：代码覆盖率检查

**代码覆盖率**衡量的是测试执行时覆盖了多少源代码。它不能证明代码没有 bug，但能帮助发现**未被测试到的代码路径**。

### 基本使用

coverage 是 Python 标准库之外的独立工具：

```bash
pip install coverage
```

基本工作流程：

```bash
# 1. 运行测试并收集覆盖率数据
coverage run -m pytest

# 2. 查看报告
coverage report              # 终端文本报告
coverage html                # 生成 HTML 报告（推荐）
coverage json                # JSON 格式，用于 CI 集成
```

HTML 报告会生成在 `htmlcov/` 目录下，打开 `htmlcov/index.html` 可以看到每个文件的覆盖情况，甚至能逐行查看哪些代码被覆盖、哪些没有。

### 配置 .coveragerc

coverage 的行为可以通过 `.coveragerc` 或 `pyproject.toml` 配置：

```toml
[tool.coverage.run]
source = ["src", "mypackage"]  # 要统计的源代码目录
omit = [
    "*/tests/*",
    "*/test_*",
    "*/__pycache__/*",
    "*/venv/*",
]
branch = true  # 启用分支覆盖率（检查 if/else 的所有分支）

[tool.coverage.report]
exclude_lines = [
    "pragma: no cover",
    "def __repr__",
    "raise AssertionError",
    "raise NotImplementedError",
    "if __name__ == .__main__.:",
]
show_missing = true  # 显示未覆盖的行号
fail_under = 80      # 覆盖率低于 80% 时返回非零退出码

[tool.coverage.html]
directory = "htmlcov"
```

*分支覆盖率（branch coverage）比语句覆盖率更严格——它会检查条件语句的每个分支是否都被执行到。*

## pytest 与 coverage 结合

手动先运行 coverage 再运行 pytest 比较繁琐，**pytest-cov** 插件让两者无缝集成：

```bash
pip install pytest-cov
```

安装后，pytest 新增 `--cov` 选项：

```bash
# 基本用法
pytest --cov=mypackage

# 生成 HTML 报告
pytest --cov=mypackage --cov-report=html

# 生成终端报告 + HTML 报告
pytest --cov=mypackage --cov-report=term --cov-report=html

# 设置覆盖率阈值，低于则失败
pytest --cov=mypackage --cov-fail-under=80

# 查看未覆盖的代码行
pytest --cov=mypackage --cov-report=term-missing
```

在 `pyproject.toml` 中配置 pytest-cov：

```toml
[tool.pytest.ini_options]
addopts = "--cov=src --cov-report=term-missing --cov-fail-under=80"
```

这样每次运行 `pytest` 时都会自动检查覆盖率。

## 在 CI/CD 中使用

覆盖率检查非常适合集成到 CI/CD 流程中，确保代码质量不会随时间退化：

```yaml
# .github/workflows/test.yml 示例
name: Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-python@v5
        with:
          python-version: "3.11"

      - name: Install dependencies
        run: pip install pytest pytest-cov

      - name: Run tests with coverage
        run: pytest --cov=src --cov-report=xml

      - name: Upload coverage to Codecov
        uses: codecov/codecov-action@v3
        with:
          file: ./coverage.xml
```

*Codecov、Coveralls 等服务可以提供更丰富的覆盖率分析，包括覆盖率变化趋势、PR 覆盖率对比等。*

## 小结

- **pytest** 是 Python 测试的首选框架，fixture、参数化、标记等特性让测试编写和维护变得轻松
- **coverage** 帮助你发现未被测试覆盖的代码，但记住「高覆盖率 ≠ 高质量测试」
- **pytest-cov** 让两者结合使用更加方便
- 将覆盖率检查集成到 CI/CD 中，可以防止代码质量随时间退化

*最后说句实话：测试写得再好，也不如写代码时多想想边界情况。但测试至少能保证——当你下次重构时，不会把原本能跑的功能搞坏。*
