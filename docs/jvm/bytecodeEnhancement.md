# 字节码增强

字节码增强技术是一种在Java虚拟机（JVM）上对字节码进行增强和操控的技术，主要应用于对已有Java类进行修改。这种技术常被用于实现各种AOP（面向切面编程）、动态代理、热部署、测试代码覆盖率跟踪等功能。

例如，Spring AOP和各种ORM框架都使用了字节码增强技术。在这些应用中，字节码增强技术可以用来在运行时动态生成代理类，从而实现对业务逻辑的无侵入式增强。

此外，字节码增强技术也常被用于扩展Java所没有的特性或者实现各种语法糖。这是因为JVM规范的存在使得只要最终可以生成符合规范的字节码就可以在JVM上运行，这为各种运行在JVM上的语言（如Scala、Groovy、Kotlin）提供了一种契机，可以扩展Java所没有的特性或者实现各种语法糖。

对于开发者来说，了解字节码可以更准确、直观地理解Java语言中更深层次的东西，比如通过字节码，可以很直观地看到Volatile关键字如何在字节码上生效。同时，深入理解字节码及增强技术对于学习如Spring AOP、各种ORM框架、热部署等应用也有很大帮助。

![img](https://s2.loli.net/2023/11/27/AmkxMe9rcfvd5FW.png)

### ASM

ASM（Abstract Syntax Machine）是一个Java字节码操控和分析框架，它提供了一个简单的API，可以用来生成、修改和分析Java字节码。ASM的目标是帮助程序员更方便地操控Java字节码，从而扩展Java语言的功能。

ASM的核心是它的字节码分析器，它可以将Java字节码转换为一种更易于理解和操控的内部表示形式。ASM提供了许多用于分析和修改字节码的工具和类库，例如用于访问和修改字节码的类库、用于生成新字节码的类库等。

ASM在许多方面都有广泛的应用，例如：

- 动态生成和修改Java类
- 实现Java字节码的加密、解密和混淆
- 实现Java程序的性能分析和优化
- 实现Java语言的扩展和自定义语法解析

![img](https://s2.loli.net/2023/11/27/1VW8rmechETQFjB.png)

### Javassist

Javassist（Java Programming Assistant）是一个开源的分析、编辑和创建Java字节码的库。它被用于修改已有的Java类或者动态生成新的Java类。Javassist使得Java程序可以灵活地操控字节码，即在运行时分析和修改Java类的行为变得简单。

主要特性：

- 在运行时，为了改变类的行为，可以操控字节码。
- 可以创建新的类。
- 可以编辑已存在的类的行为。
- 可以编辑已存在的类的结构。
- 可以插入字节码。
- 可以用来实现各种高级功能，如AOP（面向切面编程）、ORM（对象关系映射）等。

使用Javassist，你可以在运行时修改Java类的行为，或者动态生成新的Java类。这使得Java程序可以更加灵活地根据需要改变行为或生成新的类。其中最重要的是ClassPool、CtClass、CtMethod、CtField这四个类：

- CtClass（compile-time class）：编译时类信息，它是一个class文件在代码中的抽象表现形式，可以通过一个类的全限定名来获取一个CtClass对象，用来表示这个类文件。
- ClassPool：从开发视角来看，ClassPool是一张保存CtClass信息的HashTable，key为类名，value为类名对应的CtClass对象。当我们需要对某个类进行修改时，就是通过pool.getCtClass(“className”)方法从pool中获取到相应的CtClass。
- CtMethod、CtField：这两个比较好理解，对应的是类中的方法和属性。

以下是一个简单的Javassist示例，用于动态创建一个新的类：

```java
import javassist.*;  
  
public class Test {  
    public static void main(String[] args) throws Exception {  
        ClassPool pool = ClassPool.getDefault();  
        CtClass cc = pool.makeClass("com.test.MyClass");  
        cc.setSuperclass(pool.get("java.lang.Object"));  
        cc.addMethod(CtNewMethod.make("public void myMethod(){ System.out.println(\"Hello World!\"); }", cc));  
        cc.writeFile(); // write the class to the file.  
    }  
}
```

这个例子创建了一个新的类`com.test.MyClass`，并且添加了一个方法`myMethod`。然后，它将这个新创建的类写入到文件中。

需要注意的是，虽然Javassist非常强大，但在一些情况下可能会遇到性能问题。由于Javassist在运行时解析和修改字节码，这可能会导致性能损失，特别是在需要频繁创建和修改类的应用中。因此，在使用Javassist时，需要根据具体的应用场景来权衡其性能和灵活性。

### Instrument

instrument是JVM提供的一个可以修改已加载类的类库，专门为Java语言编写的插桩服务提供支持。它需要依赖JVMTI的Attach API机制实现，JVMTI这一部分，我们将在下一小节进行介绍。在JDK 1.6以前，instrument只能在JVM刚启动开始加载类时生效，而在JDK 1.6之后，instrument支持了在运行时对类定义的修改。要使用instrument的类修改功能，我们需要实现它提供的ClassFileTransformer接口，定义一个类文件转换器。接口中的transform()方法会在类文件被加载时调用，而在transform方法里，我们可以利用上文中的ASM或Javassist对传入的字节码进行改写或替换，生成新的字节码数组后返回。

