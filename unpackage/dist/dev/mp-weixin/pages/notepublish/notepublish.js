"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      typeOptions: ["业主大会公告", "物业通知", "活动通知"],
      typeIndex: 0,
      formData: {
        title: "",
        type: "",
        content: "",
        images: []
      },
      userInfo: {
        name: "物业服务中心"
      }
    };
  },
  computed: {
    currentTime() {
      return (/* @__PURE__ */ new Date()).toLocaleString();
    }
  },
  methods: {
    handleTypeChange(e) {
      this.typeIndex = e.detail.value;
      this.formData.type = this.typeOptions[e.detail.value];
    },
    async chooseImage() {
      try {
        const res = await common_vendor.index.chooseImage({
          count: 3 - this.formData.images.length,
          sizeType: ["compressed"],
          sourceType: ["album", "camera"]
        });
        this.formData.images = [...this.formData.images, ...res.tempFilePaths];
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/notepublish/notepublish.vue:121", e);
      }
    },
    deleteImage(index) {
      this.formData.images.splice(index, 1);
    },
    previewNotice() {
      if (!this.validateForm())
        return;
      const previewData = {
        title: this.formData.title,
        time: this.currentTime,
        author: this.userInfo.name,
        content: this.formData.content,
        images: this.formData.images,
        type: this.formData.type
      };
      common_vendor.index.setStorageSync("previewNoticeData", previewData);
      common_vendor.index.navigateTo({
        url: "/pages/notedetail/notedetail"
      });
    },
    validateForm() {
      if (!this.formData.title) {
        common_vendor.index.showToast({
          title: "请输入公告标题",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.type) {
        common_vendor.index.showToast({
          title: "请选择公告类型",
          icon: "none"
        });
        return false;
      }
      if (!this.formData.content) {
        common_vendor.index.showToast({
          title: "请输入公告内容",
          icon: "none"
        });
        return false;
      }
      return true;
    },
    async saveDraft() {
      if (!this.validateForm())
        return;
      try {
        common_vendor.index.showToast({
          title: "保存成功",
          icon: "success"
        });
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/notepublish/notepublish.vue:177", e);
      }
    },
    async publishNotice() {
      if (!this.validateForm())
        return;
      try {
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      } catch (e) {
        common_vendor.index.__f__("error", "at pages/notepublish/notepublish.vue:192", e);
      }
    }
  }
};
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.formData.title,
    b: common_vendor.o(($event) => $data.formData.title = $event.detail.value),
    c: $data.formData.content,
    d: common_vendor.o(($event) => $data.formData.content = $event.detail.value),
    e: common_vendor.t($data.formData.content.length),
    f: common_vendor.f($data.formData.images, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o(($event) => $options.deleteImage(index), index),
        c: index
      };
    }),
    g: $data.formData.images.length < 3
  }, $data.formData.images.length < 3 ? {
    h: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    i: common_vendor.t($options.currentTime),
    j: common_vendor.t($data.formData.type || "请选择公告类型"),
    k: common_vendor.p({
      type: "down",
      size: "15"
    }),
    l: $data.typeOptions,
    m: common_vendor.o((...args) => $options.handleTypeChange && $options.handleTypeChange(...args)),
    n: $data.typeIndex,
    o: common_vendor.p({
      type: "right",
      size: "15"
    }),
    p: common_vendor.o((...args) => $options.saveDraft && $options.saveDraft(...args)),
    q: common_vendor.o((...args) => $options.previewNotice && $options.previewNotice(...args)),
    r: common_vendor.o((...args) => $options.publishNotice && $options.publishNotice(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notepublish/notepublish.js.map
