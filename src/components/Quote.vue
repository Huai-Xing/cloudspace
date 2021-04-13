<template>
  <div>
    <div id="top">
      <p id="title">Quote of the day</p>
    </div>
    <div id="bottom">
      <p id="quote">"{{ quote }}"</p>
      <p id="author">~{{ author }}</p>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
import axios from "axios";

export default {
  data() {
    return {
      quote: "...loading...",
      author: "-",
    };
  },
  //Register Locally
  methods: {
    fetchQuotes: async function () {
      var quotes = [];
      await axios
        .get("https://type.fit/api/quotes")
        .then((response) => {
          response.data.forEach((data) => {
            var quoteData = {
              quote: data.text,
              author: data.author,
            };
            quotes.push(quoteData);
          });
        })

        .catch((error) => {
          console.log(error);
        });
      var idx =
        (Math.floor(quotes.length / dayjs().get("Date")) + dayjs().get("M")) %
        quotes.length;
      this.quote = quotes[idx].quote;
      this.author = quotes[idx].author;
    },
  },
  created: async function () {
    console.log(dayjs().get("month"));
    await this.fetchQuotes();
  },
};
</script>

<style scoped>
#top {
  position: relative;
  display: inline-block;
  border: 5px solid #81b762;
  background-color: #81b762;
  border-radius: 16px 16px 0 0;
  width: 100%;
}
#bottom {
  position: relative;
  display: inline-block;
  border: 5px solid #81b762;
  border-radius: 0 0 16px 16px;
  width: 100%;
  margin: 0;
  padding: 0;
}
#title {
  font-size: 16px;
  color: white;
  margin: 0;
  padding: 8px 15px;
}
#quote {
  font-family: "Source Sans Pro";
  font-style: italic;
  font-size: 18px;
  letter-spacing: 0.3px;
  padding: 12px;
  margin: 0px;
}
#author {
  font-family: "Source Sans Pro";
  text-align: left;
  font-size: 12px;
  margin: 0px;
  padding: 0px 0px 18px 18px;
}
</style>
