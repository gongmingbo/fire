"use strict";
const common_vendor = require("../../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      buildings: [
        {
          name: "怡景苑1栋",
          isCollapsed: false,
          rooms: [
            { name: "怡景苑1栋201", checked: false },
            { name: "怡景苑1栋202", checked: false }
          ]
        },
        {
          name: "怡景苑2栋",
          isCollapsed: false,
          rooms: [
            { name: "怡景苑2栋201", checked: false },
            { name: "怡景苑2栋202", checked: false }
          ]
        }
      ]
    };
  },
  computed: {
    selectedCount() {
      return this.buildings.reduce((count, building) => {
        return count + building.rooms.filter((room) => room.checked).length;
      }, 0);
    }
  },
  methods: {
    toggleBuilding(index) {
      this.buildings[index].isCollapsed = !this.buildings[index].isCollapsed;
    },
    toggleRoom(buildingIndex, roomIndex) {
      this.buildings[buildingIndex].rooms[roomIndex].checked = !this.buildings[buildingIndex].rooms[roomIndex].checked;
    },
    handleConfirm() {
      const selectedRooms = this.buildings.reduce((rooms, building) => {
        return rooms.concat(building.rooms.filter((room) => room.checked));
      }, []);
      common_vendor.index.__f__("log", "at pages/myHome/homeselect/homeselect.vue:75", "Selected rooms:", selectedRooms);
      common_vendor.index.navigateTo({
        url: `/pages/myHome/homecertificate/homecertificate`
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.f($data.buildings, (building, index, i0) => {
      return {
        a: common_vendor.t(building.name),
        b: common_vendor.t(building.isCollapsed ? "展开" : "折叠"),
        c: common_vendor.o(($event) => $options.toggleBuilding(index), index),
        d: common_vendor.f(building.rooms, (room, roomIndex, i1) => {
          return {
            a: common_vendor.t(room.name),
            b: room.checked,
            c: common_vendor.o(($event) => $options.toggleRoom(index, roomIndex), roomIndex),
            d: roomIndex
          };
        }),
        e: !building.isCollapsed,
        f: index
      };
    }),
    b: common_vendor.t($options.selectedCount),
    c: common_vendor.o((...args) => $options.handleConfirm && $options.handleConfirm(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../../.sourcemap/mp-weixin/pages/myHome/homeselect/homeselect.js.map
