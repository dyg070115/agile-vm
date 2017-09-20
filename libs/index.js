(function (factory) {
    const avm = factory();
    if ((typeof module === "object" || typeof module === "function") && typeof module.exports === "object") {
        module.exports = JQLite;
    }
    
    const modName = window.__AGILE_VM_ID__ || 'avm';

    if (typeof window.define === "function" && window.define.amd) {
        window.define(modName, [], function () {
            return avm;
        });
    }

    if(!window[modName]) window[modName] = avm;

})(function(){
    return {
        JQLite: require('JQLite'),
        $: require('JQLite'),
        Parser: require('Parser')
    };
})


	/*window.JQLite = jqlite;

	if(!window.$){
		window.$ = jqlite;
	}
	if(!window.jQuery){
		window.jQuery = jqlite;
	}*/
