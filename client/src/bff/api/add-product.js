import { generateDate } from "../utils";

export const addProduct = ({ imgUrl, title, content }) =>
    fetch("http://localhost:3010/products", {
        method: "POST",
        headers: {
            "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
            img_url: imgUrl,
            published_at: generateDate(),
            title,
            content,
        }),
    }).then((createdProduct) => createdProduct.json())

