---
{"dg-publish":true,"permalink":"/card/kafka/Kafka入门/","noteIcon":"2","created":"2024-01-15T21:34:10+08:00","updated":"2024-10-12T23:20:09+08:00"}
---


# Kafka入门

## 1 什么是 Kafka

Apache Kafka 是一个分布式流处理平台，被设计用来高效地处理高吞吐量的数据流。它广泛应用于实时数据管道和流式应用程序中。以下是 Kafka 的一些主要优点：

1. **高吞吐量**：Kafka 支持高吞吐量的数据处理，即使是非常大的数据量也能够快速处理。
2. **可扩展性**：Kafka 集群可以横向扩展以处理更多的数据，可以在不停机的情况下动态添加更多的 Broker。
3. **持久性和可靠性**：Kafka 可以将数据持久化到磁盘，因此即使系统发生故障，数据也不会丢失。它使用分区和副本机制来确保数据的高可用性和耐用性。
4. **容错能力**：通过数据副本，Kafka 可以在节点故障时保证数据不丢失，从而提供高可靠性。
5. **低延迟**：Kafka 能够在保持高吞吐量的同时实现低延迟的消息传递。
6. **可靠的消息传递保证**：Kafka 支持几种消息传递保证，包括最多一次、至少一次和精确一次（事务性传递）。
7. **多客户端支持**：Kafka 提供多种编程语言的客户端库，方便不同开发环境下的集成。
8. **流处理**：Kafka Streams API 允许构建实时流处理应用，可以进行复杂的数据处理和分析。
9. **可观测性**：Kafka 提供了监控数据流和系统性能的工具，有助于性能调优和问题诊断。
10. **大型社区和生态系统**：Kafka 拥有一个庞大的社区和丰富的生态系统，提供了大量的工具和插件以及集成方案，可以帮助用户更好地开发和维护 Kafka 系统。

## 2 使用场景

Kafka 的这些优点使它在需要处理大量实时数据的系统中特别有价值，包括日志聚合、流式处理、事件源、实时监控和分析等场景。


![clop_2024-01-16_812.png](/img/user/attachs/clop_2024-01-16_812.png)

## 3 kafka 生产消费流程



![clop_2024-01-16_813.png](/img/user/attachs/clop_2024-01-16_813.png)

[[../100 Programmer/mac 运行 kafka\|../100 Programmer/mac 运行 kafka]]

# 2 Kafka 整体架构

![../../attachs/Resources/drawio/Kafka 数据流.png](/img/user/attachs/Resources/drawio/Kafka%20%E6%95%B0%E6%8D%AE%E6%B5%81.png)

Kafka 系统的核心概念包括：

1. **Producer（生产者）**：负责发布消息到 Kafka 的 Topic（主题）中。
2. **Consumer（消费者）**：订阅 Topic，并处理发布到这些 Topic 的消息。
3. **Consumer Group（消费者组）**：一个消费者组可以有一个或多个消费者实例。当多个消费者实例属于同一个消费者组时，它们会在组内共享 Topic 的 Partition。这意味着，每个 Partition 只会被消费者组中的一个消费者实例消费，这样可以保证每条消息只被组内的一个消费者处理，从而实现消息的负载均衡。
4. **Broker（代理）**：Kafka 集群中的服务器，负责存储数据并处理 Producer 和 Consumer 的请求。
5. **Topic（主题）**：消息的分类，Producer 发布消息到指定的 Topic，Consumer 订阅并消费 Topic 中的消息。
6. **Partition（分区）**：Topic 的物理分割，每个 Partition 在存储层面是独立的，可以在不同的 Broker 上。Partition 内的消息是有序的。
7. **Offset（偏移量）**：Partition 中每条消息的唯一标识，可以看作是消息在 Partition 中的索引。
8. **Replica（副本）**：Partition 的副本，用于提高数据的可靠性和容错性。
9. **Zookeeper**：Kafka 使用 Zookeeper 来进行集群管理和协调。
10. **Stream Processing（流处理）**：Kafka Streams 是 Kafka 的流处理库，用于构建流式应用程序。
11. **Connect（连接器）**：Kafka Connect 是用于构建和运行可重用的数据导入和导出连接器的工具。

Kafka 生产者将消息发送到负责存储目标 Topic 的 Partition 的 Broker 上。在 Kafka 集群中，每个 Topic 可以分为多个 Partition，而每个 Partition 可能分布在不同的 Broker 上。每个 Partition 有一个 Broker 充当 Leader，其他的 Broker 充当 Follower。所有的读写操作都是通过 Leader Broker 进行的，Follower 负责同步数据以保证高可用性和数据的冗余。

# 3 Kafka 核心逻辑

## 1 物理存储

Kafka 的基本存储单元是分区。

![kafka存储.drawio.png](/img/user/attachs/Resources/drawio/kafka存储.drawio.png)


kafka 存储的时候也是使用同样的格式存储到磁盘上，这样可以利用到零拷贝技术

## 2 生产者

![clop_2024-01-16_814-kafka生产者组件图.png](/img/user/attachs/clop_2024-01-16_814-kafka生产者组件图.png)

