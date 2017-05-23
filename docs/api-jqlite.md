# JQLite API

<h2 id="cid_0">使用</h2>

在Sprite的uixml中可以通过如下代码引入JQLite：
```javascript
var $ = require('JQLite');
```

在html中可以直接通过<code>$</code>来使用JQLite

### 基本用法

JQLite语法与jQuery基本一致，而且浏览器版是直接内置使用了jQuery。

```javascript
var $el = $(selector);//通过selector选择器获取一个JQlite对象
```

### 选择器类型

浏览器版与jQuery完全一致，这里主要是说明Sprite版本。

目前支持的选择器为：

> 类型选择器：如button
> ID选择器： 如 #submit
> 类选择器： 如 .login
> 属性选择器[att="val"）：如 [type="text"]


支持的关系符为：

> 空格：所有子孙节点
> &gt;：子节点

<h2 id="cid_1">基础</h2>

> [isElement(): boolean;](#)

> [elementType(): string;](#)

> [is(status:string): boolean;](#)



<h2 id="cid_2">元素集</h2>

> [(selector: string, context?: any): IJQLite;](#)

> [add(el:IJQLite): IJQLite;](#)

> [get(index:number): IJQLite;](#)

> [childs(index?:number): IJQLite;](#)

> [parent(): IJQLite;](#)

> [find(selector:string): IJQLite;](#)

> [first(): IJQLite;](#)

> [last(): IJQLite;](#)

> [before($el:IJQLite): IJQLite;](#)

> [after($el:IJQLite): IJQLite;](#)

> [next(selector:string): IJQLite;](#)

> [prev(selector:string): IJQLite;](#)

> [siblings(selector:string): IJQLite;](#)

> [empty(): IJQLite;](#)

> [remove(): IJQLite;](#)

> [append(el: any): IJQLite;](#)

> [replaceWith(el: any): IJQLite;](#)

> [appendTo(el: any): IJQLite;](#)

> [insertAfter(el: any): IJQLite;](#)

> [insertBefore(el: any): IJQLite;](#)

> [replaceTo(el: any): IJQLite;](#)

> [clone(isDeep?:boolean): IJQLite;](#)


<h2 id="cid_3">操作</h2>

> [render(data: Object): any;](#)

> [textContent(text?:string): any;](#)

> [attrs(prop?:string, val?:any): any;](#)

> [html(content?:string): any;](#)

> [text(text?:string): any;](#)

> [html(content?:string): any;](#)

> [val(val?:any): any;](#)

> [css(prop:any, val?:any): any;](#)

> [attr(attrName?:string, attrVal?:any): any;](#)

> [prop(attrName?:string, attrVal?:any): any;](#)

> [removeAttr(prop:string): any;](#)

> [hasAttr(prop:string): boolean;](#)

> [hasClass(className:string): boolean;](#)

> [addClass(className:string): IJQLite;](#)

> [removeClass(className:string): IJQLite;](#)

> [data(key:string, val?:any): any;](#)

> [show(): any;](#)

> [hide(): any;](#)


<h2 id="cid_4">工具</h2>

> [each(cb:Function): IJQLite;](#)

> [on(evt:string, selector?:string, callback?:Function): IJQLite;](#)

> [trigger(evt:string, params?:any): IJQLite;](#)

> [off(evt:string, callback?:Function): IJQLite;](#)

> [exe(funcName:any, params?:any): any;](#)

> [ready(cb:Function):any;](#)

> [animate(props:any, duration?:number, easing?:string, complete?:Function): any;](#)


<h2 id="cid_5">静态</h2>

> [each(obj:Object, callback:Function, context?:Object): void;](#)

> [	type(obj:any): string;](#)

> [	isArray(obj:any): boolean;](#)

> [	isFunction(obj:any): boolean;](#)

> [	isEmptyObject(obj:any): boolean;](#)

> [	isPlainObject(obj:any): boolean;](#)

> [	extend(target:Object, source:Object, isDeep?:boolean): Object;](#)

> [	ajax(settings: any): void;](#)

> [	util:IJQLiteUtil;](#)



<h2 id="cid_6">扩展</h2>

与jQuery的扩展一致，可以通过<code>.fn.extend</code>来实现