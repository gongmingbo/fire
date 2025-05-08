"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  data() {
    return {
      momentId: "",
      commentText: "",
      replyText: "",
      inputPlaceholder: "评论",
      currentReplyIndex: -1,
      momentDetail: {
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
      commentList: [
        {
          id: 1,
          name: "李四",
          avatar: "/static/image.png",
          time: "5分钟前",
          content: "是啊，阳光明媚！",
          isLiked: false,
          replies: [
            {
              fromName: "王五",
              toName: "李四",
              content: "一起去爬山吧！"
            }
          ]
        },
        {
          id: 2,
          name: "王五",
          avatar: "/static/image.png",
          time: "2分钟前",
          content: "看起来很好吃！",
          isLiked: true,
          replies: []
        }
      ]
    };
  },
  onLoad(options) {
    this.momentId = options.id;
  },
  methods: {
    // 预览图片
    previewImage(images, current) {
      common_vendor.index.previewImage({
        urls: images,
        current
      });
    },
    // 点赞/取消点赞动态
    toggleLike() {
      this.momentDetail.isLiked = !this.momentDetail.isLiked;
      if (this.momentDetail.isLiked) {
        this.momentDetail.likeCount++;
      } else {
        this.momentDetail.likeCount--;
      }
    },
    // 点赞/取消点赞评论
    likeComment(index) {
      const comment = this.commentList[index];
      comment.isLiked = !comment.isLiked;
    },
    // 回复评论
    replyComment(index) {
      this.currentReplyIndex = index;
      this.replyText = "";
    },
    // 提交回复
    submitReply(index) {
      if (!this.replyText.trim()) {
        common_vendor.index.showToast({
          title: "请输入回复内容",
          icon: "none"
        });
        return;
      }
      const comment = this.commentList[index];
      if (!comment.replies) {
        comment.replies = [];
      }
      comment.replies.push({
        fromName: "当前用户",
        toName: comment.name,
        content: this.replyText
      });
      this.replyText = "";
      this.currentReplyIndex = -1;
    },
    // 提交评论
    submitComment() {
      if (!this.commentText.trim()) {
        common_vendor.index.showToast({
          title: "请输入评论内容",
          icon: "none"
        });
        return;
      }
      if (this.currentReplyIndex === -1) {
        this.commentList.unshift({
          id: Date.now(),
          name: "当前用户",
          avatar: "/static/image.png",
          time: "刚刚",
          content: this.commentText,
          isLiked: false,
          replies: []
        });
      } else {
        const comment = this.commentList[this.currentReplyIndex];
        if (!comment.replies) {
          comment.replies = [];
        }
        comment.replies.push({
          fromName: "当前用户",
          toName: comment.name,
          content: this.commentText
        });
      }
      this.commentText = "";
      this.currentReplyIndex = -1;
      this.inputPlaceholder = "评论";
    }
  },
  computed: {
    // 计算总评论数（包括回复）
    totalComments() {
      let count = this.commentList.length;
      this.commentList.forEach((comment) => {
        if (comment.replies) {
          count += comment.replies.length;
        }
      });
      return count;
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
    a: $data.momentDetail.avatar,
    b: common_vendor.t($data.momentDetail.name),
    c: common_vendor.t($data.momentDetail.time),
    d: common_vendor.t($data.momentDetail.content),
    e: $data.momentDetail.images && $data.momentDetail.images.length
  }, $data.momentDetail.images && $data.momentDetail.images.length ? {
    f: common_vendor.f($data.momentDetail.images, (img, imgIndex, i0) => {
      return {
        a: imgIndex,
        b: img,
        c: common_vendor.o(($event) => $options.previewImage($data.momentDetail.images, imgIndex), imgIndex)
      };
    })
  } : {}, {
    g: common_vendor.p({
      type: "chat",
      size: "16",
      color: "#999"
    }),
    h: common_vendor.t($options.totalComments),
    i: common_vendor.p({
      type: "heart",
      size: "16",
      color: $data.momentDetail.isLiked ? "#ff4d4f" : "#999"
    }),
    j: common_vendor.t($data.momentDetail.likeCount),
    k: common_vendor.n($data.momentDetail.isLiked ? "liked" : ""),
    l: common_vendor.o((...args) => $options.toggleLike && $options.toggleLike(...args)),
    m: common_vendor.f($data.commentList, (comment, index, i0) => {
      return common_vendor.e({
        a: comment.avatar,
        b: common_vendor.t(comment.name),
        c: common_vendor.t(comment.time),
        d: common_vendor.t(comment.content),
        e: common_vendor.o(($event) => $options.replyComment(index), index),
        f: common_vendor.t(comment.isLiked ? "取消点赞" : "点赞"),
        g: common_vendor.o(($event) => $options.likeComment(index), index),
        h: comment.replies && comment.replies.length
      }, comment.replies && comment.replies.length ? {
        i: common_vendor.f(comment.replies, (reply, replyIndex, i1) => {
          return common_vendor.e({
            a: common_vendor.t(reply.fromName),
            b: reply.toName
          }, reply.toName ? {} : {}, {
            c: reply.toName
          }, reply.toName ? {
            d: common_vendor.t(reply.toName)
          } : {}, {
            e: common_vendor.t(reply.content),
            f: replyIndex
          });
        })
      } : {}, {
        j: $data.currentReplyIndex === index
      }, $data.currentReplyIndex === index ? {
        k: `回复 ${comment.name}`,
        l: common_vendor.o(($event) => $options.submitReply(index), index),
        m: $data.replyText,
        n: common_vendor.o(($event) => $data.replyText = $event.detail.value, index),
        o: common_vendor.o(($event) => $options.submitReply(index), index)
      } : {}, {
        p: index
      });
    }),
    n: $data.inputPlaceholder,
    o: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args)),
    p: $data.commentText,
    q: common_vendor.o(($event) => $data.commentText = $event.detail.value),
    r: common_vendor.o((...args) => $options.submitComment && $options.submitComment(...args))
  });
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/smalldetail/smalldetail.js.map
