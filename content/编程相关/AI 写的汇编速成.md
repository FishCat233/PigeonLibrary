---
created: "2025-12-26"
updated: "2025-12-26"
---
## 高级语言特性在汇编层面的表现（CTF速成版）

### 一、核心概念速记

**寄存器基础：**
- EAX/RAX：返回值、累加器
- ESP/RSP：栈指针
- EBP/RBP：基址指针
- EIP/RIP：指令指针
- ESI/RSI、EDI/RDI：源/目的索引

### 二、具体特性对应

#### 1. **变量存储**
```assembly
; 全局变量（数据段）
.data
global_var dd 42

; 局部变量（栈上）
mov [ebp-4], 10      ; int x = 10;
mov byte [ebp-8], 'A' ; char c = 'A';
```

#### 2. **控制结构**
```assembly
; if 语句
cmp eax, 10
jle less_equal       ; if (eax <= 10)
jg greater          ; else

; while 循环
loop_start:
cmp dword [ebp-4], 0
je loop_end
; 循环体
jmp loop_start
loop_end:

; switch-case（跳转表）
mov eax, [ebp-4]     ; switch(x)
jmp [jump_table + eax*4]
```

#### 3. **函数调用（x86-64调用约定）**
```assembly
; 参数传递：RDI, RSI, RDX, RCX, R8, R9，其余栈
; 返回值：RAX
push rbp
mov rbp, rsp
sub rsp, 32         ; 栈空间分配
mov rdi, [rbp+16]   ; 取第一个参数
call function
add rsp, 32         ; 清理栈
pop rbp
ret
```

#### 4. **数据结构**
```assembly
; 数组访问
mov eax, [array + ecx*4]  ; array[i] (int数组)

; 结构体访问
mov eax, [struct + 0]     ; struct.field1
mov ebx, [struct + 4]     ; struct.field2
```

#### 5. **指针操作**
```assembly
lea rax, [var]           ; &var (取地址)
mov rbx, [rax]           ; *ptr (解引用)
```

### 三、CTF重点场景

#### 1. **栈溢出漏洞识别**
```assembly
; 危险函数调用
sub rsp, 0x20          ; 只分配32字节
lea rdi, [rbp-0x30]    ; 缓冲区在rbp-0x30处
call gets              ; 可能溢出！
```

#### 2. **格式化字符串**
```assembly
lea rdi, [user_input]  ; 用户控制的格式字符串
xor eax, eax
call printf           ; 可能泄露内存！
```

#### 3. **Shellcode常见模式**
```assembly
; execve("/bin/sh", 0, 0)
push 0x68
mov rax, 0x736c2f6e69622f2f
push rax
mov rdi, rsp
xor rsi, rsi
xor rdx, rdx
mov rax, 59
syscall
```

### 四、紧急调试技巧

1. **GDB快速命令：**
```bash
layout asm              # 显示汇编
b *0x401234            # 断点
x/20wx $rsp           # 查看栈
info registers         # 查看寄存器
```

2. **关键特征识别：**
- `leave; ret` - 函数结尾
- `call rax` / `jmp rax` - 间接调用（ROP有用）
- `add rsp, X` - 栈调整

3. **漏洞快速判断：**
- 检查`read`/`gets`/`strcpy`的缓冲区大小
- 查找未初始化变量使用
- 注意整数溢出->缓冲区溢出链

### 五、速记口诀

```
变量看栈和内存，循环跳转看标志
函数调用看传参，指针就是内存址
数组基址加偏移，结构顺序排内存
漏洞关注缓冲区，控制流劫持看返回
```

### 六、实战Checklist

1. [ ] 识别调用约定（x86_64通常System V）
2. [ ] 找到main函数入口（找`__libc_start_main`）
3. [ ] 标记用户输入点（scanf/read/fgets）
4. [ ] 跟踪输入流向（寄存器/内存传播）
5. [ ] 检查边界验证（cmp/jg等）
6. [ ] 定位危险函数（strcpy/sprintf等）
7. [ ] 计算偏移量（缓冲区到返回地址）

**注意**：比赛时优先用IDA/Ghidra反编译，结合汇编验证逻辑！

祝比赛顺利！遇到具体问题可临时查此表快速对应。