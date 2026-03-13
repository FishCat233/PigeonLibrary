---
created: 2026-03-08
updated: 2026-03-11
---
## Day 1

没打算学，不过头疼（物理）并且不在工位的现在不知道干嘛了，简单来快速体验一下 OpenGL 吧。

参考：[LearnOpenGL CN](https://learnopengl-cn.github.io/)

### 基础认识

简介和我想的差不多，OpenGL 是一个 API 标准，各个厂商可以遵循这个标准来提供图形 API 供上层开发者开发。同时新版本还支持了扩展功能，可以让开发者和厂商扩展标准以在下一版标准更新前快速用上新特性。

早期的 OpenGL 是 **立即模式**（固定渲染管线），而后则变成了**核心模式** 。*这让我想起了 Dear ImGUI 等等立即模式的 UI 框架。*

OpenGL 的大体结构类似于状态机，**上下文** 指的就是 OpenGL 的状态。

另外 OpenGL 通常是 C 语言实现，为了让其他语言用而做了很多抽象。**对象 Object** 就是其中一个抽象，对象指的是一组上下文选项的集合。

```c
// 创建对象
unsigned int objectId = 0; glGenObject(1, &objectId); // 绑定对象至上下文
glBindObject(GL_WINDOW_TARGET, objectId); // 设置当前绑定到 GL_WINDOW_TARGET 的对象的一些选项 glSetObjectOption(GL_WINDOW_TARGET, GL_OPTION_WINDOW_WIDTH, 800); 
glSetObjectOption(GL_WINDOW_TARGET, GL_OPTION_WINDOW_HEIGHT, 600); // 将上下文对象设回默认
glBindObject(GL_WINDOW_TARGET, 0);
```

*给我感觉就像是用纯函数来操作状态机，有点趣味。*

### 创建窗口 / 你好，窗口

教程选用了 C++，那我也用。（毕竟上回学了 C++ 之后还没真实写过项目）

我没有按教程说的手动构建然后导入库，因为很折磨，所以果断 vcpkg。（别和自己过不去）

```bash
vcpkg install glad
vcpkg install glfw3
```

GLFW 和 GLAD 和 OpenGL 的关系是：OpenGL 定义标准和功能，GLFW 提供窗口和上下文，GLAD 负责加载具体的函数入口。

哦，忘记上 vcpkg 的集成了，顺便贴一下集成的指令吧。（如果已经安装过 vcpkg 的集成可以不用这行）

```bash
vcpkg integrate install
```

直接贴代码。

```cpp
#include <iostream>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
	glViewport(0, 0, width, height);
}

void processInput(GLFWwindow* window) {
	if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS) {
		glfwSetWindowShouldClose(window, true);
	}
}

int main() {
	// 初始化 GLFW
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	//glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

	// 创建窗口对象
	GLFWwindow* window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);

	if (window == NULL) {
		std::cout << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		return -1;
	}

	glfwMakeContextCurrent(window);

	// 初始化 GLAD
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
		std::cout << "Failed to initialize GLAD" << std::endl;
		return -1;
	}

	// 视口设置
	glViewport(0, 0, 800, 600);
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

	// 渲染循环
	while (!glfwWindowShouldClose(window)) {
		glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT);

		processInput(window);

		glfwSwapBuffers(window);
		glfwPollEvents();

	}
	glfwTerminate();

	return 0;
}
```

写下来感觉 GLFW 和 GLAD 都是 C 风格的库，因为 enum 都是 `#define` 定义的整数字面量而不是用 cpp 的 `enum class` 或者 `enum` 类型。

另外值得注意的是 `glClearColor` 设置的状态其实是持久的，但是为了防止其他地方改了这个状态，所以还是在每次循环清屏前重新设置。

我尝试进行了一些有趣的修改，让背景随时间变化。

```cpp
#include <iostream>

#include <glad/glad.h>
#include <GLFW/glfw3.h>

void framebuffer_size_callback(GLFWwindow* window, int width, int height)
{
	glViewport(0, 0, width, height);
}

void processInput(GLFWwindow* window, double& speed) {
	if (glfwGetKey(window, GLFW_KEY_ESCAPE) == GLFW_PRESS) {
		glfwSetWindowShouldClose(window, true);
	}
	if (glfwGetKey(window, GLFW_KEY_1) == GLFW_PRESS) {
		speed = 1;
	}
	if (glfwGetKey(window, GLFW_KEY_2) == GLFW_PRESS) {
		speed = 5;
	}
	if (glfwGetKey(window, GLFW_KEY_3) == GLFW_PRESS) {
		speed = 10;
	}

}

int main() {
	// 初始化 GLFW
	glfwInit();
	glfwWindowHint(GLFW_CONTEXT_VERSION_MAJOR, 3);
	glfwWindowHint(GLFW_CONTEXT_VERSION_MINOR, 3);
	glfwWindowHint(GLFW_OPENGL_PROFILE, GLFW_OPENGL_CORE_PROFILE);
	//glfwWindowHint(GLFW_OPENGL_FORWARD_COMPAT, GL_TRUE);

	// 创建窗口对象
	GLFWwindow* window = glfwCreateWindow(800, 600, "LearnOpenGL", NULL, NULL);

	if (window == NULL) {
		std::cout << "Failed to create GLFW window" << std::endl;
		glfwTerminate();
		return -1;
	}

	glfwMakeContextCurrent(window);

	// 初始化 GLAD
	if (!gladLoadGLLoader((GLADloadproc)glfwGetProcAddress)) {
		std::cout << "Failed to initialize GLAD" << std::endl;
		return -1;
	}

	// 视口设置
	glViewport(0, 0, 800, 600);
	glfwSetFramebufferSizeCallback(window, framebuffer_size_callback);

	double speed = 1;

	// 渲染循环
	while (!glfwWindowShouldClose(window)) {
		auto time = glfwGetTime();

		auto r = (sin(time * speed) * 0.5f) + 0.5f;
		auto g = (sin(time * speed + 2.0943) * 0.5f) + 0.5f;
		auto b = (sin(time * speed + 4.1886) * 0.5f) + 0.5f;

		//glClearColor(0.2f, 0.3f, 0.3f, 1.0f);
		glClearColor(r, g, b, 1.0f);
		glClear(GL_COLOR_BUFFER_BIT);

		processInput(window, speed);

		glfwSwapBuffers(window);
		glfwPollEvents();

	}
	glfwTerminate();

	return 0;
}
```

感觉还是很有趣的。

## Day 2

因为电脑在跑别的，所以先不写实际的码了，看看文章吧。

### 你好，三角形

开幕就是名词警告：
- **顶点数组对象 Vertex Array Object, VAO**
- **顶点缓冲对象 Vertex Buffer Object, VBO**
- **元素缓冲对象 Element Buffer Object, EBO / 索引缓冲对象 Index Buffer Object, IBO**

我决定引用原文，因为这东西感觉只是大致的概念，而不是那种特别严谨的定义。

> 在OpenGL中，任何事物都在3D空间中，而屏幕和窗口却是2D像素数组，这导致OpenGL的大部分工作都是关于把3D坐标转变为适应你屏幕的2D像素。3D坐标转为2D坐标的处理过程是由OpenGL的**图形渲染管线**（Graphics Pipeline，大多译为管线，实际上指的是一堆原始图形数据途经一个输送管道，期间经过各种变化处理最终出现在屏幕的过程）管理的。图形渲染管线可以被划分为两个主要部分：第一部分把你的3D坐标转换为2D坐标，第二部分是把2D坐标转变为实际的有颜色的像素。这个教程里，我们会简单地讨论一下图形渲染管线，以及如何利用它创建一些漂亮的像素。

> 图形渲染管线接受一组3D坐标，然后把它们转变为你屏幕上的有色2D像素输出。图形渲染管线可以被划分为几个阶段，每个阶段将会把前一个阶段的输出作为输入。所有这些阶段都是高度专门化的（它们都有一个特定的函数），并且很容易并行执行。正是由于它们具有并行执行的特性，当今大多数显卡都有成千上万的小处理核心，它们在GPU上为每一个（渲染管线）阶段运行各自的小程序，从而在图形渲染管线中快速处理你的数据。这些小程序叫做**着色器(Shader)**。

简单说，负责 3D 转 2D 的过程是由 OpenGL 的渲染管线负责的，并且 GPU 上会为每个渲染管线的阶段运行称之为着色器的小程序。

管线中的一些着色器可以由开发者进行配置。OpenGL 的着色器语言是 OpenGL Shading Language（GLSL）写的。

然后就是经典的渲染管线。

顶点着色器 Vertex Shader 是第一个部分，对单独一个顶点进行处理。

顶点着色器的输出可选地传给了几何着色器 Geometry Shader 。几何着色器接收一组顶点，然后对这些顶点操作（例如发出新的顶点来形成新形状）。

图元装配则将 *顶点着色器* 或者 *顶点+几何着色器* 的输出作为输入。然后将所有点装配成指定的图元形状。

图元装配的输出则进入了光栅化阶段 *Rasterization Stage*。这里将图元映射成最终屏幕上的像素，并且生成供 *片段着色器 Fragment Shader* 使用的片段。并且在片段着色器运行前进行 *裁切 Clipping*，把超出屏幕的像素才减掉来提高效率。

片段着色器的目的是计算像素颜色。*写过 Shaderlab 的应该最熟悉这个。就是 Pass 里面的 frag 上下文*。很多高级效果都在这里实现，并且片段着色器能有 3D 场景的数据，这些数据都能拿来计算最终颜色。

确定颜色之后就进入了 *Alpha测试 和 混合 Blending* 阶段。这个阶段检测片段的深度和模板 Stencil 值等等。

*之前写过一点 Unity Shaderlab 感觉后半段还是很熟悉的，只是前面的顶点稍微有点没反应过来为什么要有几何和顶点两个着色器。不过现在知道，顶点是对单一点进行处理，而几何是对一系列顶点进行处理，几何处理顶点 如同 片段处理纹理原色。*

#### 顶点输入

OpenGL 是 3D 图形库，所以坐标都是 3D 坐标。

> 开始绘制图形之前，我们需要先给OpenGL输入一些顶点数据。OpenGL是一个3D图形库，所以在OpenGL中我们指定的所有坐标都是3D坐标（x、y和z）。**OpenGL不是简单地把所有的3D坐标变换为屏幕上的2D像素；OpenGL仅当3D坐标在3个轴（x、y和z）上-1.0到1.0的范围内时才处理它。所有在这个范围内的坐标叫做标准化设备坐标(Normalized Device Coordinates)，此范围内的坐标最终显示在屏幕上（在这个范围以外的坐标则不会显示）。**

```cpp
float vertices[] = {
     -0.5f, -0.5f, 0.0f,
     0.5f, -0.5f, 0.0f,
     0.0f, 0.5f, 0.0f
     };
```

标准化设备坐标 Normalized Device Coordinates, NDC.

注意，0,0 是图像中心. *知名的 OpenGL 神奇坐标系。*

```cpp
unsigned int VBO;
glGenBuffers(1, &VBO); // 创建缓冲对象，记录 id
glBindBuffers(GL_ARRAY_BUFFER, VBO); // 因为类型是 GL_ARRAY_BUFFER，所以绑定对象到 GL_ARRAY_BUFFER 目标。
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW); // 把之前定义的顶点数据复制到缓冲的内存中：
```

`glBufferData` 的最后一个参数定义了显卡如何管理给定的数据：
- GL_STATIC_DRAW ：数据不会或几乎不会改变。
- GL_DYNAMIC_DRAW：数据会被改变很多。
- GL_STREAM_DRAW ：数据每次绘制时都会改变。

*虽然教程说是创建 VBO 对象，不过看样子更像是在显卡处进行了内存资源管理。我不知道底层，但是这里看上去表现形式上很像：并指定了内存存储的数据类型，最后将数据写入。`unsinged int` 给人感觉更像是内存 id。`glGenBuffer` -> `malloc`, `glBindBuffer` -> 声明类型, `glBufferData` -> 赋值操作。当然底层内部不一样，但是接口既然相似，那应该可以用内存管理那一套比如说 RAII 技术来进行管理。*

#### 顶点着色器

首先要准备好着色器。

```glsl
#version 330 core
layout (location = 0) in vec3 aPos;

void main() {
    gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);
}
```

这里的 location 设定了输入变量的位置值。

#### 编译着色器

准备好着色器后就可以编译

```cpp
const char *vertexShaderSource = "#version 330 core\n" "layout (location = 0) in vec3 aPos;\n" "void main()\n" "{\n" " gl_Position = vec4(aPos.x, aPos.y, aPos.z, 1.0);\n" "}\0";

unsigned int vertexShader;
vertexShader = glCreateShader(GL_VERTEX_SHADER); // 创建 GL_VERTEX_SHADER 对象

glShaderSource(vertexShader, 1, &vertexShaderSource, NULL);
glCompileShader(vertexShader); // 编译
```

这里还提供了一种检测是否编译成功的办法：

```cpp
int success;
char infoLog[512];
glGetShaderiv(vertexShader, GL_COMPILE_STATUS, &success);

if (!success) {
    glGetShaderInfoLog(vertexShader, 512, NULL, infoLog);
    std::cout << "ERROR::SHADER::VERTEX::COMPILATION_FAILED\n" << infoLog << std::endl;
}


```

#### 片段着色器

```glsl
#version 330 core
out vec4 FragColor;

void main() {
    FragColor = vec4(1.0f,0.5f,0.2f,1.0f);
}
```

这里用了一个简单的片段着色器。

可以参考上面的代码编译片段着色器。通过 `GL_FRAGMENT_SHADER` 对象。

#### 着色器程序

两个着色器现在都编译了，剩下的事情是把两个着色器对象链接到一个用来渲染的着色器程序(Shader Program)中。

 类似的可以用 `glCreateProgram` 创建一个程序，然后 `glAttachShader` 附加着色器到程序上，用 `glLinkProgram` 来进行链接。

```cpp
unsigned int shaderProgram;
shaderProgram = glCreateProgram()

glAttachShader(shaderProgram, vertexShader)
glAttachShader(shaderProgram, fragmentShader)
glLinkProgram(shaderProgram)
```

类似的，`glGetProgramiv` 和 `glGetProgramInfoLog` 可以获取链接程序的结果。

`glUseProgram` 可以激活创建的程序。

> 在glUseProgram函数调用之后，每个着色器调用和渲染调用都会使用这个程序对象（也就是之前写的着色器)了。

