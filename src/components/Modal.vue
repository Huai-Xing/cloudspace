<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div class="modal">
        <header class="modal-header">
          <slot name="header">
            This is the default title!
          </slot>
          <button type="button" class="btn-close" @click="close">
            x
          </button>
        </header>

        <section class="modal-body">
          <slot name="body">
            This is the default body!
          </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer">
            This is the default footer!
          </slot>
          <!-- <button type="button" class="btn-green" @click="close">
            Close Modal
          </button> -->
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
  export default {
    name: "Modal",
    methods: {
      close() {
        this.$emit("close");
      },
    },
  };
</script>

<style scoped>
  .modal-backdrop {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.3);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background: #ffffff;
    box-shadow: 0px 0px 20px 1px rgba(0, 0, 0, 0.5);
    overflow-x: auto;
    display: flex;
    flex-direction: column;
    border-radius: 6px;
  }

  .modal-header,
  .modal-footer {
    display: flex;
    font-family: Lora;
  }

  .modal-header {
    position: relative;
    /* border-bottom: 1px solid #eeeeee; */
    color: #4aae9b;
    justify-content: center;
    align-items: center;
    font-weight: bold;
    font-size: 15px;
    padding: 20px;
  }

  .modal-footer {
    /* border-top: 1px solid #eeeeee; */
    justify-content: center;
    text-align: center;
    padding: 10px 20px 20px 20px;
  }

  .modal-body {
    position: relative;
    padding: 15px 60px;
  }

  .btn-close {
    position: absolute;
    top: 10px;
    right: 10px;
    border: none;
    font-size: 20px;
    cursor: pointer;
    font-weight: bold;
    color: #4aae9b;
    background: transparent;
  }

  .btn-green {
    color: white;
    background: #4aae9b;
    border: 1px solid #4aae9b;
    border-radius: 2px;
  }
  .modal-fade-enter,
  .modal-fade-leave-to {
    opacity: 0;
  }

  .modal-fade-enter-active,
  .modal-fade-leave-active {
    transition: opacity 0.3s ease;
  }
::-webkit-scrollbar {
  width: 0px;
  height: 0px;
}
</style>
