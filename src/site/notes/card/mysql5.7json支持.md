---
{"dg-publish":true,"permalink":"/card/mysql5.7json支持/","tags":["mysql"],"noteIcon":"2","created":"2022-12-04T14:32:12+08:00","updated":"2024-07-04T00:09:01+08:00"}
---


# mysql5.7json支持

## 内容

### 原生支持 json

```sql
create table user ( uid int auto_increment, data json,primary key(uid)) engine=innodb;
```

可以选择使用 json 类型来创建列

### 虚拟列，可以创建索引

```sql
-- 先创建一个虚拟列
alter table user add user_name varchar(128) generated always as (json_extract(data,'$.name')) virtual;

-- 然后在虚拟列上创建索引
alter table user add index idx_username (user_name);
```

这里存疑一点，虚拟列的维护可能会耗费比较多的资源，会导致插入性能降低

虽然虚拟列的值在实际查询时动态计算，节省了磁盘存储空间，但这种计算确实可能在一定程度上影响插入和更新性能。每次插入或更新记录时，MySQL 都需要计算或重新计算虚拟列的值。

如果在虚拟列上建立索引，这种效果可能会更加显著，因为每次插入或更新操作还需要更新索引。此外，创建索引本身也会消耗磁盘空间。

然而，这些影响因情况而异。虚拟列表达式的计算性能，以及查询虚拟列和索引所带来的性能提升，可能会抵消甚至超过额外的插入和更新成本。特别是在对存储空间有严格要求，或者需要频繁查询 JSON 属性的场景中，使用虚拟列和索引可能是一个好的选择。

总的来说，是否使用虚拟列和在其上建立索引，需要根据实际的数据特性、查询模式和性能要求综合考虑决定。在实际应用中，可能需要进行一些性能测试和调优来找到最适合的解决方案。

## 参考

[MySQL 5.7原生JSON格式支持 - 腾讯云开发者社区-腾讯云](https://cloud.tencent.com/developer/article/1114387)

[MySQL :: MySQL 5.7 Reference Manual :: 11.5 The JSON Data Type](https://dev.mysql.com/doc/refman/5.7/en/json.html)
