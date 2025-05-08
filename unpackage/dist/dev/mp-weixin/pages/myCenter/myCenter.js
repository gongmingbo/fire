"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      userInfo: {
        avatar: "/static/image.png",
        name: "张三",
        id: "123456"
      },
      menuList: [
        { name: "工作台", icon: "bars", path: "/pages/notemanger/notemanger" },
        { name: "我的房屋", icon: "home-filled", path: "/pages/myHome/myHome" },
        { name: "房屋及业主管理", icon: "person-filled", path: "/pages/homeownermanger/homeownermanger" },
        { name: "业主审核", icon: "calendar", path: "/pages/audit/audit" },
        { name: "小区资料管理", icon: "info", path: "/pages/homeownermanger/housemanger/housemanger" }
        // { name: '我的收藏', icon: 'star', path: '/pages/collect/collect' },
        // { name: '设置', icon: 'gear', path: '/pages/setting/setting' }
      ]
    };
  },
  methods: {
    // 编辑资料
    editProfile() {
      common_vendor.index.navigateTo({
        url: "/pages/profile/profile"
      });
    },
    // 处理菜单点击
    handleMenu(item) {
      common_vendor.index.navigateTo({
        url: item.path
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
  return {
    a: $data.userInfo.avatar,
    b: common_vendor.t($data.userInfo.name),
    c: common_vendor.t($data.userInfo.id),
    d: common_vendor.p({
      type: "compose",
      size: "16",
      color: "#666"
    }),
    e: common_vendor.o((...args) => $options.editProfile && $options.editProfile(...args)),
    f: common_vendor.f($data.menuList, (item, index, i0) => {
      return {
        a: "475e877a-1-" + i0,
        b: common_vendor.p({
          type: item.icon,
          size: "20",
          color: "#666"
        }),
        c: common_vendor.t(item.name),
        d: "475e877a-2-" + i0,
        e: index,
        f: common_vendor.o(($event) => $options.handleMenu(item), index)
      };
    }),
    g: common_vendor.p({
      type: "right",
      size: "16",
      color: "#999"
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/myCenter/myCenter.js.map
