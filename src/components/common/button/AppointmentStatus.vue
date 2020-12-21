<template>
  <div>
    <div v-if="status === 1"><span class="md-body-1 newOrder ">NEW ORDER</span></div>
    <div v-if="status === 2"><span class="md-body-1 pickedUp ">PICKED UP</span></div>
    <div v-if="status === 3"><span class="md-body-1 arrived ">ARRIVED</span></div>
    <div v-if="status === 4"><span class="md-body-1 processing">PROCESSING</span></div>
    <div v-if="status === 5"><span class="md-body-1 ofd">OUT FOR DELIVERY</span></div>
    <div v-if="status === 6"><span class="md-body-1 delivered">DELIVERED</span></div>
    <div v-if="status === 7"><span class="md-body-1 returned">RETURNED</span></div>
    <div v-if="status === 0"><span class="md-body-1 cancelled">CANCELLED</span></div>
    <div v-if="status === 8"><span class="md-body-1 completed">COMPLETED</span></div>
  </div>
</template>

<script>
export default {
  props: {
    status: Number
  }
}
</script>

<style lang="scss" scoped>

.newOrder {
    background-color:#438a5e;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.pickedUp {
    background-color: #84a9ac;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.arrived{
    background-color: #2bb2bb;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.processing{
    background-color: #1089ff;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.ofd{
    background-color: #f37121;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.delivered{
    background-color: #e43f5a;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.returned{
    background-color: #21243d;
    padding: 5px;
    color: white;
    border-radius: 5px;
}.cancelled{
    background-color: #eeeeee;
    padding: 5px;
    color: black;
    border-radius: 5px;
}.completed{
    background-color: #1dd3bd;
    padding: 5px;
    color: white;
    border-radius: 5px;
}

</style>
