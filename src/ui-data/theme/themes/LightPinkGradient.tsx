import { AppTheme } from 'src/ui-data/theme/AppTheme.ts'
import { LightPink } from 'src/ui-data/theme/themes/LightPink.tsx'
import Theme = AppTheme.Theme
import themeGradIconCss = AppTheme.themeGradIconCss




export const LightPinkGradient = { ...LightPink,
  type: 'light',
  name: 'Light Pink Gradient' as const,
  icon: (
    <div
      css={themeGradIconCss({
        colorAccent: '#ff8ea9',
        bgColor1:    '#ff8ea9',
        bgColor2:    '#f0f0f0',
      })}
    />
  ),
  
  
  
  page: { ...LightPink.page,
    bgGrad: ['#ffaeba', '#f0f0f0', '#f0f0f0'],
    //bg: ['#ffb6c1','#f5f5f5','#d8701a'],
  },
  statusBar: { ...LightPink.statusBar,
    bg: '#ffaeba',
  },
  
  inputRadio: { ...LightPink.inputRadio,
    bgFc:  '#f37190',
  },
  
} satisfies Theme
