<template>
  <div class="profile-items">
    <div class="columns is-multiline is-mobile">
      <template v-for="i in 12">
        <div class="column is-one-third">
          <div class="image is-1by1">
            <img src="https://placehold.it/256x256" @click="openModal(i)"/>
          </div>
        </div>
      </template>
    </div>
    <div class="modal" :class="modalClass">
      <div class="modal-background" @click="closeModal()"></div>
      <div class="modal-content">
        <div class="box">
          <div class="columns">
            <div class="column">
              <div class="image is-1by1">
                <img src="https://placehold.it/256x256" />
              </div>
            </div>
            <div class="column">
              <h1 class="title">
                An image
              </h1>
              <h2 class="subtitle">
                The exhibit on the left shows an image
              </h2>
              <p>
                <small>
                  Image by magical-user-{{ modalData }}
                </small>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="closeModal()"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'profileItems',
  data() {
    return {
      isModalVisible: false,
      modalData: null,
    };
  },
  computed: {
    modalClass() {
      return {
        'is-active': this.isModalVisible,
      };
    },
  },
  methods: {
    openModal(i) {
      this.modalData = i;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.modalData = null;
    },
  },
};
</script>

<style lang="scss">
</style>