*感觉不如说：之后所有绘制命令都会使用这个程序。这样应该更准确一点。*

**最重要的，在把着色器对象链接到程序对象以后，记得删除着色器对象。**

```cpp
glDeleteShader(vertexShader);
glDeleteShader(fragmentShader);
```

#### 链接顶点数据

顶点着色器允许任何顶点属性的形式输入，这有很强的灵活性，但是代价是要写明如何解析顶点属性数据。

`glVertexAttribPointer` 可以告诉 OpenGL 如何解析顶点数据。*这函数参数特别多，我懒得写了，具体参考 learnOpenGL 教程原文吧，或者看我后面或许会贴的代码也行。*

`glEnableVertexAttribArray` 可以启用顶点属性。

*换句话说，这里 `glVertexAttribPointer` 定义了如何读顶点数据（类似内存一样的二进制），`glEnableVertexAttribArray` 则是将这个指针（解析器）作为当前的解析器。*

#### 顶点数组对象 VAO

> 顶点数组对象(Vertex Array Object, VAO)可以像顶点缓冲对象那样被绑定，任何随后的顶点属性调用都会储存在这个VAO中。这样的好处就是，当配置顶点属性指针时，你只需要将那些调用执行一次，之后再绘制物体的时候只需要绑定相应的VAO就行了。这使在不同顶点数据和属性配置之间切换变得非常简单，只需要绑定不同的VAO就行了。刚刚设置的所有状态都将存储在VAO中

