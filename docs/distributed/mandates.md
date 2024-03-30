# 分布式任务

在业务中存在定时任务，比如生成日志汇总或者推送消息，生成数据表格等。

Cron表达式是定时任务的基础。Cron表达式是一个字符串，字符串以5或6个空格隔开，分为6或7个域，每一个域代表一个含义，Cron有如下两种语法格式：

- Seconds Minutes Hours DayofMonth Month DayofWeek Year
- Seconds Minutes Hours DayofMonth Month DayofWeek

### Timer

``` java
Timer timer = new Timer();
    timer.schedule(new TimerTask() {
        public void run() {
            log.info("timer-task @{}", LocalDateTime.now());
        }
    }, 1000);

    // waiting to process(sleep to mock)
    Thread.sleep(3000);

    // stop timer
    timer.cancel();
```

问题是 Timer 是单线程的。单个任务异常会导致后续的任务出现阻塞。

### ScheduledExecutorService

使用newScheduledThreadPool来实现定时任务，多线程。

### Netty HashedWheelTimer

基于时间轮（Timing Wheel）实现，时间轮是一种环形的数据结构，就像一个时钟可以分成很多格子（Tick)，每个格子代表时间的间隔，它指向存储的具体任务（timerTask）的一个链表

![img](https://s2.loli.net/2023/12/05/OlANPk4WsJywQ8u.png)

### Spring Tasks

``` java
/**
     * 每隔1分钟执行一次。
     */
    @Scheduled(fixedRate = 1000 * 60 * 1)
    public void runScheduleFixedRate() {
        log.info("runScheduleFixedRate: current DateTime, {}", LocalDateTime.now());
    }

    /**
     * 每个整点小时执行一次。
     */
    @Scheduled(cron = "0 0 */1 * * ?")
    public void runScheduleCron() {
        log.info("runScheduleCron: current DateTime, {}", LocalDateTime.now());
    }

```

