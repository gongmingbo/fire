"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      content: "",
      imageList: [],
      location: ""
    };
  },
  methods: {
    // 选择图片
    chooseImage() {
      const maxCount = 9 - this.imageList.length;
      common_vendor.index.chooseImage({
        count: maxCount,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.imageList = [...this.imageList, ...res.tempFilePaths];
        }
      });
    },
    // 预览图片
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.imageList,
        current: index
      });
    },
    // 删除图片
    deleteImage(index) {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除这张图片吗？",
        success: (res) => {
          if (res.confirm) {
            this.imageList.splice(index, 1);
          }
        }
      });
    },
    // 选择位置
    chooseLocation() {
      common_vendor.index.chooseLocation({
        success: (res) => {
          this.location = res.name;
        }
      });
    },
    // 提交
    submit() {
      if (!this.content && this.imageList.length === 0) {
        common_vendor.index.showToast({
          title: "请填写内容或上传图片",
          icon: "none"
        });
        return;
      }
      common_vendor.index.showLoading({
        title: "发布中..."
      });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "发布成功",
          icon: "success"
        });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 2e3);
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
    a: $data.content,
    b: common_vendor.o(($event) => $data.content = $event.detail.value),
    c: common_vendor.t($data.content.length),
    d: common_vendor.f($data.imageList, (image, index, i0) => {
      return {
        a: image,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: "bab29aa6-0-" + i0,
        d: common_vendor.o(($event) => $options.deleteImage(index), index),
        e: index
      };
    }),
    e: common_vendor.p({
      type: "close",
      size: "16",
      color: "#fff"
    }),
    f: $data.imageList.length < 9
  }, $data.imageList.length < 9 ? {
    g: common_vendor.p({
      type: "camera",
      size: "32",
      color: "#999"
    }),
    h: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    i: common_vendor.p({
      type: "location",
      size: "16",
      color: "#666"
    }),
    j: common_vendor.t($data.location || "所在位置"),
    k: common_vendor.o((...args) => $options.chooseLocation && $options.chooseLocation(...args)),
    l: !$data.content && $data.imageList.length === 0,
    m: common_vendor.o((...args) => $options.submit && $options.submit(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/smallshow/smallshow.js.map
