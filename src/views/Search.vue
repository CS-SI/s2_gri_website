<template>
  <div class="search d-flex flex-column">
    <Loading v-if="!root" stretch />
    <b-alert v-else-if="!supportsSearch" variant="danger" show>Item Search is not supported by the API.</b-alert>
    <b-row v-else>
      <b-col class="left">
        <ItemFilter
          :stac="root" title="" :value="filters" v-bind="filterComponentProps"
          @input="setFilters"
        />
      </b-col>
      <b-col class="right">
        <b-alert v-if="loading === null" variant="info" show>Please modify the search criteria.</b-alert>
        <Loading v-else-if="loading === true" />
        <b-alert v-else-if="apiItems.length === 0" variant="warning" show>No items found for the given filters.</b-alert>
        <template v-else>
          <div id="search-map">
            <Map :stac="root" :stacLayerData="itemCollection" @mapClicked="mapClicked" />
          </div>
          <Items
            :stac="root" :items="apiItems" :api="true" :allowFilter="false"
            :pagination="itemPages" :loading="apiItemsLoading"
            @paginate="paginateItems"
          />
        </template>
      </b-col>
    </b-row>
    <b-popover
      v-if="selectedItem" placement="left" triggers="manual" :show="selectedItem !== null"
      target="search-map" boundary="search-map" container="search-map"
    >
      <section class="items">
        <b-card-group columns class="count-1">
          <Item :item="selectedItem" />
        </b-card-group>
      </section>
      <div class="text-center">
        <b-button target="_blank" variant="danger" @click="mapClicked">
          Close
        </b-button>
      </div>
    </b-popover>
  </div>
</template>

<script>
import Items from '../components/Items.vue';
import { mapGetters, mapState } from "vuex";
import Utils from '../utils';
import sortCapabilitiesMixinGenerator from '../components/SortCapabilitiesMixin';
import ItemFilter from '../components/ItemFilter.vue';
import Loading from '../components/Loading.vue';
import { BPopover } from 'bootstrap-vue';

const pageTitle = 'Search';

export default {
  name: "Search",
  components: {
    BPopover,
    ItemFilter,
    Item: () => import('../components/Item.vue'),
    Items,
    Loading,
    Map: () => import('../components/Map.vue')
  },
  mixins: [
    sortCapabilitiesMixinGenerator(false)
  ],
  props: {
    loadRoot: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      loading: null,
      filters: {},
      selectedItem: null
    };
  },
  computed: {
    ...mapState(['apiItems', 'apiItemsLink', 'apiItemsPagination', 'apiItemsFilter', 'apiItemsLoading']),
    ...mapGetters(["root", "searchLink", 'supportsSearch', 'fromBrowserPath']),
    itemCollection() {
      return {
        type: 'FeatureCollection',
        features: this.apiItems,
        links: []
      };
    },
    itemPages() {
      let pages = Object.assign({}, this.apiItemsPagination);
      // If first link is not available, add the items link as first link
      if (!pages.first && this.data && this.apiItemsLink) {
        pages.first = Utils.addFiltersToLink(this.apiItemsLink, this.apiItemsFilter);
      }
      return pages;
    }
  },
  watch:{
    supportsSearch: {
      immediate: true,
      handler() {
        if (this.supportsSearch) {
          this.showPage();
        }
      }
    }
  },
  created() {
    if (this.loadRoot && !this.root) {
      let catalogUrl = this.fromBrowserPath(this.loadRoot);
      this.$store.commit("config", { catalogUrl });
    }
  },
  methods: {
    async setFilters(filters, reset = false) {
      this.filters = filters;
      if (reset) {
        this.$store.commit('resetApiItems');
        this.loading = null;
      }
      else {
        await this.filterItems(filters);
      }
    },
    showPage() {
      this.$store.commit('showPage', {title: pageTitle});
      this.$store.commit('setApiItemsLink', this.searchLink);
    },
    async paginateItems(link) {
      try {
        let response = await this.$store.dispatch('loadApiItems', {link, show: true});
        this.handleResponse(response);
      } catch (error) {
        this.$root.$emit('error', error, 'Sorry, loading the list of STAC Items failed.');
      }
    },
    async filterItems(filters) {
      this.loading = true;
      try {
        let response = await this.$store.dispatch('loadApiItems', { link: this.searchLink, show: true, filters });
        this.handleResponse(response);
      } catch(error) {
        this.$root.$emit('error', error, 'Sorry, loading a filtered list of STAC Items failed.');
      } finally {
        this.loading = false;
      }
    },
    handleResponse(response) {
      if (response) {
        this.$store.commit('showPage', {title: pageTitle, url: response.config.url});
      }
    },
    mapClicked(event) {
      if (event.type !== 'Feature') {
        this.selectedItem = null;
      }
      else {
        this.selectedItem = event.data;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
@import '~bootstrap/scss/mixins';
@import "../theme/variables.scss";

.search {
  min-height: 100%;

  .left {
    min-width: 200px;
    flex-basis: 40%;
  }
  .right {
    min-width: 300px;
    flex-basis: 60%;
  }
  .items {
    .card-columns {
      @include media-breakpoint-only(sm) {
        column-count: 1;
      }
      @include media-breakpoint-only(md) {
        column-count: 1;
      }
      @include media-breakpoint-only(lg) {
        column-count: 2;
      }
      @include media-breakpoint-only(xl) {
        column-count: 2;
      }
      @include media-breakpoint-only(xxl) {
        column-count: 3;
      }
      @include media-breakpoint-up(xxxl) {
        column-count: 4;
      }

      &.count-1 {
        column-count: 1;
      }
    }
  }
}
</style>