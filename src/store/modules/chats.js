import Vue from 'vue';
import api from '@/helpers/api';

const localState = {
  chatRoom: {
    chatRoomId: null,
    title: null,
    messages: [],
    participants: [],
  },
  chatRoomListing: [],
};

const localGetters = {
  chatRoom: state => state.chatRoom,
  chatRoomListing: state => state.chatRoomListing,
};

const USER_RETRIEVED_CHATROOM = 'USER:RETRIEVED:CHAT_ROOM';
const USER_RETRIEVED_CHATROOM_LISTING = 'USER:RETRIEVED:CHAT_ROOM_LISTING';
const USER_SEND_MESSAGE = 'USER:SEND:MESSAGE';

const localActions = {
  fetchChatRooms({ commit }) {
    const response = api.getChatRooms();
    response.then(({ data }) => {
      const chatRooms = data;
      commit(USER_RETRIEVED_CHATROOM_LISTING, {
        chatRooms,
      });
    });
  },
  fetchChatRoomById({ commit }, { chatRoomId }) {
    const response = api.getChatRoomById(chatRoomId);
    response.then(({ data }) => {
      const chatRoom = data;
      commit(USER_RETRIEVED_CHATROOM, {
        chatRoom,
      });
    });
  },
  sendChatMessage({ commit }, { chatRoomId, userId, message }) {
    const response = api.sendMessageToChatRoom({
      chatRoomId,
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
  [USER_RETRIEVED_CHATROOM_LISTING](state, { chatRooms }) {
    Vue.set(state, 'chatRoomListing', chatRooms);
  },
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
