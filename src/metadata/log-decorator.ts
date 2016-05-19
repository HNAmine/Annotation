export function Log(target: Object, key: string, value: any) {
  return {
    value: function(...args: any[]) {
      var a = args.map(a => JSON.stringify(a)).join();//param of the function
      var result = value.value.apply(this, args);
      var r = JSON.stringify(result);//param of the function
      console.log(`================== Function Annotation ================== `);
      console.log(`Call: ${key}(${a}) => ${r}`);
      return result;
    }
  };
}

export function LogProperty(target: any, key: string) {
  // property value
  let _val = target[key];
  // property getter
  var getter = () => {
    console.log(`================== Property(GET) Annotation ================== `);
    console.log(`Get: ${key} => ${_val}`);
    return _val;
  }
  // property setter
  var setter = (newVal) => {
    console.log(`================== Property(SET) Annotation ================== `);
    console.log(`Set: ${key} => ${newVal}`);
    _val = newVal;
  }
  // Delete property.
  if (delete target[key]) {
    Object.defineProperty(target, key, {
      get: getter,
      set: setter,
      enumerable: true,
      configurable: true
    });
  }

}


export function LogParameter(target: any, key: string, index: number) {
  var metadataKey = `log_${key}_parameters`;
  if (Array.isArray(target[metadataKey])) {
    target[metadataKey].push(index);
  }
  else {
    target[metadataKey] = [index];
  }
  console.log(metadataKey);
}

export function LogForAll(...args: any[]) {
  switch (args.length) {
    case 1:
      return LogClass.apply(this, args);
    case 2:
      return LogProperty.apply(this, args);
    case 3:
      if (typeof args[2] === "number") {
        return LogParameter.apply(this, args);
      }
      return Log.apply(this, args);
    default:
      throw new Error("Decorators are not valid here!");
  }
}

export function LogClassWithArgs(filter: Object) {

  console.log(filter);

  return (target: any) => {
    // save a reference to the original constructor
    var original = target;
    // a utility function to generate instances of a class
    function construct(constructor, args) {
      var c: any = function() {
        return constructor.apply(this, args);
      }
      c.prototype = constructor.prototype;
      return new c();
    }
    // the new constructor behaviour
    var f: any = function(...args) {
      console.log(`================== Class Annotation ================== `);
      console.log("New: " + original.name);
      return construct(original, args);
    }
    // copy prototype so intanceof operator still works
    f.prototype = original.prototype;
    // return new constructor (will override original)
    return f;
  }

}

export function LogMethWithArgs(filter: Object) {
  console.log(filter);
  return (target: Object, key: string, value: any) => {
    return {
      value: function(...args: any[]) {
        var a = args.map(a => JSON.stringify(a)).join();//param of the function
        var result = value.value.apply(this, args);
        var r = JSON.stringify(result);//param of the function
        console.log(`================== Function Annotation ================== `);
        console.log(`Call: ${key}(${a}) => ${r}`);
        return result;
      }
    };
  }
}

export function LogClass(target: any) {
  // save a reference to the original constructor
  var original = target;
  // a utility function to generate instances of a class
  function construct(constructor, args) {
    var c: any = function() {
      return constructor.apply(this, args);
    }
    c.prototype = constructor.prototype;
    return new c();
  }
  // the new constructor behaviour
  var f: any = function(...args) {
    console.log(`================== Class Annotation ================== `);
    console.log("New: " + original.name);
    return construct(original, args);
  }
  // copy prototype so intanceof operator still works
  f.prototype = original.prototype;
  // return new constructor (will override original)
  return f;
}
