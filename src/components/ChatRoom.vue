<template>
  <div class="chatroom">

    <!-- messages -->
    <!-- input bar -->
    <!-- participants -->
    <!-- add media buttons -->
    <section class="hero is-fullheight is-light sui-messages">
      <div class="hero-head">
        <nav class="nav has-shadow">
          <div class="container is-fluid">
            <div class="nav-left">
              <router-link :to="{ name: 'home' }" class="nav-item">
                <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
              </router-link>
            </div>
            <div class="nav-center">
              <div class="nav-item">
                <p class="title">
                  {{ chatRoom.title }}
                </p>
              </div>
            </div>
            <div class="nav-right">
              <div class="nav-item is-pulled-right">
                <button class="button is-white" @click="openModal()">
                  <span class="icon">
                    <i class="fa fa-question-circle"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column">
              <template v-for="message in chatRoom.messages">
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-64x64 sui-avatar">
                      <img :src="message.person.avatarUrl">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content">
                      <p>
                        <strong>{{ message.person.name }}</strong>
                        <small>{{ message.person.handle }}</small>
                        <small>{{ timeAgoFromTimestamp(message.timestamp) }}</small>
                        <br>
                        {{ message.content }}
                      </p>
                    </div>
                  </div>
                  <div class="media-right">
                  </div>
                </article>
              </template>
              <!-- Used to scroll the user to the bottom ;) -->
              <div id="sui-messages-bottom"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot sui-chat-footer">
        <nav class="nav">
          <div class="container is-fluid">
            <div class="nav-left">
              <div class="nav-item control">
                <button class="button is-medium is-white">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                </button>
              </div>
            </div>
            <div class="nav-center">
              <div class="nav-item control">
                <textarea class="textarea" type="text" placeholder="Type a message" v-model="inputMessage" @keyup.enter="sendMessage(inputMessage)"/>
              </div>
            </div>
            <div class="nav-right">
              <div class="nav-item control">
                <button class="button is-medium" :class="sendMessageClass" @click="sendMessage(inputMessage)">
                  <span class="icon is-small">
                    <i class="fa fa-send"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </section>

    <div class="modal" :class="modalClass">
      <div class="modal-background" @click="closeModal()"></div>
      <div class="modal-content">
        <div class="box">
          <div class="columns">
            <div class="column">
              <h3 class="title is-5">
                Participants
              </h3>
              <p>
                <template v-for="person in chatRoom.participants">
                  <span class="image is-32x32 sui-avatar sui-avatar--flow">
                    <img :src="person.avatarUrl">
                  </span>
                </template>
              </p>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close" @click="closeModal()"></button>
    </div>
    <!-- <sui-footer class="is-hidden-mobile"></sui-footer> -->
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import lodash from 'lodash';
import moment from 'moment';
import SuiHeader from './Header';
import SuiFooter from './Footer';

export default {
  props: ['chatId'],
  components: {
    SuiHeader,
    SuiFooter,
  },
  data() {
    return {
      inputMessage: '',
      isModalVisible: false,
    };
  },
  computed: {
    ...mapGetters([
      'chatRoom',
    ]),
    modalClass() {
      return {
        'is-active': this.isModalVisible,
      };
    },
    hasMessage() {
      return this.inputMessage;
    },
    sendMessageClass() {
      return {
        'is-white': !this.hasMessage,
        'is-primary': this.hasMessage,
      };
    },
    countMessages() {
      if (!this.chatRoom) { return 0; }
      return this.chatRoom.messages;
    },
  },
  methods: {
    ...mapActions([
      'sendChatMessage',
      'fetchChatRoomById',
    ]),
    openModal() {
      this.isModalVisible = true;
    },
    closeModal() {
      this.isModalVisible = false;
    },
    sendMessage(message) {
      if (lodash.isEmpty(message)) { return; }
      this.inputMessage = '';
      this.sendChatMessage({
        chatId: this.chatRoom.chatId,
        userId: 'me',
        message,
      });
    },
    scrollToBottomOfChatMessages() {
      // eslint-disable-next-line
      this.$nextTick(() => {
        document.getElementById('sui-messages-bottom').scrollIntoView();
      });
    },
    fetchChatRoom() {
      this.fetchChatRoomById({
        chatId: this.chatId,
      });
    },
    timeAgoFromTimestamp(timestamp) {
      return moment.unix(timestamp).fromNow();
    },
  },
  created() {
    this.fetchChatRoom();
  },
  watch: {
    chatId(current, previous) {
      if (current !== previous) {
        this.fetchChatRoom();
      }
    },
    countMessages(current, previous) {
      if (current !== previous) {
        this.scrollToBottomOfChatMessages();
      }
    },
  },
};
</script>

<style lang="scss">
.sui-avatar--flow {
  margin: 0;
  display: inline-block;
}
.sui-avatar--flow + .sui-avatar--flow {
  margin-left: 0.25em;
}

.sui-messages {
  max-height: 100vh;
}

.sui-messages .hero-head .nav {
  background: white;
}

.sui-messages .hero-head {
}

.sui-messages.hero.is-fullheight .hero-body {
  max-height: 100vh;
  overflow: scroll;
  flex-shrink: 1;
  align-items: initial;
}

.sui-messages .hero-foot {
}

.sui-messages .textarea {
  min-height: 40px;
  resize: none;
}

.sui-chat-footer .nav {
  background: white;
}

.sui-chat-footer .nav-left {
  flex-grow: 0;
  flex-basis: auto;
}

.sui-chat-footer .nav-center {
  flex-grow: 1;
}

.sui-chat-footer .nav-center .nav-item {
  flex-grow: 1;
}

.sui-chat-footer .nav-center .nav-item .control {
  width: 100%;
}

.sui-chat-footer .nav-right {
  flex-grow: 0;
}
</style>
