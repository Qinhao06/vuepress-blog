---
attachments: [Clipboard_2023-11-22-20-12-37.png]
tags: [java 多线程]
title: Synchronized关键字
created: '2023-11-22T02:39:07.125Z'
modified: '2023-11-22T15:25:42.579Z'
---

# Synchronized关键字
### 作用域
可以修饰普通方法（锁实例对象），静态方法（锁 class 对象）和代码块（锁指定对象）。
### 使用Synchronized
- 一把锁只能被一个线程获取，其余线程等待
- 每个实例都对应自己的一把锁（this），不同实例之间互不影响
- 使用该关键字，无论执行完毕还是抛出异常都会释放锁
  代码例子：
  private static class BankAccount{
        String accountName;
        double balance;

        public BankAccount(String accountName,double balance){
            this.accountName = accountName;
            this.balance = balance;
        }
        //这边给出一个编程建议：当我们对共享变量进行同步时，同步代码块最好在共享变量中加
        public synchronized double deposit(double amount){
            balance = balance + amount;
            return balance;
        }
        
        public synchronized double  withdraw(double amount){
            balance = balance - amount;
            return balance;
        }

    }

### 原理分析
该关键字是通过Monitorenter和Monitorexit指令，会让对象在执行，使其锁计数器加1或者减1。每一个对象在同一时间只与一个monitor(锁)相关联，而一个monitor在同一时间只能被一个线程获得。当锁值为 0 时代表可获得锁，获取后加 1，离开时减 1，该线程可重入.

![Clipboard_2023-11-22-20-12-37](https://s2.loli.net/2023/11/22/LIPGna8SfNgDHl7.png)

可重入锁原理：又名递归锁，是指在同一个线程在外层方法获取锁的时候，再进入该线程的内层方法会自动获取锁（前提锁对象得是同一个对象或者class)，不会因为之前已经获取过还没释放而阻塞。将 monitor 加 1。
可见性和有序性通过JMM 和happens-before
一种关系可能存在的关系

![](https://s2.loli.net/2023/11/22/MQ2WzRIpc6PxBYq.png)

