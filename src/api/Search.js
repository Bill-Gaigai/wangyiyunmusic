import request from '@/utils/request'

// 搜索页，热搜关键词
export const hotSearch = params => request({
    url: "/search/hot",
    params
})

// 搜索页，热词搜索的数据
export const searchResultList = params => request({
    url: "/cloudsearch",
    params
})