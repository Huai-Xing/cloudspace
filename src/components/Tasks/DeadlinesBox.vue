<template>
  <div class="deadlineBox">
    <p class="category">{{ category }}</p>
    <p class="title">{{ title }}</p>
    <p class="date">
      Due on: {{ getDate(datedue) }}, {{ hour }}{{ min }}
    </p>
  </div>
</template>

<script>
export default {
    props: ["category", "title", "datedue", "hour", "min"],
    data() {
      return {
        month: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      }
    },
    methods: {
      getDate(dateStr) {
        var d = new Date(dateStr);
        return d.getDate() + " " + this.month[d.getMonth()] + " " + d.getFullYear();
      }
    }
}
</script>

<style scoped>
* {
  margin: 0px;
}
.deadlineBox {
  width: 120px;
  display: inline-block;
  padding: 10px 2px;
  /* border: 1px solid;
  border-radius: 8px; */
  margin: 5px;
}
.category {
  text-transform: uppercase;
  letter-spacing: 0.6px;
  font-size: 13px;
  font-weight: 600;
}
.title, .date {
  font-size: 10px;
}
</style>
