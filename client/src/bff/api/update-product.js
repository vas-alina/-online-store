export const updateProduct = ({ id, imgUrl, title, content }) =>
    fetch(`http://localhost:3010/products/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            image_url: imgUrl,
            title,
            content,
        }),
    }).then((loadedProduct) => loadedProduct.json());
