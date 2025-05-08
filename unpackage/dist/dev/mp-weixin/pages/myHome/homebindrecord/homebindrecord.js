"use strict";
const common_vendor = require("../../../common/vendor.js");
const common_assets = require("../../../common/assets.js");
const _sfc_main = {
  // 添加页面配置
  onLoad() {
    common_vendor.index.setNavigationBarTitle({
      title: "绑定记录"
    });
  },
  // 重写返回按钮行为
  onBackPress() {
    common_vendor.index.navigateTo({
      url: "/pages/myHome/myHome"
    });
    return true;
  },
  data() {
    return {
      recordList: [
        {
          houseName: "怡景苑1栋201",
          houseArea: "102m²",
          status: "pending",
          applyTime: "2024-03-20 14:30",
          reviewTime: "",
          reviewRemark: "",
          images: [
            "/static/image.png",
            "/static/image.png"
          ]
        },
        {
          houseName: "怡景苑2栋302",
          houseArea: "89m²",
          status: "approved",
          applyTime: "2024-03-18 10:20",
          reviewTime: "2024-03-19 15:40",
          reviewRemark: "审核通过",
          images: [
            "/static/image.png"
          ]
        },
        {
          houseName: "怡景苑3栋101",
          houseArea: "120m²",
          status: "rejected",
          applyTime: "2024-03-15 09:15",
          reviewTime: "2024-03-16 11:30",
          reviewRemark: "证明材料不清晰，请重新上传",
          images: [
            "/static/image.png",
            "/static/image.png",
            "/static/image.png"
          ]
        }
      ]
    };
  },
  methods: {
    getStatusText(status) {
      const statusMap = {
        pending: "审核中",
        approved: "已通过",
        rejected: "已拒绝"
      };
      return statusMap[status] || status;
    },
    handleReapply(item) {
      common_vendor.index.navigateTo({
        url: `/pages/myHome/homecertificate/homecertificate?id=${item.id}`
      });
    },
    // 预览图片
    previewImage(images, current) {
      common_vendor.index.previewImage({
        urls: images,
        current,
        indicator: "number",
        loop: true
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.f($data.recordList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.houseName),
        b: common_vendor.t(item.houseArea),
        c: common_vendor.t($options.getStatusText(item.status)),
        d: common_vendor.n(item.status),
        e: common_vendor.t(item.applyTime),
        f: item.reviewTime
      }, item.reviewTime ? {
        g: common_vendor.t(item.reviewTime)
      } : {}, {
        h: item.reviewRemark
      }, item.reviewRemark ? {
        i: common_vendor.t(item.reviewRemark)
      } : {}, {
        j: item.images && item.images.length > 0
      }, item.images && item.images.length > 0 ? {
        k: common_vendor.f(item.images, (img, imgIndex, i1) => {
          return {
            a: img,
            b: imgIndex,
            c: common_vendor.o(($event) => $options.previewImage(item.images, imgIndex), imgIndex)
          };
        })
      } : {}, {
        l: item.status === "rejected"
      }, item.status === "rejected" ? {
        m: common_vendor.o(($event) => $options.handleReapply(item), index)
      } : {}, {
        n: index
      });
    }),
    b: $data.recordList.length === 0
  }, $data.recordList.length === 0 ? {
    c: common_assets._imports_0
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/myHome/homebindrecord/homebindrecord.js.map
