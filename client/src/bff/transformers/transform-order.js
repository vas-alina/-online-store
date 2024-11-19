export const transformOrder = (dbOrder) => ({
      id: dbOrder.id,
      firstName: dbOrder.first_name,
      lastName: dbOrder.last_name,
      phone: dbOrder.phone,
      email: dbOrder.email,
      deliveryMethod: dbOrder.delivery_method,
      city: dbOrder.city,
      street: dbOrder.street,
      number: dbOrder.number,
      commentOrder: dbOrder.comment_order,
      userId: dbOrder.user_id,
      createdAt: dbOrder.created_at
    
   
  
   
});
