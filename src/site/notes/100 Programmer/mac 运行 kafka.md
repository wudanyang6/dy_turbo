---
{"dg-publish":true,"permalink":"/100 Programmer/mac 运行 kafka/","tags":["kafka","学习"],"noteIcon":"","created":"2023-09-13T21:55:10+08:00","updated":"2024-02-01T15:37:09+08:00"}
---


# mac 运行 kafka

## 安装

```bash
brew install kafka
```

## 启动broker

手动启动kafka， 同时启动一个使用 2181 端口的 zookeeper

```bash
/opt/homebrew/opt/kafka/bin/zookeeper-server-start /opt/homebrew/etc/kafka/zookeeper.properties
/opt/homebrew/opt/kafka/bin/kafka-server-start /opt/homebrew/etc/kafka/server.properties
```

## 启动生产者

```bash
/opt/homebrew/opt/kafka/bin/kafka-console-producer --topic test --bootstrap-server localhost:9092 
```

## 启动消费者

```bash
/opt/homebrew/opt/kafka/bin/kafka-console-consumer --topic test --bootstrap-server localhost:9092  --from-beginning
```

## 创建 topic

```bash
kafka-topics --create  --replication-factor 1 --partitions 5 --topic myTopic --bootstrap-server localhost:9092
```

## 查看topic列表

```bash
/opt/homebrew/opt/kafka/bin/kafka-topics --bootstrap-server localhost:9092   --list
```

## 数据文件目录

```bash
/opt/homebrew/var/lib/kafka-logs/
```

## 简易 go 程序

```GO
package main

import (
	"fmt"

	"github.com/confluentinc/confluent-kafka-go/v2/kafka"
)

func main() {

	p, err := kafka.NewProducer(&kafka.ConfigMap{"bootstrap.servers": "localhost"})
	if err != nil {
		panic(err)
	}

	defer p.Close()

	// Delivery report handler for produced messages
	go func() {
		for e := range p.Events() {
			switch ev := e.(type) {
			case *kafka.Message:
				if ev.TopicPartition.Error != nil {
					fmt.Printf("Delivery failed: %v\n", ev.TopicPartition)
				} else {
					fmt.Printf("Delivered message to %v\n", ev.TopicPartition)
				}
			}
		}
	}()

	// Produce messages to topic (asynchronously)
	topic := "myTopic"
	for _, word := range []string{"Welcome", "to", "the", "Confluent", "Kafka", "Golang", "client"} {
		p.Produce(&kafka.Message{
			TopicPartition: kafka.TopicPartition{Topic: &topic, Partition: kafka.PartitionAny},
			Value:          []byte(word),
		}, nil)
	}

	// Wait for message deliveries before shutting down
	p.Flush(15 * 1000)
}

```

## 《Kafka权威指南》章节列表

《kafka 权威指南》
章节列表：
第1章 初识 kafka
第2章 安装 Kafka
第3章 Kafka 生产者——向 Kafka 写入数据
第4章 Kafka 消费者——从 Kafka 读取数据
第5章 深入 Kafka
第6章 可靠的数据传递
第7章 构建数据管道
第8章 跨集群数据镜像
第9章 管理 Kafka
第10章 监控 Kafka
第11章 流式处理

## Reference

[mac环境下使用brew安装Kafka(详细过程)\_brew kafka-CSDN博客](https://blog.csdn.net/li1669852599/article/details/113254934)

[Kafka整体架构、工作流程与文件存储机制 - 细雨骑驴入剑门 - 博客园](https://www.cnblogs.com/xyqlrjm/p/14939453.html)

[扫盲Kafka？看这一篇就够了！ - 京东云技术团队 - 博客园](https://www.cnblogs.com/jingdongkeji/p/17879177.html)

[Kafka元数据缓存(metadata cache) - huxihx - 博客园](https://www.cnblogs.com/huxi2b/p/8440429.html)