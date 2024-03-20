import {RoutesBuilder} from 'src/examples/old/routes-builder/RoutesBuilder';
import RouteDescription = RoutesBuilder.RouteDescription;
import buildRoutes = RoutesBuilder.buildRoutes;


describe('RouteBuilder',()=>{
  
  const profileRoutes = {
    path: 'profile',
    paths: {
      userId: {
        path: ':userId',
        paths: {
          main: 'main',
          profile: 'profile',
          favorites: 'favorites',
          messages: 'messages',
          notifications: 'notifications',
          mortgage: 'mortgage',
        }
      }
    }
  } satisfies RouteDescription
  
  const pwdRecoveryRoutes = {
    path: 'pwd-recovery',
    paths: {
      enterEmail: {
        path: 'enter-email',
        params: {
          returnPath: 'return-path',
        }
      },
      enterNewPwd: {
        path: 'enter-new-pwd',
        params: {
          returnPath: 'return-path',
          resetPwdToken: 'reset-pwd-token',
        }
      },
    }
  } satisfies RouteDescription
  
  const rootRoutes = {
    path: '/',
    paths: {
      profile: profileRoutes,
      pwdRecovery: pwdRecoveryRoutes,
    }
  } satisfies RouteDescription
  
  
  
  const builtRoutes = buildRoutes(rootRoutes)
  
  
  
  test('builtRoutes.path', ()=>{
    expect(builtRoutes.path)
      .toStrictEqual('/')
  })
  test('builtRoutes.pwdRecovery.path', ()=>{
    expect(builtRoutes.pwdRecovery.path)
      .toStrictEqual('pwd-recovery')
  })
  test('builtRoutes.pwdRecovery.fullPath()', ()=>{
    expect(builtRoutes.pwdRecovery.fullPath())
      .toStrictEqual('/pwd-recovery')
  })
  test('builtRoutes.pwdRecovery.enterEmail.path', ()=>{
    expect(builtRoutes.pwdRecovery.enterEmail.path)
      .toStrictEqual('enter-email')
  })
  test('builtRoutes.pwdRecovery.enterNewPwd.path', ()=>{
    expect(builtRoutes.pwdRecovery.enterNewPwd.path)
      .toStrictEqual('enter-new-pwd')
  })
  test('builtRoutes.pwdRecovery.enterNewPwd.fullPath()', ()=>{
    expect(builtRoutes.pwdRecovery.enterNewPwd.fullPath())
      .toStrictEqual('/pwd-recovery/enter-new-pwd')
  })
  
  
  test('builtRoutes.pwdRecovery.enterNewPwd.fullPath({})', ()=>{
    expect(builtRoutes.pwdRecovery.enterNewPwd.fullPath({}))
      .toStrictEqual('/pwd-recovery/enter-new-pwd')
  })
  test('builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: \'/home\' })', ()=>{
    expect(builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: '/home' }))
      .toStrictEqual('/pwd-recovery/enter-new-pwd?return-path=%2Fhome')
  })
  test('builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: \'/home\', resetPwdToken: \'dkljfjdsfkj\' })', ()=>{
    expect(builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: '/home', resetPwdToken: 'dkljfjdsfkj' }))
      .toStrictEqual('/pwd-recovery/enter-new-pwd?return-path=%2Fhome&reset-pwd-token=dkljfjdsfkj')
  })
  
  
  test('builtRoutes.profile.userId.fullPath()', ()=>{
    expect(builtRoutes.profile.userId.fullPath())
      .toStrictEqual('/profile/:userId')
  })
  test('builtRoutes.profile.userIdWith(\'123\').fullPath()', ()=>{
    expect(builtRoutes.profile.userIdWith('123').fullPath())
      .toStrictEqual('/profile/123')
  })
  test('builtRoutes.profile.userIdWith(\'123\').main.fullPath()', ()=>{
    expect(builtRoutes.profile.userIdWith('123').main.fullPath())
      .toStrictEqual('/profile/123/main')
  })
  
  
  /*
  console.log(
    'builtRoutes.path',
    builtRoutes.path
  ) // /
  console.log(
    'builtRoutes.pwdRecovery.path',
    builtRoutes.pwdRecovery.path
  ) // pwd-recovery
  console.log(
    'builtRoutes.pwdRecovery.fullPath()',
    builtRoutes.pwdRecovery.fullPath()
  ) // /pwd-recovery
  console.log(
    'builtRoutes.pwdRecovery.enterEmail.path',
    builtRoutes.pwdRecovery.enterEmail.path
  ) // enter-email
  console.log(
    'builtRoutes.pwdRecovery.enterNewPwd.path',
    builtRoutes.pwdRecovery.enterNewPwd.path
  ) // enter-new-pwd
  console.log(
    'builtRoutes.pwdRecovery.enterNewPwd.fullPath()',
    builtRoutes.pwdRecovery.enterNewPwd.fullPath()
  ) // /pwd-recovery/enter-new-pwd
  
  console.log(
    'builtRoutes.pwdRecovery.enterNewPwd.fullPath({})',
    builtRoutes.pwdRecovery.enterNewPwd.fullPath({})
  ) // /pwd-recovery/enter-new-pwd
  console.log(
    'builtRoutes.pwdRecovery.enterNewPwd.fullPath()',
    builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: '/home' })
  ) // /pwd-recovery/enter-new-pwd?return-path=%2Fhome
  console.log(
    'builtRoutes.pwdRecovery.enterNewPwd.fullPath()',
    builtRoutes.pwdRecovery.enterNewPwd.fullPath({ returnPath: '/home', resetPwdToken: 'dkljfjdsfkj' })
  ) // /pwd-recovery/enter-new-pwd?return-path=%2Fhome&reset-pwd-token=dkljfjdsfkj
  
  console.log(
    'builtRoutes.profile.userId.fullPath()',
    builtRoutes.profile.userId.fullPath()
  ) // /profile/:userId
  console.log(
    `builtRoutes.profile.userIdWith('123').fullPath()`,
    builtRoutes.profile.userIdWith('123').fullPath()
  ) // /profile/123
  console.log(
    `builtRoutes.profile.userIdWith('123').main.fullPath()`,
    builtRoutes.profile.userIdWith('123').main.fullPath()
  ) // /profile/123/main
  */
  
  
})






