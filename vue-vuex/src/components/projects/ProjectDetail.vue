<template>
  <div>
    <div v-if="loading" class="d-flex justify-content-center align-items-center mt-5">
      Loading...
    </div>

    <div class="container-fluid p-0 bg-caf-gray" v-if="!loading && projectNotFound">
      <div class="row">
        <div class="col-12">
          <div class="project-listing-no-results p-3 mx-1 mx-md-0">
            <div class="text-center">
              <slot name="no-results-text">
              Sorry, this project is currently unavailable.
              </slot>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="container pt-md-5 pt-4 pb-4" v-if="!loading">
      <div class="row">
        <div class="col-9">
          <h2 class="mb-3">{{ projectDetail.name | capitalize }}</h2>
        </div>
        <div class="col-3 text-right">
          <button type="button" class="btn btn-light" @click="back">Back to Project List</button>
        </div>
      </div>
      <div class="row">
        <div class="col-md-7">
          <img class="profile-image w-100" :src="image">
        </div>
        <div class="col-md-5 text-color-emperor m-0 py-3 py-md-4">
          <h5>{{ projectDetail.timeframe }}</h5>
          {{ projectDetail.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
import { capitalize } from '@/filters'

const { mapGetters, mapActions } = createNamespacedHelpers('projects')

export default {
  filters: {
    capitalize
  },
  computed: {
    image () {
      return this.projectDetail.image
    },
    ...mapGetters([
      'projectDetail',
      'loading',
      'projectNotFound'
    ])
  },
  methods: {
    ...mapActions([
      'fetchProject'
    ]),
    getProject () {
      this.fetchProject({ id: this.$route.params.id })
    },
    back () {
      this.$router.push({
        name: 'projects'
      })
    }
  },
  watch: {
    $route: {
      handler: 'getProject',
      immediate: true
    }
  }
}
</script>
