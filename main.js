Vue.component('product', {
    props: {
        premium: {
            type: Boolean,
            required: true,
        }
    },
    data() {
        return {
            brand: 'Vue Mastery',
            product: 'Socks',
            sample: 'Plane',
            selectedVariant: 0,
            textStyle: 'line-through',
            inventory: 11,
            details: ["80% cotton", "20% polyester", "Gender-neutral"],
            variants: [
                {
                    variantId: 2234,
                    variantColor: "green",
                    variantImage: './assets/green.jpg',
                    variantQuantity: 10,
                },
                {
                    variantId: 2235,
                    variantColor: "blue",
                    variantImage: './assets/blue.jpg',
                    variantQuantity: 0,
                },
            ],
            cart: 0,
        }
    },
    computed: {
        title() {
            return this.brand + " " + this.product
        },
        image() {
            return this.variants[this.selectedVariant].variantImage
        },
        inStock(){
            return this.variants[this.selectedVariant].variantQuantity
        },
        shipping(){
            if (this.premium) {
                return 'Free'
            }else{
                return 4.99
            }
        },
    },
    methods: {
        addToCart: function () {
            this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId)
        },
        updateProduct: function (index) {
            this.selectedVariant = index
        },
    },
    template: `
    <div class="product">
                <div class="product-image">
                    <img v-bind:src="image">
                </div>
                <div class="product-info">
                    <h1>{{ title }}</h1>
                    <h2>This is a {{ sample }}</h2>
                    <p v-if="inventory > 10 && inStock">InStock</p>
                    <p v-else-if="inventory <= 10 && inventory > 0">Almost Sold Out</p>
                <p v-else :style="{textDecoration: textStyle}">Out Of Stock</p>
                <p>User is Premium {{ premium }}</p>
                <p>Shipping is {{ shipping }}</p>
                    <ul>
                        <li v-for="detail in details"> {{ detail }}</li>
                    </ul>
                    <div v-for="(variant, index) in variants" 
                         :key="variant.variantId"
                         class="color-box"
                         :style="{ backgroundColor: variant.variantColor}"
                         @mouseover="updateProduct(index)">
                    </div>

                    <button v-on:click="addToCart" :disabled="!inStock"
                            :class="{ disabledButton: !inStock }">Add To Cart</button>
                </div>
                `,
})
var app = new Vue({
    el: '#app',
    data: {
        premium: true,
        cart: [],
    },
    methods: {
        updateCart: function (id) {
            this.cart.push(id)
        }
    }
})