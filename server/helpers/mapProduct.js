module.exports = function (product) {
    return {
        id: product.id,
        title: product.title,
        imgUrl: product.img_url,
        category: product.category ,
      
      price: product.price,
      color: product.color,
      form: product.form,
      width: product.width,
      height: product.height,
      length: product.length,
      desc: product.desc,
      
        comments: Array.isArray(product.comments) 
            ? post.comments.map(comment => ({
                id: comment.id,        
                content: comment.content, 
                authorId: comment.authorId,
                publishedAt: comment.createdAt
            }))
            : [],
        publishedAt: product.createdAt
    }
}