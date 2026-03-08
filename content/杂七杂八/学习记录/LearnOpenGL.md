---
created: 2026-03-08
updated: 2026-03-09
---
没打算学，不过头疼（物理）并且不在工位的现在不知道干嘛了，简单来快速体验一下 OpenGL 吧。

参考：[LearnOpenGL CN](https://learnopengl-cn.github.io/)

## 基础认识

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

## 创建窗口

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