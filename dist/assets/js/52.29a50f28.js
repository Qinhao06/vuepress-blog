(window.webpackJsonp=window.webpackJsonp||[]).push([[52],{487:function(t,v,a){"use strict";a.r(v);var r=a(2),i=Object(r.a)({},(function(){var t=this,v=t._self._c;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("h1",{attrs:{id:"gc"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#gc"}},[t._v("#")]),t._v(" GC")]),t._v(" "),v("p",[t._v("垃圾收集主要针对线程共用区域：堆，方法区，虚拟机栈和本地方法栈。对于线程私有的部分则无需处理。")]),t._v(" "),v("h2",{attrs:{id:"基础知识"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#基础知识"}},[t._v("#")]),t._v(" 基础知识")]),t._v(" "),v("h3",{attrs:{id:"堆回收"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#堆回收"}},[t._v("#")]),t._v(" 堆回收")]),t._v(" "),v("p",[t._v("如何判断对象是否可回收：")]),t._v(" "),v("ul",[v("li",[t._v("引用技术法：存在循环引用的问题。")]),t._v(" "),v("li",[t._v("可达性分析算法：GC roots 作为起点进行搜索，能到达就是存活的对象。 当前 java 使用这个方式。")])]),t._v(" "),v("p",[v("strong",[t._v("不同的引用类型")]),t._v("：")]),t._v(" "),v("ul",[v("li",[t._v("强引用：不会被回收")]),t._v(" "),v("li",[t._v("软引用：内存不足时回收")]),t._v(" "),v("li",[t._v("弱引用：弱引用关联的对象一定会被回收，也就是说它只能存活到下一次垃圾回收发生之前。")]),t._v(" "),v("li",[t._v("虚引用：又称为幽灵引用或者幻影引用。一个对象是否有虚引用的存在，完全不会对其生存时间构成影响，也无法通过虚引用取得一个对象。为一个对象设置虚引用关联的唯一目的就是能在这个对象被回收时收到一个系统通知。")])]),t._v(" "),v("h3",{attrs:{id:"方法区回收"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#方法区回收"}},[t._v("#")]),t._v(" 方法区回收")]),t._v(" "),v("p",[t._v("主要是对常量池的回收和对类的卸载。")]),t._v(" "),v("h3",{attrs:{id:"finalize"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#finalize"}},[t._v("#")]),t._v(" finalize")]),t._v(" "),v("p",[t._v("finalize() 类似 C++ 的析构函数，用来做关闭外部资源等工作。但是 try-finally 等方式可以做的更好，并且该方法运行代价高昂，不确定性大，无法保证各个对象的调用顺序，因此最好不要使用。")]),t._v(" "),v("p",[t._v("当一个对象可被回收时，如果需要执行该对象的 finalize() 方法，那么就有可能通过在该方法中让对象重新被引用，从而实现自救。自救只能进行一次，如果回收的对象之前调用了 finalize() 方法自救，后面回收时不会调用 finalize() 方法。")]),t._v(" "),v("h3",{attrs:{id:"垃圾回收算法"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#垃圾回收算法"}},[t._v("#")]),t._v(" 垃圾回收算法")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("标记清除：存在内存碎片")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/28/6hRrcow4SKaybZO.jpg",alt:"image"}})])]),t._v(" "),v("li",[v("p",[t._v("标记整理")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/28/HyvX32oFlCfiEhb.jpg",alt:"image"}})])]),t._v(" "),v("li",[v("p",[t._v("复制：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/28/EnmqUr5cLTHlxSO.jpg",alt:"image"}})])])]),t._v(" "),v("p",[t._v("现在的商业虚拟机都采用复制算法来回收新生代，但是并不是将新生代划分为大小相等的两块，而是分为一块较大的 Eden 空间和两块较小的 Survivor 空间，每次使用 Eden 空间和其中一块 Survivor。在回收时，将 Eden 和 Survivor 中还存活着的对象一次性复制到另一块 Survivor 空间上，最后清理 Eden 和使用过的那一块 Survivor。")]),t._v(" "),v("p",[t._v("HotSpot 虚拟机的 Eden 和 Survivor 的大小比例默认为 8:1，保证了内存的利用率达到 90%。如果每次回收有多于 10% 的对象存活，那么一块 Survivor 空间就不够用了，此时需要依赖于老年代进行分配担保，也就是借用老年代的空间存储放不下的对象。")]),t._v(" "),v("h3",{attrs:{id:"分代收集"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#分代收集"}},[t._v("#")]),t._v(" 分代收集：")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/28/yBM2er6HW4dDmPi.jpg",alt:"image"}})]),t._v(" "),v("ul",[v("li",[t._v("单线程与多线程: 单线程指的是垃圾收集器只使用一个线程进行收集，而多线程使用多个线程；")]),t._v(" "),v("li",[t._v("串行与并行: 串行指的是垃圾收集器与用户程序交替执行，这意味着在执行垃圾收集的时候需要停顿用户程序；并形指的是垃圾收集器和用户程序同时执行。除了 CMS 和 G1 之外，其它垃圾收集器都是以串行的方式执行。")])]),t._v(" "),v("h3",{attrs:{id:"g1"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#g1"}},[t._v("#")]),t._v(" G1")]),t._v(" "),v("p",[t._v("G1最大的特点是引入分区的思路，弱化了分代的概念，合理利用垃圾收集各个周期的资源，解决了其他收集器甚至CMS的众多缺陷")]),t._v(" "),v("ul",[v("li",[v("p",[t._v("G1垃圾回收器是"),v("strong",[t._v("compacting")]),t._v("的，因此其回收得到的空间是连续的。这避免了CMS回收器因为不连续空间所造成的问题。如需要更大的堆空间，更多的floating garbage。连续空间意味着G1垃圾回收器可以不必采用空闲链表的内存分配方式，而可以直接采用bump-the-pointer的方式；")])]),t._v(" "),v("li",[v("p",[t._v("G1回收器的内存与CMS回收器要求的内存模型有极大的不同。G1将内存划分一个个固定大小的region，每个region可以是年轻代、老年代的一个。"),v("strong",[t._v("内存的回收是以region作为基本单位的")]),t._v("；")])]),t._v(" "),v("li",[v("p",[t._v("G1还有一个及其重要的特性："),v("strong",[t._v("软实时")]),t._v("（soft real-time）。所谓的实时垃圾回收，是指在要求的时间内完成垃圾回收。“软实时”则是指，用户可以指定垃圾回收时间的限时，G1会努力在这个时限内完成垃圾回收，但是G1并不担保每次都能在这个时限内完成垃圾回收。通过设定一个合理的目标，可以让达到90%以上的垃圾回收时间都在这个时限内。")])])]),t._v(" "),v("h3",{attrs:{id:"g1-分区"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#g1-分区"}},[t._v("#")]),t._v(" G1 分区")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/29/cbEmoeSOGvIYKAB.jpg",alt:"img"}})]),t._v(" "),v("p",[t._v("G1采用了分区(Region)的思路，将整个堆空间分成若干个大小相等的内存区域，每次分配对象空间将逐段地使用内存。因此，在堆的使用上，G1并不要求对象的存储一定是物理上连续的，只要逻辑上连续即可；每个分区也不会确定地为某个代服务，可以按需在年轻代和老年代之间切换。启动时可以通过参数-XX:G1HeapRegionSize=n可指定分区大小(1MB~32MB，且必须是2的幂)，默认将整堆划分为2048个分区。")]),t._v(" "),v("h3",{attrs:{id:"g1-分代收集"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#g1-分代收集"}},[t._v("#")]),t._v(" G1 分代收集")]),t._v(" "),v("p",[v("img",{attrs:{src:"https://s2.loli.net/2023/11/29/cr9ASpjN3iIHdED.jpg",alt:"img"}})]),t._v(" "),v("p",[t._v("分代垃圾收集可以将关注点集中在最近被分配的对象上，而无需整堆扫描，避免长命对象的拷贝，同时独立收集有助于降低响应时间。虽然分区使得内存分配不再要求紧凑的内存空间，但G1依然使用了分代的思想。与其他垃圾收集器类似，G1将内存在逻辑上划分为年轻代和老年代，其中年轻代又划分为Eden空间和Survivor空间。但年轻代空间并不是固定不变的，当现有年轻代分区占满时，JVM会分配新的空闲分区加入到年轻代空间。")]),t._v(" "),v("p",[t._v('值得注意的是，由于分区的思想，每个线程均可以"认领"某个分区用于线程本地的内存分配，而不需要顾及分区是否连续。因此，每个应用线程和GC线程都会独立的使用分区，进而减少同步时间，提升GC效率，这个分区称为本地分配缓冲区(Lab)。')]),t._v(" "),v("p",[t._v("其中，应用线程可以独占一个本地缓冲区(TLAB)来创建的对象，而大部分都会落入Eden区域(巨型对象或分配失败除外)，因此TLAB的分区属于Eden空间；而每次垃圾收集时，每个GC线程同样可以独占一个本地缓冲区(GCLAB)用来转移对象，每次回收会将对象复制到Suvivor空间或老年代空间；对于从Eden/Survivor空间晋升(Promotion)到Survivor/老年代空间的对象，同样有GC独占的本地缓冲区进行操作，该部分称为晋升本地缓冲区(PLAB)。")])])}),[],!1,null,null,null);v.default=i.exports}}]);