---
created: "2026-07-07"
updated: "2026-07-07"
---
经典的 C++ 懒汉式单例实现方式, 来自 Meyers.

```cpp
//Meyer's Singleton
class Singleton {
public:
    static Singleton& getInstance() {
        static Singleton instance;  // 顺带一提, C++ 11 规定局部静态变量的初始化是线程安全的.
        return instance;
    }

    Singleton(const Singleton&) = delete;
    Singleton& operator=(const Singleton&) = delete;

private:
    Singleton() = default;
    ~Singleton() = default;
};
```

