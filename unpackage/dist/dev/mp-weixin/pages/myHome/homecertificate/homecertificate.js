"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      imageList: [],
      maxImageCount: 3
    };
  },
  methods: {
    addHouse() {
    },
    removeHouse() {
    },
    chooseImage() {
      const count = this.maxImageCount - this.imageList.length;
      if (count <= 0) {
        common_vendor.index.showToast({
          title: "最多上传3张图片",
          icon: "none"
        });
        return;
      }
      common_vendor.index.chooseImage({
        count,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          this.uploadImages(res.tempFilePaths);
        },
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/myHome/homecertificate/homecertificate.vue:90", "选择图片失败：", err);
          common_vendor.index.showToast({
            title: "选择图片失败",
            icon: "none"
          });
        }
      });
    },
    uploadImages(tempFilePaths) {
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      const uploadTasks = tempFilePaths.map((path) => {
        return new Promise((resolve, reject) => {
          common_vendor.index.uploadFile({
            url: "YOUR_UPLOAD_API_URL",
            // 替换为你的上传接口
            filePath: path,
            name: "file",
            success: (res) => {
              const data = JSON.parse(res.data);
              if (data.code === 0) {
                resolve(data.url);
              } else {
                reject(new Error(data.message));
              }
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      });
      Promise.all(uploadTasks).then((urls) => {
        this.imageList = [...this.imageList, ...urls];
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "上传成功",
          icon: "success"
        });
      }).catch((err) => {
        common_vendor.index.__f__("error", "at pages/myHome/homecertificate/homecertificate.vue:135", "上传失败：", err);
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({
          title: "上传失败",
          icon: "none"
        });
      });
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.imageList,
        current: index
      });
    },
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
    submitCertificate() {
      common_vendor.index.navigateTo({
        url: `/pages/myHome/homesuccess/homesuccess`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.addHouse && $options.addHouse(...args)),
    b: $data.imageList.length > 0
  }, $data.imageList.length > 0 ? {
    c: common_vendor.f($data.imageList, (item, index, i0) => {
      return {
        a: item,
        b: common_vendor.o(($event) => $options.previewImage(index), index),
        c: common_vendor.o(($event) => $options.deleteImage(index), index),
        d: index
      };
    })
  } : {}, {
    d: $data.imageList.length < 3
  }, $data.imageList.length < 3 ? {
    e: common_assets._imports_0$1,
    f: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args))
  } : {}, {
    g: common_vendor.o((...args) => $options.removeHouse && $options.removeHouse(...args)),
    h: common_vendor.o((...args) => $options.submitCertificate && $options.submitCertificate(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/myHome/homecertificate/homecertificate.js.map