创建 VAO 用的是 `glGenVertexArrays` 和 绑定 `glBindVertexArray`

```cpp
// ..:: 初始化代码（只运行一次 (除非你的物体频繁改变)） :: .. 
// 1. 绑定VAO 
glBindVertexArray(VAO); 
// 2. 把顶点数组复制到缓冲中供OpenGL使用 
glBindBuffer(GL_ARRAY_BUFFER, VBO); 
glBufferData(GL_ARRAY_BUFFER, sizeof(vertices), vertices, GL_STATIC_DRAW); 
// 3. 设置顶点属性指针 
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 3 * sizeof(float), (void*)0); glEnableVertexAttribArray(0); 

// [...] 

// ..:: 绘制代码（渲染循环中） :: .. 

// 4. 绘制物体 
glUseProgram(shaderProgram);
glBindVertexArray(VAO); 
someOpenGLFunctionThatDrawsOurTriangle();
```

> 就这么多了！前面做的一切都是等待这一刻，一个储存了我们顶点属性配置和应使用的VBO的顶点数组对象。一般当你打算绘制多个物体时，你首先要生成/配置所有的VAO（和必须的VBO及属性指针)，然后储存它们供后面使用。当我们打算绘制物体的时候就拿出相应的VAO，绑定它，绘制完物体后，再解绑VAO。

