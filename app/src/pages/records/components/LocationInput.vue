<template>
  <q-input
    label="Localização"
    filled
    readonly
    :value="address"
  >
    <template v-slot:append>
      <div v-if="!readonly">
        <q-btn
          icon="my_location"
          dense
          flat
          round
          readonly="readonly"
          :color="buttonColor"
          :loading="loading"
          @click="getLocation"
        />
      </div>
    </template>
  </q-input>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import { getGeocoding } from 'src/services/geolocation';
import { checkForPermission } from 'src/helpers/navigator';

/**
 * Based on user geolocation given by the browser
 * find the current user address (city, state and country)
 * and fill the input
 *
 * The input is always readonly
 *
 * @emits update:record-location when the location is found, with a location object
 *
 * @typedef {Location}
 * @type {object}
 * @property {string} address The location resumed address
 * @property {number} latitude The location latitude
 * @property {number} longitude The location longitude
 *
 */

export default {
  name: 'LocationInput',

  props: {
    recordLocation: {
      type: Object,
      default: null,
    },
    readonly: {
      type: Boolean,
      required: true,
    },
    newRecord: {
      type: Boolean,
      required: true,
    },
  },

  data() {
    return {
      loading: false,
    };
  },

  computed: {
    ...mapState('user', ['location']),
    address() {
      return this.recordLocation ? this.recordLocation.address : '';
    },

    buttonColor() {
      if (this.recordLocation) {
        return this.recordLocation.latitude && this.recordLocation.longitude ? 'blue-8' : 'grey';
      }
      return 'grey';
    },
  },

  mounted() {
    this.initialize();
  },

  methods: {
    ...mapMutations('user', ['setLocation']),
    /**
     * Request user current location to browser
     */
    async getGeolocation() {
      const {
        coords: {
          latitude,
          longitude,
        },
      } = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      return {
        latitude,
        longitude,
      };
    },
    /**
     * Check for geolocation support in navigator
     */
    supportGeolocation() {
      return 'geolocation' in navigator;
    },
    /**
     * Check if user has given permission to geolocation feature
     */
    async grantedPermission() {
      try {
        const { state } = await checkForPermission('geolocation');
        return state === 'granted';
      } catch (error) {
        this.$log.error(error);
        return false;
      }
    },
    /**
     * Get resumed address based on lat and long
     * @param {number} lat User location latitude
     * @param {number} long User location longitude
     */
    async getAddress(lat, long) {
      const {
        data: {
          city,
          state,
          country,
        },
      } = await getGeocoding(lat, long);

      return `${city}, ${state} - ${country}`;
    },
    /**
     * @param {Location} location An location object
     */
    emitData(location) {
      this.$emit('update:record-location', location);
    },
    /**
     * Shows a custom message if permission to geolocation have been denied
     * @see https://w3c.github.io/geolocation-api/#dom-geolocationpositionerror-code
     */
    errorHandler(error) {
      if (error.code === 1) {
        this.$q.notify('Acesso a localização negado');
      } else {
        this.$q.notify('Erro ao obter localização');
      }
    },

    handleSavedData() {
      this.emitData(this.location);
    },
    /**
     * Get user current location, location address and
     * emit this data to parent component
     */
    async getLocation() {
      if (this.supportGeolocation()) {
        try {
          this.loading = true;
          const { latitude, longitude } = await this.getGeolocation();
          const address = await this.getAddress(latitude, longitude);

          const location = {
            latitude,
            longitude,
            address,
          };

          this.emitData(location);
          this.setLocation(location);
          this.$log.debug('Location updated with success');
        } catch (error) {
          this.$log.error(error);
          this.errorHandler(error);
        } finally {
          this.loading = false;
        }
      } else {
        this.$q.notify('Seu navegador não suporta geolocalização');
      }
    },
    /**
     * Get geolocation on component mounted if user already give permission before
     * Also don't run on read only mode
     */
    async initialize() {
      const granted = await this.grantedPermission();
      const mustGetLocation = !this.readonly && this.newRecord && granted;
      if (mustGetLocation) {
        if (this.location) {
          this.handleSavedData();
        } else {
          this.getLocation();
        }
      }
    },
  },
};
</script>
