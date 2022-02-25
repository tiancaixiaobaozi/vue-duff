function defineReactive(obj, key, val) {
  // 递归，响应嵌套对象
  observe(val)
  // 为每个属性创建一个依赖收集的容器
  const dep = new Dep()

  Object.defineProperty(obj, key, {
    get() {
      // 如果有target标识，就进行依赖收集
      Dep.target && dep.addDep(Dep.target)
      return val
    },
    set(newVal) {
      if (newVal !== val) {
        observe(newVal) // 赋值为对象，则对新的值做响应式处理
        val = newVal
        dep.notify() // 值被改变，通知依赖去更新
      }
    }
  })
}

function observe(obj) {
  if (typeof obj !== 'object' || obj === null) {
    return
  }

  // eslint-disable-next-line no-new
  new Observer(obj)
}

function proxy(vm) {
  Object.keys(vm.$data).forEach(k => {
    Object.defineProperty(vm, k, {
      get() {
        return vm.$data[k]
      },
      set(v) {
        vm.$data[k] = v
      }
    })
  })
}

/**
 * 1. 对data选项做响应式处理
 * 2. 编译模板
 */
class Vue {
  constructor(options) {
    this.$options = options
    this.$data = options.data

    // data响应式处理
    observe(this.$data)

    // 代理，将data的值都直接挂载到实例上
    proxy(this)

    // 编译模板
    // eslint-disable-next-line no-new
    new Compile(options.el, this)
  }
}

/**
 * 根据传入的value类型做相应的响应式处理
 */
class Observer {
  constructor(value) {
    this.value = value
    if (Array.isArray(value)) {
      // TODO 数组
    } else {
      // 对象
      this.walk(value)
    }
  }

  // 对象的响应式，执行defineProperty
  walk(obj) {
    Object.keys(obj).forEach(k => {
      defineReactive(obj, k, obj[k])
    })
  }
}

/**
 * 解析模板
 * 1. 处理插值表达式
 * 2. 处理指令和事件
 */
class Compile {
  constructor(el, vm) {
    this.$vm = vm
    this.$el = document.querySelector(el)

    if (this.$el) {
      this.compile(this.$el)
    }
  }

  compile(el) {
    // 遍历el子节点，判断类型做相应处理
    const childNodes = el.childNodes

    childNodes.forEach(node => {
      if (node.nodeType === 1) {
        // 元素
        // 需要处理指令和事件
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
      // 递归子节点
      if (node.childNodes) {
        this.compile(node)
      }
    })
  }

  // 是否为插值表达式
  isInter(node) {
    return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
  }

  update(node, exp, dir) {
    // 1. 初始化
    const fn = this[dir + 'Updater']
    fn && fn(node, this.$vm[exp])

    // 2. 更新
    // eslint-disable-next-line no-new
    new Watcher(this.$vm, exp, function(val) {
      fn && fn(node, val)
    })
  }
  // 编译模板文本
  compileText(node) {
    this.update(node, RegExp.$1, 'text')
  }
  // 指令方法
  text(node, exp) {
    this.update(node, exp, 'text')
  }
  html(node, exp) {
    this.update(node, exp, 'html')
  }
  textUpdater(node, value) {
    node.textContent = value
  }
  htmlUpdater(node, value) {
    node.innerHTML = value
  }
}

/**
 * 监听器：负责依赖更新
 */
class Watcher {
  /**
   * @param {*} vm vue实例
   * @param {*} key 要更新的key
   * @param {*} updateFn 更新的方法，如何去更新
   */
  constructor(vm, key, updateFn) {
    this.vm = vm
    this.key = key
    this.updateFn = updateFn

    // 触发依赖收集
    Dep.target = this
    // eslint-disable-next-line no-unused-expressions
    this.vm[this.key]
    Dep.target = null
  }

  // 未来被Dep实例调用
  update() {
    // 执行实际的更新操作
    this.updateFn.call(this.vm, this.vm[this.key])
  }
}

// 依赖收集
class Dep {
  constructor() {
    this.deps = []
  }

  addDep(dep) {
    this.deps.push(dep)
  }

  notify() {
    this.deps.forEach(dep => {
      dep.update()
    })
  }
}
