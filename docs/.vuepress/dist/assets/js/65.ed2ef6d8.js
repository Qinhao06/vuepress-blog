(window.webpackJsonp=window.webpackJsonp||[]).push([[65],{499:function(a,t,v){"use strict";v.r(t);var _=v(2),r=Object(_.a)({},(function(){var a=this,t=a._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":a.$parent.slotKey}},[t("h1",{attrs:{id:"mysql-的数据类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#mysql-的数据类型"}},[a._v("#")]),a._v(" Mysql 的数据类型")]),a._v(" "),t("h3",{attrs:{id:"字段类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字段类型"}},[a._v("#")]),a._v(" 字段类型")]),a._v(" "),t("h3",{attrs:{id:"整型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#整型"}},[a._v("#")]),a._v(" 整型：")]),a._v(" "),t("p",[a._v("TINYINT, SMALLINT, MEDIUMINT, INT, BIGINT 分别使用 8, 16, 24, 32, 64 位存储空间，一般情况下越小的列越好。")]),a._v(" "),t("p",[a._v("INT(11) 中的数字只是规定了交互工具显示字符的个数，对于存储和计算来说是没有意义的。")]),a._v(" "),t("h3",{attrs:{id:"浮点数"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#浮点数"}},[a._v("#")]),a._v(" 浮点数")]),a._v(" "),t("p",[a._v("FLOAT 和 DOUBLE 为浮点类型，DECIMAL 为高精度小数类型。CPU 原生支持浮点运算，但是不支持 DECIMAl 类型的计算，因此 DECIMAL 的计算比浮点类型需要更高的代价。")]),a._v(" "),t("p",[a._v("FLOAT、DOUBLE 和 DECIMAL 都可以指定列宽，例如 DECIMAL(18, 9) 表示总共 18 位，取 9 位存储小数部分，剩下 9 位存储整数部分。")]),a._v(" "),t("h3",{attrs:{id:"字符串"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字符串"}},[a._v("#")]),a._v(" 字符串")]),a._v(" "),t("p",[a._v("主要有 CHAR 和 VARCHAR 两种类型，一种是定长的，一种是变长的。")]),a._v(" "),t("p",[a._v("VARCHAR 这种变长类型能够节省空间，因为只需要存储必要的内容。但是在执行 UPDATE 时可能会使行变得比原来长，当超出一个页所能容纳的大小时，就要执行额外的操作。MyISAM 会将行拆成不同的片段存储，而 InnoDB 则需要分裂页来使行放进页内。")]),a._v(" "),t("p",[a._v("VARCHAR 会保留字符串末尾的空格，而 CHAR 会删除。")]),a._v(" "),t("h3",{attrs:{id:"时间和日期"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#时间和日期"}},[a._v("#")]),a._v(" 时间和日期")]),a._v(" "),t("p",[a._v("MySQL 提供了两种相似的日期时间类型: DATETIME 和 TIMESTAMP。")]),a._v(" "),t("h4",{attrs:{id:"datetime"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#datetime"}},[a._v("#")]),a._v(" DATETIME")]),a._v(" "),t("p",[a._v("能够保存从 1001 年到 9999 年的日期和时间，精度为秒，使用 8 字节的存储空间。")]),a._v(" "),t("p",[a._v("它与时区无关。")]),a._v(" "),t("p",[a._v("默认情况下，MySQL 以一种可排序的、无歧义的格式显示 DATETIME 值，例如“2008-01-16 22:37:08”，这是 ANSI 标准定义的日期和时间表示方法。")]),a._v(" "),t("h4",{attrs:{id:"timestamp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#timestamp"}},[a._v("#")]),a._v(" TIMESTAMP")]),a._v(" "),t("p",[a._v("和 UNIX 时间戳相同，保存从 1970 年 1 月 1 日午夜(格林威治时间)以来的秒数，使用 4 个字节，只能表示从 1970 年 到 2038 年。")]),a._v(" "),t("p",[a._v("它和时区有关，也就是说一个时间戳在不同的时区所代表的具体时间是不同的。")]),a._v(" "),t("p",[a._v("MySQL 提供了 FROM_UNIXTIME() 函数把 UNIX 时间戳转换为日期，并提供了 UNIX_TIMESTAMP() 函数把日期转换为 UNIX 时间戳。")]),a._v(" "),t("p",[a._v("默认情况下，如果插入时没有指定 TIMESTAMP 列的值，会将这个值设置为当前时间。")]),a._v(" "),t("p",[a._v("应该尽量使用 TIMESTAMP，因为它比 DATETIME 空间效率更高。")]),a._v(" "),t("h2",{attrs:{id:"选择优化的数据类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#选择优化的数据类型"}},[a._v("#")]),a._v(" 选择优化的数据类型")]),a._v(" "),t("ul",[t("li",[a._v("更小的通常更好；更小的数据类型通常更快，因为它们占用更少的磁盘、内存和CPU缓存，并且处理时需要的CPU周期也更少；")]),a._v(" "),t("li",[a._v("简单就好；例如，整形比字符串操作代价更低；实用内建类型而不是字符串来存储日期和时间；用整形存储IP地址等；")]),a._v(" "),t("li",[a._v("尽量避免NULL；如果查询中包含可为NULL的列，对MySQL来说更难优化，因为可为NULL 的列使得索引、索引统计和值比较都更复杂。尽管把可为NULL的列改为NOT NULL带来的性能提升比较小，但如果计划在列上创建索引，就应该尽量避免设计成可为NULL的列；")])]),a._v(" "),t("h3",{attrs:{id:"字符串类型"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#字符串类型"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"#%E5%AD%97%E7%AC%A6%E4%B8%B2%E7%B1%BB%E5%9E%8B"}},[a._v("#")]),a._v(" 字符串类型")]),a._v(" "),t("h4",{attrs:{id:"varchar-和-char"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#varchar-和-char"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"#varchar-%E5%92%8C-char"}},[a._v("#")]),a._v(" VARCHAR 和 CHAR")]),a._v(" "),t("p",[a._v("VARCHAR是最常见的字符串类型。VARCHAR节省了存储空间，所以对性能也有帮助。但是，由于行是可变的，在UPDATE时可能使行变得比原来更长，这就导致需要做额外的工作。如果一个行占用的空间增长，并且在页内没有更多的空间可以存储，MyISAM会将行拆成不同的片段存储；InnoDB则需要分裂页来使行可以放进页内。")]),a._v(" "),t("p",[a._v("下面这些情况使用VARCHAR是合适的：字符串的最大长度比平均长度大很多；列的更新很少，所以碎片不是问题；使用了像UTF-8这样复杂的字符集，每个字符都使用不同的字节数进行存储。")]),a._v(" "),t("p",[a._v("当存储CHAR值时，MySQL会删除所有的末尾空格。CHAR值会根据需要采用空格进行填充以方便比较。")]),a._v(" "),t("p",[a._v("CHAR适合存储很短的字符串，或者所有值都接近同一个长度，如密码的MD5值。对于经常变更的数据，CHAR也比VARCHAR更好，因为CHAR不容易产生碎片（行间碎片？）。")]),a._v(" "),t("h4",{attrs:{id:"varchar-5-和varchar-200"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#varchar-5-和varchar-200"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"#varchar-5-%E5%92%8Cvarchar-200"}},[a._v("#")]),a._v(" VARCHAR(5)和VARCHAR(200)")]),a._v(" "),t("blockquote",[t("p",[a._v('使用VARCHAR(5)和VARCHAR(200)存储"hello"的空间开销是一样的。那么使用更短的列有什么优势吗？')])]),a._v(" "),t("p",[a._v("事实证明有很大的优势。更长的列会消耗更多的内存，因为MySQL通常会分配固定大小的内存块来保存内部值。尤其是使用内存临时表进行排序或其他操作时会特别糟糕。在利用磁盘临时表进行排序时也同样糟糕。")]),a._v(" "),t("p",[a._v("所以最好的策略是只分配真正需要的空间。")]),a._v(" "),t("h4",{attrs:{id:"blob-和-text"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#blob-和-text"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"#blob-%E5%92%8C-text"}},[a._v("#")]),a._v(" BLOB 和 TEXT")]),a._v(" "),t("p",[a._v("BLOB和TEXT都是为存储很大的数据而设计的数据类型，分别采用二进制和字符方式存储。")]),a._v(" "),t("p",[a._v("与其他类型不同，MySQL把每个BLOB和TEXT值当做一个独立的对象去处理。当BLOB和TEXT值太大时，InnoDB会使用专门的“外部”存储区域来进行存储，此时每个值在行内需要1~4个字节存储一个指针，然后在外部存储区域存储实际的值。")]),a._v(" "),t("p",[a._v("MySQL对BLOB和TEXT列进行排序与其他类型是不同的：它只对每个列的最前max_sort_length个字节而不是整个字符串做排序。同样的，MySQL也不能将BLOB或TEXT列全部长度的字符串进行索引。")]),a._v(" "),t("h3",{attrs:{id:"选择表示符-identifier"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#选择表示符-identifier"}},[a._v("#")]),a._v(" "),t("a",{attrs:{href:"#%E9%80%89%E6%8B%A9%E8%A1%A8%E7%A4%BA%E7%AC%A6-identifier"}},[a._v("#")]),a._v(" 选择表示符（identifier）")]),a._v(" "),t("p",[a._v("整数类型通常是标识列的最佳选择，因为它们很快并且可以使用AUTO_INCREMENT。 如果可能，应该避免使用字符串类型作为标识列，因为它们很耗空间，并且比数字类型慢。 对于完全随机的字符串也需要多加注意，例如MD5(),SHA1()或者UUID()产生的字符串。这些函数生成的新值会任意分布在很大的空间内，这会导致INSERT以及一些SELECT语句变得很慢：")]),a._v(" "),t("ul",[t("li",[a._v("因为插入值会随机的写入到索引的不同位置，所以使得INSERT语句更慢。这会导致页分裂、磁盘随机访问。")]),a._v(" "),t("li",[a._v("SELECT语句会变的更慢，因为逻辑上相邻的行会分布在磁盘和内存的不同地方。")]),a._v(" "),t("li",[a._v("随机值导致缓存对所有类型的查询语句效果都很差，因为会使得缓存赖以工作的局部性原理失效。")])])])}),[],!1,null,null,null);t.default=r.exports}}]);