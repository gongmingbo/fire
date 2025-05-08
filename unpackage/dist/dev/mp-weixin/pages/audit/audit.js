"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      showFilter: false,
      activeTab: "unreviewed",
      auditList: [
        {
          buildingName: "怡景苑2栋202",
          applicant: "龙海森",
          applyTime: "2024-03-20 10:30",
          phone: "13800138000",
          status: "通过"
        },
        {
          buildingName: "怡景苑2栋202",
          applicant: "龙海森",
          applyTime: "2024-03-20 10:30",
          phone: "13800138000",
          status: "驳回"
        }
      ]
    };
  },
  methods: {
    handleApprove(item) {
      common_vendor.index.navigateTo({
        url: "/pages/audit/auditDetail/auditDetail"
      });
    },
    switchTab(tab) {
      this.activeTab = tab;
    },
    toAuditHistory() {
      if (this.activeTab == "reviewed") {
        common_vendor.index.navigateTo({
          url: "/pages/audit/audithistory/audithistory"
        });
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: $data.activeTab === "unreviewed" ? 1 : "",
    b: common_vendor.o(($event) => $options.switchTab("unreviewed")),
    c: $data.activeTab === "reviewed" ? 1 : "",
    d: common_vendor.o(($event) => $options.switchTab("reviewed")),
    e: common_vendor.f($data.auditList, (item, index, i0) => {
      return common_vendor.e({
        a: common_vendor.t(item.buildingName)
      }, $data.activeTab === "reviewed" ? {
        b: common_vendor.t(item.status),
        c: item.status === "通过" ? 1 : "",
        d: item.status === "驳回" ? 1 : ""
      } : {}, {
        e: common_vendor.t(item.applicant),
        f: common_vendor.t(item.applyTime),
        g: common_vendor.t(item.phone)
      }, $data.activeTab === "unreviewed" ? {
        h: common_vendor.o(($event) => $options.handleApprove(item), index)
      } : {}, {
        i: index
      });
    }),
    f: $data.activeTab === "reviewed",
    g: $data.activeTab === "unreviewed",
    h: common_vendor.o(($event) => $options.toAuditHistory())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/audit/audit.js.map
