(window.webpackJsonp=window.webpackJsonp||[]).push([[44],{480:function(t,s,a){"use strict";a.r(s);var r=a(2),e=Object(r.a)({},(function(){var t=this,s=t._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"分布式锁"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#分布式锁"}},[t._v("#")]),t._v(" 分布式锁")]),t._v(" "),s("p",[s("strong",[t._v("分布式锁")]),t._v("：当多个进程不在同一个系统中(比如分布式系统中控制共享资源访问)，用分布式锁控制多个进程对资源的访问。")]),t._v(" "),s("h3",{attrs:{id:"设计要求"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#设计要求"}},[t._v("#")]),t._v(" 设计要求")]),t._v(" "),s("p",[t._v("安全有效，也就是需要互斥，无死锁，容错（部分节点 down 时仍能获取和释放锁），非阻塞，高性能")]),t._v(" "),s("h3",{attrs:{id:"实现方案"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#实现方案"}},[t._v("#")]),t._v(" 实现方案")]),t._v(" "),s("ul",[s("li",[s("p",[t._v("基于数据库：锁表（创建一个表，使用表数据来实现），乐观锁（本质是看是否修改），悲观锁")])]),t._v(" "),s("li",[s("p",[t._v("基于 redis：单个Redis实例 setnx(key,当前时间+过期时间) + Lua，Redis集群模式：Redlock")])]),t._v(" "),s("li",[s("p",[t._v("基于 zookeeper：使用临时有序节点，Curator")])]),t._v(" "),s("li",[s("p",[t._v("基于 Consul 实现分布式锁")])])])])}),[],!1,null,null,null);s.default=e.exports}}]);