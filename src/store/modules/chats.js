import Vue from 'vue';
import lodash from 'lodash';
// import api from '@/helpers/api';
import chance from '@/helpers/chance';

function stubPerson() {
  const userId = chance.hash();
  return {
    profileId: userId,
    name: chance.name(),
    username: chance.word(),
    handle: chance.twitter(),
    avatarUrl: `http://placehold.it/64x64?text=person+${userId}`,
  };
}

function stubMakeChatMessage(message) {
  const person = stubPerson();
  return {
    person,
    timestamp: chance.timestamp(),
    content: message || chance.paragraph(),
  };
}

function stubBootstrapChatMessages() {
  return lodash.times(7, () => stubMakeChatMessage());
}

const localState = {
  chatRoom: {
    chatId: chance.hash(),
    title: chance.word(),
    messages: stubBootstrapChatMessages(),
    participants: [],
  },
};

const localGetters = {
  chatRoom: state => state.chatRoom,
};

const USER_RETRIEVED_CHATROOM = 'USER:RETRIEVED:CHAT_ROOM';
const USER_SEND_MESSAGE = 'USER:SEND:MESSAGE';

const localActions = {
  fetchChatRoomById({ commit }, { chatId }) {
    const messages = stubBootstrapChatMessages();
    const chatRoom = {
      chatId,
      title: chance.word(),
      messages,
      participants: lodash.map(messages, 'person'),
    };
    commit(USER_RETRIEVED_CHATROOM, {
      chatRoom,
    });
  },
  sendChatMessage({ commit }, { userId, message }) {
    commit(USER_SEND_MESSAGE, {
      userId,
      message,
    });
  },
};

/* eslint-disable no-param-reassign */
const localMutations = {
  [USER_SEND_MESSAGE](state, { userId, message }) {
    const chatMessage = stubMakeChatMessage(message, userId);
    state.messages.push(chatMessage);
  },
  [USER_RETRIEVED_CHATROOM](state, { chatRoom }) {
    Vue.set(state, 'chatRoom', chatRoom);
  },
};
/* eslint-disable no-param-reassign */

export default {
  state: localState,
  actions: localActions,
  getters: localGetters,
  mutations: localMutations,
};
