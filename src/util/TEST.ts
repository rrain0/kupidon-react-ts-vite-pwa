


export { }


/* Write here what you wanna test */



function test() {
  const obj1 = {
    name: 'aaaa',
  }
  const ageName = 'age' as const
  const objAddGetAge = {
    get [ageName]() { return 8 }
  }
  const obj2 = {
    ...obj1,
    ...objAddGetAge,
  }
  console.log(obj2.age)
}

