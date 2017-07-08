<template>
  <div class="contribute">

    <section class="hero is-fullheight is-white sui-contribute">
      <div class="hero-head sui-contribute-header">
        <bar class="container">
          <div slot="left" class="bar-content">
            <router-link :to="{ name: 'home' }" class="navbar-item">
              <img src="https://placehold.it/64x64" alt="social-ui"/>&nbsp;social-ui
            </router-link>
          </div>

          <div slot="right" class="bar-content">
            <div class="navbar-item">
              <div class="field">
                <p class="control">
                  <a class="button is-primary" @click="contributeContent">
                    POST
                  </a>
                </p>
              </div>
            </div>
          </div>
        </bar>
      </div>

    <div class="hero-body">
      <div class="container">
        <form @submit.prevent>
          <div class="field">
            <p class="control">
              <textarea ref="caption" class="textarea" placeholder="Type a caption" v-model="caption"></textarea>
            </p>
          </div>
          <nav class="level is-mobile">
            <div class="level-left">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <button class="button is-white" @click="addAttachmentImage" :disabled="!canAddImages">
                      <span class="icon is-small">
                        <i class="fa fa-picture-o"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-white" @click="addAttachmentVideo" :disabled="!canAddVideos">
                      <span class="icon is-small">
                        <i class="fa fa-film"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-white" @click="addAttachmentLink" :disabled="!canAddLinks">
                      <span class="icon is-small">
                        <i class="fa fa-link"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-white" disabled>
                      <span class="icon is-small">
                        <i class="fa fa-map-marker"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
            <div class="level-center">
              <div class="level-item">
                <div class="field has-addons">
                  <p class="control">
                    <button class="button is-white" @click="addHashTag">
                      <span class="icon is-small">
                        <i class="fa fa-hashtag"></i>
                      </span>
                    </button>
                  </p>
                  <p class="control">
                    <button class="button is-white" @click="addMention">
                      <span class="icon is-small">
                        <i class="fa fa-at"></i>
                      </span>
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </nav>

          <!-- Preview the attachments -->
          <transition-group name="attachments"
            enter-active-class="animated fadeIn"
            leave-active-class="animated fadeOut"
            tag="div" class="columns is-mobile attachment-preview">
            <template v-for="(attachment, $index) in attachmentList">
              <div class="column has-text-centered" :key="$index" v-if="attachment.type === 'image' || attachment.type === 'video'">
                <div class="image is-128x128">
                  <img :src="attachment.url" />
                </div>
                <a class="button is-danger is-outlined" @click="removeAttachment($index)">
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                  <span>
                    REMOVE
                  </span>
                </a>
              </div>
              <div class="column is-offset-3-tablet is-half-tablet has-text-centered" :key="$index" v-if="attachment.type === 'link'">
                <article class="media" style="min-height: 128px">
                  <figure class="media-left">
                    <p class="image is-64x64">
                      <img :src="attachment.imageUrl">
                    </p>
                  </figure>
                  <div class="media-content">
                    <div class="content max-lines--one-plus-three">
                      <p>
                        <strong>{{ attachment.url }}</strong>
                        <br>
                        {{ attachment.caption }}
                      </p>
                    </div>
                    <hr />
                  </div>
                </article>
                <a class="button is-danger is-outlined" @click="removeAttachment($index)">
                  <span class="icon is-small">
                    <i class="fa fa-times"></i>
                  </span>
                  <span>
                    REMOVE
                  </span>
                </a>
              </div>
            </template>
            <div class="column" v-for="n in 6" :key="'ghost-'+n" v-if="!attachmentListType || attachmentListType !== 'link'"></div>
          </transition-group>
        </form>
      </div>
    </div>
  </section>

  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import chance from '@/helpers/chance';
import SuiHeader from './Header';
import SuiFooter from './Footer';
import Bar from './layout/Bar';

export default {
  name: 'contribute',
  props: [],
  components: {
    SuiHeader,
    SuiFooter,
    Bar,
  },
  data() {
    return {
      caption: '',
      attachmentList: [],
    };
  },
  created() {
    this.addAttachmentImage();
  },
  computed: {
    ...mapGetters({
    }),
    numberOfAttachments() {
      return this.attachmentList.length;
    },
    attachmentListType() {
      if (this.numberOfAttachments === 0) { return null; }
      const headAttachment = this.attachmentList[0];
      return headAttachment.type;
    },
    canAddImages() {
      // We can only add one 'type' of attachments and each have different rules.
      // We determine this behaviour based off the first attachment in the list
      const type = this.attachmentListType;
      if (!type || (type === 'image' && this.numberOfAttachments < 5)) {
        return true;
      }
      return false;
    },
    canAddVideos() {
      const type = this.attachmentListType;
      if (!type || (type === 'video' && this.numberOfAttachments < 1)) {
        return true;
      }
      return false;
    },
    canAddLinks() {
      const type = this.attachmentListType;
      if (!type || (type === 'link' && this.numberOfAttachments < 1)) {
        return true;
      }
      return false;
    },
  },
  methods: {
    ...mapActions([
    ]),
    addHashTag() {
      this.caption += ' #';
      this.$refs.caption.focus();
    },
    addMention() {
      this.caption += ' @';
      this.$refs.caption.focus();
    },
    addAttachmentImage() {
      this.attachmentList.push({
        type: 'image',
        url: 'http://placehold.it/128x128?text=image',
      });
    },
    addAttachmentVideo() {
      this.attachmentList.push({
        type: 'video',
        url: 'http://placehold.it/128x128?text=video',
      });
    },
    addAttachmentLink() {
      this.attachmentList.push({
        type: 'link',
        url: chance.url(),
        caption: chance.paragraph({ sentences: 2 }),
        imageUrl: 'http://placehold.it/64x64?text=url',
      });
    },
    removeAttachment($index) {
      this.attachmentList.splice($index, 1);
    },
    contributeContent() {
      this.$router.push({
        name: 'profile',
        params: {
          profileId: 'me',
        },
      });
    },
  },
};
</script>

<style lang="scss">
.contribute .attachment-preview {
  overflow-x: scroll;
  max-width: 95vw;
}

.sui-contribute.hero .hero-body {
  align-items: initial;
}

.sui-contribute-header {
  background-color: white;
  height: 3.25rem;
  align-items: center;
  display: flex;
  position: relative;
  box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1);
}

</style>
