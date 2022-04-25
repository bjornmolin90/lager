import config from "../config/config.json";
import orderModel from "./orders"
import storage from "./storage"

const invoices = {
    getInvoices: async function getInvoices() {
        const tokenObject = await storage.readToken()
        const response = await fetch(`${config.base_url}/invoices?api_key=${config.api_key}`,
        {
            headers: {
                "x-access-token" : tokenObject.token
            },
        });
        const result = await response.json();

        return result.data;
    },

    addInvoice: async function addInvoice(invoice) {

        let order = await orderModel.getOrder(invoice.order_id);

        let totalPrice = order.order_items.reduce((price, item) => {
            return price + item.amount * item.price;
        }, 0);

        let dueDate = new Date(invoice.creation_date);
        dueDate.setDate(dueDate.getDate() + 30);

        let changedOrder = {
            id: order.id,
            name: order.name,
            status_id: 600,
            api_key: config.api_key,
        }

        let newInvoice = {
            order_id: invoice.order_id,
            total_price: totalPrice,
            due_date: dueDate.toLocaleDateString(),
            api_key: config.api_key,
        }
        await invoices.updateInvoice(newInvoice);
        await orderModel.updateOrder(changedOrder);
    },

    updateInvoice: async function updateInvoice(invoice) {

        const tokenObject = await storage.readToken()
        await fetch("https://lager.emilfolino.se/v2/invoices", {
            body: JSON.stringify(invoice),
            headers: {
                'content-type': 'application/json',
                "x-access-token" : tokenObject.token
            },
            method: 'POST'
        })
        .then(function (response) {

        });
    }
};

export default invoices;
