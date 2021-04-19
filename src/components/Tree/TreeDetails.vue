<template>
  <div>
    <p class="name">{{ data[visibleTree].sciName }}</p>

    <div class="treeBackground">
      <button class="arrow prev" @click="prev"></button>

      <tree-slide
        v-for="(image, index) in data[visibleTree].images"
        v-bind:key="image"
        :index="index"
        :visibleImg="visibleImg"
        :direction="direction"
        class="treeSlides"
      >
        <img :src="image" class="realImg" />
      </tree-slide>
      <button class="arrow next" @click="next"></button>
    </div>

    <div class="info">{{ data[visibleTree].desc }}</div>
    <p class="backText" v-on:click="flip()">Back</p>
  </div>
</template>

<script>
  import TreeSlide from "./TreeSlide";

  export default {
    props: ["data", "visibleTree"],
    components: {
      TreeSlide,
    },
    data() {
      return {
        visibleImg: 0,
        direction: "",
      };
    },
    computed: {
      dataLength() {
        return this.data[this.visibleTree].images.length;
      },
    },
    methods: {
      flip() {
        this.visibleImg = 0;
        this.$parent.flip();
      },
      next() {
        if (this.visibleImg >= this.dataLength - 1) {
          this.visibleImg = 0;
        } else {
          this.visibleImg++;
        }
        this.direction = "right";
      },
      prev() {
        if (this.visibleImg <= 0) {
          this.visibleImg = this.dataLength - 1;
        } else {
          this.visibleImg--;
        }
        this.direction = "left";
      },
      refreshDots() {
        var dots = document.getElementsByClassName("treeDots");
        for (var i = 0; i < dots.length; i++) {
          dots[i].className = dots[i].className.replace(" active", "");
        }
        dots[this.visibleImg].className += " active";
      },
    },
  };
</script>

<style scoped>
  .name {
    font-size: 14px;
    font-weight: 600;
    padding-top: 10px;
    margin: 5px;
    height: 30px;
    font-style: italic;
  }
  /* name height : 40 + 10 */
  .realImg {
    height: 110px;
    width: 180px;
    object-fit: cover;
  }
  /* img height : 110 */
  .info {
    font-family: Roboto;
    font-size: 10px;
    padding: 14px 20px 0px 20px;
    line-height: 16px;
    letter-spacing: 0.1px;
    height: 100px;
  }
  /* info height : 100 + 10 */
  .backText {
    font-size: 12px;
    font-family: Roboto;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
  }
  .backText:hover,
  .backText:active {
    opacity: 40%;
  }
  .treeBackground {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .treeSlides {
    position: relative;
    height: 110px;
    width: 180px;
  }
  .active,
  .treeDots:hover {
    background-color: #646464;
  }
  .arrow {
    top: calc(50%); /*calc(50% - 20px)*/
    color: white;
    background-color: transparent;
    border: solid black;
    border-width: 0 2px 2px 0;
    display: inline-block;
    padding: 3px;
    outline: none;
    cursor: pointer;
    margin: 3px;
  }
  .next {
    transform: rotate(-45deg);
    -webkit-transform: rotate(-45deg);
  }
  .prev {
    transform: rotate(135deg);
    -webkit-transform: rotate(135deg);
  }
</style>
