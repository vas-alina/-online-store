const express = require('express');
const { getFavorites, addFavorites, deleteFavorites, deleteAllFavorites } = require('../controllers/favorites');


const router = express.Router({ mergeParams: true })

router.get('/favorites', async (req, res) => {
    try {
        const userId = req.user.id

        const { productId } = req.query;
        const favorite = await getFavorites(userId, productId);

        res.status(201).send({ error: null, favorite });
    } catch (error) {
        res.status(400).send({ error: error.message || "Неизвестная ошибка" });
    }
})
router.post('/favorites', async (req, res) => {
    try {
        const userId = req.user.id

        const { productId } = req.body;
        if (!productId) {
            return res.status(400).send({ error: "Product ID and count are required." });
        }
        const favorite = await addFavorites(userId, productId);
        res.status(201).send({ error: null, favorite });
    } catch (error) {
        res.status(400).send({ error: error.message || "Неизвестная ошибка" });
    }
});

router.delete('/favorites/:id', async (req, res) => {
    try {
        const userId = req.user.id;
        const favoriteId = req.params.id;

        const deletedFavorite = await deleteFavorites(userId, favoriteId)
        if (deletedFavorite) {
            res.send({ message: "Товар удален из избранного", error: null });
        } else {
            res.status(404).send({ error: "Товар не найден в избранном" });
        }
    } catch (error) {
        res.status(500).send({ error: error.message || "Неизвестная ошибка" });
    }

})

router.delete('/favorites', async (req, res) => {
    try {
        const userId = req.user.id;

        const success = await deleteAllFavorites(userId);

        if (success) {
            res.status(200).send({ message: "Все товары были удалены из избранного." });
        } else {
            res.status(404).send({ error: "Нет товаров в избранном." });
        }
    } catch (error) {
        res.status(500).send({ error: error.message || "Неизвестная ошибка." });
    }
});

module.exports = router;