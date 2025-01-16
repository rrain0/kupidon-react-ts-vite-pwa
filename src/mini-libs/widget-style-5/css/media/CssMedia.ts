

export class CssMedia {
  
  constructor(
    readonly query: string,
  ) { }
  
  select() { `@media ${this.query}` }
  
}


