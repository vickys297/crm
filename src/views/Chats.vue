<template>
    <div>
        <h1>Chats</h1>
        <div class="md-layout container">
            <div class="md-layout-item">
                Client List
            </div>
            <div class="md-layout-item">
                <ChatView></ChatView>
            </div>
        </div>
    </div>
</template>

<script>
import ChatView from '../components/chatView/ChatView'
export default {
  components: {
    ChatView
  }

}
</script>

<style lang="scss" scoped>

</style>
