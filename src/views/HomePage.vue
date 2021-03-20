<template>
<div id="Homepage" class="home-bg h-full">

  <!-- Header -->
  <div class="flex px-4 pt-4 pb-1 justify-between">
    <p class="text-3xl font-bold ">Market</p>
    <settings-icon size="1.5x" class="custom-class cursor-pointer"></settings-icon>
  </div>
  <!-- Current data -->
  <div class="flex px-4 justify-between">
    <p class="text-xl font-bold">{{currentPriceDemo}} <span class="text-sm">€/MWh</span></p>
    <p>
      <arrow-up-icon size="1.3x" class="inline-icon"></arrow-up-icon>
      <span class="text-lg font-bold">{{currentProductionDemo}}</span>
      <arrow-down-icon size="1.3x" class="inline-icon"></arrow-down-icon>
      <span class="text-lg font-bold">{{currentConsumptionDemo}}</span>
      <span class="text-sm font-bold">GW</span>
    </p>
  </div>

  <!-- Graph of past and future data -->
  <div id="graph" class="flex relative">
    <TrendChart
        :datasets="[
    {
      data: [10, 30, 20, 40],
      smooth: true,
      fill: true
    }
  ]" :grid="{ verticalLines: false, horizontalLines: false}"
        :padding="'0'"
        :interactive="true"
        :min="0"
      class="current-curve"
    >
    </TrendChart>
    <TrendChart
        :datasets="[
    {
      data: [50, 20, 30, 50],
      smooth: true,
      fill: true
    }
  ]" :grid="{ verticalLines: false, horizontalLines: false}"
        :padding="'0'"
        :interactive="true"
        :min="0"
        class="predicted-curve"
    >
    </TrendChart>
    <div class="absolute z-20 bg-blue-500 h-2.5 w-2.5 left-1/2 rounded-full" :style="{bottom: ((50 * currentPriceDemo) / 150) +130  +'px', marginLeft: -5+'px'}"></div>
  </div>
  <!-- List of notifications -->
  <div class="absolute notfication-box shadow-2xl z-10 rounded-t-3xl bg-gray-50">
    <div class="p-4">
      <div v-if="pastNotifications.length>0" class="mb-5">
        <div class="sticky top-0 p-2 bg-gray-50 z-10">
          <div class="flex">
            <p class="text-gray-400 text-xl font-bold">Previous</p>
            <p class="text-gray-400 text-sm leading-8 pl-3">Give feedback</p>
          </div>
        </div>
        <EventNotification v-for="(notification, n) in pastNotifications" :key="'past_notf_'+n" :notification="notification"></EventNotification>
      </div>
      <div class="sticky top-0 p-2 bg-gray-50 z-10">
        <div class="flex">
          <p class="text-gray-800 text-2xl font-extrabold">Upcoming</p>
        </div>
      </div>
        <EventNotification v-for="(notification, n) in futureNotifications" :key="'future_notf_'+n" :notification="notification"></EventNotification>
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
    },
    my_response: function (data) {
      console.log('Critical my_response: ',data)
    }
  },
  mounted() {
    if(this.$store.state.userToken===null) {
      this.$router.push('login');
    }
    let self = this;
    setInterval(function(){ self.demoValues() }, 1000);
  },
  data() {
    return {
      currentPriceDemo: 41.5,
      currentProductionDemo: 1.5,
      currentConsumptionDemo: 0.9,
    }
  },
  methods: {
    demoValues() {
      this.currentPriceDemo = Math.round((Math.random() * 10 + 38)*100)/100;
      this.currentProductionDemo = Math.round((Math.random() * 2 + 0.1) * 100)/100;
      this.currentConsumptionDemo = Math.round((Math.random() * 2 + 0.1) * 100)/100;
    },
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
          description: "Price Increase",
          timestamp: 1616225220000,
          notificationID: 123132,
          url: "",
          probability: 10,
          confidence: 100,
          pastNotification: true
        },
        {
          type: "priceIncrease",
          description: "Price increase",
          timestamp: 1616227220000,
          notificationID: 123132,
          url: "",
          probability: 87,
          confidence: 100,
          pastNotification: false,
          priceChange: "+1"
        },
        {
          type: "warning",
          description: "Schedule Outage",
          timestamp: 1616228220000,
          notificationID: 123132,
          url: "",
          confidence: 100,
          pastNotification: false,
          priceChange: "-0.5"
        },
        {
          type: "warning",
          description: "Increase demand",
          timestamp: 1616230220000,
          notificationID: 123132,
          url: "",
          probability: 67.3,
          confidence: 100,
          pastNotification: false,
          priceChange: "+2.5"
        },
        {
          type: "warning",
          description: "Strong Winds",
          timestamp: 1616231220000,
          notificationID: 123132,
          url: "",
          probability: 54.2,
          confidence: 100,
          pastNotification: false
        },
        {
          type: "priceDecrease",
          description: "Price decrease",
          timestamp: 1616232220000,
          notificationID: 123132,
          url: "",
          probability: 64.6,
          confidence: 100,
          pastNotification: false,
          priceChange: "-10"
        },
        {
          type: "warning",
          description: "Increase demand",
          timestamp: 1616233220000,
          notificationID: 123132,
          url: "",
          probability: 45.3,
          confidence: 100,
          pastNotification: false
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

<style>
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
.predicted-curve .stroke {
  stroke: #6c6f70;
}
.predicted-curve .fill {
  stroke: #d4dbdd;
}
.current-curve .stroke {
  stroke: #5baec4;
}
.current-curve .fill {
  fill: #ccf3fd;
}
</style>