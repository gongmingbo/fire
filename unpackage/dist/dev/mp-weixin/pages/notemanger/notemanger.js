"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {
      typeOptions: ["全部类型", "业主大会公告", "物业通知", "活动通知"],
      statusOptions: ["全部状态", "草稿", "已发布"],
      selectedType: "",
      selectedStatus: "",
      noticeList: [
        {
          title: "关于小区物业费调整的通知",
          type: "业主大会公告",
          status: "已发布",
          publishTime: "2024/01/02 14:00",
          readCount: 156
        },
        {
          title: "小区环境整治通知",
          type: "物业通知",
          status: "草稿",
          publishTime: "2024/01/01 10:00",
          readCount: 0
        }
      ]
    };
  },
  methods: {
    handlePublish() {
      common_vendor.index.navigateTo({
        url: "/pages/notepublish/notepublish"
      });
    },
    handleTypeChange(e) {
      this.selectedType = this.typeOptions[e.detail.value];
    },
    handleStatusChange(e) {
      this.selectedStatus = this.statusOptions[e.detail.value];
    },
    handleEdit(item) {
      common_vendor.index.navigateTo({
        url: `/pages/notepublish/notepublish?id=${item.id}`
      });
    },
    handleDelete(item) {
      common_vendor.index.showModal({
        title: "确认删除",
        content: "确定要删除这条公告吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    handlePreview(item) {
      common_vendor.index.navigateTo({
        url: `/pages/notedetail/notedetail?id=${item.id}`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.o((...args) => $options.handlePublish && $options.handlePublish(...args)),
    b: common_vendor.t($data.selectedType || "全部类型"),
    c: $data.typeOptions,
    d: common_vendor.o((...args) => $options.handleTypeChange && $options.handleTypeChange(...args)),
    e: common_vendor.t($data.selectedStatus || "全部状态"),
    f: $data.statusOptions,
    g: common_vendor.o((...args) => $options.handleStatusChange && $options.handleStatusChange(...args)),
    h: common_vendor.f($data.noticeList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.title),
        b: common_vendor.t(item.status),
        c: common_vendor.n(item.status === "已发布" ? "published" : "draft"),
        d: common_vendor.t(item.type),
        e: common_vendor.t(item.publishTime),
        f: common_vendor.t(item.readCount),
        g: common_vendor.o(($event) => $options.handleEdit(item), index),
        h: common_vendor.o(($event) => $options.handleDelete(item), index),
        i: common_vendor.o(($event) => $options.handlePreview(item), index),
        j: common_vendor.o(($event) => $options.handlePreview(item), index),
        k: index
      };
    }),
    i: $data.noticeList.length === 0
  }, $data.noticeList.length === 0 ? {
    j: common_assets._imports_0
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notemanger/notemanger.js.map
