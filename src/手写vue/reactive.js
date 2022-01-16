// 数据响应式
function defineReactive(obj, key, val) {
  observe(val) // 处理嵌套对象
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      return val
    },
    set(newVal) {
      console.log('set', key)
      if (newVal !== val) {
        observe(newVal) // 保证newVal为对象时，再次相应式处理
        val = newVal
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  Object.keys(obj).forEach(key => {
    defineReactive(obj, key, obj[key])
  })
}

function $set(obj, key, val) {
  defineReactive(obj, key, val)
}

const obj = {
  foo: 'foo'
}

observe(obj)
$set(obj, 'name', 'Sam')
