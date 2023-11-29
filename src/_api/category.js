import client from './client'

const getCategories = () => client.get('/categories')
const getCategoryById = (id) => client.get(`/categories/${id}`)
const getCategoriesByArticleCount = () => client.get('/categories/top-categories')

export {
    getCategories,
    getCategoriesByArticleCount,
    getCategoryById
}
