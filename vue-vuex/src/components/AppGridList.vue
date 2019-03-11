<template>
  <div>
    <div
      v-if="($route.query.view === 'list' && cards.length > 0) || showListView"
      class="container p-0 p-lg-1"
    >
      <slot name="list"></slot>
    </div>

    <div class="container p-0 p-md-1 hidden-print">
      <div v-if="$route.query.view !== 'list'" class="row" v-show="cards.length > 0">
        <slot name="grid"></slot>
      </div>
      <div class="row" v-if="cards.length === 0 && !loading">
        <div class="col-12">
          <div class="p-3 mx-1 mx-md-0">
            <div class="text-center">
              <slot name="no-results-text">
                Sorry, we are unable to show any projects at the moment.
              </slot>
            </div>
          </div>
        </div>
      </div>

      <button
        type="button"
        class="btn btn-light btn-sm btn-block my-3"
        v-show="page && page.has_next"
        @click="$emit('next-page')"
      >
        <span v-show="!loading">Show More <font-awesome-icon :icon="faAngleDown" /></span>
        <span v-show="loading"><font-awesome-icon :icon="faCircleNotch" spin /></span>
      </button>
    </div>
  </div>
</template>

<script>
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faAngleDown from '@fortawesome/fontawesome-free-solid/faAngleDown'
import faCircleNotch from '@fortawesome/fontawesome-free-solid/faCircleNotch'

export default {
  props: {
    view: {
      type: Boolean,
      default () {
        return false
      }
    },
    cards: {
      type: Array,
      required: true
    },
    page: {
      type: Object,
      required: false
    },
    loading: {
      type: Boolean,
      default () {
        return false
      }
    }
  },
  data () {
    return {
      faAngleDown,
      faCircleNotch,
      showListView: false
    }
  },
  components: {
    FontAwesomeIcon
  }
}
</script>
