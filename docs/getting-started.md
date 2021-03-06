# 下载和使用
Agile VM框架源码已经托管到github上，并提供webpack配置打包进行定制化开发，方便进行获取代码和修改。

<h2 id="cid_0">下载</h2>

可以通过两种方式下载到本地：

### git克隆

可通过如下命令进行克隆到任意目录：

> git clone https://github.com/nandy007/agile-vm.git

### zip压缩包

可通过如下地址将zip文件下载：

> https://github.com/nandy007/agile-vm/archive/master.zip

然后解压到任意目录

<h2 id="cid_1">使用</h2>

下载之后进入框架目录，其中的lib目录为源码目录不可直接使用，dist目录为使用webpack打包后的生成的发布文件，可直接使用，docs目录为使用手册文件。

使用方式有两种：

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