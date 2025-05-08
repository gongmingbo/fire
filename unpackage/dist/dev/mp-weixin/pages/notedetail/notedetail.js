"use strict";
const common_vendor = require("../../common/vendor.js");
const NotedetailContent = () => "../../components/NotedetailContent.js";
const VoteRemark = () => "../../components/voteRemark.js";
const _sfc_main = {
  components: {
    NotedetailContent,
    VoteRemark
  },
  data() {
    return {
      title: "关于小区物业费调整的通知",
      time: "2024-03-15",
      author: "物业服务中心",
      content: "尊敬的业主：\n\n根据小区实际情况和物业服务成本的变化，经业主委员会讨论决定，自2024年4月1日起，小区物业费将进行适当调整。具体调整方案如下：\n\n1. 住宅物业费由原来的1.5元/平方米/月调整为1.6元/平方米/月\n2. 商铺物业费由原来的2.0元/平方米/月调整为2.2元/平方米/月\n3. 地下车位管理费维持不变，仍为80元/月\n\n此次调整主要考虑到：\n1. 人工成本上涨\n2. 设备维护费用增加\n3. 小区环境改善需求\n\n物业服务中心将一如既往地提供优质服务，确保小区环境整洁、安全有序。如有任何疑问，请随时联系物业服务中心。\n\n感谢您的理解与支持！\n\n物业服务中心\n2024年3月15日",
      images: [
        "/static/9.jpg",
        "/static/image.png",
        "/static/image.png",
        "/static/image.png",
        "/static/image.png"
      ],
      countdown: {
        days: 0,
        hours: 12,
        minutes: 20,
        seconds: 9
      },
      voteOptions: [
        {
          label: "同意",
          image: "/static/image.png",
          value: "agree"
        },
        {
          label: "不同意",
          image: "/static/image.png",
          value: "disagree"
        },
        {
          label: "弃权",
          image: "/static/image.png",
          value: "abstain"
        }
      ],
      selectedVote: "",
      ctx: null,
      points: [],
      isDrawing: false,
      isVoteEnded: false,
      voteResults: [
        {
          option: "1、同意",
          ownerCount: 75,
          areaCount: 560
        },
        {
          option: "2、不同意",
          ownerCount: 75,
          areaCount: 560
        },
        {
          option: "3、弃权",
          ownerCount: 75,
          areaCount: 560
        }
      ],
      totalVoters: 75,
      totalArea: 560,
      showVoteRemark: false,
      showCandidate: false,
      currentCandidate: {
        name: "张三",
        image: "/static/image.png",
        introduction: "候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容候选人介绍内容..."
      }
    };
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
  onLoad(options) {
    this.noticeId = options.id;
    this.isVoteEnded = options.read === "true" || options.read === true;
    common_vendor.index.__f__("log", "at pages/notedetail/notedetail.vue:210", "投票状态:", this.isVoteEnded);
    this.$nextTick(() => {
      this.initSignature();
    });
  },
  methods: {
    handleVoteChange(e) {
      this.selectedVote = e.detail.value;
    },
    initSignature() {
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".signature-canvas").fields({
        node: true,
        size: true
      }).exec((res) => {
        if (!res[0] || !res[0].node) {
          common_vendor.index.__f__("error", "at pages/notedetail/notedetail.vue:228", "Canvas not found");
          return;
        }
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        const dpr = common_vendor.index.getSystemInfoSync().pixelRatio;
        canvas.width = res[0].width * dpr;
        canvas.height = res[0].height * dpr;
        ctx.scale(dpr, dpr);
        ctx.strokeStyle = "#000";
        ctx.lineWidth = 2;
        ctx.lineCap = "round";
        ctx.lineJoin = "round";
        this.ctx = ctx;
      });
    },
    touchStart(e) {
      if (!this.ctx)
        return;
      this.isDrawing = true;
      const point = {
        x: e.touches[0].x,
        y: e.touches[0].y
      };
      this.points = [point];
      this.ctx.beginPath();
      this.ctx.moveTo(point.x, point.y);
    },
    touchMove(e) {
      if (!this.isDrawing || !this.ctx)
        return;
      const point = {
        x: e.touches[0].x,
        y: e.touches[0].y
      };
      this.ctx.lineTo(point.x, point.y);
      this.ctx.stroke();
    },
    touchEnd() {
      this.isDrawing = false;
      this.points = [];
    },
    clearSignature() {
      if (!this.ctx)
        return;
      const canvas = this.ctx.canvas;
      this.ctx.clearRect(0, 0, canvas.width, canvas.height);
    },
    saveSignature() {
      if (!this.ctx)
        return;
      common_vendor.index.__f__("log", "at pages/notedetail/notedetail.vue:286", this.ctx);
      common_vendor.index.showToast({
        title: "签名已保存",
        icon: "success"
      });
    },
    previewImage(index) {
      common_vendor.index.previewImage({
        urls: this.images,
        current: index
      });
    },
    showVoteRemarkMode() {
      this.showVoteRemark = true;
      common_vendor.index.__f__("log", "at pages/notedetail/notedetail.vue:301", this.showVoteRemark);
    },
    closeVoteRemark() {
      this.showVoteRemark = false;
    },
    showCandidateDetail(candidate) {
      this.currentCandidate = candidate;
      this.showCandidate = true;
    },
    closeCandidate() {
      this.showCandidate = false;
    },
    showPersonMode() {
      this.showCandidate = true;
    }
  }
};
if (!Array) {
  const _component_notedetail_content = common_vendor.resolveComponent("notedetail-content");
  const _component_vote_remark = common_vendor.resolveComponent("vote-remark");
  (_component_notedetail_content + _component_vote_remark)();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: common_vendor.p({
      title: $data.title,
      time: $data.time,
      author: $data.author,
      content: $data.content,
      images: $data.images
    }),
    b: $data.isVoteEnded
  }, $data.isVoteEnded ? {
    c: common_vendor.f($data.voteResults, (item, index, i0) => {
      return {
        a: common_vendor.t(item.option),
        b: common_vendor.t(item.ownerCount),
        c: common_vendor.t(item.areaCount),
        d: index
      };
    }),
    d: common_vendor.t($data.totalVoters),
    e: common_vendor.t($data.totalArea)
  } : {}, {
    f: !$data.isVoteEnded
  }, !$data.isVoteEnded ? {
    g: common_vendor.t($data.countdown.days),
    h: common_vendor.t($data.countdown.hours),
    i: common_vendor.t($data.countdown.minutes),
    j: common_vendor.t($data.countdown.seconds),
    k: common_vendor.o((...args) => $options.showVoteRemarkMode && $options.showVoteRemarkMode(...args)),
    l: common_vendor.f($data.voteOptions, (option, index, i0) => {
      return {
        a: option.value,
        b: $data.selectedVote === option.value,
        c: option.image,
        d: common_vendor.t(option.label),
        e: common_vendor.o(($event) => $options.showPersonMode(), index),
        f: index
      };
    }),
    m: common_vendor.o((...args) => $options.handleVoteChange && $options.handleVoteChange(...args)),
    n: common_vendor.o((...args) => $options.touchStart && $options.touchStart(...args)),
    o: common_vendor.o((...args) => $options.touchMove && $options.touchMove(...args)),
    p: common_vendor.o((...args) => $options.touchEnd && $options.touchEnd(...args)),
    q: common_vendor.o((...args) => $options.clearSignature && $options.clearSignature(...args)),
    r: common_vendor.o((...args) => $options.saveSignature && $options.saveSignature(...args))
  } : {}, {
    s: $data.showVoteRemark
  }, $data.showVoteRemark ? {
    t: common_vendor.o((...args) => $options.closeVoteRemark && $options.closeVoteRemark(...args)),
    v: common_vendor.o(() => {
    }),
    w: common_vendor.o((...args) => $options.closeVoteRemark && $options.closeVoteRemark(...args))
  } : {}, {
    x: $data.showCandidate
  }, $data.showCandidate ? {
    y: common_vendor.o((...args) => $options.closeCandidate && $options.closeCandidate(...args)),
    z: $data.currentCandidate.image,
    A: common_vendor.t($data.currentCandidate.name),
    B: common_vendor.t($data.currentCandidate.introduction),
    C: common_vendor.o(() => {
    }),
    D: common_vendor.o((...args) => $options.closeCandidate && $options.closeCandidate(...args))
  } : {});
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/notedetail/notedetail.js.map
