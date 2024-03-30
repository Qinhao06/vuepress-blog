module.exports = {
    title: 'Q\'s Blog',
    description: 'Just playing around',
    theme: 'reco',
    base: './', 
    head: [
      [
          'link', { rel: 'icon', href: '/logo-pork.png' }
      ]
    ],
    plugins: [
        'vuepress-plugin-cat',
     ],
     locales: {
        "/": {
          lang: "zh-CN",
        },
      },
    themeConfig: {
        smoothScroll: true,
        author: "QH",
        logo:'/logo-pork.png',
        authorAvatar:'/logo-pork.png',
        subSidebar:'auto',
        lastUpdated: '上次更新',
        smoothScroll: true,
        nav: [
          { text: 'Home', link: '/' },
          { text: '学习过的一点点东西🤏', items:[
            {
                text:"java",
                link:""
            },
            {
                text:"go",
                link:""
            },
            {
                text:"python",
                link:""
            },
            {
                text:"vue",
                link:""
            },
          ]},
          { text: 'Github', link: 'https://github.com/Qinhao06', target:'_self', rel:'' },
        ],
        sidebar: [
            {
                title: ' Java多线程',      
                collapsable: true, 
                sidebarDepth: 10,    // 可选的, 默认值是 1
                children: [
                  {title: "JUC", path:"/multithreaded/JUC"},
                  {title: "锁", path:"/multithreaded/lock"},
                  {title:"Synchronized关键字", path:"/multithreaded/Synchronized"},
                  {title: "Volatile关键字", path:"/multithreaded/Volatile"},
                  {title:"java 多线程学习", path:"/multithreaded/multithreadingLearning"},
                  {title:"java 多态底层实现", path:"/multithreaded/polymorphicUnderlyingImplementation"}
                ]
              },
              {
                title:"Java分布式", 
                collapsable:true,
                children:[
                    {title:"锁", path:"/distributed/distributedLock"},
                    {title:"事务", path:"/distributed/affairs"},
                    {title:"全局唯一ID", path:"/distributed/onlyID"},
                    {title:"任务", path:"/distributed/mandates"},
                    {title:"理论", path:"/distributed/doctrinal"},
                    {title:"缓存", path:"/distributed/cache"},
                    {title:"会话", path:"/distributed/session.html"},
                    ]
              },{
                title:"Java架构",
                collapsable:true,
                children:[
                    {title:"架构高并发", path:"/infrastructure/highlyConcurrent"},
                    {title:"架构基础", path:"/infrastructure/foundations"},
                
                ]
             },
              {
                title:"JVM",
                collapsable:true,
                children:[
                    {title:"类加载", path:"/jvm/classLoading"},
                    {title:"字节码增强", path:"/jvm/bytecodeEnhancement.md"},
                    {title:"Class 字节码文件", path:"/jvm/Class"},
                    {title:"GC", path:"/jvm/GC"},
                    {title:"JMM 内存模型", path:"/jvm/JMM"},
                    {title:"JVM 内存", path:"/jvm/JVMmemory"},
                ]
              },
              {
                title:"Mybatis",
                collapsable:true,
                children:[
                    {title:"Mybatis", path:"/mybatis/mybatis"},
                ]
              },
              {
                title:"Mysql",
                collapsable:true,
                children:[
                    {title:"存储引擎", path:"/mysql/storageEngine"},
                    {title:"分库分表", path:"/mysql/separateDatabaseAndTables"},
                    {title:"数据类型", path:"/mysql/dataType"},
                    {title:"索引结构", path:"/mysql/indexStructure"},
                    {title:"Sql函数", path:"/mysql/sqlFunc"},
                    {title:"性能优化", path:"/mysql/performanceOptimization"},
                    {title:"主从复制，读写分离", path:"/mysql/Master-slaveReplicationRead-writeSeparation"},
                ]
              },
              {
                title:"Spring",
                collapsable:true,
                children:[
                    {title:"Spring框架总结", path:"/spring/springSummary"},
                ]
              },
              {
                title:"Tomcat",
                collapsable:true,
                children:[
                    {title:"Tomcat源码分析", path:"/Tomcat/Tomcat"},
                    {title:"一个简单的 Web 容器", path:"/Tomcat/Asimplewebcontainer"},
                
                ]
              }
              
              
          ]
      }
  }

  