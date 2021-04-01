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
  border-radius: 20px 20px 0 0;
  width: 100%;
  margin: 0;
  padding: 0;
}
#bottom {
  position: relative;
  display: inline-block;
  border: 5px solid #81b762;
  border-radius: 0 0 20px 20px;
  width: 100%;
  margin: 0;
  padding: 0;
}
p {
  margin: 0;
  padding: 0;
  padding-left: 0.8%;
}
#title {
  text-decoration: underline;
  font-size: 16px;
  color: white;
  font-weight: 550;
}
#quote {
  margin-top: 5px;
  font-style: italic;
  font-size: 18px;
  padding-bottom: 0.8%;
}
#author {
  text-align: left;
  font-size: 14px;
  padding-bottom: 0.8%;
}
</style>
