<template>
  <div style="overflow: hidden">
    <!-- Side MainNavigation after log in -->
    <appNav v-bind:imageIdx="imageIdx"></appNav>

    <div class="plantTreePage">
      <p class="coinText">You have {{ coins }} coins!</p>

      <div class="treeContainer" id="treeContainer">
        <div class="treeCard" id="treeCard">
          <div class="treeBackground">
            <span
              class="treeDots"
              v-for="i in data.length"
              v-bind:key="i"
            ></span>

            <!-- add v-if tree not undefined -->
            <tree-slide
              v-for="(tree, index) in data"
              v-bind:key="tree.name"
              :index="index"
              :visibleImg="visibleImg"
              :direction="direction"
              class="treeSlides"
            >
              <img
                class="treeImg"
                :src="require(`@/assets/trees/${tree.url}`)"
              />
              <p class="treeText" v-on:click="flip()">{{ tree.name }}</p>
            </tree-slide>

            <button class="arrow prev" @click="prev"></button>
            <button class="arrow next" @click="next"></button>
          </div>

          <div class="treeDetails">
            <tree-details :data="data" :visibleTree="visibleImg"></tree-details>
          </div>
        </div>
      </div>

      <p class="seeMore">Click on the tree name to learn more!</p>
      <p class="plantText">Do you wish to plant this tree?</p>
      <tree-purchase
        :treeId="data[visibleImg].id"
        :treeName="data[visibleImg].name"
        :treePrice="data[visibleImg].price"
        :afford="afford(data[visibleImg].price)"
      />
    </div>
  </div>
</template>

<script>
  import MainNavigation from "./MainNavigation.vue";
  import TreeSlide from "./Tree/TreeSlide";
  import TreePurchase from "./Tree/TreePurchase";
  import TreeDetails from "./Tree/TreeDetails";
  import firebase from "../firebase";

  export default {
    //Register Locally
    components: {
      appNav: MainNavigation,
      TreeSlide,
      TreePurchase,
      TreeDetails,
    },
    data() {
      return {
        coins: 0,
        visibleImg: 0,
        direction: "",
        data: [],
        imageIdx: this.$route.params.image,
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
      flip() {
        var card = document.getElementById("treeCard");
        if (card.style.transform == "rotateY(180deg)") {
          card.style.transform = "rotateY(0deg)";
        } else {
          card.style.transform = "rotateY(180deg)";
        }
      },
      fetchCoins() {
        var uid = firebase.auth().currentUser.uid;
        firebase
          .firestore()
          .collection("users")
          .doc(uid)
          .get()
          .then((doc) => {
            this.coins = doc.data().user.coins;
          });
      },
      fetchData() {
        firebase
          .firestore()
          .collection("trees")
          .orderBy("price")
          .get()
          .then((snap) => {
            snap.forEach((doc) => {
              var newData = doc.data();
              newData.id = doc.id;
              this.data.push(newData);
            });
          });
      },
      afford: function(price) {
        return this.coins >= price;
      },
    },
    mounted() {
      this.fetchCoins();
      this.fetchData();
    },
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
    font-size: 13px;
    font-family: "Source Sans Pro";
    text-transform: uppercase;
    letter-spacing: 1.5px;
    cursor: pointer;
    margin-bottom: 3px;
  }
  .treeText:hover {
    opacity: 0.5;
  }
  .seeMore {
    color: #8a827bce;
    font-family: "Source Sans Pro";
    font-size: 10px;
    letter-spacing: 0.8px;
    margin-top: 12px;
    padding: 0% 45%;
  }
  /* .tooltiptext {
  visibility: hidden;
  font-family: Source Sans Pro;
  text-transform: uppercase;
  font-size: 9px;
  letter-spacing: 0.5px;
  background-color: #f3f3ed;
  color: #8a827b;
  padding: 3px 7px;
  text-align: center;
  border-radius: 6px;
  border: solid 1px;
}
.tooltiptext::before, .tooltiptext::after {
  content: "";
  position: absolute;
  bottom: 5.2%;
  left: 49%;
  margin-bottom: -1.5px;
  border-width: 5px;
  border-style: solid;
  border-color: transparent transparent #8a827b transparent;
}
.tooltiptext::after {
  border-bottom: 5px solid #f3f3ed;
  margin-bottom: -2.5px;
}
.treeText:hover + .tooltiptext {
  visibility: visible;
} */
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
  .plantText,
  .coinText {
    font-size: 14px;
    padding: 0px 10px 10px 10px;
  }
  /* flip card */
  .treeBackground,
  .treeDetails {
    position: absolute;
    background-color: #f3f3ed;
    text-align: center;
    width: 350px;
    height: 330px;
    border-radius: 45px;
    margin: 0 auto;
    overflow: hidden;
    backface-visibility: hidden;
  }
  .treeBackground {
    margin: 0 auto;
    overflow: hidden;
  }
  .treeDetails {
    transform: rotateY(180deg);
  }
  /* .treeBackground:hover, .treeDetails:hover {
  box-shadow: 0px 0px 20px 1px #000;
} */
  .treeCard {
    transition: transform 1.2s;
    transform-style: preserve-3d;
    display: flex;
    justify-content: center;
  }
  .treeContainer {
    width: auto;
    height: 330px;
    perspective: 1000px;
  }
</style>
