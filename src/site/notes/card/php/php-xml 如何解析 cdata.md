---
{"dg-publish":true,"permalink":"/card/php/php-xml 如何解析 cdata/","noteIcon":"2","created":"2021-07-19T13:16:31+08:00","updated":"2024-04-18T16:27:43+08:00"}
---


# php-xml 如何解析 cdata

```php
$content = simplexml_load_string(
    '<content><![CDATA[Hello, world!]]></content>'
    , null
    , LIBXML_NOCDATA // merge cdata as text node
);
```

https://stackoverflow.com/questions/2970602/php-how-to-handle-cdata-with-simplexmlelement
