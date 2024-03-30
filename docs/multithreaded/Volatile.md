---
tags: [java 多线程]
title: volatile 关键字
created: '2023-11-22T12:58:22.155Z'
modified: '2023-11-22T13:16:59.295Z'
---

# volatile 关键字
每次获取变量需要到主内存中去获取，而不是在工作内存中获取。



### 保证可见性
public class TestVolatile {
    private volatile static boolean stop = false;

    public static void main(String[] args) {
        // Thread-A
        new Thread("Thread A") {
            @Override
            public void run() {
                while (!stop) {
                }
                System.out.println(Thread.currentThread() + " stopped");
            }
        }.start();
    
        // Thread-main
        try {
            TimeUnit.SECONDS.sleep(1);
            System.out.println(Thread.currentThread() + " after 1 seconds");
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
        stop = true;
    }
}

对于该程序如果不加入volatile，线程 A 则会一直执行。

可见性是基于内存屏障实现，底层中加入 lock 指令：
- 将当前处理器缓存行的数据写回到系统内存。
- 写回内存的操作会使在其他 CPU 里缓存了该内存地址的数据无效
同时 CPU 之间实现了缓存一致性协议(MESI)。每个处理器通过嗅探在总线上传播的数据来检查自己缓存的值是不是过期了，当处理器发现自己缓存行对应的内存地址被修改，就会将当前处理器的缓存行设置成无效状态，当处理器对这个数据进行修改操作的时候，会重新从系统内存中把数据读到处理器缓存里。


### 不保证完全原子性
volatile不能保证完全的原子性，只能保证单次的读/写操作具有原子性。
