---
{"dg-publish":true,"permalink":"/card/go/go-gorm-FindInBatches/","tags":["aigc","chatgpt"],"noteIcon":"2","created":"2023-11-29T20:19:50+08:00","updated":"2024-10-21T12:44:45+08:00"}
---


# go-gorm-FindInBatches

FindInBatches 用于简化批量操作，防止数据量及过大导致超时

```Go
	var accountSlice []ainote.UserOnline
	t.DB.Where("deleted = ?", ainote.UnDeleted).
		Where("status = ?", ainote.Available).
		FindInBatches(&accountSlice, 5, func(tx *gorm.DB, batch int) error {
			resource.LoggerService.Debug(ctx, "debug-wdy", logit.AutoField("data", batch))

			totalCnt += int64(len(accountSlice))
			resource.LoggerService.Debug(ctx, "debug-wdy", logit.AutoField("data", accountSlice))

			// 遍历所有账号，计算其他数据
			for _, v := range accountSlice {
				intervalOfThisAccount := 72000 / v.Bound
				availableUseCnt := (tomorrowUnixTime - currentUnixTime) / int64(intervalOfThisAccount)

				totalRemainCnt += int64(v.Remains)
				AvailableAccountUseCnt += availableUseCnt

				if v.Remains > 0 && v.AvailableTime < tomorrowUnixTime {
					availableAccountCnt++
				}
			}

			return nil
		})
```

`FindInBatches` 是 GORM 中的一个函数，用于分批处理记录，避免一次性加载所有数据导致内存占用过高，特别适合处理大数据集。

## 1 语法：

```go
func (tx *DB) FindInBatches(dest interface{}, batchSize int, fc func(tx *DB, batch int) error) *DB
```

- `dest`: 目标，查询结果会扫描到这个变量中。
- `batchSize`: 每批处理的记录数量。
- `fc`: 每批处理时执行的回调函数，参数包括当前事务 `tx` 和当前批次号 `batch`。

## 2 示例：

```go
type User struct {
    ID   uint
    Name string
}

var users []User
result := db.Model(&User{}).Where("active = ?", true).FindInBatches(&users, 100, func(tx *gorm.DB, batch int) error {
    fmt.Printf("处理第 %d 批数据\n", batch)
    for _, user := range users {
        // 处理每个用户
    }
    return nil
})

if result.Error != nil {
    fmt.Println(result.Error)
}
```

## 3 工作原理：

1. **目标 (`users`)**：查询结果会存储在这个切片中，每批的数据会覆盖前一批的数据。
2. **批量大小 (`100`)**：定义每次处理的记录数量。
3. **处理函数 (`func`)**：这个函数会在每批数据处理时调用，允许你对每批数据进行操作。

这种方式非常适合处理大数据，避免一次性加载过多数据占用内存，并且能够分批次地进行处理。
