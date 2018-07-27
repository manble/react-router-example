module.exports = {
   "env": {
       "browser": true,
       "node": true
   },
   "globals": {},
   "parser": "babel-eslint",
   "parserOptions": {
       "ecmaVersion": 8,
       "sourceType": "module",
       "ecmaFeatures": {
           "jsx": true
       }
   },
   "rules": {
       "no-debugger": 2, // 禁用 debugger
       "no-await-in-loop": 2, // 禁止循环内使用await
       "no-cond-assign": 2, // 禁止条件表达式中出现赋值操作符
       "no-dupe-args": 2, // 禁止 function 定义中出现重名参数
       "no-dupe-keys": 2, // 禁止对象字面量中出现重复的 key
       "no-duplicate-case": 2, // 禁止出现重复的 case 标签
       "no-empty-character-class": 2, //禁止在正则表达式中使用空字符集
       "no-extra-boolean-cast": 2, // 禁止不必要的布尔转换
       "no-func-assign": 2, // 禁止对 function 声明重新赋值
       "no-inner-declarations": 2, // 禁止在嵌套的块中出现变量声明或 function 声明
       "no-invalid-regexp": 2, // 禁止 RegExp 构造函数中存在无效的正则表达式字符串
       "no-obj-calls": 2, // 禁止把全局对象作为函数调用
       "no-template-curly-in-string": 2, // es6字符串模板错误
       "no-unexpected-multiline": 2, // 禁止出现令人困惑的多行表达式
       "no-unsafe-finally": 2, // 禁止在 finally 语句块中出现控制流语句
       "no-unsafe-negation": 2, // 无效的运算符
       "valid-typeof": 2, // 强制 typeof 表达式与有效的字符串进行比较
       "accessor-pairs": 2, // 强制 getter 和 setter 在对象中成对出现
       "no-empty-pattern": 2, // 禁止使用空解构模式
       "no-extend-native": 2, // 禁止扩展原生类型
       "no-with": 2, // 禁用with
       "array-callback-return": 2, // 强制数组方法的回调函数中有 return 语句 (from|every|filter|find|findIndex|map|reduce|reduceRight|some|sort)
       "radix": 2, // 强制在parseInt()使用基数参数
       "no-unreachable": 2, // 禁止在return、throw、continue 和 break 语句之后出现不可达代码
       "no-regex-spaces": 2, // 禁止正则表达式字面量中出现多个空格
       "no-else-return": 2, // 禁止 if 语句中 return 语句之后有 else 块
       "no-ex-assign": 2, // 禁止对 catch 子句的参数重新赋值
       "no-var": 2, // 使用const let
       "no-mixed-spaces-and-tabs": 2, // 禁止使用 空格 和 tab 混合缩进
       "constructor-super": 2, // 在构造函数中有 super() 的调用
       "no-this-before-super": 2, // 禁止在构造函数中，在调用 super() 之前使用 this 或 super


       "block-scoped-var": 1, // 把变量的使用限制在其定义的作用域范围内
       "no-extra-parens": 1, // 冗余括号
       "no-empty": 1, // 空语句块
       "no-extra-semi": 1, // 冗余的分号
       "no-irregular-whitespace": 1, // 在字符串和注释之外不规则的空白
       "no-sparse-arrays": 1, // 稀疏数组
       "complexity": [1, 4], // 程序中允许的最大环路复杂度
       "quotes": [1, "single", "avoid-escape"], // 引号 `` ''
       "curly": [1, "all"], // 所有控制语句使用一致的括号风格
       "default-case": 1, // 要求 switch 语句中有 default 分支
       "eqeqeq": 1, // 要求使用 === 和 !==
       "no-alert": 1, // 禁用 alert、confirm 和 prompt
       "no-empty-function": 1, // 出现空函数
       "vars-on-top": 1, // 要求所有的 var 声明出现在它们所在的作用域顶部
       "wrap-iife": [1, "inside"], // 自执行函数的括号位置 let test = (()=>{})();
       "indent": [1, 4],
       "brace-style": 1, // 大括号风格要求 默认 one true brace style 格式


       "no-unused-vars": [0, { "vars": "all", "args": "none" }], // 禁止未使用过的变量
   }
};