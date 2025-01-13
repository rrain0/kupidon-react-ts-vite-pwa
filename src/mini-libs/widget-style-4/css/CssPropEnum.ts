import { css } from '@emotion/react'
import { CssProp } from 'src/mini-libs/widget-style-4/css/CssProp.ts'



export class CssPropEnum<const out V extends string> extends CssProp {
  
  constructor(
    name: string,
    readonly values: readonly V[]
  ) {
    super(name)
  }
  
  useSetEnum(value: V): string {
    return this.useSet(value)
  }
  useGetEnum(defaultValue?: V): string {
    return this.useGet(defaultValue)
  }
}




{
  function cssEnumPropExample() {
    const propEnum = new CssPropEnum('--prop-enum', ['black', 'white', 'default-value'])
    
    const cssPropStyleExample = css`
      // --prop-enum: black;
      ${propEnum.useSetEnum('black')};
      // --prop-enum: black;
      ${propEnum.name}: black;
      // --prop-enum: var(--prop-enum);
      ${propEnum.name}: ${propEnum.useGetEnum()};
      // --prop-enum: var(--prop-enum, default-value);
      ${propEnum.name}: ${propEnum.useGetEnum('default-value')};
    `
  }
}


