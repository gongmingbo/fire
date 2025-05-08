"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      loading: false,
      searchQuery: "",
      buildings: [
        {
          id: 1,
          name: "怡景苑1栋",
          expanded: true
        },
        {
          id: 2,
          name: "怡景苑2栋",
          expanded: true
        }
      ],
      roomList: [
        {
          id: 1,
          buildingId: 1,
          name: "怡景苑1栋101",
          status: "authenticated",
          user: "小明",
          phone: "13800138000"
        },
        {
          id: 2,
          buildingId: 1,
          name: "怡景苑1栋102",
          status: "unauthenticated",
          user: "小红",
          phone: "13800138001"
        },
        {
          id: 3,
          buildingId: 1,
          name: "怡景苑1栋103",
          status: "authenticated",
          user: "小刚",
          phone: "13800138002"
        },
        {
          id: 4,
          buildingId: 2,
          name: "怡景苑2栋101",
          status: "authenticated",
          user: "小李",
          phone: "13800138003"
        },
        {
          id: 5,
          buildingId: 2,
          name: "怡景苑2栋102",
          status: "unauthenticated",
          user: "小王",
          phone: "13800138004"
        }
      ]
    };
  },
  methods: {
    toggleDropdown(buildingId) {
      const building = this.buildings.find((b) => b.id === buildingId);
      if (building) {
        building.expanded = !building.expanded;
      }
    },
    handleSearch() {
    },
    getBuildingAuthProgress(buildingId) {
      return this.roomList.filter(
        (room) => room.buildingId === buildingId && room.status === "authenticated"
      ).length;
    },
    getBuildingTotalRooms(buildingId) {
      return this.roomList.filter((room) => room.buildingId === buildingId).length;
    },
    getFilteredRooms(buildingId) {
      const buildingRooms = this.roomList.filter((room) => room.buildingId === buildingId);
      if (!this.searchQuery)
        return buildingRooms;
      const query = this.searchQuery.toLowerCase();
      const filteredRooms = buildingRooms.filter(
        (room) => room.name.toLowerCase().includes(query) || room.user.toLowerCase().includes(query)
      );
      if (filteredRooms.length > 0) {
        const building = this.buildings.find((b) => b.id === buildingId);
        if (building) {
          building.expanded = true;
        }
      }
      return filteredRooms;
    }
  },
  onLoad() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1e3);
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
    a: common_vendor.p({
      type: "search",
      size: "16",
      color: "#999"
    }),
    b: common_vendor.o([($event) => $data.searchQuery = $event.detail.value, (...args) => $options.handleSearch && $options.handleSearch(...args)]),
    c: $data.searchQuery,
    d: common_vendor.f($data.buildings, (building, buildingIndex, i0) => {
      return common_vendor.e({
        a: common_vendor.t(building.name),
        b: common_vendor.t($options.getBuildingAuthProgress(building.id)),
        c: common_vendor.t($options.getBuildingTotalRooms(building.id)),
        d: common_vendor.o(($event) => $options.toggleDropdown(building.id), building.id),
        e: "5de52763-1-" + i0,
        f: common_vendor.p({
          type: building.expanded ? "down" : "up",
          size: "15"
        })
      }, $data.loading ? {
        g: "5de52763-2-" + i0,
        h: common_vendor.p({
          type: "spinner-cycle",
          size: "24",
          color: "#87ceeb"
        })
      } : $options.getFilteredRooms(building.id).length === 0 ? {} : building.expanded ? {
        k: common_vendor.f($options.getFilteredRooms(building.id), (room, index, i1) => {
          return {
            a: common_vendor.t(room.name),
            b: common_vendor.t(room.status === "authenticated" ? "已认证" : "未认证"),
            c: common_vendor.n(room.status),
            d: common_vendor.t(room.user),
            e: room.id,
            f: index === $options.getFilteredRooms(building.id).length - 1 ? 1 : ""
          };
        })
      } : {}, {
        i: $options.getFilteredRooms(building.id).length === 0,
        j: building.expanded,
        l: building.id
      });
    }),
    e: $data.loading
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/neighbor/neighbor.js.map
