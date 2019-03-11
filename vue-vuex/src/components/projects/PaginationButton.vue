<template>
  <div class="mx-1 mx-md-0 show-more-btn" v-show="page && page.has_next" @click="$emit('next-page')">
    <span v-show="!loading" class="show-more">Show More <font-awesome-icon :icon="faAngleDown" /></span>
    <span v-show="loading" class="loading"><font-awesome-icon :icon="faCircleNotch" spin /></span>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'

export default {
  components: {
    FontAwesomeIcon
  },
  props: {
    loading: {
      type: Boolean,
      default () {
        return false
      }
    },
    page: {
      type: Object,
      required: false
    }
  },
  data () {
    return { faAngleDown, faCircleNotch }
  }
}
</script>
