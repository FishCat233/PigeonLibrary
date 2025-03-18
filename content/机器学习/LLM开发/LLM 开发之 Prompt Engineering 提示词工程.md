好的提示词可以得到好的结果。

经典的提示词如下：
```
Answer the question based on the context below. If the  
question cannot be answered using the information provided answer  
with "I don't know".  
  
Context: Large Language Models (LLMs) are the latest models used in NLP.  
Their superior performance over smaller models has made them incredibly  
useful for developers building NLP enabled applications. These models  
can be accessed via Hugging Face's `transformers` library, via OpenAI  
using the `openai` library, and via Cohere using the `cohere` library.  
  
Question: Which libraries and model providers offer LLMs?  
  
Answer: 
```

有点像阅读理解题，对吧？实际上就是这样！一个清晰的、明确的好问题可以有效增加LLM回答的质量——毕竟换成人，面对模糊不清的问题我们也很难做出一定能让提问者满意的回答。

上面的提示词可以分为一下几个部分，他们有着各自的职责：
- **指令**：负责告诉模型怎么做——比如怎么分析理解问题，怎么回答。对应上文的第一段。
- **外部信息**：又叫上下文，是来自附加的文段，类似于材料理解题中的材料。对应上文第二段。
- **用户输入**：又叫查询，通常是（也可以不是）人类用户向系统提出的问题。对应上文第三段。
- **输出指示器**：给出要输出的文段开头。