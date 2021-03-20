<template>
<div id="Homepage" class="home-bg h-full">

  <!-- Header -->
  <div class="flex px-4 pt-4 pb-1 justify-between">
    <p class="text-3xl font-bold ">Market</p>
    <settings-icon size="1.5x" class="custom-class cursor-pointer"></settings-icon>
  </div>
  <!-- Current data -->
  <div class="flex px-4 justify-between">
    <p class="text-xl font-bold">{{currentPrice}} <span class="text-sm">€/MWh</span></p>
    <p>
      <arrow-up-icon size="1.3x" class="inline-icon"></arrow-up-icon>
      <span class="text-lg font-bold">{{currentProduction}}</span>
      <arrow-down-icon size="1.3x" class="inline-icon"></arrow-down-icon>
      <span class="text-lg font-bold">{{currentConsumption}}</span>
      <span class="text-sm font-bold">GW</span>
    </p>
  </div>

  <!-- Graph of past and future data -->
  <div id="graph" class="flex">
    <TrendChart
        :datasets="[
    {
      data: [10, 50, 20, 100, 40, 60, 80],
      smooth: true,
      fill: true
    }
  ]" :grid="{ verticalLines: true, horizontalLines: false}"
        :padding="'0'"
        :interactive="true"
        :min="0">
    </TrendChart>
  </div>
  <!-- List of notifications -->
  <div class="absolute notfication-box shadow-2xl z-10 rounded-t-3xl bg-gray-50">
    <div class="p-4">
      <div v-if="pastNotifications.length>0" class="mb-5">
        <div class="sticky top-0">
          <div class="flex">
            <p class="text-gray-400 text-xl font-bold">Previous</p>
            <p class="text-gray-400 text-sm leading-8 pl-3">Give feedback</p>
          </div>
        </div>
        <EventNotification v-for="(notification, n) in pastNotifications" :key="'past_notf_'+n" :notification="notification"></EventNotification>
      </div>
      <div class="sticky top-0">
        <div class="flex">
          <p class="text-gray-800 text-2xl font-extrabold">Upcoming</p>
        </div>

        <EventNotification v-for="(notification, n) in futureNotifications" :key="'future_notf_'+n" :notification="notification"></EventNotification>

        <div @click="send('notification', 'hello') ">SEND NOTIFICATION - SOCKET DATA</div>
        <div @click="send('critical_notification', 'hello') ">SEND CRITICAL NOTIFICATION - SOCKET DATA</div>

      </div>



    </div>
  </div>
</div>
</template>

<script>
import { SettingsIcon, ArrowUpIcon, ArrowDownIcon } from 'vue-feather-icons'
import EventNotification from "@/components/EventNotification";

export default {
  name: "Homepage",
  sockets: {
    connect: function () {
      console.log('socket connected')
    },
    notification: function (data) {
      console.log('Notification: ',data)
    },
    critical_notification: function (data) {
      console.log('Critical Notification: ',data)
    }
  },
  mounted() {
    if(this.$store.state.userToken===null) {
      this.$router.push('login');
    }
  },
  methods: {
    send(eventName, data) {
      console.log("sending",eventName,data)
      this.$socket.emit(eventName, data)
    }
  },
  computed: {
    currentPrice: function() {
      return 41.34
    },
    currentConsumption: function() {
      return 1.81
    },
    currentProduction: function() {
      return 0.81
    },
    graphLabels: function() {
      return { xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"], yLabels: 5 }
    },
    notifications: function () {
      return [
        {
          type: "priceIncrease",
          description: "Notification description",
          timestamp: 123132,
          notificationID: 123132,
          url: "",
          probability: 10,
          confidence: 100,
          pastNotification: true
        },
        {
          type: "priceIncrease",
          description: "Notification description",
          timestamp: 123132,
          notificationID: 123132,
          url: "",
          probability: 87,
          confidence: 100,
          pastNotification: false,
          priceChange: "+1"
        }
      ]
    },

    pastNotifications: function () {
      return this.notifications.filter(function (el) {
        return el.pastNotification;
      });
    },
    futureNotifications: function () {
      return this.notifications.filter(function (el) {
        return el.pastNotification==false;
      });
    }
  },
  components: {
    EventNotification,
    SettingsIcon,
    ArrowUpIcon,
    ArrowDownIcon
  }
}
</script>

<style scoped>
.home-bg {
  background: #E5EAED;
}
.inline-icon {
  display: inline-block;
  transform: translateY(-3px);
}
.notfication-box {
  top: 220px;
  bottom: 0px;
  right: 0px;
  left: 0px;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>