*感觉还是有点懵逼。*

#### 我们一直期待的三角形

要想绘制我们想要的物体，OpenGL给我们提供了glDrawArrays函数，它使用当前激活的着色器，之前定义的顶点属性配置，和VBO的顶点数据（通过VAO间接绑定）来绘制图元。

```c++
glUseProgram(shaderProgram);
glBindVertexArray(VAO);
glDrawArrays(GL_TRIANGLES, 0, 3);
```

`GL_TRIANGLES` 设置了我们需要绘制的是三角形，`0` 则是起始索引，`3` 是顶点数量。

#### 元素缓冲对象 EBO

同时也叫索引缓冲对象，简单说就是用来索引顶点的。比如说正方形用两个三角形表示有 6 个顶点，其中 2 个顶点数据是重复的，为了提高效率可以用 3 个顶点和 2 组索引来表示这两个三角形。

用 `glGenBuffers` 创建 EBO，然后见原文，懒得写了：

与VBO类似，我们先绑定EBO然后用glBufferData把索引复制到缓冲里。同样，和VBO类似，我们会把这些函数调用放在绑定和解绑函数调用之间，只不过这次我们把缓冲的类型定义为GL_ELEMENT_ARRAY_BUFFER。

```c++
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
glBufferData(GL_ELEMENT_ARRAY_BUFFER, sizeof(indices), indices, GL_STATIC_DRAW);
```

