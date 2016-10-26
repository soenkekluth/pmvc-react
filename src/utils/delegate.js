export const delegateProxy = (target, origin) => {
  return new Proxy(target, {
    get(target, key, receiver) {
      if (key in target) return Reflect.get(target, key, receiver);
      const value = origin[key];
      return 'function' === typeof value ? function method(...args) {
        return value.apply(origin, args);
      } : value;
    },
    set(target, key, value, receiver) {
      if (key in target) return Reflect.set(target, key, value, receiver);
      origin[key] = value;
      return true;
    },
  });
}






/**
 * Inherits predefined set of static members from super class including merging them with target class static members
 * @decorator
 * @param {Class} targetClass
 */
 export const inheritProps = (targetClass) => {
  const superClass = targetClass.__proto__;

  const propsToInherit = [
      'propTypes',
      'contextTypes',
      'childContextTypes'
  ];

  for (const propName of propsToInherit) {
    if (superClass[propName]) {
      const clonedProp = Object.assign({}, superClass[propName]);

      // IE10 doesn't provide inheritance of classes static properties, hence all static properties are
      // copied throughout inheritance chain
      targetClass[propName] = targetClass[propName] ?
        Object.assign(clonedProp, targetClass[propName]) : clonedProp;
    }
  }
}


export const decorateFunction = (targetClass, funcsToDecorate) => {
  const superClass = targetClass.__proto__;
  for (const funcName of funcsToDecorate) {
    if (superClass.prototype[funcName]) {
      const origFunc = targetClass.prototype[funcName];
      targetClass.prototype[funcName] = function(...args) {

          var result;

          // if(funcName === 'render'){
          //  result = origFunc.apply(this, args);
          // }

          result = superClass.prototype[funcName].apply(this, args);

          if (result !== false && origFunc) {
            if (result) {
              if(!result.length){
                result = [result];
              }
              return origFunc.apply(this, result);
            }
            return origFunc.call(this, result);
          }
          return result;
        }
        // Object.defineProperty(targetClass.prototype, funcName, (...args)=>{
        //   const result = superClass.prototype[funcName].apply( null,args);
        //   if(result !== false && result){
        //     return origFunc.apply( null,args);
        //   }
        //   return result;
        // });
    }
  }

  return targetClass;
}
