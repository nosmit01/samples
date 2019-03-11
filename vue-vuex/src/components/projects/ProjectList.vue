<template>
  <div class="container">
    <div class="sticky-top px-md-4 pb-3 mb-3 bg-white border-bottom">
      <h2 class="mt-3">Projects</h2>
      <div v-if="loading">
        Loading projects...
      </div>
      <div v-else-if="!loading && pageObj && pageObj.count > 0" class="row">
        <div class="col-8">
          Showing
          <strong>{{projects.length}}</strong> of <strong>{{ pageObj.count }}</strong>
          project{{ pageObj.count|pluralize }}
        </div>
        <AppToggleListView class="col-4" />
      </div>
    </div>

    <app-grid-list
      v-if="loadingNextPage || !loading"
      :cards="projects"
      :loading="loading"
      :page="pageObj"
      @next-page="nextPage"
      @list-view="listView"
    >
      <template slot="grid">
        <div class="col-md-4" v-for="project in projects" :key="project.id">
          <project-card
            :project="project"
            class="mb-3"
          ></project-card>
        </div>
      </template>

      <template slot="list">
        <project-row
          v-for="project in projects" :key="project.id"
          :project="project"
        ></project-row>
      </template>
    </app-grid-list>

  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'

import AppToggleListView from '@/components/AppToggleListView'
import AppGridList from '@/components/AppGridList'
import ProjectCard from '@/components/projects/ProjectCard'
import ProjectRow from '@/components/projects/ProjectRow'
import { pluralize } from '@/filters'

const { mapGetters, mapActions } = createNamespacedHelpers('projects')

export default {
  components: {
    AppToggleListView,
    AppGridList,
    ProjectCard,
    ProjectRow
  },
  filters: {
    pluralize
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.fetchProjects(1)
      next()
    })
  },
  computed: {
    ...mapGetters([
      'pageObj',
      'projects',
      'loading',
      'loadingNextPage',
      'isListView'
    ])
  },
  methods: {
    ...mapActions(['fetchProjects', 'setListView']),
    nextPage () {
      const page = this.pageObj.page + 1
      this.fetchProjects(page)
    },
    listView () {
      this.setListView(true)
      this.$router.push({
        name: this.$route.name,
        replace: true,
        query: Object.assign({}, this.$route.query, {
          view: 'list'
        })
      })
    }
  }
}
</script>
