"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      photoUrl: "",
      // 照片URL
      uploading: false
      // 上传状态
    };
  },
  methods: {
    save() {
      common_vendor.index.navigateBack();
    },
    cancel() {
      common_vendor.index.navigateBack();
    },
    // 选择图片
    chooseImage() {
      common_vendor.index.chooseImage({
        count: 1,
        // 最多可以选择的图片张数
        sizeType: ["compressed"],
        // 压缩图
        sourceType: ["album", "camera"],
        // 从相册选择或使用相机
        success: (res) => {
          this.photoUrl = res.tempFilePaths[0];
          this.uploadImage(res.tempFilePaths[0]);
        }
      });
    },
    // 上传图片
    uploadImage(filePath) {
      if (this.uploading)
        return;
      this.uploading = true;
      common_vendor.index.showLoading({
        title: "上传中..."
      });
      common_vendor.index.uploadFile({
        url: "YOUR_UPLOAD_API_URL",
        // 替换为你的上传接口
        filePath,
        name: "file",
        success: (res) => {
          const data = JSON.parse(res.data);
          if (data.code === 0) {
            common_vendor.index.showToast({
              title: "上传成功",
              icon: "success"
            });
          } else {
            common_vendor.index.showToast({
              title: "上传失败",
              icon: "none"
            });
          }
        },
        fail: () => {
          common_vendor.index.showToast({
            title: "上传失败",
            icon: "none"
          });
        },
        complete: () => {
          this.uploading = false;
          common_vendor.index.hideLoading();
        }
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $data.photoUrl
  }, $data.photoUrl ? {
    b: $data.photoUrl
  } : {}, {
    c: common_vendor.o((...args) => $options.chooseImage && $options.chooseImage(...args)),
    d: common_vendor.o(($event) => $options.save()),
    e: common_vendor.o(($event) => $options.cancel())
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/voteperson/voteperson.js.map
