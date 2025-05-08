"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      noticeImages: [
        "/static/image.png",
        "/static/image.png",
        "/static/image.png"
      ],
      momentList: [
        {
          id: 1,
          name: "张三",
          avatar: "/static/image.png",
          time: "10分钟前",
          content: "今天天气真好，适合出去走走！",
          images: [
            "/static/image.png",
            "/static/image.png",
            "/static/image.png"
          ],
          isLiked: false,
          likeCount: 12
        },
        {
          id: 2,
          name: "李四",
          avatar: "/static/image.png",
          time: "30分钟前",
          content: "分享一张美食照片",
          images: ["/static/image.png"],
          isLiked: true,
          likeCount: 8
        }
      ]
    };
  },
  methods: {
    // 预览图片
    previewImage(images, current) {
      common_vendor.index.previewImage({
        urls: images,
        current
      });
    },
    // 点赞/取消点赞
    toggleLike(index) {
      const moment = this.momentList[index];
      moment.isLiked = !moment.isLiked;
      moment.likeCount += moment.isLiked ? 1 : -1;
    },
    // 跳转到详情页
    goToDetail(id) {
      common_vendor.index.navigateTo({
        url: `/pages/smalldetail/smalldetail?id=${id}`
      });
    },
    // 跳转到发布内容
    goToSmallShow() {
      common_vendor.index.navigateTo({
        url: `/pages/smallshow/smallshow`
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
    a: common_vendor.f($data.momentList, (item, index, i0) => {
      return common_vendor.e({
        a: item.avatar,
        b: common_vendor.t(item.name),
        c: common_vendor.t(item.time),
        d: common_vendor.t(item.content),
        e: item.images && item.images.length
      }, item.images && item.images.length ? {
        f: common_vendor.f(item.images, (img, imgIndex, i1) => {
          return {
            a: imgIndex,
            b: img,
            c: common_vendor.o(($event) => $options.previewImage(item.images, imgIndex), imgIndex)
          };
        })
      } : {}, {
        g: "d9121e1a-0-" + i0,
        h: common_vendor.p({
          type: "heart",
          size: "16",
          color: item.isLiked ? "#ff4d4f" : "#999"
        }),
        i: common_vendor.t(item.likeCount),
        j: common_vendor.n(item.isLiked ? "liked" : ""),
        k: common_vendor.o(($event) => $options.toggleLike(index), index),
        l: "d9121e1a-1-" + i0,
        m: common_vendor.o(($event) => $options.goToDetail(item.id), index),
        n: index
      });
    }),
    b: common_vendor.p({
      type: "chat",
      size: "16",
      color: "#999"
    }),
    c: common_vendor.p({
      type: "plusempty",
      size: "100",
      color: "#999"
    }),
    d: common_vendor.o(($event) => $options.goToSmallShow())
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/small/small.js.map
