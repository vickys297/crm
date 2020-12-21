<template>
    <div>
        <md-content class="md-primary p-1">
            <span class="md-headline">Check Out</span>
        </md-content>

        <md-list>
            <md-list-item>
                <label>Amount</label>
                <span class="md-title">1000 AED</span>
            </md-list-item>

            <md-list-item>
                <label>Tax</label>
                <span class="md-title">20 AED</span>
            </md-list-item>

            <md-list-item>
                <label>Discount</label>
                <span class="md-title">-10 AED</span>
            </md-list-item>
            <md-divider></md-divider>
            <md-list-item>
                <label class="md-headline">To Pay</label>
                <span class="md-headline">-1010 AED</span>
            </md-list-item>
        </md-list>
        <md-divider></md-divider>
        <div class="mt-2">
            <span class="md-title">Payment</span>
        </div>
        <div class="mt-1 scrolls">
            <md-button class="md-primary md-raised">Cash</md-button>
            <md-button class="md-primary md-raised">Wallet</md-button>
            <md-button class="md-primary md-raised">Redeem</md-button>
            <md-button class="md-primary md-raised">Card</md-button>
        </div>
        <md-divider></md-divider>
        <md-list class="mt-2">
            <md-list-item>
                <md-content class="w-100 flex-container content-end">
                    <md-button class="md-raised md-primary">Cancel</md-button>
                    <md-button>Proceed</md-button>
                </md-content>
            </md-list-item>
        </md-list>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

</style>
