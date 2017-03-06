<template>
  <div class="chatroom">

    <!-- messages -->
    <!-- input bar -->
    <!-- participants -->
    <!-- add media buttons -->
    <section class="hero is-light sui-messages">
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
                  {{ chatroom.title }}
                </p>
              </div>
            </div>
            <div class="nav-right">
              <div class="nav-item is-pulled-right">
                <button class="button is-white">
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
              <template v-for="message in messages">
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
                        <small>{{ message.timestamp }}</small>
                        <br>
                        {{ message.content }}
                      </p>
                    </div>
                  </div>
                  <div class="media-right">
                  </div>
                </article>
              </template>
            </div>
          </div>
        </div>
        <div id="sui-messages-bottom"></div>
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
  </div>
</template>

<script>
import lodash from 'lodash';
import chance from '@/helpers/chance';
import SuiHeader from './Header';
import SuiFooter from './Footer';

export default {
  components: {
    SuiHeader,
    SuiFooter,
  },
  data() {
    return {
      inputMessage: '',
      chatMessages: this.stubBootstrapChatMessages(),
    };
  },
  computed: {
    hasMessage() {
      return this.inputMessage;
    },
    sendMessageClass() {
      return {
        'is-white': !this.hasMessage,
        'is-primary': this.hasMessage,
      };
    },
    chatroom() {
      return {
        title: chance.word(),
      };
    },
    messages() {
      return this.chatMessages;
    },
  },
  methods: {
    sendMessage(message) {
      if (lodash.isEmpty(message)) { return; }
      this.inputMessage = '';
      const chatMessage = this.stubMakeChatMessage(message);
      this.chatMessages.push(chatMessage);
      this.scrollToBottomOfChatMessages();
    },
    stubPerson() {
      const userId = chance.hash();
      return {
        profileId: userId,
        name: chance.name(),
        username: chance.word(),
        avatarUrl: `http://placehold.it/64x64?text=person+${userId}`,
      };
    },
    stubBootstrapChatMessages() {
      const self = this;
      return lodash.times(7, () => self.stubMakeChatMessage());
    },
    stubMakeChatMessage(message) {
      const person = this.stubPerson();
      return {
        person,
        timestamp: chance.timestamp(),
        content: message || chance.paragraph(),
      };
    },
    scrollToBottomOfChatMessages() {
      // eslint-disable-next-line
      this.$nextTick(() => {
        document.getElementById('sui-messages-bottom').scrollIntoView();
      });
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

.sui-messages .hero-body {
  max-height: 100vh;
  overflow: scroll;
  flex-shrink: 1;
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
