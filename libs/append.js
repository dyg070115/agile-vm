var __AVM__ = {};
var __EXPORTS_DEFINED_FACTORY__ = function() {

    if ((typeof module === "object" || typeof module === "function") && typeof module.exports === "object") {
        module.exports = __AVM__;
    }

    if (typeof window === 'undefined') return;

    const modName = window.__AGILE_VM_ID__ || 'avm';

    if (typeof window.define === "function" && window.define.amd) {
        window.define(modName, [], function () {
            return __AVM__;
        });
    }

    if (!window[modName]) window[modName] = __AVM__;

};
var __EXPORTS_DEFINED__ = function (mod, modName) {
    if(modName==='JQLite'){
         for(var k in __AVM__){
            mod[k] = __AVM__[k];
         }
         __AVM__ = mod;
         __EXPORTS_DEFINED_FACTORY__();
    }else{
        __AVM__[modName] = mod;
    }
};