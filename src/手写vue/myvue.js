function defineReactive(obj, key, val) {
  observe(val) // 处理嵌套对象
  // 创建Dep实例
  const dep = new Dep()
  Object.defineProperty(obj, key, {
    get() {
      console.log('get', key)
      // 依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      console.log('set', key)
      if (newVal !== val) {
        observe(newVal) // 保证newVal为对象时，再次相应式处理
        val = newVal

        dep.notify()
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }
  new Observer(obj)
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(key => {
    Object.defineProperty(vm, key, {
      get() {
        return vm.$data[key]
      },
      set(v) {
        vm.$data[key] = v
      }
    })
  })
}

// 1. 对data做响应式处理
// 2. 编译模板
class MyVue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // data响应式处理
    observe(this.$data)
    // 代理，让data下面的属性可以直接通过实例访问
    proxy(this)
    // compile
    new Compile(options.el, this)
  }
}

// 根据传入的value的类型做相应的响应式处理
class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // todo
    } else {
      this.walk(value)
    }
  }

  walk(obj) {
    Object.keys(obj).forEach(key => {
      defineReactive(obj, key, obj[key])
    })
  }
}

// 解析模板
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 遍历el的子节点，根据类型做相应处理
    const childNodes = el.childNodes
    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        // 处理指令和事件
        const attrs = node.attributes
        Array.from(attrs).forEach(attr => {
          const attrName = attr.name
          const exp = attr.value
          if (attrName.startsWith('v-')) {
            const dir = attrName.substring(2)
            this[dir] && this[dir](node, exp)
          }
        })
      } else if (this.isInter(node)) {
        // 文本
        this.compileText(node)
      }
      // 递归
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  compileText(node) {
    this.update(node, this.$vm[RegExp.$1], 'text')
  }
  // text指令对应的方法
  text(node, exp) {
    this.update(node, exp, 'text')
  }
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  update(node, exp, dir) {
    // 1. 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])
    // 2. 更新
    new Watcher(this.$vm, exp, function (val) {
      fn && fn(node, val)
    })
  }
  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }

  // 是否为插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }
}

class Watcher {
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 触发依赖收集
    Dep.target = this
    this.vm[this.key]
    Dep.target = null
  }

  // 未来被Dep实例调用
  update() {
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }
  notify() {
    this.deps.forEach(dep => dep.update())
  }
}