注意：我们传递了GL_ELEMENT_ARRAY_BUFFER当作缓冲目标。最后一件要做的事是用glDrawElements来替换glDrawArrays函数，表示我们要从索引缓冲区渲染三角形。使用glDrawElements时，我们会使用当前绑定的索引缓冲对象中的索引进行绘制：

```c++
glBindBuffer(GL_ELEMENT_ARRAY_BUFFER, EBO);
glDrawElements(GL_TRIANGLES, 6, GL_UNSIGNED_INT, 0);
```

> 当目标是GL_ELEMENT_ARRAY_BUFFER的时候，VAO会储存glBindBuffer的函数调用。这也意味着它也会储存解绑调用，所以确保你没有在解绑VAO之前解绑索引数组缓冲，否则它就没有这个EBO配置了。

明天再看吧。

## Day 3

没啥空，今天学点少的吧。

### 着色器（上半）

#### GLSL

着色器开头总是要声明版本，然后是输入输出变量、 `uniform` 和 `main` 函数。每个着色器的入口都是 `main` 函数。

一个典型的着色器有下面的结构：

```c
#version version_number
in type in_variable_name;
in type in_variable_name;

out type out_variable_name;

uniform type uniform_name;

void main()
{
  // 处理输入并进行一些图形操作
  ...
  // 输出处理过的结果到输出变量
  out_variable_name = weird_stuff_we_processed;
}
```

谈论到顶点着色器的时候，每个输入变量也叫 **顶点属性**。顶点属性有上限，一般是硬件决定，OpenGL 保证至少有 16个包含 4 分量的顶点属性。

`GL_MAX_VERTEX_ATTRIBS` 可以获取具体的顶点属性上限。

#### 数据类型

GLSL 有大部分类似 C 的基础数据类型例如 `int`、`float`、`double`、`uint`、`bool`。还有两种容器类型（Vector、Matrix）。

##### 向量 Vector

GLSL 的向量是一个可以包含 2、3 或者 4 个分量的容器。比如说 `vecn` `bvecn` `ivecn` `uvecn` `dvecn`。

大部分时候用的都是 `vecn`。

*`.x .y .z .w`，跟 Shaderlab 差不多。不过 `rgba` `stpq` 也能用来访问*

向量这一数据类型也允许一些有趣而灵活的分量选择方式，叫做**重组(Swizzling)**。重组允许这样的语法：

```glsl
vec2 someVec;
vec4 differentVec = someVec.xyxx;
vec3 anotherVec = differentVec.zyw;
vec4 otherVec = someVec.xxxx + anotherVec.yxzy;
```

*非常好语法糖，使我旋转。*

#### 输入与输出

`in` 和 `out` 用来设定输入和输出。

不过顶点着色器的输入特别一点，因为它直接从顶点数据中接收输入。用 `location` 这个元数据来指定输入变量，这样才可以在 CPU 上配置顶点属性。

