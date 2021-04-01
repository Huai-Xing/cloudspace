<template>
<div class="generalcontainer">
  <div class="generalcontainer nomargin">
    <input :type="visibility" :class="{'u-full-width' : !onlyunder, 'u-full-width onlyunder': onlyunder}" :maxlength='maxlength' :placeholder="placeholder" v-bind:value="value" v-on:input="$emit('input', $event.target.value)">

    <!-- shows the password -->
    <a @click="showPassword()" class="notunderlined" v-if="visibility == 'password'">

      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" iconColor="rgba(0,0,0,0.70)" icon-name="show password">
        <!-- the path of the eye on/visibility-on icon -->
        <path d="M0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0zm0 0h24v24H0z" fill="none"/>
        <path d="M12 7c2.76 0 5 2.24 5 5 0 .65-.13 1.26-.36 1.83l2.92 2.92c1.51-1.26 2.7-2.89 3.43-4.75-1.73-4.39-6-7.5-11-7.5-1.4 0-2.74.25-3.98.7l2.16 2.16C10.74 7.13 11.35 7 12 7zM2 4.27l2.28 2.28.46.46C3.08 8.3 1.78 10.02 1 12c1.73 4.39 6 7.5 11 7.5 1.55 0 3.03-.3 4.38-.84l.42.42L19.73 22 21 20.73 3.27 3 2 4.27zM7.53 9.8l1.55 1.55c-.05.21-.08.43-.08.65 0 1.66 1.34 3 3 3 .22 0 .44-.03.65-.08l1.55 1.55c-.67.33-1.41.53-2.2.53-2.76 0-5-2.24-5-5 0-.79.2-1.53.53-2.2zm4.31-.78l3.15 3.15.02-.16c0-1.66-1.34-3-3-3l-.17.01z"/>
      </svg>

    </a>

    <!-- hides the password -->
    <a @click="hidePassword()" class="notunderlined" v-if="visibility == 'text'">

      <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" iconColor="rgba(0,0,0,0.70)" icon-name="hide password">
        <!-- the path of the eye off/visibility-off icon -->
        <path d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"/>
      </svg>
    </a>
  </div>

</div>
</template>

<script>

export default {

  data() {
    return {
      visibility: 'password',
    }
  },

  props: {
    placeholder: {type: String, default: ''},
    value: {type: String, default: ''},
    maxlength: {type: Number, default: 50},
    onlyunder: {type: Boolean, default: false}
  },

  methods: {
    showPassword() {
        this.visibility = 'text';
    },

    hidePassword() {
        this.visibility = 'password';
    },
  },

}
</script>

<style scoped>
* {
  font-weight: lighter;
  font-size: 13px;
}

input {
  font-family: Roboto;
  width: 250px;
  padding-top: 7px;
  padding-bottom: 7px;
  padding-left: 10px;
  padding-right: 10px;
  margin-top: 3px;
  margin-bottom: 15px;
  border-radius: 3px;
  border-width: thin;
  border-color: #cccccc;
  border-style: solid;
}

::placeholder {
  color: #cccccc;
  opacity: 1;
  font-family: Roboto;
  font-style: italic;
}

a {
  position: relative;
  right: 28px;
  top: 7px;
}
</style>
