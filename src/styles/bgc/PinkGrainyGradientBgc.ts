import { AppTheme } from 'src/utils/theme/AppTheme'
import { css } from '@emotion/react'
import noise from 'src/res/img/effect/noise.svg'
import ThemeType = AppTheme.Type



export const PinkGrainyGradientBgc = (t: AppTheme.Theme) => css`
  background-color: ${t.page.bgc[0]};
  
  background-image: url(${noise}),
    radial-gradient(circle at 1000px 0px, ${getGrainyGradientColors(t.type)[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 1000px 1000px, ${getGrainyGradientColors(t.type)[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 0px 1000px, ${getGrainyGradientColors(t.type)[0]} 0% 200px, transparent 300px 100%),
    radial-gradient(circle at 0px 0px, ${getGrainyGradientColors(t.type)[0]} 0% 200px, transparent 300px 100%),

    radial-gradient(circle at 0px 405px, ${getGrainyGradientColors(t.type)[1]} 0% 120px, transparent 220px 100%),
    radial-gradient(circle at 1000px 405px, ${getGrainyGradientColors(t.type)[1]} 0% 120px, transparent 220px 100%),
  
    radial-gradient(circle at 306px 1000px, ${getGrainyGradientColors(t.type)[2]} 0% 76px, transparent 150px 100%),
    radial-gradient(circle at 306px 0px, ${getGrainyGradientColors(t.type)[2]} 0% 76px, transparent 150px 100%),
  
    radial-gradient(circle at 1000px 1000px, ${getGrainyGradientColors(t.type)[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 0px 1000px, ${getGrainyGradientColors(t.type)[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 1000px 0px, ${getGrainyGradientColors(t.type)[3]} 0% 246px, transparent 666px 100%),
    radial-gradient(circle at 0px 0px, ${getGrainyGradientColors(t.type)[3]} 0% 246px, transparent 666px 100%),
  
    radial-gradient(circle at 232px 202px, ${getGrainyGradientColors(t.type)[4]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 400px 146px, ${getGrainyGradientColors(t.type)[5]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 333px 333px, ${getGrainyGradientColors(t.type)[6]} 0% 70px, transparent 130px 100%),
    radial-gradient(circle at 511px 306px, ${getGrainyGradientColors(t.type)[7]} 0% 66px, transparent 150px 100%),
    radial-gradient(circle at 300px 500px, ${getGrainyGradientColors(t.type)[4]} 0% 150px, transparent 300px 100%),
    radial-gradient(circle at 700px 400px, ${getGrainyGradientColors(t.type)[4]} 0% 150px, transparent 300px 100%),
    radial-gradient(circle at 750px 500px, ${getGrainyGradientColors(t.type)[8]} 0% 150px, transparent 250px 100%);

  background-size: 200px 200px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px, 1000px 1000px,
    1000px 1000px;
`



const bgcPinkGradientsLight1 = [
  '#f39aba','#dfc0d2','#e3d8f6',
  '#dfa4b8','#ee4723','#dd8499',
  '#e35d4d','#e5bed3','#ed4d2b'
]


const bgcPinkGradientsDark1 = [
  '#f39aba','#dfc0d2','#e3d8f6',
  '#dfa4b8','#ee4723','#dd8499',
  '#e35d4d','#e5bed3','#ed4d2b'
]
  const bgcPinkGradientsDark2 = [
  '#992c46','#bc8245','#992c46',
  '#bb8396','#992c46','#975492',
  '#992c46','#3e5175','#992c46'
]
const bgcPinkGradientsDark3 = [
  '#992c46','#282c34','#992c46',
  '#282c34','#992c46','#282c34',
  '#992c46','#282c34','#992c46'
]
  const bgcPinkGradientsDark4 = [
  '#992c46','#bc8245','#992c46',
  '#282c34','#992c46','#282c34',
  '#992c46','#282c34','#992c46'
]


function getGrainyGradientColors(themeType: ThemeType){
  switch (themeType){
    case 'light': default: return bgcPinkGradientsLight1
    case 'dark': return bgcPinkGradientsDark1
  }
}