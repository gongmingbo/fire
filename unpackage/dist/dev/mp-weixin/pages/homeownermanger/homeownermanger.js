"use strict";
const common_vendor = require("../../common/vendor.js");
const Model = () => "../../components/model.js";
const _sfc_main = {
  components: {
    Model
  },
  data() {
    return {
      showAreaPopup: false,
      showPopup: false,
      formItems: [{
        type: "text",
        value: "",
        placeholder: "请输入楼栋名称"
      }],
      actionItems: [
        {
          text: "楼栋详情",
          type: "detail"
        },
        {
          text: "楼栋重命名",
          type: "rename"
        },
        {
          text: "删除本楼栋",
          type: "delete"
        },
        {
          text: "取消",
          type: "cancel"
        }
      ]
    };
  },
  methods: {
    addBuilding() {
      this.showAreaPopup = true;
    },
    closeAreaPopup() {
      this.showAreaPopup = false;
    },
    submitAreaCorrection(formItems) {
      common_vendor.index.__f__("log", "at pages/homeownermanger/homeownermanger.vue:96", "提交的表单数据：", formItems);
      this.showAreaPopup = false;
    },
    showActionPopup() {
      this.showPopup = true;
    },
    closePopup() {
      this.showPopup = false;
    },
    handleAction(item) {
      switch (item.type) {
        case "detail":
          this.buildingDetail();
          break;
        case "rename":
          this.renameBuilding();
          break;
        case "delete":
          this.deleteBuilding();
          break;
      }
      this.closePopup();
    },
    buildingDetail() {
      common_vendor.index.__f__("log", "at pages/homeownermanger/homeownermanger.vue:120", "查看楼栋详情");
      common_vendor.index.navigateTo({
        url: "/pages/homeownermanger/buidingDetail/buidingDetail"
      });
    },
    renameBuilding() {
      common_vendor.index.__f__("log", "at pages/homeownermanger/homeownermanger.vue:126", "重命名楼栋");
    },
    deleteBuilding() {
      common_vendor.index.__f__("log", "at pages/homeownermanger/homeownermanger.vue:129", "删除楼栋");
    }
  }
};
if (!Array) {
  const _component_model = common_vendor.resolveComponent("model");
  _component_model();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.addBuilding()),
    b: common_vendor.o((...args) => $options.showActionPopup && $options.showActionPopup(...args)),
    c: common_vendor.o($options.closeAreaPopup),
    d: common_vendor.o($options.submitAreaCorrection),
    e: common_vendor.p({
      show: $data.showAreaPopup,
      type: "form",
      title: "添加楼栋",
      formItems: $data.formItems
    }),
    f: common_vendor.o($options.closePopup),
    g: common_vendor.o($options.handleAction),
    h: common_vendor.p({
      show: $data.showPopup,
      type: "action",
      actionItems: $data.actionItems
    })
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/homeownermanger/homeownermanger.js.map
