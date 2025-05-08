"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
    const startYear = 1980;
    const yearRange = [];
    for (let i = currentYear; i >= startYear; i--) {
      yearRange.push(i);
    }
    return {
      communityInfo: {
        buildYear: "2022",
        houseCount: 568,
        totalArea: 85600,
        ownerCount: 532,
        propertyFee: 2.5
      },
      yearRange,
      showPicker: false,
      yearIndex: 0
    };
  },
  methods: {
    saveInfo() {
      common_vendor.index.showToast({
        title: "保存成功",
        icon: "success"
      });
      common_vendor.index.__f__("log", "at pages/homeownermanger/housemanger/housemanger.vue:87", "保存的数据：", this.communityInfo);
    },
    // 显示年份选择器
    showYearPicker() {
      common_vendor.index.__f__("log", "at pages/homeownermanger/housemanger/housemanger.vue:93", "当前选中的年份：", this.communityInfo.buildYear);
      const currentYear = this.communityInfo.buildYear;
      this.yearIndex = this.yearRange.findIndex((year) => year.toString() === currentYear);
      if (this.yearIndex === -1)
        this.yearIndex = 0;
      this.showPicker = true;
      common_vendor.index.__f__("log", "at pages/homeownermanger/housemanger/housemanger.vue:100", "showPicker", this.showPicker);
    },
    // 隐藏年份选择器
    hidePicker() {
      this.showPicker = false;
    },
    // 年份选择变化处理
    onYearChange(e) {
      const index = e.detail.value;
      const selectedYear = this.yearRange[index];
      this.communityInfo.buildYear = selectedYear.toString();
      this.showPicker = false;
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.communityInfo.buildYear || "输入年份"),
    b: common_vendor.p({
      type: "down",
      size: "15"
    }),
    c: $data.yearRange,
    d: $data.yearIndex,
    e: common_vendor.o((...args) => $options.onYearChange && $options.onYearChange(...args)),
    f: common_vendor.o((...args) => $options.hidePicker && $options.hidePicker(...args)),
    g: $data.communityInfo.houseCount,
    h: common_vendor.o(($event) => $data.communityInfo.houseCount = $event.detail.value),
    i: $data.communityInfo.totalArea,
    j: common_vendor.o(($event) => $data.communityInfo.totalArea = $event.detail.value),
    k: $data.communityInfo.ownerCount,
    l: common_vendor.o(($event) => $data.communityInfo.ownerCount = $event.detail.value),
    m: $data.communityInfo.propertyFee,
    n: common_vendor.o(($event) => $data.communityInfo.propertyFee = $event.detail.value),
    o: common_vendor.o((...args) => $options.saveInfo && $options.saveInfo(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/homeownermanger/housemanger/housemanger.js.map
