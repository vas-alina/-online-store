module.exports = function (order) {
    return {
        id: order.id,
        firstName: order.first_name,
        lastName: order.last_name,
        phone: order.phone,
        email: order.email,
        totalAmount: order.total_amount,
        deliveryMethod: order.delivery_method,
        city: order.city,
        street: order.street,
        number: order.number,
        userId: order.user_id,
        commentOrder: order.comment_order,
        createdAt: order.created_at,
        updatedAt: order.updated_at
    }
}
