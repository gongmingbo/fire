"use strict";
const common_vendor = require("../../common/vendor.js");
const VoteRemark = () => "../../components/voteRemark.js";
const _sfc_main = {
  components: {
    VoteRemark
  },
  data() {
    return {
      voteCountOptions: ["1票", "2票", "3票", "4票", "5票"],
      voteCountIndex: 0,
      voteOptions: ["常规投票", "匿名投票", "多选投票", "选举投票"],
      selectedVoteOption: "",
      formData: {
        title: "",
        options: ["", ""],
        startDate: "",
        endDate: "",
        voteCount: "",
        isAnonymous: false
      }
    };
  },
  methods: {
    addOption() {
      if (this.selectedVoteOption == "选举投票") {
        common_vendor.index.navigateTo({
          url: "/pages/voteperson/voteperson"
        });
        return;
      }
      if (this.formData.options.length < 10) {
        this.formData.options.push("");
      }
    },
    deleteOption(index) {
      if (this.formData.options.length > 0) {
        this.formData.options.splice(index, 1);
      }
    },
    handleStartDateChange(e) {
      this.formData.startDate = e.detail.value;
    },
    handleEndDateChange(e) {
      this.formData.endDate = e.detail.value;
    },
    handleVoteCountChange(e) {
      this.voteCountIndex = e.detail.value;
      this.formData.voteCount = this.voteCountOptions[e.detail.value];
    },
    handleAnonymousChange(e) {
      this.formData.isAnonymous = e.detail.value;
    },
    validateForm() {
      if (!this.formData.title) {
        common_vendor.index.showToast({
          title: "请输入投票标题",
          icon: "none"
        });
        return false;
      }
      if (this.formData.options.some((option) => !option)) {
        common_vendor.index.showToast({
          title: "请填写完整投票选项",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.startDate || !this.formData.endDate) {
        common_vendor.index.showToast({
          title: "请选择投票时间",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.voteCount) {
        common_vendor.index.showToast({
          title: "请选择每人可投票数",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    cancelVote() {
      common_vendor.index.navigateBack();
    },
    confirmVote() {
      if (!this.validateForm())
        return;
      common_vendor.index.showToast({
        title: "设置成功",
        icon: "success"
      });
      setTimeout(() => {
        common_vendor.index.navigateBack();
      }, 1500);
    },
    handleVoteOptionChange(e) {
      const index = e.detail.value;
      this.selectedVoteOption = this.voteOptions[index];
      switch (this.selectedVoteOption) {
        case "常规投票":
          this.formData.isAnonymous = false;
          break;
        case "匿名投票":
          this.formData.isAnonymous = true;
          break;
      }
    },
    handleVoteTypeChange(type) {
      common_vendor.index.__f__("log", "at pages/votemanger/votemanger.vue:207", "投票类型变更:", type);
    },
    handleVoteRangeChange(range) {
      common_vendor.index.__f__("log", "at pages/votemanger/votemanger.vue:210", "投票范围变更:", range);
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  const _component_vote_remark = common_vendor.resolveComponent("vote-remark");
  (_easycom_uni_icons2 + _component_vote_remark)();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.t($data.selectedVoteOption || "请选择投票选项"),
    b: common_vendor.p({
      type: "down",
      size: "15",
      color: "#999"
    }),
    c: $data.voteOptions,
    d: common_vendor.o((...args) => $options.handleVoteOptionChange && $options.handleVoteOptionChange(...args)),
    e: common_vendor.f($data.formData.options, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(index + 1),
        b: "选项" + (index + 1),
        c: $data.formData.options[index],
        d: common_vendor.o(($event) => $data.formData.options[index] = $event.detail.value, index)
      }, $data.formData.options.length > 0 ? {
        e: common_vendor.o(($event) => $options.deleteOption(index), index)
      } : {}, {
        f: index
      });
    }),
    f: $data.formData.options.length > 0,
    g: $data.formData.options.length < 10
  }, $data.formData.options.length < 10 ? {
    h: common_vendor.o((...args) => $options.addOption && $options.addOption(...args))
  } : {}, {
    i: common_vendor.t($data.formData.startDate || "开始日期"),
    j: $data.formData.startDate,
    k: common_vendor.o((...args) => $options.handleStartDateChange && $options.handleStartDateChange(...args)),
    l: common_vendor.t($data.formData.endDate || "结束日期"),
    m: $data.formData.endDate,
    n: common_vendor.o((...args) => $options.handleEndDateChange && $options.handleEndDateChange(...args)),
    o: common_vendor.o($options.handleVoteTypeChange),
    p: common_vendor.o($options.handleVoteRangeChange),
    q: common_vendor.o((...args) => $options.cancelVote && $options.cancelVote(...args)),
    r: common_vendor.o((...args) => $options.confirmVote && $options.confirmVote(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/votemanger/votemanger.js.map
