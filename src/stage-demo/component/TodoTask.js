import RD from '../model/index'

let TodoTask = RD.extend({
  render(h) {
    return (
      <div className='row todo-item'>
        <div className='col-1 row'>
          <input type='checkbox' checked={this.task.complete}
                 onchange={this.change.bind(this, this.task)}/>
        </div>
        <div className={this.task.complete ? 'col-2 on' : 'col-2'}>{this.task.taskName}</div>
        <div className='col-3'>
          <span className='btn' onclick={this.remove.bind(this, this.task.id)}>删除</span>
        </div>
      </div>
    )
  },
  prop: {
    task: {
      type: Object,
      require: true,
      default() {
        return {}
      }
    }
  },
  method: {
    change(task) {
      this.$emit('toggleTaskType', task)
    },
    remove(id) {
      this.$emit('removeById', id)
    }
  }
})

export default TodoTask