"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "voteRemark",
  data() {
    return {
      voteTypes: ["业主大会投票", "物业投票", "活动投票"],
      voteRanges: ["全部楼栋", "1号楼", "2号楼", "3号楼", "4号楼", "5号楼"],
      selectedVoteType: "",
      selectedVoteRange: ""
    };
  },
  methods: {
    handleVoteTypeChange(e) {
      const index = e.detail.value;
      this.selectedVoteType = this.voteTypes[index];
      this.$emit("voteTypeChange", this.selectedVoteType);
    },
    handleVoteRangeChange(e) {
      const index = e.detail.value;
      this.selectedVoteRange = this.voteRanges[index];
      this.$emit("voteRangeChange", this.selectedVoteRange);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($data.selectedVoteType || "请选择投票类型"),
    b: common_vendor.p({
      type: "down",
      size: "15",
      color: "#999"
    }),
    c: $data.voteTypes,
    d: common_vendor.o((...args) => $options.handleVoteTypeChange && $options.handleVoteTypeChange(...args)),
    e: common_vendor.t($data.selectedVoteRange || "请选择投票范围"),
    f: common_vendor.p({
      type: "down",
      size: "15",
      color: "#999"
    }),
    g: $data.voteRanges,
    h: common_vendor.o((...args) => $options.handleVoteRangeChange && $options.handleVoteRangeChange(...args))
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-070c1f98"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/voteRemark.js.map
