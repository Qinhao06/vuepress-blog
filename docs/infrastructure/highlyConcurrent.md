# 架构高并发

## 缓存

随着互联网的普及，内容信息越来越复杂，用户数和访问量越来越大，我们的应用需要支撑更多的并发量，同时我们的应用服务器和数据库服务器所做的计算也越来越多。但是往往我们的应用服务器资源是有限的，且技术变革是缓慢的，数据库每秒能接受的请求次数也是有限的（或者文件的读写也是有限的），如何能够有效利用有限的资源来提供尽可能大的吞吐量? 一个有效的办法就是引入缓存，打破标准流程，每个环节中请求可以从缓存中直接获取目标数据并返回，从而减少计算量，有效提升响应速度，让有限的资源服务更多的用户。

![img](https://s2.loli.net/2023/12/03/WNzJ8RwlTGrhY6Z.png)

### 什么时候使用缓存 -- 命中率

使用缓存应该保证高命中率：

- 读多写少的业务场景
- 缓存粒度越小一般命中率越高，但是需要考虑缓存的开销
- 缓存空间有限，要考虑替换算法和最大容量

### 如何存储缓存 -- 存储介质

- 内存：一般选择这个
- 硬盘：一般用在内存满或异常的情况下使用
- 非关系数据库：相对于关系型数据库响应速度和吞吐量都更高

### 淘汰算法

就那几个：FIFO， LRU， LFU（最近最不常用），过期时间，随机。

### 高并发缓存问题

**缓存雪崩**：

当某一个时刻出现大规模的缓存失效的情况，那么就会导致大量的请求直接打在数据库上面，导致数据库压力巨大，如果在高并发的情况下，可能瞬间就会导致数据库宕机。这时候如果运维马上又重启数据库，马上又会有新的流量把数据库打死。这就是缓存雪崩。

![img](https://s2.loli.net/2023/12/03/3eAUEhSdjpTsvqH.webp)

**缓存击穿**：

其实跟缓存雪崩有点类似，缓存雪崩是大规模的key失效，而缓存击穿是一个热点的Key，有大并发集中对其进行访问，突然间这个Key失效了，导致大并发全部打在数据库上，导致数据库压力剧增。这种现象就叫做缓存击穿。

关键在于某个热点的key失效了，导致大并发集中打在数据库上。所以要从两个方面解决，第一是否可以考虑热点key不设置过期时间，第二是否可以考虑降低打在数据库上的请求数量。

**缓存穿透**：

我们使用Redis大部分情况都是通过Key查询对应的值，假如发送的请求传进来的key是不存在Redis中的，那么就查不到缓存，查不到缓存就会去数据库查询。假如有大量这样的请求，这些请求像“穿透”了缓存一样直接打在数据库上，这种现象就叫做缓存穿透。

关键在于在Redis查不到key值，这和缓存击穿有根本的区别，区别在于**缓存穿透的情况是传进来的key在Redis中是不存在的**。假如有黑客传进大量的不存在的key，那么大量的请求打在数据库上是很致命的问题，所以在日常开发中要对参数做好校验，一些非法的参数，不可能存在的key就直接返回错误提示，要对调用方保持这种“不信任”的心态。

### 高并发限流

每个系统都有服务的上线，所以当流量超过服务极限能力时，系统可能会出现卡死、崩溃的情况，所以就有了降级和限流。限流其实就是：当高并发或者瞬时高并发时，为了保证系统的稳定性、可用性，系统以牺牲部分请求为代价或者延迟处理请求为代价，保证系统整体服务可用。

**限流算法**：令牌桶(Token Bucket)、漏桶(leaky bucket)和计数器算法是最常用的三种限流的算法。

**单机限流**：

1. 限流总资源数
2. 限流总并发/连接/请求数
3. 限流某个接口的总并发/请求数
4. 限流某个接口的时间窗请求数
5. 平滑限流某个接口的请求数
6. Guava RateLimiter

**分布式限流**：

我们需要**分布式限流**和**接入层限流**来进行全局限流。

1. redis+lua实现中的lua脚本
2. 使用Nginx+Lua实现的Lua脚本
3. 使用 OpenResty 开源的限流方案
4. 限流框架，比如Sentinel实现降级限流熔断

**令牌桶**：

令牌桶算法是网络流量整形（Traffic Shaping）和速率限制（Rate Limiting）中最常使用的一种算法。先有一个木桶，系统按照固定速度，往桶里加入Token，如果桶已经满了就不再添加。当有请求到来时，会各自拿走一个Token，取到Token 才能继续进行请求处理，没有Token 就拒绝服务。

![img](https://s2.loli.net/2023/12/03/5uPJd3ngB6DfvI8.png)

**漏桶**

水(请求)先进入到漏桶里,漏桶以一定的速度出水(接口有响应速率),当水流入速度过大会直接溢出（访问频率超过接口响应速率),然后就拒绝请求,可以看出漏桶算法能强行限制数据的传输速率。

![img](https://s2.loli.net/2023/12/03/CxMiwHcLWPgblZG.png)

**计数器**

### 降级和熔断

![img](https://s2.loli.net/2023/12/03/gB9HEZjAqd4FhaN.png)

当一个其中一个服务 gg，而该服务被其他服务所调用。在高并发环境下，**服务之间的依赖关系导致调用失败，解决的方式通常是: 限流->熔断->隔离->降级, 其目的是防止雪崩效应**。

![img](https://s2.loli.net/2023/12/03/TBUOPuWKvgN1x4c.png)

- 主动超时：Http请求主动设置一个超时时间，超时就直接返回，不会造成服务堆积

- 限流：限制最大并发数

- 熔断：当错误数超过阈值时快速失败，不调用后端服务，同时隔一定时间放几个请求去重试后端服务是否能正常调用，如果成功则关闭熔断状态，失败则继续快速失败，直接返回。（此处有个重试，重试就是弹性恢复的能力）

- 隔离：把每个依赖或调用的服务都隔离开来，防止级联失败引起整体服务不可用

- 降级：服务失败或异常后，返回指定的默认信息

### 负载均衡

面对大量用户访问、高并发请求，海量数据，可以使用高性能的服务器、大型数据库，存储设备，高性能Web服务器，采用高效率的编程语言比如(Go,Scala)等，当单机容量达到极限时，我们需要考虑业务拆分和分布式部署，来解决大型网站访问量大，并发量高，海量数据的问题。

从单机网站到分布式网站，很重要的区别是业务拆分和分布式部署，将应用拆分后，部署到不同的机器上，实现大规模分布式系统。分布式和业务拆分解决了，从集中到分布的问题，但是每个部署的独立业务还存在单点的问题和访问统一入口问题，为解决单点故障，我们可以采取冗余的方式。将相同的应用部署到多台机器上。解决访问统一入口问题，我们可以在集群前面增加负载均衡设备，实现流量分发。

负载均衡（Load Balance），意思是将负载（工作任务，访问请求）进行平衡、分摊到多个操作单元（服务器，组件）上进行执行。是解决高性能，单点故障（高可用），扩展性（水平伸缩）的终极解决方案。

系统的扩展可分为纵向（垂直）扩展和横向（水平）扩展。纵向扩展，是从单机的角度通过增加硬件处理能力，比如CPU处理能力，内存容量，磁盘等方面，实现服务器处理能力的提升，不能满足大型分布式系统（网站），大流量，高并发，海量数据的问题。因此需要采用横向扩展的方式，通过添加机器来满足大型网站服务的处理能力。比如：一台机器不能满足，则增加两台或者多台机器，共同承担访问压力。这就是典型的集群和负载均衡架构：如下图：

![img](https://s2.loli.net/2023/12/03/pn3XkUo76ROlGqF.png)

也就是引入一个集群。

###  容灾备份,故障转移

容灾技术是系统的高可用性技术的一个组成部分，容灾系统更加强调处理外界环境对系统的影响，特别是灾难性事件对整个IT节点的影响，提供节点级别的系统恢复功能。故障转移（failover），即当活动的服务或应用意外终止时，快速启用**冗余**或备用的服务器、系统、硬件或者网络接替它们工作。故障恢复是在计划内或计划外中断解决后**切换回主站点**的过程。

**分类**：

**数据级容灾**是指通过建立异地容灾中心，做数据的远程备份，在灾难发生之后要确保原有的数据不会丢失或者遭到破坏，但在数据级容灾这个级别，发生灾难时应用是会中断的。在数据级容灾方式下，所建立的异地容灾中心可以简单地把它理解成一个远程的数据备份中心。数据级容灾的恢复时间比较长，但是相比其他容灾级别来讲它的费用比较低，而且构建实施也相对简单。

**应用级容灾**是在数据级容灾的基础之上，在备份站点同样构建一套相同的应用系统，通过同步或异步复制技术，这样可以保证关键应用在允许的时间范围内恢复运行，尽可能减少灾难带来的损失，让用户基本感受不到灾难的发生，这样就使系统所提供的服务是完整的、可靠的和安全的。应用级容灾生产中心和异地灾备中心之间的数据传输是采用异类的广域网传输方式；同时应用级容灾系统需要通过更多的软件来实现，可以使多种应用在灾难发生时可以进行快速切换，确保业务的连续性。

**业务级容灾**是全业务的灾备，除了必要的IT相关技术，还要求具备全部的基础设施。其大部分内容是非IT系统（如电话、办公地点等），当大灾难发生后，原有的办公场所都会受到破坏，除了数据和应用的恢复，更需要一个备份的工作场所能够正常的开展业务。

**技术指标**：

**RPO（Recovery Point Objective）**：即数据恢复点目标，主要指的是业务系统所能容忍的数据丢失量，指灾难发生后，从IT系统宕机导致业务停顿之时开始，到IT系统恢复至可以支持各部门运作、恢复运营之时，此两点之间的时间段称为RTO，广道容灾备份系统RTO达到分钟级。

**RTO（Recovery Time Objective）**：即恢复时间目标，主要指的是所能容忍的业务停止服务的最长时间，也就是从灾难发生到业务系统恢复服务功能所需要的最短时间周期。

![img](https://s2.loli.net/2023/12/03/JFHYzjIWucSGD3C.webp)