<template>
  <div class="profile">
    <sui-header></sui-header>

    <div class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <template v-for="chatRoom in chatRoomListing">
              <article class="media">
                <figure class="media-left">
                  <p class="image is-64x64 sui-avatar">
                    <img src="http://placehold.it/64x64">
                  </p>
                </figure>
                <div class="media-content">
                  <div class="content max-lines--one-plus-three">
                    <p>
                      <router-link :to="{ name: 'chatroom', params: { chatId: chatRoom.chatId } }">
                        <strong>{{ chatRoom.title }}</strong>
                      </router-link>
                      <small>({{ chatRoom.counts.participants }} members)</small>
                      <br>
                      <span v-if="chatRoom.preview">
                        {{ chatRoom.preview.content }}
                      </span>
                      <span v-else>
                        <small><i>no messages</i></small>
                      </span>
                    </p>
                  </div>
                </div>
                <div class="media-right">
                  <p v-if="chatRoom.preview">
                    <strong>
                      {{ timeFromTimestamp(chatRoom.preview.timestamp) }}
                    </strong>
                    <br />
                    <small>
                      {{ dateFromTimestamp(chatRoom.preview.timestamp) }}
                    </small>
                  </p>
                </div>
              </article>
            </template>
          </div>
        </div>
      </div>
    </div>

    <sui-footer></sui-footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import moment from 'moment';
import SuiHeader from './Header';
import SuiFooter from './Footer';

export default {
  name: 'chatroom-listing',
  props: [''],
  components: {
    SuiHeader,
    SuiFooter,
  },
  data() {
    return {
    };
  },
  computed: {
    ...mapGetters([
      'chatRoomListing',
    ]),
  },
  methods: {
    ...mapActions([
      'fetchChatRooms',
    ]),
    timeFromTimestamp(timestamp) {
      return moment.unix(timestamp).format('HH:mm');
    },
    dateFromTimestamp(timestamp) {
      return moment.unix(timestamp).format('D/M/YY');
    },
  },
  created() {
    this.fetchChatRooms();
  },
};
</script>

<style lang="scss">
</style>
