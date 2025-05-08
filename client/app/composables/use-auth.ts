import type { User } from '@/types'

export function useAuth() {
  const auth = useSanctumAuth()

  const user = useSanctumUser<User>()

  return {
    init: auth.init,
    isAuthenticated: auth.isAuthenticated,
    login: auth.login,
    logout: auth.logout,
    refreshIdentity: auth.refreshIdentity,
    user,
  }
}
