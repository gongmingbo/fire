"use strict";
const common_vendor = require("../../../common/vendor.js");
const Model = () => "../../../components/model.js";
const _sfc_main = {
  components: {
    Model
  },
  data() {
    return {
      showAreaPopup: false,
      showPopup: false,
      roomList: [
        {
          name: "怡景苑1栋101",
          isVerified: true,
          owner: "张三",
          area: "125.23",
          floor: "10"
        },
        {
          name: "怡景苑1栋102",
          isVerified: false,
          owner: "李四",
          area: "98.56",
          floor: "10"
        },
        {
          name: "怡景苑1栋103",
          isVerified: true,
          owner: "王五",
          area: "135.78",
          floor: "10"
        }
      ],
      formItems: [
        {
          type: "text",
          value: "",
          label: "房屋名称",
          placeholder: "请输入"
        },
        {
          type: "text",
          value: "",
          label: "房屋专有面积",
          placeholder: "请输入"
        }
      ],
      actionItems: [
        {
          text: "修改房屋信息",
          type: "edit"
        },
        {
          text: "删除房屋",
          type: "delete"
        },
        {
          text: "解除业主认证",
          type: "deleteAuth"
        },
        {
          text: "取消",
          type: "cancel"
        }
      ]
    };
  },
  methods: {
    addRoom() {
      this.showAreaPopup = true;
    },
    closeAreaPopup() {
      this.showAreaPopup = false;
    },
    submitAreaCorrection(formItems) {
      if (!formItems[0].value) {
        common_vendor.index.showToast({
          title: "请输入房屋名称",
          icon: "none"
        });
        return;
      }
      if (!formItems[1].value) {
        common_vendor.index.showToast({
          title: "请输入房屋专有面积",
          icon: "none"
        });
        return;
      }
      common_vendor.index.__f__("log", "at pages/homeownermanger/buidingDetail/buidingDetail.vue:136", "提交的表单数据：", formItems);
      this.showAreaPopup = false;
      common_vendor.index.showToast({
        title: "添加成功",
        icon: "success"
      });
    },
    closePopup() {
      this.showPopup = false;
    },
    handleAction(action) {
      switch (action.type) {
        case "edit":
          this.editRoom();
          break;
        case "delete":
          this.deleteRoom();
          break;
        case "deleteAuth":
          this.deleteAuth();
          break;
      }
      this.closePopup();
    },
    editRoom() {
      this.formItems[0].value = "怡景苑1栋102";
      this.formItems[1].value = "125.23";
      this.showAreaPopup = true;
    },
    deleteRoom() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要删除该房屋吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/homeownermanger/buidingDetail/buidingDetail.vue:175", "删除房屋");
            common_vendor.index.showToast({
              title: "删除成功",
              icon: "success"
            });
          }
        }
      });
    },
    deleteAuth() {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定要解除业主认证吗？",
        success: (res) => {
          if (res.confirm) {
            common_vendor.index.__f__("log", "at pages/homeownermanger/buidingDetail/buidingDetail.vue:191", "解除业主认证");
            common_vendor.index.showToast({
              title: "解除成功",
              icon: "success"
            });
          }
        }
      });
    }
  }
};
if (!Array) {
  const _component_model = common_vendor.resolveComponent("model");
  _component_model();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.o(($event) => $options.addRoom()),
    b: common_vendor.f($data.roomList, (item, index, i0) => {
      return {
        a: common_vendor.t(item.name),
        b: common_vendor.t(item.isVerified ? "已认证" : "未认证"),
        c: item.isVerified ? 1 : "",
        d: common_vendor.t(item.owner || "暂无"),
        e: common_vendor.t(item.area),
        f: common_vendor.t(item.floor),
        g: common_vendor.o(($event) => $data.showPopup = true, index),
        h: index
      };
    }),
    c: common_vendor.o($options.closeAreaPopup),
    d: common_vendor.o($options.submitAreaCorrection),
    e: common_vendor.p({
      show: $data.showAreaPopup,
      type: "form",
      title: "添加房屋",
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
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/homeownermanger/buidingDetail/buidingDetail.js.map
