import RD from '../model/index'

export default RD.extend({
  render(h) {
    return (
      <p className='title'>{this.title}</p>
    )
  },
  prop: ['title']
})