流程如下：
1. 首先，我们需要创建一个 `ProducerRecord`，这个对象需要包含消息的主题（topic）和值（value），可以选择性指定一个键值（key）或者分区（partition）。
2. 发送消息时，生产者会对键值和值**序列化**成字节数组，然后发送到**分配器**。
3. 如果我们指定了分区，那么分配器返回该分区即可；否则，分配器将会基于键来选择一个分区并返回。
4. 选择完分区后，生产者知道了消息所属的主题和分区，它将这条记录添加到相同主题和分区的同一批次消息中，另一个线程负责发送这些批量消息到对应的 Kafka Broker。
5. 当 Broker 接收到消息后，如果成功写入则返回一个包含消息的主题、分区及位移的 RecordMetadata 对象，否则返回异常。
6. 生产者接收到结果后，对于异常可能会进行重试。重试几次还是失败会返回错误。


生产者并不是将消息发送到任意的 Broker，而是发送到管理特定 Partition 的 Leader Broker 上，以确保消息的正确存储和分发。

消息写入多个分区
![clop_2024-01-18_844.png](/img/user/attachs/clop_2024-01-18_844.png)

## 3 消费者

![clop_2024-01-17_818-主题和消费者群组的关系.png](/img/user/attachs/clop_2024-01-17_818-主题和消费者群组的关系.png)


![kafka消费者.drawio](/img/user/attachs/Resources/drawio/kafka消费者.drawio.png)

### 3.1 提交 offset

Kafka 消费者提交偏移量的过程是为了记录消费者在消费 Topic 的 Partition 时当前的位置，以便在消费者重启或发生故障时能从上次处理的位置继续消费，保证消息不会丢失也不会被重复消费。提交偏移量的过程主要包括以下步骤：

1.  **消费消息**：消费者从 Broker 拉取数据并进行处理。
2.  **提交偏移量**：在成功处理完一批消息后，消费者会将最新的偏移量提交给 Kafka。提交的偏移量是消费者下一次预期读取的起始位置。
3.  **偏移量存储**：提交的偏移量存储在 Kafka 内的一个特殊的 Topic 中，名为 `__consumer_offsets`。每个消费者组的偏移量都会在这个 Topic 中维护。
4.  **偏移量读取**：如果消费者发生重启或故障，它会从 `__consumer_offsets` Topic 中读取上次提交的偏移量，从而恢复其消费状态。

提交偏移量的方式主要有两种：

1.  **自动提交偏移量**：Kafka 消费者默认的偏移量提交方式是自动提交。这是通过在消费者配置中设置 `enable.auto.commit=true` 来实现的，并且可以通过 `auto.commit.interval.ms` 配置项来指定提交间隔。这种方式简单方便，但是由于提交是周期性进行的，可能会导致消息重复消费（如果在两次提交间隔内消费者失败）。
2.  **手动提交偏移量**：为了更精确地控制消息的消费状态，可以选择手动提交偏移量。手动提交可以是同步的也可以是异步的：
    -   **同步提交**：通过调用 `consumer.commitSync()` 方法，消费者会阻塞直到偏移量提交完成。这种方式会确保偏移量提交成功，如果提交失败，可以立即进行重试处理。
    -   **异步提交**：通过调用 `consumer.commitAsync()` 方法，消费者可以在不阻塞当前线程的情况下提交偏移量。异步提交通常会提供一个回调函数来处理可能发生的提交错误。
    -   **异步 + 同步**：针对异步提交偏移量丢失的问题，通过对消费者进行异步批次提交并且在关闭时同步提交的方式，这样即使上一次的异步提交失败，通过同步提交还能够进行补救，同步会一直重试，直到提交成功。

## 4 复制

### 4.1 控制器

有一个概念需要单独阐明：控制器

控制器其实就是一个 Broker，只不过它除了具有一般 Broker 的功能之外，**还负责分区首领的选举**。

控制器是 Kafka 集群的管理节点。在一个 Kafka 集群中，所有的 Broker 节点中只有一个节点会被选举为控制器。

每个新选出的控制器通过 Zookeeper 的条件递增操作获得一个全新的、数值更大的 epoch 值，防止脑裂

简而言之，Kafka 使用 Zookeeper 的临时节点来选举控制器，并在节点加入集群或退出集群时通知控制器。控制器负责在节点加入或离开集群时进行分区首领选举。控制器使用 epoch 来避免“脑裂”。“脑裂”是指两个节点同时认为自己是当前的控制器。

### 4.2 与首领保持一致

为了与首领保持同步，跟随者向首领发送获取数据的请求，**这种请求与消费者为了读取消息而发送的请求是一样的**。首领将响应消息发给跟随者。请求消息里包含了跟随者想要获取消息的偏移量，而且这些偏移量总是有序的。

## 5 处理请求

![clop_2024-01-18_846.png](/img/user/attachs/clop_2024-01-18_846.png)

