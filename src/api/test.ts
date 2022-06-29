/**
 * @description: 获取图片列表
 * @param {object} params
 * @return {promise}
 */
export const getImgList = (params?: object): Promise<any> => {
  return useRequest.get('/getImages', params)
}
