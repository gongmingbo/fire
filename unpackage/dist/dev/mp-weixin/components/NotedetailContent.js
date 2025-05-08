"use strict";
const common_vendor = require("../common/vendor.js");
const _sfc_main = {
  name: "NotedetailContent",
  props: {
    title: {
      type: String,
      default: ""
    },
    time: {
      type: String,
      default: ""
    },
    author: {
      type: String,
      default: ""
    },
    content: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    imageRows() {
      const rows = [];
      for (let i = 0; i < this.images.length; i += 3) {
        rows.push(this.images.slice(i, i + 3));
      }
      return rows;
    }
  },
  methods: {
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.images,
        current: index
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.t($props.title),
    b: common_vendor.t($props.time),
    c: common_vendor.t($props.author),
    d: common_vendor.t($props.content),
    e: common_vendor.f($options.imageRows, (row, rowIndex, i0) => {
      return {
        a: common_vendor.f(row, (item, index, i1) => {
          return {
            a: item,
            b: index,
            c: common_vendor.o(($event) => $options.previewImage(rowIndex * 3 + index), index)
          };
        }),
        b: rowIndex
      };
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-10820e60"]]);
wx.createComponent(Component);
//# sourceMappingURL=../../.sourcemap/mp-weixin/components/NotedetailContent.js.map
