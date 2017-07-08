<template>
  <div class="chatroom">

    <section class="hero is-fullheight is-light sui-messages">
      <div class="hero-head sui-chat-header">
        <bar class="container">
          <div slot="left" class="bar-content">
            <router-link :to="{ name: 'home' }" class="navbar-item">
              <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
            </router-link>
          </div>

          <div slot="center" class="bar-content">
            <div class="nav-item">
              <p class="title">
                {{ chatRoom.title }}
              </p>
            </div>
          </div>

          <div slot="right" class="bar-content">
            <div class="nav-item is-pulled-right">
              <button class="button is-white" @click="openModal()">
                <span class="icon">
                  <i class="fa fa-question-circle"></i>
                </span>
              </button>
            </div>
          </div>
        </bar>
      </div>

      <div class="hero-body">
        <div class="container">
          <div class="columns" v-if="countMessages === 0">
            <div class="column">
              <div class="box has-text-centered">
                No messages
              </div>
            </div>
          </div>
          <div class="columns" v-else>
            <div class="column">
              <template v-for="message in chatRoom.messages">
                <article class="media">
                  <figure class="media-left">
                    <p class="image is-64x64 sui-avatar" v-if="!message.person.isMe">
                      <img :src="message.person.avatarUrl">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content box">
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
                    <p class="image is-64x64 sui-avatar" v-if="message.person.isMe">
                      <img :src="message.person.avatarUrl">
                    </p>
                  </div>
                </article>
              </template>
              <!-- Used to scroll the user to the bottom ;) -->
            </div>
          </div>
          <div class="columns">
            <div class="column">
              <div id="sui-messages-bottom"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="hero-foot sui-chat-footer">
        <div class="sui-chat-footer-form">
          <div class="container">
            <div class="field is-grouped is-horizontal">
              <p class="control">
                <button class="button is-medium is-white">
                  <span class="icon is-small">
                    <i class="fa fa-plus"></i>
                  </span>
                </button>
              </p>
              <p class="control is-expanded">
                <textarea class="textarea" type="text" placeholder="Type a message" v-model="inputMessage" @keyup.enter="sendMessage(inputMessage)"/>
              </p>
              <p class="control">
                <button class="button is-medium" :class="sendMessageClass" @click="sendMessage(inputMessage)">
                  <span class="icon is-small">
                    <i class="fa fa-send"></i>
                  </span>
                </button>
              </p>
            </div>
          </div>
        </div>
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
import Bar from './layout/Bar';

export default {
  props: ['chatRoomId'],
  components: {
    SuiHeader,
    SuiFooter,
    Bar,
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
      return lodash.size(this.chatRoom.messages);
    },
  },
  methods: {
    ...mapActions([
      'sendChatMessage',
      'fetchChatRoomById',
      'fetchUserById',
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
        chatRoomId: this.chatRoom.chatRoomId,
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
        chatRoomId: this.chatRoomId,
      });
      this.fetchUserById({
        profileId: 'me',
      });
      this.scrollToBottomOfChatMessages();
    },
    timeAgoFromTimestamp(timestamp) {
      return moment.unix(timestamp).fromNow();
    },
  },
  created() {
    this.fetchChatRoom();
  },
  watch: {
    chatRoomId(current, previous) {
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
  min-height: 2.9em;
  resize: none;
}

.sui-chat-header {
  background-color: white;
  height: 3.25rem;
  align-items: center;
  display: flex;
}

.sui-chat-footer-form {
  background-color: white;
  height: 3.25rem;
  align-items: center;
  display: flex;
}

.sui-chat-footer .container {
  width: 100%;
}
</style>
