# 分布式缓存

分布式缓存：指的是与应用分离的缓存组件或服务，其最大的优点是自身就是一个独立的应用，与本地应用隔离，多个应用可直接的共享缓存。

### memcached缓存

通过算法将不同的缓存数据缓存在不同的服务器上，使用时根据key 重新计算缓存在哪个服务器/

![img](https://s2.loli.net/2023/12/05/KTSXtQx5MP7iOYC.png)

memcached客户端采用一致性hash算法作为路由策略，如图7，相对于一般hash（如简单取模）的算法，一致性hash算法除了计算key的hash值外，还会计算每个server对应的hash值，然后将这些hash值映射到一个有限的值域上（比如0~2^32）。通过寻找hash值大于hash(key)的最小server作为存储该key数据的目标server。如果找不到，则直接把具有最小hash值的server作为目标server。同时，一定程度上，解决了扩容问题，增加或删除单个节点，对于整个集群来说，不会有大的影响。最近版本，增加了虚拟节点的设计，进一步提升了可用性

![img](https://s2.loli.net/2023/12/05/FwvCdqgIt9i4Z1o.png)

memcached是一个高效的分布式内存cache，了解memcached的内存管理机制，才能更好的掌握memcached，让我们可以针对我们数据特点进行调优，让其更好的为我所用。我们知道memcached仅支持基础的key-value键值对类型数据存储。在memcached内存结构中有两个非常重要的概念：slab和chunk。

![img](https://s2.loli.net/2023/12/05/au7sIAvFPo3ymh5.png)

slab是一个内存块，它是memcached一次申请内存的最小单位。在启动memcached的时候一般会使用参数-m指定其可用内存，但是并不是在启动的那一刻所有的内存就全部分配出去了，只有在需要的时候才会去申请，而且每次申请一定是一个slab。Slab的大小固定为1M（1048576 Byte），一个slab由若干个大小相等的chunk组成。每个chunk中都保存了一个item结构体、一对key和value。

虽然在同一个slab中chunk的大小相等的，但是在不同的slab中chunk的大小并不一定相等，在memcached中按照chunk的大小不同，可以把slab分为很多种类（class），默认情况下memcached把slab分为40类（class1～class40），在class 1中，chunk的大小为80字节，由于一个slab的大小是固定的1048576字节（1M），因此在class1中最多可以有13107个chunk（也就是这个slab能存最多13107个小于80字节的key-value数据）。

memcached内存管理采取预分配、分组管理的方式，分组管理就是我们上面提到的slab class，按照chunk的大小slab被分为很多种类。内存预分配过程是怎样的呢? 向memcached添加一个item时候，memcached首先会根据item的大小，来选择最合适的slab class：例如item的大小为190字节，默认情况下class 4的chunk大小为160字节显然不合适，class 5的chunk大小为200字节，大于190字节，因此该item将放在class 5中（显然这里会有10字节的浪费是不可避免的），计算好所要放入的chunk之后，memcached会去检查该类大小的chunk还有没有空闲的，如果没有，将会申请1M（1个slab）的空间并划分为该种类chunk。例如我们第一次向memcached中放入一个190字节的item时，memcached会产生一个slab class 2（也叫一个page），并会用去一个chunk，剩余5241个chunk供下次有适合大小item时使用，当我们用完这所有的5242个chunk之后，下次再有一个在160～200字节之间的item添加进来时，memcached会再次产生一个class 5的slab（这样就存在了2个pages）。

总结来看，memcached内存管理需要注意的几个方面：

- chunk是在page里面划分的，而page固定为1m，所以chunk最大不能超过1m。
- chunk实际占用内存要加48B，因为chunk数据结构本身需要占用48B。
- 如果用户数据大于1m，则memcached会将其切割，放到多个chunk内。
- 已分配出去的page不能回收。

对于key-value信息，最好不要超过1m的大小；同时信息长度最好相对是比较均衡稳定的，这样能够保障最大限度的使用内存；同时，memcached采用的LRU清理策略，合理甚至过期时间，提高命中率。

无特殊场景下，key-value能满足需求的前提下，使用memcached分布式集群是较好的选择，搭建与操作使用都比较简单；分布式集群在单点故障时，只影响小部分数据异常，目前还可以通过Magent缓存代理模式，做单点备份，提升高可用；整个缓存都是基于内存的，因此响应时间是很快，不需要额外的序列化、反序列化的程序，但同时由于基于内存，数据没有持久化，集群故障重启数据无法恢复。高版本的memcached已经支持CAS模式的原子操作，可以低成本的解决并发控制问题。

### Redis 缓存

Redis是一种支持key-value等多种数据结构的存储系统。可用于缓存，事件发布或订阅，高速队列等场景。支持网络，提供字符串，哈希，列表，队列，集合结构直接存取，基于内存，可持久化。同时性能强劲，具有复制特性以及解决问题而生的独一无二的数据模型。它可以存储键值对与5种不同类型的值之间的映射，可以将存储在内存的键值对数据持久化到硬盘，可以使用复制特性来扩展读性能，还可以使用客户端分片来扩展写性能。

![img](https://s2.loli.net/2023/12/05/XIGO94xM5BCVSrY.png)