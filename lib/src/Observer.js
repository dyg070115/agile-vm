
(function(){
	
	var $ = require('JQLite');

	//v8引擎sort算法与浏览器不同，重写sort函数，以xSort代替
	Array.prototype.xSort = function(fn){ 
	    var fn = fn || function(a, b){  return a > b; }; 
	    for(var i=0; i<this.length; i++){ 
	        for(var j=i; j<this.length; j++){ 
	            if(fn(this[i], this[j])){ 
	                var t = this[i]; 
	                this[i] = this[j]; 
	                this[j] = t; 
	            } 
	        } 
	    }
	    return this; 
	};
	// 重写push算法，使用索引值添加，提高效率
	Array.prototype.xPush = function(){
	    var l = this.length;
		for(var i=0, len = arguments.length ; i<len ; i++){
			this[l+i] = arguments[i];
		}
	    return this; 
	};
	
	// 重写的数组操作方法
	var rewriteArrayMethods = [
		'pop',
		'push',
		'sort',
		'shift',
		'splice',
		'unshift',
		'reverse',
		'xSort',
		'xPush'
	];

	var observeUtil  = {
		isNeed : function(val){
			return $.isArray(val) || $.util.isObject(val);
		}
	};

	/**
	 * observer 数据变化监测模块
	 * @param  {Object}     object    [VM 数据模型]
	 * @param  {Watcher}    watcher   [Watcher实例对象]
	 */
	function Observer (object, watcher) {

		this.watcher = watcher;

		// 子对象路径缓存
		this.$subs = {};

		this.observe(object);
	}

	var op = Observer.prototype;

	/**
	 * 监测数据变化触发回调
	 * @param   {Object}  options  [操作选项]
	 */
	op.trigger = function(options){
		this.watcher.change(options);
	};

	/**
	 * 监测数据模型
	 * @param   {Object}  object  [监测的对象]
	 * @param   {Array}   paths   [访问路径数组]
	 */
	op.observe = function (object, paths) {
		if ($.isArray(object)) {
			this.observeArray(object, paths);
		}

		$.util.each(object, function (property, value) {
			var ps = $.util.copyArray(paths||[]);
			ps.push(property);

			this.observeObject(object, ps, value);

			if(observeUtil.isNeed(value)){
				this.observe(value, ps);
			}

		}, this);

		return this;
	};


	/**
	 * 拦截对象属性存取描述符（绑定监测）
	 * @param   {Object|Array}  object  [对象或数组]
	 * @param   {Array}         paths   [访问路径数组]
	 * @param   {Any}           val     [默认值]
	 */
	op.observeObject = function (object, paths, val) {
		var path = (paths||[]).join('.');
		var prop = paths[paths.length - 1];
		var descriptor = Object.getOwnPropertyDescriptor(object, prop);
		var getter = descriptor.get, setter = descriptor.set, ob = this;

		// 定义 object[prop] 的 getter 和 setter
		Object.defineProperty(object, prop, {
			get: function Getter () {
				return getter ? getter.call(object) : val;
			},
			set: function Setter (newValue) {
				var oldValue = getter ? getter.call(object) : val;

				if (newValue === oldValue) {
					return;
				}

				// 新值为对象或数组重新监测
				if (observeUtil.isNeed(newValue)) {
					ob.observe(newValue, paths);
				}

				if (setter) {
					setter.call(object, newValue);
				} else {
					val = newValue;
				}

				// 触发变更回调
				ob.trigger({
					path : path,
					oldVal : oldValue,
					newVal : newValue
				});

			}
		});

	};


	/**
	 * 重写指定的 Array 方法
	 * @param   {Array}  array  [目标数组]
	 * @param   {Array}  paths  [访问路径数组]
	 */
	op.observeArray = function (array, paths) {
		var AP = Array.prototype;
		var arrayMethods = Object.create(AP);
		var path = (paths||[]).join('.');

		$.util.each(rewriteArrayMethods, function (i, method) {

			var ob = this, nativeMethod = AP[method];
			$.util.defRec(arrayMethods, method, function _redefineArrayMethod () {

				var args = $.util.copyArray(arguments),
					oldLen = this.length,
					result = nativeMethod.apply(this, arguments),
					newLen = this.length;

				// 重新监测
				ob.observe(this, paths);

				// 触发回调
				ob.trigger({
					path : path,
					method : method,
					args : args,
					oldLen : oldLen,
					newLen : newLen,
					newArray : this
				});

				return result;
			});
		}, this);

		array.__proto__ = arrayMethods;
	};
	
	module.exports = Observer;
})();