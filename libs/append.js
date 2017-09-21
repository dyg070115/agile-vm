var __AVM__;
(function (factory) {
    __AVM__ = factory();
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

})(function () {
    return {};
});
var __EXPORTS_DEFINED__ = function (mod, modName) {
    __AVM__[modName] = mod;
    if(modName==='JQLite') __AVM__['$'] = mod;
};