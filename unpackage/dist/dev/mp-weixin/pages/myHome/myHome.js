"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showPopup: false,
      showAreaPopup: false,
      showUnbindPopup: false,
      areaValue: ""
    };
  },
  methods: {
    homeSelect() {
      common_vendor.index.navigateTo({
        url: "/pages/myHome/homeselect/homeselect"
      });
    },
    checkStatus() {
      common_vendor.index.navigateTo({
        url: "/pages/myHome/homebindrecord/homebindrecord"
      });
    },
    // 打开操作弹框
    openActionPopup() {
      this.showPopup = true;
    },
    // 关闭弹框
    closePopup() {
      this.showPopup = false;
    },
    // 处理解除绑定
    handleUnbind() {
      this.closePopup();
      this.showUnbindPopup = true;
    },
    // 处理面积勘误
    handleAreaCorrection() {
      this.closePopup();
      this.showAreaPopup = true;
    },
    // 关闭面积勘误弹窗
    closeAreaPopup() {
      this.showAreaPopup = false;
      this.areaValue = "";
    },
    // 提交面积勘误
    submitAreaCorrection() {
      if (!this.areaValue) {
        common_vendor.index.showToast({
          title: "请输入面积",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "提交中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "提交成功",
          icon: "success"
        });
        this.closeAreaPopup();
      }, 1500);
    },
    // 关闭解除绑定弹窗
    closeUnbindPopup() {
      this.showUnbindPopup = false;
    },
    // 确认解除绑定
    confirmUnbind() {
      common_vendor.index.showLoading({
        title: "处理中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "解除成功",
          icon: "success"
        });
        this.closeUnbindPopup();
      }, 1500);
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.showPopup
  }, $data.showPopup ? {
    b: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  } : {}, {
    c: common_vendor.o((...args) => $options.openActionPopup && $options.openActionPopup(...args)),
    d: common_vendor.o(($event) => $options.homeSelect()),
    e: common_vendor.o((...args) => $options.checkStatus && $options.checkStatus(...args)),
    f: $data.showPopup
  }, $data.showPopup ? {
    g: common_vendor.o((...args) => $options.handleUnbind && $options.handleUnbind(...args)),
    h: common_vendor.o((...args) => $options.handleAreaCorrection && $options.handleAreaCorrection(...args)),
    i: common_vendor.o((...args) => $options.closePopup && $options.closePopup(...args))
  } : {}, {
    j: $data.showAreaPopup
  }, $data.showAreaPopup ? {
    k: $data.areaValue,
    l: common_vendor.o(($event) => $data.areaValue = $event.detail.value),
    m: common_vendor.o((...args) => $options.closeAreaPopup && $options.closeAreaPopup(...args)),
    n: common_vendor.o((...args) => $options.submitAreaCorrection && $options.submitAreaCorrection(...args))
  } : {}, {
    o: $data.showUnbindPopup
  }, $data.showUnbindPopup ? {
    p: common_vendor.o((...args) => $options.closeUnbindPopup && $options.closeUnbindPopup(...args)),
    q: common_vendor.o((...args) => $options.confirmUnbind && $options.confirmUnbind(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myHome/myHome.js.map
