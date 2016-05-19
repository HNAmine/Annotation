import {Log, LogProperty, LogClass, LogParameter, LogClassWithArgs,LogMethWithArgs} from './metadata/log-decorator';
import {Map} from 'immutable';

//@LogClass
@LogClassWithArgs({ when: { name: "remo" } })
export class Foo {

  public bar: Map<string, string>;

  constructor() {
  }

  // @Log
  // public addTwo(bar: number): number {
  //   return bar + 2;
  // }

  @LogProperty
  public name: string = "FOO name";

  @Log
  foo(n: number, m: number) {
    return n * 2;
  }

  public saySomething( @LogParameter something: string): string {
    return this.name + " something : " + something;
  }

  @LogMethWithArgs({ nom: "amine" })
  hello() {
    console.log("hello word");
    return "hello";
  }
}

var foo = new Foo();
console.log(foo.foo(1, 5));
console.log(foo.name);
foo.name = "new FOO";
foo.saySomething("hello");
foo.hello();
// var buz = foo.addTwo(3);
// console.log(buz);
// foo.bar = Map({ 'ismail': 'zeevi' });
//
// var map = foo.bar.set('ismail', 'zaoui');
// console.log(foo.bar);
// console.log(map);
