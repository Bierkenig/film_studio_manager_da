<template>
  <div class="serviceItemContainer">
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">Name</div>
      <div class="serviceItemElementValue">{{ service._name }}</div>
    </div>
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">{{ $t('subscribers') }}</div>
      <div class="serviceItemElementValue">{{ service._subscribers }}</div>
    </div>
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">{{ $t('price') }}</div>
      <div class="serviceItemElementValue">{{ service._price }}</div>
    </div>
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">{{ $t('owner') }}</div>
      <div class="serviceItemElementValue">{{ service._owner }}</div>
    </div>
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">{{ $t('marketShare.name') }}</div>
      <div class="serviceItemElementValue">{{ service._marketShare }}</div>
    </div>
    <div class="serviceItemElement">
      <div class="serviceItemElementHeader">{{ $t('changes') }}</div>
      <div class="serviceItemElementValue">{{ service._changes }}</div>
    </div>
  </div>
</template>

<script>
import {StreamingService} from "@/classes/StreamingService";

export default {
  name: "ServiceItem",

  props: {
    service: StreamingService
  }
}
</script>

<style scoped>
.serviceItemContainer {
  background-color: #2c3e50;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
}

.serviceItemElement {
  flex: 0 0 30%;
  margin: 1em 0 1em 0;
}

.serviceItemElementHeader {
  background-color: black;
}

.serviceItemElementValue {
  background-color: gray;
}
</style>