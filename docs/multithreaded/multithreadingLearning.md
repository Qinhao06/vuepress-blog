---
attachments: [Clipboard_2023-11-21-22-11-48.png, Clipboard_2023-11-21-22-11-49.png, Clipboard_2023-11-22-10-34-49.png]
tags: [java 多线程]
title: java 多线程学习
created: '2023-11-21T13:46:24.143Z'
modified: '2023-11-22T02:36:28.074Z'
---

# java 多线程学习
### 多线程使用目的
增加吞吐量，提升利用率
需要考虑原子性，可见性，有序性
### 原子性
原子性的操作是不可中断的一个或者一系列操作
考虑变量带锁，不能在单个线程操作变量的过程中被其他变量获取。
解决方法：
- synchronized关键字

参考代码：



public class AtomicDemo implements Runnable{

    private static Integer count =0;
    
    final static Object o = new Object();
    
    /**
     * When an object implementing interface <code>Runnable</code> is used
     * to create a thread, starting the thread causes the object's
     * <code>run</code> method to be called in that separately executing
     * thread.
     * <p>
     * The general contract of the method <code>run</code> is that it may
     * take any action whatsoever.
     *
     * @see Thread#run()
     */
    @Override
    public void run() {
        synchronized (o){
            count++;
        }
        System.out.println(count);
    }
    
    public static void main(String[] args) {
        AtomicDemo atomicDemo = new AtomicDemo();
        for (int i = 0; i < 10000; i++) {
            Thread thread = new Thread(atomicDemo);
            thread.start();
        }
        System.out.println(AtomicDemo.count);
    }
}
- CAS操作，比如 lock 和AtomicInteger
代码：
```
AtomicInteger atomicInteger = new AtomicInteger(0);
 Lock lock = new ReentrantLock();
```

 在多线程环境下运行时可能会遇到问题。虽然使用ReentrantLock可以保证对i的访问是原子的，但是主线程在打印出i的值时并没有等待其他线程完成，因此可能会导致打印出的值小于1000。为了确保正确性，可以在主线程中使用等待/通知机制来等待所有其他线程完成
### 可见性
缓存结构导致的线程变量的可见性问题

解决方式：
- 加锁，会清除工作内存，从主内存中获取
- 使用volatile变量，被修饰的变量在修改后会被立刻刷回内存，其他线程使用时需要主内存中重新读取。
### 有序性
单线程中指令重排没有问题，但是多线程中如果存在执行顺序，如线程 1 等待某个变量为 true后读取某个对象，线程 2初始化对象，随后设置变量为true。指令重排可能导致线程 2 先设置变量，随后执行顺序出现问题。

![Clipboard_2023-11-22-10-34-49](https://s2.loli.net/2023/11/22/H17GUcsVYqeln9C.png)

解决方式：

- 加锁，单次只有一个线程操作
- volatile关键字，通过插入内存屏障。内存屏障是一种同步机制，用于确保在多线程环境下的内存操作的顺序性和可见性。它是一种CPU指令，用于控制特定条件下的重排序和内存可见性问题。内存屏障可以确保在它之前的所有内存操作都完成，并且它之后的内存操作都不会开始，直到它完成。

