<template>
  <q-page padding>
    <div class="row">
      <div class="col-12 flex justify-center">
        <q-list
          style="max-width: 450px"
          bordered
          padding
        >
          <q-item-label header>
            Notifications
          </q-item-label>
          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label>Notify 1</q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle
                v-model="notif1"
                color="blue"
                val="battery"
              />
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label>Notify 2</q-item-label>
              <q-item-label caption>
                Allow notification
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-toggle
                v-model="notif2"
                color="green"
                val="friend"
              />
            </q-item-section>
          </q-item>
          <q-item
            v-ripple
            tag="label"
          >
            <q-item-section>
              <q-item-label>Notify 3</q-item-label>
              <q-item-label caption>
                Allow notification when uploading images
              </q-item-label>
            </q-item-section>
            <q-item-section
              side
              top
            >
              <q-toggle
                v-model="notif3"
                color="red"
                val="picture"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'SettingsIndex',

  data() {
    return {
      notif1: false,
      notif2: false,
      notif3: false,
    };
  },
};
</script>

<style lang="stylus">
</style>
