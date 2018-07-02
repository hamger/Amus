import RD from '../model/index'

let NoTask = RD.extend({
  render(h) {
    return (
      <div className="no-task">{this.noTaskInfo}</div>
    )
  },
  prop: ['noTaskInfo']
})

export default NoTask