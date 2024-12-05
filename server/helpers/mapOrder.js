module.exports = function (order) {
    return {
        id: order.id,
        first_name: order.firstName,
        last_name: order.lastName,
        phone: order.phone,
        email: order.email,
        total_amount: order.totalAmount,
        delivery_method: order.deliveryMethod,
        city: order.city,
        street: order.street,
        number: order.number,
        user_id: order.userId,
        comment_order: order.commentOrder,
        created_at: order.createdAt,
        updated_at: order.updatedAt,
    }
}
