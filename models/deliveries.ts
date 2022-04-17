import config from "../config/config.json";
import productsModel from "./products"

const deliveries = {
    getDeliveries: async function getDeliveries() {
        const response = await fetch(`${config.base_url}/deliveries?api_key=${config.api_key}`);
        const result = await response.json();

        return result.data;
    },

    addDelivery: async function addDelivery(delivery) {
        let newDelivery = {
            product_id: delivery.product_id,
            amount: delivery.amount,
            delivery_date: delivery.delivery_date,
            api_key: config.api_key,
            comment: delivery.comment,
        }

        await deliveries.updateDelivery(newDelivery);
    },

    updateDelivery: async function updateDelivery(delivery) {

        await fetch("https://lager.emilfolino.se/v2/deliveries", {
            body: JSON.stringify(delivery),
            headers: {
                'content-type': 'application/json'
            },
            method: 'POST'
        })
        .then(function (response) {

        });
    }
};

export default deliveries;
