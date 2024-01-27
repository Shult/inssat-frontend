import {apiBlog} from './client'

const getCategories = () => apiBlog.get('/categories')
const getCategoryById = (id) => apiBlog.get(`/categories/${id}`)
const getCategoriesByArticleCount = () => apiBlog.get('/categories/top-categories')

export {
    getCategories,
    getCategoriesByArticleCount,
    getCategoryById
}
