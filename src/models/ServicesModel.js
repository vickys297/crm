export default class ServicesModel {
  constructor () {
    this.id = ''
    this.name = ''
    this.category = ''
    this.duration = {
      constructor () {
        this.hours = ''
        this.minutes = ''
      }
    }
    this.price = ''
    this.specialPrice = ''
  }
}
