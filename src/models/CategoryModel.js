import ServicesModel from './ServicesModel'

export class CategoryModel {
  constructor () {
    this.id = ''
    this.name = ''
    this.colorCode = Array(new ColorCode())
    this.colorCodeId = '1'
    this.Services = Array(new ServicesModel())
  }
}

class ColorCode {
  constructor () {
    this.id = '1'
    this.backgroundColor = ''
  }
}
