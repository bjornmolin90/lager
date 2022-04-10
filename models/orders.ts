import config from "../config/config.json";
import productsModel from "./products"

const orders = {
    getOrders: async function getOrders() {
        const response = await fetch(`${config.base_url}/orders?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    pickOrder: async function pickOrder(thisorder) {
        thisorder.order_items.map(async (order_item, index) => {
            let changedProduct = {
                id: order_item.product_id,
                name: order_item.name,
                stock: order_item.stock - order_item.amount,
                api_key: config.api_key,
            };
            await productsModel.updateProduct(changedProduct);
        });

        let changedOrder = {
            id: thisorder.id,
            name: thisorder.name,
            status_id: 200,
            api_key: config.api_key,
        }

        await orders.updateOrder(changedOrder);
    },

    updateOrder: async function updateOrder(order) {

        await fetch("https://lager.emilfolino.se/v2/orders", {
            body: JSON.stringify(order),
            headers: {
                'content-type': 'application/json'
            },
            method: 'PUT'
        })
        .then(function (response) {

        });
    }
};

export default orders;