`layout(location=0)` 的 `layout` 可以把顶点着色器链接到顶点数据。

这里原文有个注释：

> 你也可以忽略`layout (location = 0)`标识符，通过在OpenGL代码中使用glGetAttribLocation查询属性位置值(Location)，但是我更喜欢在着色器中设置它们，这样会更容易理解而且节省你（和OpenGL）的工作量。

不过我感觉用 `location` 也更舒服。

片段着色器则是另一个特例，它需要输出一个 `vec4` 的颜色变量。

**顶点着色器**

```glsl
#version 330 core
layout (location = 0) in vec3 aPos; // 位置变量的属性位置值为0

out vec4 vertexColor; // 为片段着色器指定一个颜色输出

void main()
{
    gl_Position = vec4(aPos, 1.0); // 注意我们如何把一个vec3作为vec4的构造器的参数
    vertexColor = vec4(0.5, 0.0, 0.0, 1.0); // 把输出变量设置为暗红色
}
```

**片段着色器**

```glsl
#version 330 core
out vec4 FragColor;

in vec4 vertexColor; // 从顶点着色器传来的输入变量（名称相同、类型相同）

void main()
{
    FragColor = vertexColor;
}
```

明天再看吧，感觉到这里差不多了。

## Day 4

### 着色器（下半）

#### Uniform

Uniform 和顶点属性不同。uniform 是全局的，并且可以被着色器程序的任意着色器（在任意阶段访问）。

```glsl
#version 330 core
out vec4 FragColor;

uniform vec4 ourColor; // 在OpenGL程序代码中设定这个变量

void main()
{
    FragColor = ourColor;
}
```

这里有个注意的点：

> 如果你声明了一个uniform却在GLSL代码中没用过，编译器会静默移除这个变量，导致最后编译出的版本中并不会包含它，这可能导致几个非常麻烦的错误，记住这点！

这里有一个变色的示例，配合上面的 shader。

```c++
float timeValue = glfwGetTime();
float greenValue = (sin(timeValue) / 2.0f) + 0.5f;
int vertexColorLocation = glGetUniformLocation(shaderProgram, "ourColor");
glUseProgram(shaderProgram);
glUniform4f(vertexColorLocation, 0.0f, greenValue, 0.0f, 1.0f);
```

使用 `glfwGetTime` 获取运行的描述，然后经过变换，用 `glGetUniformLocation` 获取 `ourColor` 的位置值（没有会返回 `-1` ），然后用 `glUniform4f` 设置当前激活的 Program 中 uniform 的值。

*有点麻烦，在设置之前需要查询 uniform 的位置（索引）值，然后才能设置。*

这里有个小简介，大概意思是因为 OpenGL 是 C 库，不允许重载，所以通过后缀来进行区别。比如上面的`glUniform4f` 的 `f` 就是一个后缀。常见的有 `f` `i` `ui`(unsigned int) `3f` `fv`.

#### 更多属性！

直接看代码。

```c++
float vertices[] = {
    // 位置              // 颜色
     0.5f, -0.5f, 0.0f,  1.0f, 0.0f, 0.0f,   // 右下
    -0.5f, -0.5f, 0.0f,  0.0f, 1.0f, 0.0f,   // 左下
     0.0f,  0.5f, 0.0f,  0.0f, 0.0f, 1.0f    // 顶部
};
```

```glsl
#version 330 core
layout (location = 0) in vec3 aPos;   // 位置变量的属性位置值为 0 
layout (location = 1) in vec3 aColor; // 颜色变量的属性位置值为 1

out vec3 ourColor; // 向片段着色器输出一个颜色

void main()
{
    gl_Position = vec4(aPos, 1.0);
    ourColor = aColor; // 将ourColor设置为我们从顶点数据那里得到的输入颜色
}
```

```glsl
#version 330 core
out vec4 FragColor;  
in vec3 ourColor;

void main()
{
    FragColor = vec4(ourColor, 1.0);
}
```

终于讲这个了，配置顶点属性。

```c++
// 位置属性
glVertexAttribPointer(0, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), (void*)0);
glEnableVertexAttribArray(0);
// 颜色属性
glVertexAttribPointer(1, 3, GL_FLOAT, GL_FALSE, 6 * sizeof(float), (void*)(3* sizeof(float)));
glEnableVertexAttribArray(1);
```
