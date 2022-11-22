import http from '../http-common'
import IPlanetData from '../types/Planet'

const getAll = async (page: number) => {
  if (page != null && page > 1) {
    return await http.get<IPlanetData[]>('/planets/?page=' + page)
  } else {
    return await http.get<IPlanetData[]>('/planets')
  }
}

const get = async (id: any) => {
  return await http.get<IPlanetData>(`/planets/${id}`)
}

const PlanetService = {
  getAll,
  get
}

export default PlanetService
