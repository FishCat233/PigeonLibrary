---
created: 2026-02-09
updated: 2026-05-11
---
Fisher-Yates 算法用于随机排列数组元素。

其做法很简单，先随机抽取一个，然后从剩余没被抽取的元素中继续抽取。在实现好的情况下，这个算法可以**原地**排序。

完。

哦，写点代码吧。

```csharp
using System;  
using System.Collections.Generic;  
using System.Linq;  
using Random = UnityEngine.Random;  
  
namespace FishONU.Utils  
{  
    public static class Algorithm  
    {  
        public static void FisherYatesShuffle<T>(this IList<T> list)  
        {            
            for (int i = 0; i < list.Count; i++)  
            {                
                var j = Random.Range(0, i + 1);  
                (list[j], list[i]) = (list[i], list[j]);  
            }  
        }
    }  
}
```

```Python
import random

def shuttle(lst: list[any]) -> list[any]:
    for i, v in enumerate(lst):
        e = random.randint(0,i)
        lst[e], lst[i] = lst[i], lst[e]
    return lst
```

完。