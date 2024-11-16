export const transformOrder = (dbOrder) => ({
    id: dbOrder.id,
    orderId: dbOrder.order_id,
    userId: dbOrder.user_id,
    total: dbOrder.total,
    deliveryMethod: dbOrder.delivery_method,
    shippingAdress: dbOrder.shipping_adress,
    city: dbOrder.city,
    street: dbOrder.street,
    number: dbOrder.number,
    commentOrder: dbOrder.comment_order,
    createdAt: dbOrder.created_at
});
