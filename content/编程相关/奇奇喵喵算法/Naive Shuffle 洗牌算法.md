---
created: "2026-02-09"
updated: "2026-02-09"
---
别笑，写完隔壁 Fisher-Yates Shuttle 算了一下发现不对，原来是写错了哈哈。

```csharp
public void FisherYatesShuttle<T>(List<T> lst) {
    for (int i = 0; i < lst.Count; i++) {
        int r = Random.Range(0, lst.Count);
        (lst[r], lst[i]) = (lst[i], lst[r]);
    }
}
```