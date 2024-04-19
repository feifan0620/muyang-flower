import { reqUserInfo } from '../../api/user'
import { userStore } from '../../stores/userStore'
import { ComponentWithStore } from 'mobx-miniprogram-bindings'
import { asyncSetStorage } from '../../utils/storage'
import { reqLogin } from '../../api/user'

ComponentWithStore({
  storeBindings: {
    store: userStore,
    actions: ['setToken', 'setUserInfo']
  }
})