Kafka 使用零复制技术向客户端发送消息——也就是说，顺序读写内容，Kafka 直接把消息从文件 (或者更确切地说是 Linux 文件系统缓存) 里发送到网络通道，而不需要经过任何中间缓冲区。

零拷贝示意图：
![clop_2024-01-18_848.png](/img/user/attachs/clop_2024-01-18_848.png)

零拷贝省略了数据在内核空间和用户空间之间的重复穿梭；用户态和内核态切换时产生中断，耗时；



生产请求和获取请求都必须发送给分区的首领副本。

如何获取分区首领所在的 broker：
![clop_2024-01-18_847.png](/img/user/attachs/clop_2024-01-18_847.png)

# 4 可靠性保证

先了解一个概念：不完全的首领选举

## 1 消息传递语义

1.  最多一次（at most once）：消息可能会丢失，但绝不会被重复发送。
    1.  消费者端配置自动提交偏移量，并且在处理消息之前就提交。如果在提交偏移量后处理消息时发生了故障，那么这些消息可能不会被重新消费。
    
2.  至少一次（at least once）：消息不会丢失，但有可能被重复发送。
    1.  手动提交偏移量。如果消费者在成功处理消息之前失败，那么同一消息可能会被再次消费。
    
3.  恰好一次（exactly once）：消息不会丢失，也不会被重复发送。
	1. Kafka 通过“幂等生产者”（Idempotent Producer）和“事务”（Transactions）来支持恰好一次的语义。幂等生产者确保即使生产者发送重复的消息，Broker 也只会接收一次。事务性生产者可以将消息的发送和偏移量的提交放在同一个事务中，确保它们要么都成功，要么都失败。（恰好一次语义在 Kafka 0.11 版本及以上被引入。）
	
	

## 2 不完全的首领选举

是否允许不完全的首领选举：unclean.leader.election
如果在选举过程中没有丢失数据，也就是说提交的数据同时存在于所有的同步副本上，那么这个选举就是“完全”的。
如果在首领不可用时其他副本都是不同步的，那么这个选举就是“不完全”的。

简而言之，如果我们允许不同步的副本成为首领，那么就要承担丢失数据和出现数据不一致的⻛险。如果不允许它们成为首领，那么就要接受较低的可用性，因为我们必须等待原先的首领恢复到可用状态。

**unclean.leader.election=false**

## 3 复制

复制系数
**replication.factor >= 2**
**min.insync.replicas > 1** 则至少有一个同步从副本

## 4 使用生产者

发送确认：
- acks=0 立即返回，不论是否写入
- acks=1 当前首领副本已经写入
- acks=-1 或 all 所有同步的副本已经被写入

重试
- 配置重试次数
- 设置重试间隔
- 程序兜底其他错误

## 5 使用消费者

如果消费者提交了偏移量却未能处理完消息，那么就有可能造成消息丢失，这也是消费者丢失消息的主要原因。

正确的做法是：拉取数据、业务逻辑处理、提交消费 Offset 位移信息。

**enable.auto.commit = false** 采用手动提交位移的方式。

对于消费消息重复的情况，业务自己保证幂等性， 保证只成功消费一次即可。



# 6 思考

Q: 知道了 kafka 的物理存储的结构，那么 kafka 通过 offset 查找对应的文件位置的过程是什么样的呢？

Q: 从副本在什么情况下被认为是不同步 (OSR) ？

Q: offset 为什么要从 zookeeper 挪到 kafka 本身存储呢？

Q：分区分成多少比较好？

Q：在主题流量不是很大的情况下，消费者一直轮询会造成浪费，有没有什么方式能够避免这种情况？

Q：Kafka 为什么要把自己定位成一个分布式流平台？

# 7 参考

《Kafka 权威指南》 Neha Narkhede Gwen Shapira Todd Palino 著 薛命灯译

官网文档： [Apache Kafka](https://kafka.apache.org/documentation/#design)

[mac环境下使用brew安装Kafka(详细过程)\_brew kafka-CSDN博客](https://blog.csdn.net/li1669852599/article/details/113254934)

[Kafka整体架构、工作流程与文件存储机制 - 细雨骑驴入剑门 - 博客园](https://www.cnblogs.com/xyqlrjm/p/14939453.html)

[扫盲Kafka？看这一篇就够了！ - 京东云技术团队 - 博客园](https://www.cnblogs.com/jingdongkeji/p/17879177.html)

[Kafka元数据缓存(metadata cache) - huxihx - 博客园](https://www.cnblogs.com/huxi2b/p/8440429.html)

[Kafka 物理存储机制 - Java程序员进阶 - 博客园](https://www.cnblogs.com/zhengzhaoxiang/p/13977382.html)

[稀疏索引与其在Kafka和ClickHouse中的应用-腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1787164)

[8张图带你全面了解kafka的核心机制 - JAVA旭阳 - 博客园](https://www.cnblogs.com/alvinscript/p/17407980.html)

[进阶，Kafka 如何保证消息不丢失？ - 知乎](https://zhuanlan.zhihu.com/p/459610418)

[Kafka的自我定位](https://cloud.tencent.com/developer/article/2181009)
