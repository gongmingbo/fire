"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "Model",
  props: {
    show: {
      type: Boolean,
      default: false
    },
    type: {
      type: String,
      default: "form",
      validator: (value) => ["form", "action"].includes(value)
    },
    title: {
      type: String,
      default: ""
    },
    formItems: {
      type: Array,
      default: () => []
    },
    actionItems: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    handleCancel() {
      this.$emit("cancel");
    },
    handleSubmit() {
      this.$emit("submit", this.formItems);
    },
    handleAction(item) {
      if (item.type === "cancel") {
        this.handleCancel();
      } else {
        this.$emit("action", item);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.show
  }, $props.show ? common_vendor.e({
    b: $props.type === "form"
  }, $props.type === "form" ? {
    c: common_vendor.t($props.title),
    d: common_vendor.f($props.formItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.label),
        b: item.type || "text",
        c: item.placeholder,
        d: item.value,
        e: common_vendor.o(($event) => item.value = $event.detail.value, index),
        f: index
      };
    }),
    e: common_vendor.o((...args) => $options.handleCancel && $options.handleCancel(...args)),
    f: common_vendor.o((...args) => $options.handleSubmit && $options.handleSubmit(...args))
  } : {}, {
    g: $props.type === "action"
  }, $props.type === "action" ? {
    h: common_vendor.f($props.actionItems, (item, index, i0) => {
      return {
        a: common_vendor.t(item.text),
        b: index,
        c: item.type === "cancel" ? 1 : "",
        d: common_vendor.o(($event) => $options.handleAction(item), index)
      };
    })
  } : {}, {
    i: $props.type === "action" ? 1 : ""
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/model.js.map
