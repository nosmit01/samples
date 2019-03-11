<template>
  <div class="card" @click="showDetails">
    <div class="card-header category" :style="styles.badge">
      {{ project.category }}
    </div>
    <div class="card-body p-3 pt-4">
      <div class="d-flex align-items-center">
        <h4 class="my-0">{{ project.name | capitalize}}</h4>
      </div>
      <div class="mt-2 mb-4 timeframe">
        <font-awesome-icon :icon="faCalendarAlt" /> {{ project.timeframe }}
      </div>
      <div class="description">
        {{ project.description | truncate(225) }}
      </div>
    </div>
  </div>
</template>

<script>
import { bgColor } from '@/mixins'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import faCalendarAlt from '@fortawesome/fontawesome-free-regular/faCalendarAlt'

import { truncate, capitalize } from '@/filters'

export default {
  props: {
    project: {
      type: Object,
      required: true
    }
  },
  components: {
    FontAwesomeIcon
  },
  filters: {
    truncate,
    capitalize
  },
  mixins: [bgColor],
  data () {
    return {
      faCalendarAlt
    }
  },
  methods: {
    showDetails () {
      this.$router.push({
        name: 'details',
        params: { id: this.project.id }
      })
    }
  }
}
</script>
