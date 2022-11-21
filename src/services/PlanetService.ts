import http from '../http-common'
import IPlanetData from '../types/Planet'

const getAll = async () => {
  return await http.get<IPlanetData[]>('/planets')
}

const get = async (id: any) => {
  return await http.get<IPlanetData>(`/planets/${id}`)
}

const PlanetService = {
  getAll,
  get
}

export default PlanetService
