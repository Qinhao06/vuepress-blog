# Class 文件结构

平台无关性基石

![img](https://s2.loli.net/2023/11/27/z2EhcJWGryHk956.webp)

### 什么是 class 文件

Class 文件是 Java 虚拟机（JVM）中的一种文件格式，用于存储 Java 类和接口的信息。它是 Java 平台的核心组成部分，也是 Java 程序运行的基础。

Class 文件是一种二进制文件，用于描述 Java 类或接口的结构和元数据。它包含了类的名称、成员变量、方法、构造函数、注解等信息。Class 文件由编译器（如 javac）从 Java 源代码（.java 文件）生成，然后由 JVM 在运行时加载和解析。

Class 文件由多个部分组成，包括：

1. 魔数（Magic Number）：Class 文件的第一个字节，用于标识文件的类型。它必须是 0xCAFEBABE。
2. 类版本（Class Version）：指定类的版本号，目前最新的版本是 Java 8，版本号为 52（0x34）。
3. 字段（Fields）：描述类的成员变量，包括变量名、类型、访问修饰符等信息。
4. 方法（Methods）：描述类的方法，包括方法名、返回类型、参数列表、访问修饰符等信息。
5. 构造函数（Constructors）：描述类的构造函数，包括构造方法名、返回类型、参数列表、访问修饰符等信息。
6. 接口（Interfaces）：描述类实现的接口，包括接口名称和实现的顺序。
7. 注解（Annotations）：描述类的注解信息，包括注解类型和值。
8. 字节码（Bytecode）：包含类的字节码，用于 JVM 在运行时执行。
9. 符号表（Symbol Table）：包含类和方法的名字以及其他符号信息。
10. 常量池（Constant Pool）：包含类和方法的常量信息，如字符串、字面量等。
11. 访问标志（Access Flags）：描述类的访问权限，如 public、private 等。
12. 类索引（This Class Index）：标识当前类的索引。
13. 父类索引（Super Class Index）：标识当前类的父类的索引。
14. 接口计数（Interface Count）：接口的数量。
15. 接口索引列表（Interface Index List）：实现接口的索引列表。

Class 文件对于 Java 程序的运行至关重要。在运行时，JVM 会加载 Class 文件并解析其中的信息，生成相应的内部数据结构，以便执行程序。Class 文件的结构和格式是由 Java 虚拟机规范定义的，保证了在不同平台和不同 JVM 实现之间的兼容性。

### class 文件定义

以 8 个字节为基础单位的二进制流，一般一个 class 文件对应一个类或者接口信息，如果将多个类写在一个 java 文件中时，也会被编译成多个 class 文件

![image-20231127112845355](https://s2.loli.net/2023/11/27/PVnQIdrWSyqbNve.png)

具体的定义结构：

![img](https://s2.loli.net/2023/11/27/kVrJYZByAQ6SGxf.webp)

### class 文件中每个部分

**常量池**：

​	主要存放的是两大类常量：字面量(Literal)和符号引用(Symbolic References）字面量类似于java中的常量概念，如文本字符串，final常量等，而符号引用则属于编译原理方面的概念，包括以下三种:

- 类和接口的全限定名(Fully Qualified Name)
- 字段的名称和描述符号(Descriptor)
- 方法的名称和描述符

**方法表** ：

​	类内部的方法描述，在字节码中以表的集合形式表现。

![image-20231127113937791](https://s2.loli.net/2023/11/27/YCSPpwca8T2ybGN.png)

上图中是对实例化类时初始化成员变量的函数，code内的主要属性为（下面部分未在图片中体现）:

- **stack**: 最大操作数栈，JVM运行时会根据这个值来分配栈帧(Frame)中的操作栈深度,此处为2
- **locals**: 局部变量所需的存储空间，单位为Slot, Slot是虚拟机为局部变量分配内存时所使用的最小单位，为4个字节大小。方法参数(包括实例方法中的隐藏参数this)，显示异常处理器的参数(try catch中的catch块所定义的异常)，方法体中定义的局部变量都需要使用局部变量表来存放。值得一提的是，locals的大小并不一定等于所有局部变量所占的Slot之和，因为局部变量中的Slot是可以重用的。
- **args_size**: 方法参数的个数，这里是1，因为每个实例方法都会有一个隐藏参数this
- **attribute_info**: 方法体内容。
- **LineNumberTable**: 该属性的作用是描述源码行号与字节码行号(字节码偏移量)之间的对应关系。可以使用 -g:none 或-g:lines选项来取消或要求生成这项信息，如果选择不生成LineNumberTable，当程序运行异常时将无法获取到发生异常的源码行号，也无法按照源码的行数来调试程序。
- **LocalVariableTable**: 该属性的作用是描述帧栈中局部变量与源码中定义的变量之间的关系。可以使用 -g:none 或 -g:vars来取消或生成这项信息，如果没有生成这项信息，那么当别人引用这个方法时，将无法获取到参数名称，取而代之的是arg0, arg1这样的占位符。 start 表示该局部变量在哪一行开始可见，length表示可见行数，Slot代表所在帧栈位置，Name是变量名称，然后是类型签名。

