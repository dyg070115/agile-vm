
(function(){
	var $ = require('JQLite');
	var Compiler = require('Compiler');
	
	
	/**
	 * MVVM 构造函数入口
	 * @param  {JQLite}      element  [视图的挂载节点]
	 * @param  {Object}      model    [数据模型对象]
	 */
	function MVVM (element, model) {

		// 初始数据备份
		this.backup = $.util.copy(model);

		// ViewModel 实例
		this.vm = new Compiler(element, model);

		// 数据模型
		this.$data = this.vm.$data;
	}

	var mp = MVVM.prototype;


	/**
	 * 重置数据模型至初始状态
	 * @param   {Array|String}  key  [数据模型字段，或字段数组，空则重置所有]
	 */
	mp.reset = function (key) {
		var vm = this.$data;

		if ($.util.isString(key)) {
			vm[key] = backup[key];
		}else if ($.isArray(key)) {
			$.util.each(key, function (i, v) {
				vm[v] = backup[v];
			});
		}else {
			$.util.each(vm, function (k, v) {
				vm[k] = backup[k];
			});
		}
	};

	/**
	 * 销毁 mvvm 实例
	 */
	mp.destroy = function () {
		this.vm = this.backup = this.$data = null;
	};
	
	module.exports = MVVM;
})();