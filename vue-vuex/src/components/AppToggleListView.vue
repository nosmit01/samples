<template>
  <div class="pl-md-3 d-flex justify-content-end">
    <div
      class="grid"
      :class="{ 'font-weight-bold': !$route.query.view }"
      @click="toggleListView(false)">Grid</div>
    <div class="mx-2">|</div>
    <div
      class="list"
      :class="{ 'font-weight-bold': $route.query.view }"
      @click="toggleListView(true)">List</div>
  </div>
</template>
<script>
import { createNamespacedHelpers } from 'vuex'

const { mapGetters, mapActions } = createNamespacedHelpers('projects')

export default {
  computed: {
    ...mapGetters(['isListView'])
  },
  methods: {
    ...mapActions(['setListView']),
    toggleListView (isListView) {
      this.setListView(isListView)
      this.$router.push({
        name: this.$route.name,
        replace: true,
        query: Object.assign({}, this.$route.query, {
          view: isListView ? 'list' : undefined
        })
      })
    }
  }
}
</script>
