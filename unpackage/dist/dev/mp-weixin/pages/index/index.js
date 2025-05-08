"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      communityName: "南方上林格",
      show: true,
      showDropdown: false,
      neighborCount: 450,
      communityList: [
        "南方上林格",
        "阳光花园",
        "幸福家园",
        "金色港湾",
        "城市花园"
      ],
      communityStats: [
        { label: "房龄", value: "12年" },
        { label: "住宅数量", value: "452 套" },
        { label: "住宅面积", value: "8645 m²" },
        { label: "业主数量", value: "633 位" },
        { label: "物业费", value: "1.6 元/m²" }
      ],
      featureItems: ["公共资金", "物业信息", "社区公约", "地方法规"],
      notices: [
        {
          id: 1,
          read: true,
          type: "公告类型",
          title: "关于小区物业费调整的通知",
          content: "根据小区实际情况和物业服务成本的变化，经业主委员会讨论决定，自2024年4月1日起，小区物业费将进行适当调整..."
        },
        {
          id: 2,
          read: false,
          type: "公告类型",
          title: "小区绿化改造工程通知",
          content: "为提升小区整体环境，物业服务中心将于下周开始进行绿化改造工程，预计工期为两周..."
        }
      ],
      neighborAvatars: [
        "/static/image.png",
        "/static/image.png",
        "/static/image.png"
      ]
    };
  },
  methods: {
    // 切换社区名称显示状态
    toggleCommunityName() {
      this.show = !this.show;
    },
    // 切换下拉菜单显示状态
    toggleDropdown() {
      this.showDropdown = !this.showDropdown;
    },
    // 选择社区
    selectCommunity(name) {
      this.communityName = name;
      this.showDropdown = false;
    },
    // 跳转到公告详情页
    goToDetail(id, read) {
      common_vendor.index.navigateTo({
        url: `/pages/notedetail/notedetail?id=${id}&read=${read}`
      });
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
    a: common_vendor.t($data.communityName),
    b: $data.show,
    c: common_vendor.o((...args) => $options.toggleDropdown && $options.toggleDropdown(...args)),
    d: common_vendor.p({
      type: "down",
      size: "15"
    }),
    e: $data.showDropdown
  }, $data.showDropdown ? {
    f: common_vendor.f($data.communityList, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index,
        c: common_vendor.o(($event) => $options.selectCommunity(item), index)
      };
    })
  } : {}, {
    g: common_vendor.f($data.communityStats, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: common_vendor.t(item.value),
        c: index
      };
    }),
    h: common_vendor.f($data.neighborAvatars, (avatar, index, i0) => {
      return {
        a: avatar,
        b: index
      };
    }),
    i: common_vendor.t($data.neighborCount),
    j: common_vendor.f($data.featureItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item),
        b: index
      };
    }),
    k: common_vendor.f($data.notices, (notice, index, i0) => {
      return {
        a: common_vendor.t(notice.read ? "已读" : "未读"),
        b: common_vendor.n(notice.read ? "read" : "unread"),
        c: common_vendor.t(notice.type),
        d: common_vendor.t(notice.title),
        e: common_vendor.t(notice.content),
        f: common_vendor.o(($event) => $options.goToDetail(notice.id, notice.read), index),
        g: index
      };
    })
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
