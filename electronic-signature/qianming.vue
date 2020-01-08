<template>
  <div class="signatureBox">
    <div class="canvasBox" ref="canvasHW">
      <div class="closeBox">
        <span>请签名</span>
        <p @click="close">X</p>
      </div>
      <canvas
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        ref="canvasF"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      ></canvas>
      <div class="btnBox">
        <button @click="surewrite">确认</button>
        <button @click="overwrite">重置</button>
      </div>
    </div>
  </div>
</template>

<script>
// import { Toast } from 'vant';
export default {
  name: "signature",
  data() {
    return {
      points: [],
      canvasTxt: null,
      startX: 0,
      startY: 0,
      moveY: 0,
      moveX: 0,
      endY: 0,
      endX: 0,
      w: null,
      h: null,
      isDown: false,
      color: "#000",
      linewidth: 3,
      isDraw: false //签名标记
    };
  },
  created() {},
  mounted() {
    let canvas = this.$refs.canvasF;
    canvas.height = this.$refs.canvasHW.offsetHeight - 100;
    canvas.width = this.$refs.canvasHW.offsetWidth - 10;
    this.canvasTxt = canvas.getContext("2d");
    this.canvasTxt.strokeStyle = this.color;
    this.canvasTxt.lineWidth = this.linewidth;
  },
  components: {},
  methods: {
    //电脑设备事件
    mouseDown(ev) {
      ev = ev || event;
      ev.preventDefault();

      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.canvasTxt.beginPath();
      this.points.push(obj);
      this.isDown = true;
    },
    //移动设备事件
    touchStart(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        this.isDraw = true; //签名标记
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1)
        }; //y的计算值中：document.body.offsetHeight*0.5代表的是除了整个画板signatureBox剩余的高，this.$refs.canvasHW.offsetHeight*0.1是画板中标题的高
        this.startX = obj.x;
        this.startY = obj.y;
        this.canvasTxt.beginPath();
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (this.isDown) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //移动设备事件
    touchMove(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1)
        };
        this.moveY = obj.y;
        this.moveX = obj.x;
        this.canvasTxt.moveTo(this.startX, this.startY);
        this.canvasTxt.lineTo(obj.x, obj.y);
        this.canvasTxt.stroke();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    //电脑设备事件
    mouseUp(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (1) {
        let obj = {
          x: ev.offsetX,
          y: ev.offsetY
        };
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
        this.isDown = false;
      }
    },
    //移动设备事件
    touchEnd(ev) {
      ev = ev || event;
      ev.preventDefault();
      if (ev.touches.length == 1) {
        let obj = {
          x: ev.targetTouches[0].clientX,
          y:
            ev.targetTouches[0].clientY -
            (document.body.offsetHeight * 0.5 +
              this.$refs.canvasHW.offsetHeight * 0.1)
        };
        // this.canvasTxt.beginPath();
        // this.canvasTxt.moveTo(this.startX, this.startY);
        // this.canvasTxt.lineTo(obj.x, obj.y);
        // this.canvasTxt.stroke();
        this.canvasTxt.closePath();
        this.points.push(obj);
        this.points.push({ x: -1, y: -1 });
      }
    },
    //重写
    overwrite() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.isDraw = false; //签名标记
    },
    //关闭
    close() {
      this.canvasTxt.clearRect(
        0,
        0,
        this.$refs.canvasF.width,
        this.$refs.canvasF.height
      );
      this.points = [];
      this.$emit("close", false);
    },
    //确认签名
    surewrite() {
      var imgBase64 = this.$refs.canvasF.toDataURL();
      console.log("保存签名成功" + imgBase64);
      console.log(this.isDraw);
      if (this.isDraw) {
        alert("签名成功！");
        // this.$emit("surewrite",false);
      } else {
        alert("请签名后再确认！");
      }
    }
  }
};
</script>

<style type="less" scoped>
.signatureBox {
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 50%;
  background: darkgray;
  box-sizing: border-box;
  overflow: hidden;
  z-index: 100;
  /*display: flex;*/
  /*flex-direction: column;*/
}
.canvasBox {
  padding: 0px 5px;
  height: 90%;
}
canvas {
  border: 1px solid gray;
}
.btnBox {
  height: 30px;
  padding: 5px;
  text-align: center;
  line-height: 30px;
}
.btnBox button {
  border: 1px solid dodgerblue;
  background: dodgerblue;
  color: #fff;
  border-radius: 4px;
  padding: 2px 30px;
  margin: 0 15px;
  font-size: 14px;
}
.closeBox {
  text-align: center;
  height: 10%;
}
.closeBox span {
  font-size: 15px;
  float: left;
}
.closeBox p {
  font-size: 22px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 30px;
  border: none;
  background: gray;
  color: white;
  float: right;
}
@media only screen and (min-width: 730px) {
  .signatureBox {
    position: fixed;
    bottom: 0px;
    width: 100%;
    height: 50%;
    background: darkgray;
    box-sizing: border-box;
    overflow: visible;
  }
}
</style>