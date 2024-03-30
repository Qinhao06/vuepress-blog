### 一些理解

### Ioc 部分

<img src="https://s2.loli.net/2024/01/23/9BVyT7SAnsIduRZ.webp" alt="在这里插入图片描述" style="zoom: 33%;" />

1. IOC 的底层就是一个容器，，通过将 bean 注入到容器，后油容器进行管理，完成了控制权反转（Inversion of Control）。

2. 如何创建 IOC，首先需要提供创建 bean 的信息，也就是 BeanDefinition。这个可以使用注解，xml 等文档，也可你自己去实现一个解析某种格式的文件，也就是一个扩展点。同时在创建前后有两个接口

3. 创建完 BeanDefinition后，会调用接口 BeanFactoryPostProcessor，可以通过这个接口增加或者改进 BeanDefinition，比如在这里就可以 进行属性值的替换和解析等工作（Autowired，Value 这些注解可以在这里实现）。

4. DI 如何实现？首先是在容器，也可以说是工厂通过反射创建对应的个体后(中间也会调用各种接口，比如实例化后接口)，然后就进行属性注入，在属性注入的过程，可以进行类型的转换来填入合适的参数。如果参数中含有对象，且存在循环依赖，这里就会含有三级依赖进行处理。使用三级的主要原因是想在三级转 二级的过程中实现 AOP。

5. 随后就是对 bean 进行初始化，这里也就有对应的前置和后置处理，BeanPostprocessor 接口。

   