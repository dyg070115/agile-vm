# Agile VM移动前端框架

Agile VM移动前端框架是一个数据视图双向绑定的框架，帮助开发者将数据层和视图层分离更彻底，是一个可以让业务逻辑和视图高度复用的框架。

框架分为浏览器版和sprite版。浏览器版用于基于浏览器内核的web工程中；sprite版用于基于烽火星空的原生移动应用开发平台sprite，关于sprite的介绍可以访问[https://www.exmobi.cn/](https://www.exmobi.cn/ "https://www.exmobi.cn/")了解。其中，浏览器版内置了jquery，sprite版实现了jquery的一个子集。但是开发中不建议使用类jquery的相关功能，而是使用双向绑定达到数据和界面的解耦。


<h2 id="cid_0">源码结构</h2>

### 目录说明

源码中包含三个目录：lib、dist和docs。

lib：此目录是源码文件，框架功能的修改可在此文件中完成，文件下的webpack.config.js文件用于使用webpack对lib下的源码进行打包为可分发的资源，分发的资源位于dist目录。

dist：此目录为最终开发者使用的资源文件，其中带有sprite字样的用于sprite平台，带有browser字样的用于浏览器；带有min字样的是压缩版，不带有min字样的是未压缩版本。

docs：此目录为使用手册目录，具体使用请参考文件夹下的readme说明。

### 编译说明

lib下的文件需要经过webpack编译得到可分发的版本方能使用。

编译命令接受两个参数，--usein和--compress，其中usein参数含义为框架运行的环境，有两个可选参数值，即sprite和browser；compress参数含义为是否压缩，有此参数则压缩，无则不压缩，不需要设置参数值。

比如：  
> webpack --usein browser --compress

意为：将lib源码打包为一个用于浏览器切代码经过压缩的分发版本文件。这时候会在dist目录下生成一个名为agile.vm.browser.min.js文件


<h2 id="cid_1">使用方法</h2>

### 在浏览器中使用

在浏览器中使用，html页面中无须引用jquery。只需要把dist目录下的agile.vm.browser.js文件或者agile.vm.browser.min.js文件引入到html页面即可。

使用方法为：

```javascript
$(selector).render(obj);
```


其中selector为视图层根节点元素的选择器，请确保选择器相对于页面元素为唯一；obj为一个json对象，内部包含要往视图层渲染的数据内容和函数。可通过对obj对象的操作来控制视图层的刷新。

### 在sprite中使用

在sprite中使用，需要把agile.vm.sprite.js文件或者agile.vm.sprite.min.js文件放置到sprite工程中的任意目录。使用前需要在uixml文件中通过require将js引入文件中。

使用方法为：

```javascript
var $ = require(path);
$(selector).render(obj);
```

其中path为放置在sprite工程中的agile vm框架的文件地址；obj为一个json对象，用于渲染视图层。path的配置可以符合sprite框架的require规则设置路径映射达到简化调用的效果。


### 浏览器中示例

html代码片段
```html
<div id="content">
	<input v-model="welcome" prompt="请输入"/>
	<p>hello {{welcome}}!</p>
</div>
```

JS代码片段
```javascript
var obj = {
	welcome : 'world'
};

$('#content').render(obj);
```

效果：
当在输入框中输入任意字符，下方就是显示hello+输入的字符。首次默认显示hello world。

<h2 id="cid_2">指令系统</h2>

Agile VM框架使用指令系统关联数据与视图。指令的基本写法为v-指令名[:指令类别]="指令内容"。特别的，可以通过{{指令内容}}代替v-text="指令内容"。

比如：

```html
<div v-on:click="doSubmit">{{btnName}}</div>
```

### 常用指令说明

> v-text="指令内容"

用于渲染文本内容，比如：v-text="'agile vm is a'+good+'framework'"

> v-html

用于渲染html片段内容，比如：v-html="richText"

> v-for

用于渲染一组数组数据，比如：

```html
<ul>
	<li v-for="item in list">{{$index}}：{{item.title}}</li>
</ul>
```

循环内部可以通过$index获取当前循环的索引，当有循环嵌套时，$index代表的是最近的v-for元素的循环的索引。

> v-on:eventName

用于为元素动态绑定事件，比如：

```html
<button v-on:click="doSubmit">提交</button>
```

当指令内容仅为函数名时，调用函数的时候会原样传递系统事件的参数；当指令内容是一个函数调用时，可通过$event来获取事件对象。

> v-one:eventName

用于为元素动态绑定事件，但是与v-on区别的是v-one指令会清掉该事件之前绑定过的事件再进行绑定，即只绑定一次此事件，当事件触发的时候仅进入最后一个v-one指定的回调函数中。

用法跟v-on相同。

> v-bind:attributeName

用于动态绑定元素属性，比如：

```html
<img v-bind:src="imgSrc"/>
```

特别的：

如果属性为style，则指令内容可以是一个json数据，该数据的key为任意样式的名称，value值为该样式的合理的输入值，比如：

```html
<a v-bind:style="{color:titleColor, 'background-color':titleBg}">agile vm教程</a>
```

这时候v-bind:style同时可简写为v-style。


如果属性class，则指令内容可以是一个json数据，该数据的key为任意已定义的class样式名，value值为boolean型，为true则元素添加此class样式，否则移除此class样式。比如：

```html
<a v-bind:class="{colorRed:isRed, colorBlue:isBlue}">agile vm教程</a>
```

这时候v-bind:class可简写为v-class。

> v-show

用于显隐某个元素，其指令内容执行结果应为boolean值，当为true时元素显示，false时元素隐藏。

> v-if/v-else

用于元素显示的逻辑判断，v-if可以设置boolean类型值，v-else可设置空串。当v-if的值为true，则v-if内的元素显示，v-else内的元素卸载；否则相反。

> v-model

用于通过表单关联数据与视图，达到双向绑定的效果。比如：

```html
<div id="content">
	<input v-model="welcome" prompt="请输入"/>
	<p>hello {{welcome}}!</p>
</div>
```

上面的例子中，输入框只要有输入内容的变化都会体现到下面的p中welcome对象所在的位置。

目前支持元素包括：input、select、radio、checkbox和textarea

> v-like

用于当开发者需要封装自己的类似input、select、radio、checkbox和textarea的表单组件时需要做数据的双向绑定，可以设置自己组件的v-like="input|select|radio|checkbox|textarea"，这时候组件需要封装固定含义与实现的change事件供框架调用，以实现实时通过输入改变数据的效果。