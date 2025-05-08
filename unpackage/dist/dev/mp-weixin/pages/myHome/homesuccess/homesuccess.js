"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    goToHome() {
      common_vendor.index.switchTab({
        url: "/pages/index/index"
      });
    },
    checkStatus() {
      common_vendor.index.navigateTo({
        url: "/pages/myHome/homebindrecord/homebindrecord"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0$2,
    b: common_vendor.o((...args) => $options.goToHome && $options.goToHome(...args)),
    c: common_vendor.o((...args) => $options.checkStatus && $options.checkStatus(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/myHome/homesuccess/homesuccess.js.map
