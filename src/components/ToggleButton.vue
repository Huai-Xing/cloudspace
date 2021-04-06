<template>
  <label
    :for="id + '_button'"
    :class="{ active: isActive }"
    class="toggle__button"
  >
    <span v-if="isActive" class="toggle__label">{{ enableText }}</span>
    <span v-if="!isActive" class="toggle__label">{{ disabledText }}</span>

    <input
      type="checkbox"
      :disabled="disabled"
      :id="id + '_button'"
      v-model="checkedValue"
    />
    <span class="toggle__switch"></span>
  </label>
</template>

<script>
  export default {
    props: {
      disabled: {
        type: Boolean,
        default: false,
      },
      labelEnableText: {
        type: String,
        default: "Add a new category",
      },

      labelDisableText: {
        type: String,
        default: "Choose from existing categories",
      },
      id: {
        type: String,
        default: "primary",
      },
      defaultState: {
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        currentState: this.defaultState,
      };
    },
    watch: {
      defaultState: function defaultState() {
        this.currentState = Boolean(this.defaultState);
      },
    },
    computed: {
      // currentState() {
      //   return this.defaultState;
      // },
      isActive() {
        return this.currentState;
      },
      enableText() {
        return this.labelEnableText;
      },
      disabledText() {
        return this.labelDisableText;
      },
      checkedValue: {
        get() {
          return this.currentState;
        },
        set(newValue) {
          this.currentState = newValue;
          console.log("ToggleButton");
          this.$emit("change", newValue);
        },
      },
    },
  };
</script>

<style scoped>
.toggle__label {
  font-size: 9px;
}
  .toggle__button {
    vertical-align: middle;
    user-select: none;
    cursor: pointer;
  }
  .toggle__button input[type="checkbox"] {
    opacity: 0;
    position: absolute;
    width: 1px;
    height: 1px;
  }
  .toggle__button .toggle__switch {
    display: inline-block;
    height: 10px;
    border-radius: 6px;
    width: 36px;
    background: #bfcbd9;
    box-shadow: inset 0 0 1px #bfcbd9;
    position: relative;
    margin-left: 10px;
    transition: all 0.25s;
  }
  .toggle__button .toggle__switch::after,
  .toggle__button .toggle__switch::before {
    content: "";
    position: absolute;
    display: block;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    left: 0;
    top: -3px;
    transform: translateX(0);
    transition: all 0.25s cubic-bezier(0.5, -0.6, 0.5, 1.6);
  }
  .toggle__button .toggle__switch::after {
    background: #4d4d4d;
    box-shadow: 0 0 1px #666;
  }
  .toggle__button .toggle__switch::before {
    background: #4d4d4d;
    box-shadow: 0 0 0 3px rgba(0, 0, 0, 0.1);
    opacity: 0;
  }
  .active .toggle__switch {
    background: #adedcb;
    box-shadow: inset 0 0 1px #adedcb;
  }
  .active .toggle__switch::after,
  .active .toggle__switch::before {
    transform: translateX(40px - 18px);
  }
  .active .toggle__switch::after {
    left: 23px;
    background: #53b883;
    box-shadow: 0 0 1px #53b883;
  }
</style>
