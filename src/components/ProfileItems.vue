<template>
  <div class="profile-items">
    <div class="columns is-multiline is-mobile">
      <template v-for="item in itemList">
        <div class="column is-one-third">
          <div class="image is-1by1">
            <img :src="item.content" @click="openModal(item)"/>
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
                <img :src="modalData.content" />
              </div>
            </div>
            <div class="column">
              <h1 class="title">
                Some {{ modalData.type }}
              </h1>
              <h2 class="subtitle">
                <small>
                  Curator: {{ modalData.owner.name }}
                  <br />
                  ImageId: {{ modalData.itemId }}
                </small>
              </h2>
              <p>
                <small>
                  {{ modalData.caption }}
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
import { mapGetters, mapActions } from 'vuex';

export default {
  name: 'profileItems',
  props: ['person'],
  data() {
    return {
      isModalVisible: false,
      selectedItem: null,
    };
  },
  computed: {
    ...mapGetters([
      'items',
      'itemOwner',
    ]),
    modalClass() {
      return {
        'is-active': this.isModalVisible,
      };
    },
    itemList() {
      return this.items;
    },
    modalData() {
      const selectedItem = this.selectedItem || {};
      const user = this.itemOwner || {};
      return {
        ...selectedItem,
        owner: user,
      };
    },
  },
  methods: {
    ...mapActions([
      'fetchContentByUserId',
    ]),
    openModal(item) {
      this.selectedItem = item;
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
      this.selectedItem = null;
    },
    fetchItems() {
      this.fetchContentByUserId({
        profileId: this.person.profileId,
      });
    },
  },
  created() {
    this.fetchItems();
  },
  watch: {
    peopleListType(current, previous) {
      if (current !== previous) {
        this.fetchItems();
      }
    },
  },
};
</script>

<style lang="scss">
</style>
