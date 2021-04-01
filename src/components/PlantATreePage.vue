<template>
  <div>
    <!-- Side MainNavigation after log in -->
    <appNav></appNav>

    <div class="plantTreePage">
      <p class="coinText">You have {{ coins }} coins!</p>

      <div class="treeBackground">
        <span class="treeDots" v-for="i in data.length" v-bind:key="i"></span>

        <tree-slide
          v-for="(tree, index) in data"
          v-bind:key="tree.name"
          :index="index"
          :visibleImg="visibleImg"
          :direction="direction"
          class="treeSlides"
        >
          <img class="treeImg" :src="require(`@/assets/trees/${tree.url}`)" />
          <p class="treeText">{{ tree.name }}</p>
        </tree-slide>

        <button class="arrow prev" @click="prev"></button>
        <button class="arrow next" @click="next"></button>
      </div>

      <p class="plantText">Do you wish to plant this tree?</p>
      <tree-purchase
        :treeName="data[visibleImg].name"
        :treePrice="data[visibleImg].price"
        :coins="coins"
      />

    </div>
  </div>
</template>

<script>
import MainNavigation from "./MainNavigation.vue";
import TreeSlide from "./Tree/TreeSlide";
import TreePurchase from "./Tree/TreePurchase";
import firebase from "../firebase";

export default {
  //Register Locally
  components: {
    appNav: MainNavigation,
    TreeSlide,
    TreePurchase,
  },
  data() {
    return {
      coins: 329,
      visibleImg: 0,
      direction: "",
      data: [
        {
          name: "Casuarina Tree",
          url: "casuarina.png",
          price: "240",
        },
        {
          name: "Rain Tree",
          url: "rain.png",
          price: "240",
        },
        {
          name: "Yellow Flame Tree",
          url: "yellow_flame.png",
          price: "300",
        },
        {
          name: "Angsana Tree",
          url: "angsana.png",
          price: "320",
        },
        {
          name: "Sea Apple Tree",
          url: "sea_apple.png",
          price: "350",
        },
        {
          name: "Trumpet Tree",
          url: "trumpet.png",
          price: "420",
        },
        {
          name: "Handkerchief Tree",
          url: "handkerchief.png",
          price: "500",
        },
        {
          name: "Baobab Tree",
          url: "baobab.png",
          price: "600",
        },
      ],
    };
  },
  computed: {
    dataLength() {
      return this.data.length;
    },
  },
  methods: {
    next() {
      if (this.visibleImg >= this.dataLength - 1) {
        this.visibleImg = 0;
      } else {
        this.visibleImg++;
      }
      this.direction = "right";
      this.refreshDots();
    },
    prev() {
      if (this.visibleImg <= 0) {
        this.visibleImg = this.dataLength - 1;
      } else {
        this.visibleImg--;
      }
      this.direction = "left";
      this.refreshDots();
    },
    refreshDots() {
      var dots = document.getElementsByClassName("treeDots");
      for (var i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
      }
      dots[this.visibleImg].className += " active";
    },
  fetchCoins() {
      var uid = firebase.auth().currentUser.uid;
      firebase.firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((doc) => {
          this.coins = doc.data().user.coins;
        })
    }
  },
  mounted() {
    document.getElementsByClassName("treeDots")[this.visibleImg].className +=
      " active";
  },
  created() {
    this.fetchCoins();
  }
};
</script>

<style scoped>
* {
  font-family: Lora;
}
.plantTreePage {
  text-align: center;
  margin-left: 160px; /* nav bar width: 160px */
}
.treeSlides {
  width: 350px;
  height: 320px;
}
.treeBackground {
  position: relative;
  background-color: #f3f3ed;
  text-align: center;
  width: 350px;
  height: 330px;
  border-radius: 45px;
  margin: 0 auto;
  overflow: hidden;
}
.treeImg {
  width: 250px;
  height: 250px;
  margin-top: 20px;
}
.treeText {
  font-size: 12px;
  font-family: Roboto;
  text-transform: uppercase;
  letter-spacing: 1.5px;
}
.treeDots {
  height: 4px;
  width: 4px;
  margin: 0 2px;
  background-color: #bbb;
  border-radius: 100%;
  display: inline-block;
  transition: background-color 0.3s ease;
}
.active,
.treeDots:hover {
  background-color: #646464;
}
.arrow {
  position: absolute;
  height: 40px;
  width: 50px;
  top: calc(50%); /*calc(50% - 20px)*/
  color: white;
  background-color: transparent;
  border: solid black;
  border-width: 0 3px 3px 0;
  display: inline-block;
  padding: 5px;
  outline: none;
  cursor: pointer;
}
.next {
  right: 4%;
  transform: rotate(-45deg);
  -webkit-transform: rotate(-45deg);
  width: 3px;
  height: 3px;
}
.prev {
  left: 4%;
  transform: rotate(135deg);
  -webkit-transform: rotate(135deg);
  width: 3px;
  height: 3px;
}
.plantText {
  font-size: 12px;
  padding: 10px;
}
</style>
