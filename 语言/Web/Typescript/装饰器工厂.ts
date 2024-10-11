function CustomClassDecorator(info: string): ClassDecorator {
  return (target: Function) => {
    console.log(target) // [Function user]
    console.log(info) // 你好
  }
}

function CustomPropertyDecorator(userName: string): PropertyDecorator {
  return (target: Object, propertyName: string | symbol) => {
    console.log(target) // {}
    console.log(propertyName) // userName

    // targetClassPrototype[propertyName] = userName
  }
}

function CustomMethodDecorator(info: string): MethodDecorator {
  return (target: Object, methodName: any, propertyDescriptor: PropertyDescriptor) => {
    console.log(target) // { sayHello: [Function (anonymous)] }
    console.log(methodName) //sayHello

    let originMethod = propertyDescriptor.value

    propertyDescriptor.value = function (...args: any) {
      console.log("before")
      console.log("我" + info + "来了") //我马东锡来了
      originMethod.call(this, args)
      console.log("after")
    }
  }
}

function CustomParameterDecorator(tag: string): ParameterDecorator {
  return (target: any, methodName: string | symbol | undefined, parameterIndex: number) => {
    console.log(tag) // 装饰实例方法的参数
    console.log(target) // { sayHello: [Function (anonymous)] }
    console.log(methodName?.toString()) // sayHello
    console.log(parameterIndex.toString()) // 0
  }
}
