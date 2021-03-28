<template>
<div>
  <p id="title">Quote of the day</p>
  <p id="quote">"{{ quote }}"</p>
  <p>~{{ author }}</p>
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
    fetchQuotes: async function() {
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
      var idx = Math.floor(quotes.length / dayjs().get("Date")) + dayjs().get("M");
      this.quote = quotes[idx].quote;
      this.author = quotes[idx].author;
    },
  },
  created: async function() {
    console.log(dayjs().get("month"));
    await this.fetchQuotes();
  },
};
</script>

<style scoped>
p {
  margin-left: 200px;
  align-items: center;
  display: flex;
  justify-content: center;
  font-size: 16px;
}

#title {
  padding-right: 35%;
  text-decoration: underline;
}

#quote {
  font-style: italic;
  animation: type 20s steps(60, end);
  font-size: 20px;
  text-align: center;
  padding-left: 20%;
  padding-right: 20%;
}
</style>
