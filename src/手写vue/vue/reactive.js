// 数据响应式
// 通过形参传入val, 再将其return；闭包让外界访问val，并且变量不会被释放，一直保存至内存中
function defineReactive(obj, key, val) {
  // 递归嵌套对象
  observe(val)
  Object.defineProperty(obj, key, {
    get() {
      console.log('getter:key>>>', key)
      return val
    },
    set(newVal) {
      console.log('setter:key>>>', key)
      if (newVal !== val) {
        observe(newVal)
        val = newVal
        update()
      }
    }
  })
}

const obj = {
  foo: '',
  bar: '',
  baz: {
    a: 1
  }
}
observe(obj)

/**
 * 当数据发生改变时，更新界面
 */
function update() {
  let app = document.getElementById('app')
  app.innerHTML = obj.foo
}

/**
 * 遍历obj，对obj里面的每个属性都做defineReactive
 * @param {*} obj
 */
function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  // 遍历obj所有的key，做响应式处理
  Object.keys(obj).forEach(k => {
    defineReactive(obj, k, obj[k])
  })
}

/**
 * 处理用户直接在obj上面添加新属性，导致新属性没被响应式处理
 * @param {*} obj
 * @param {*} key
 * @param {*} val
 */
function set(obj, key, val) {
  defineReactive(obj, key, val)
}
