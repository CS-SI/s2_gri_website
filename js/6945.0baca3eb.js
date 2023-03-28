"use strict";(self["webpackChunk_radiantearth_stac_browser"]=self["webpackChunk_radiantearth_stac_browser"]||[]).push([[6945,1468],{8073:function(t,e,s){s.r(e),s.d(e,{default:function(){return u}});var i=function(){var t=this,e=t._self._c;return e("main",{staticClass:"search d-flex flex-column"},[t.parent?t.searchLink?e("b-row",[e("b-col",{staticClass:"left"},[e("ItemFilter",t._b({attrs:{stac:t.parent,title:"",value:t.filters},on:{input:t.setFilters}},"ItemFilter",t.filterComponentProps,!1))],1),e("b-col",{staticClass:"right"},[t.loading?e("Loading",{attrs:{fill:"",top:""}}):t.hasItems||t.hasFilters?t.hasItems?t._e():e("b-alert",{attrs:{variant:"warning",show:""}},[t._v(t._s(t.$t("search.noItemsFound")))]):e("b-alert",{attrs:{variant:"info",show:""}},[t._v(t._s(t.$t("search.modifyCriteria")))]),t.hasItems?[e("div",{attrs:{id:"search-map"}},[e("Map",{attrs:{stac:t.parent,stacLayerData:t.itemCollection,scrollWheelZoom:"",popover:""}})],1),e("Items",{attrs:{stac:t.parent,items:t.apiItems,api:!0,allowFilter:!1,pagination:t.itemPages},on:{paginate:t.paginateItems}})]:t._e()],2)],1):e("b-alert",{attrs:{variant:"danger",show:""}},[t._v(t._s(t.$t("search.notSupported")))]):e("Loading",{attrs:{stretch:""}})],1)},a=[],r=s(19),n=s(629),o=s(9879),l=s(7677),h=s(3876),c=s(9091),m=s(3989);const p="__search__";var g={name:"Search",components:{ItemFilter:h["default"],Items:r.Z,Loading:c.Z,Map:()=>s.e(6518).then(s.bind(s,6518))},mixins:[(0,l.ZP)(!1)],props:{loadParent:{type:String,default:null}},data(){return{parent:null,filters:{},selectedItem:null}},computed:{...(0,n.rn)(["apiItems","apiItemsLink","apiItemsPagination","catalogUrl"]),...(0,n.Se)(["getStac","root","fromBrowserPath","getApiItemsLoading"]),pageTitle(){return this.$t("search.title")},loading(){return this.getApiItemsLoading(p)},searchLink(){return this.parent instanceof m.Z&&this.parent.getSearchLink()},itemCollection(){return{type:"FeatureCollection",features:this.apiItems,links:[]}},itemPages(){let t=Object.assign({},this.apiItemsPagination);return!t.first&&this.data&&this.apiItemsLink&&(t.first=o.ZP.addFiltersToLink(this.apiItemsLink,this.filters)),t},hasFilters(){return o.ZP.size(this.filters)>0},hasItems(){return this.apiItems.length>0}},watch:{searchLink:{immediate:!0,handler(){this.searchLink&&this.showPage()}}},async created(){let t=this.catalogUrl;this.loadParent?(t=this.fromBrowserPath(this.loadParent),this.parent=this.getStac(t)):this.parent=this.root,this.parent||(await this.$store.dispatch("load",{url:t}),this.root||this.$store.commit("config",{catalogUrl:t}),this.parent=this.getStac(t))},methods:{...(0,n.OI)(["toggleApiItemsLoading"]),async setFilters(t,e=!1){this.filters=t,e?this.$store.commit("resetApiItems"):await this.filterItems(t)},showPage(){this.$store.commit("showPage",{title:this.pageTitle}),this.$store.commit("setApiItemsLink",this.searchLink)},async paginateItems(t){this.toggleApiItemsLoading(p);try{let e=await this.$store.dispatch("loadApiItems",{link:t,show:!0,filters:this.filters});this.handleResponse(e)}catch(e){this.$root.$emit("error",e,this.$t("errors.loadItems"))}finally{this.toggleApiItemsLoading(p)}},async filterItems(t){this.toggleApiItemsLoading(p);try{let e=await this.$store.dispatch("loadApiItems",{link:this.searchLink,show:!0,filters:t});this.handleResponse(e)}catch(e){this.$root.$emit("error",e,this.$t("errors.loadFilteredItems"))}finally{this.toggleApiItemsLoading(p)}},handleResponse(t){t&&this.$store.commit("showPage",{title:this.pageTitle,url:t.config.url})}}},d=g,I=s(1001),f=(0,I.Z)(d,i,a,!1,null,"00017718",null),u=f.exports}}]);
//# sourceMappingURL=6945.0baca3eb.js.map