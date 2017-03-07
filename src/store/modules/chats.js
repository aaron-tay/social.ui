import Vue from 'vue';
import api from '@/helpers/api';

const localState = {
  chatRoom: {
    chatId: null,
    title: null,
    messages: [],
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
    const response = api.getChatRoomById(chatId);
    response.then(({ data }) => {
      const chatRoom = data;
      commit(USER_RETRIEVED_CHATROOM, {
        chatRoom,
      });
    });
  },
  sendChatMessage({ commit }, { chatId, userId, message }) {
    const response = api.sendMessageToChatRoom({
      chatId,
      userId,
      message,
    });
    response.then(({ data }) => {
      const chatMessage = data;
      commit(USER_SEND_MESSAGE, {
        chatMessage,
      });
    });
  },
};

/* eslint-disable no-param-reassign */
const localMutations = {
  [USER_SEND_MESSAGE](state, { chatMessage }) {
    state.chatRoom.messages.push(chatMessage);
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
