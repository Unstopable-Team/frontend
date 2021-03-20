<template>
<div id="EventNotification" class="p-2">
  <div class="flex relative">

      <trending-up-icon v-if="notification.type == 'priceIncrease'" size="1.5x" class="custom-class"></trending-up-icon>
      <trending-down-icon v-else-if="notification.type == 'priceDecrease'" size="1.5x" class="custom-class"></trending-down-icon>
      <alert-triangle-icon v-else size="1.5x" class="custom-class"></alert-triangle-icon>
      <span class="text-sm text-gray-400 ml-3 leading-7">10:30</span>
      <span class="text-lg text-gray-400 ml-3">{{ notification.description }}</span>
    <div class="absolute feedback-box" v-if="notification.pastNotification">
      <button class="h-10 w-10 rounded-full bg-gray-300 cursor-pointer p-2 mr-2">
        <thumbs-up-icon size="1.5x" class="inline-icon"></thumbs-up-icon>
      </button>
      <button class="h-10 w-10 rounded-full bg-gray-300 cursor-pointer text-center p-2">
        <thumbs-down-icon size="1.5x" class="inline-icon"></thumbs-down-icon>
      </button>
    </div>
  </div>
  <div class="flex"  v-if="notification.pastNotification == false">
      <div class="rounded-full px-3 py-0.5 bg-gray-200 font-bold text-sm">{{timeframe}}</div>

      <div class="px-3 py-0.5 ml-3 font-bold text-sm text-green-500">{{notification.probability}}%</div>
    <div v-if="notification.priceChange" class="px-3 py-0.5 font-bold text-sm text-gray-700">{{notification.priceChange}}%€</div>
  </div>
</div>
</template>

<script>
import { TrendingUpIcon,TrendingDownIcon, AlertTriangleIcon, ThumbsDownIcon, ThumbsUpIcon } from 'vue-feather-icons'

export default {
  name: "EventNotification",
  props: ['notification'],
  computed: {
    timeframe: function() {
      return "1H"
    }
  },
  components: {
    TrendingUpIcon,
    TrendingDownIcon,
    AlertTriangleIcon,
    ThumbsDownIcon,
    ThumbsUpIcon
  }
}
</script>

<style scoped>
.inline-icon {display: inline-block;
}
.feedback-box {
  top: -8px;
  right: 0px;
}
</style>