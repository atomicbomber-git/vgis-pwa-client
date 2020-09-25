<template>
  <div class="vh-100">

    <Navbar/>

    <div class="flex-grow-1">
      <template v-if="is_ready">
        <gmap-map
          style="height: 100%"
          v-if="!is_virtual_tour_mode"
          ref="map_ref"
          :center="{lat: map_center.lat, lng: map_center.lng}"
          :zoom="map_config.zoom"
          map-type-id="terrain"
        >
          <!-- Marker penanda lokasi panorama -->
          <template v-for="panorama in panoramas">
            <!-- Marker penanda lokasi panorama -->
            <gmap-marker
              :key="panorama.id + '_marker'"
              @click="onPanoramaMarkerClick(panorama)"
              :position="{lat: panorama.latitude, lng: panorama.longitude}"
            />

            <!-- Poligon panorama -->
            <gmap-polyline
              :options="{
                strokeColor: '#9a3737',
                strokeOpacity: 0.5,
                strokeWeight: 2
            }"
              v-for="link in panorama.panorama_links"
              :key="link.id"
              :path="[{lat: panorama.latitude, lng: panorama.longitude}, {lat: link.end.latitude, lng: link.end.longitude}]"
            />
          </template>
        </gmap-map>

        <div
          v-show="this.is_virtual_tour_mode"
          ref="streetview_ref"
          style="height: 100%">
        </div>
      </template>
    </div>

    <div class="card">
      <div class="card-body d-flex justify-content-center">
        <button
          v-if="!this.is_virtual_tour_mode"
          class="btn btn-primary"
          @click="is_virtual_tour_mode = true">
          Start Tour
        </button>

        <button
          v-if="this.is_virtual_tour_mode"
          class="btn btn-secondary"
          @click="is_virtual_tour_mode = false"
        >
          Quit Tour
        </button>

      </div>
    </div>
  </div>
</template>

<script>
  import Navbar from "./Navbar";
  import axios from "axios"

  export default {
    name: "Home",
    components: {Navbar},

    mounted() {
      this.fetchData()
        .then(() => {
          this.$refs.map_ref.$mapPromise.then(map => {
            this.map = map;
          })
        })
    },

    data() {
      return {
        panoramas: null,
        map_config: null,
        is_ready: false,
        is_virtual_tour_mode: false,
        selected_panorama: null,

        map_center: {
          lat: -0.14581999411186639,
          lng: 109.40335576688987,
        }
      }
    },

    watch: {
      is_virtual_tour_mode(new_mode) {
        if (new_mode === true) {
          if (this.selected_panorama === null) {
            this.initPanorama(this.first_panorama)
          }
          else {
            this.initPanorama(this.selected_panorama)
          }
        }
      },

      map_config(new_map_config) {
        if (new_map_config === null) {
          return
        }

        this.map_center = {
          lat: new_map_config.center.latitude,
          lng: new_map_config.center.longitude,
        }
      },

      selected_panorama(new_selected_panorama) {
        this.map_center = {
          lat: new_selected_panorama.latitude,
          lng: new_selected_panorama.longitude,
        }
      }
    },

    computed: {
      first_panorama() {
        let sorted = this.panoramas.sort((pano_a, pano_b) => {
          return (pano_b.is_first ? 1 : 0) - (pano_a.is_first ? 1 : 0);
        })

        return sorted[0] ?? null
      }
    },

    methods: {
      panoramaLinksToSVLinks(panorama_links) {
        return panorama_links.map(link => {
          return {
            heading: link.heading,
            description: link.end.description,
            pano: `${link.panorama_end_id}`,
          }
        })
      },

      fetchData() {
        return this.fetchConfig()
          .then(() => {
            return this.fetchPanoramas()
          })
          .then(() => {
            this.is_ready = true
          })
          .catch(error => {
            alert("Error fetching data.")
          })
      },

      fetchConfig() {
        return axios.get(`${process.env.VUE_APP_SERVER_URL}/map-config`)
          .then(result => {
            this.map_config = result.data
          })
      },

      fetchPanoramas() {
        return axios.get(`${process.env.VUE_APP_SERVER_URL}/panorama`)
          .then(response => {
            this.panoramas = response.data
          })
      },

      initPanorama(panorama) {
        if (!this.gmap_panorama) {
          this.gmap_panorama = new google.maps.StreetViewPanorama(
            this.$refs.streetview_ref,
            {pano: `${panorama.id}`}
          );

          /* Register panorama provider */
          this.gmap_panorama.registerPanoProvider(search_pano_id => {
            let panorama = this.panoramas.find(panorama => panorama.id == search_pano_id)
            if (panorama) {
              return this.getPanoramaData(panorama)
            }

            return null
          });

          this.gmap_panorama.addListener('pano_changed', () => {
            const pano_id = this.gmap_panorama.getPano()
            this.selected_panorama = this.panoramas.find(pano => pano.id == pano_id)
          })

          this.map.setStreetView(this.gmap_panorama)
          return
        }

        this.gmap_panorama.setPano(`${panorama.id}`)
      },

      getPanoramaData(panorama) {
        return {
          location: {
            pano: `${panorama.id}`,  // The ID for this custom panorama.
            description: panorama.name,
            latLng: new google.maps.LatLng(panorama.latitude, panorama.longitude)
          },

          links: this.panoramaLinksToSVLinks(panorama.panorama_links),

          copyright: `Imagery (c) ${(new Date()).getFullYear()} Rizki Oktaviano`,
          tiles: {
            tileSize: new google.maps.Size(1024, 512),
            worldSize: new google.maps.Size(1024, 512),
            centerHeading: 0,
            getTileUrl: (pano, zoom, tileX, tileY) => {
              return `${process.env.VUE_APP_SERVER_URL}/panorama-image/${panorama.id}/${zoom}/${tileX}/${tileY}`;
            }
          }
        };
      },

      onPanoramaMarkerClick(panorama) {
        this.selected_panorama = panorama
        this.is_virtual_tour_mode = true
      },
    }
  }
</script>
