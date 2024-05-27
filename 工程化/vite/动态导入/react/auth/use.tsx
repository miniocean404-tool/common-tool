import React from "react"

const AuthContext = React.createContext<boolean | undefined>(false)

// 可以用 context 存储 auth 状态来进行传递
export function useAuth() {
  const [authed, setAuthed] = useState<boolean>() //状态

  return {
    //认证状态
    authed,
    //登录
    login() {
      return new Promise((res) => {
        setAuthed(true)
        // res()
      })
    },
    //退出
    logout() {
      return new Promise((res) => {
        setAuthed(false)
        // res()
      })
    },
  }
}

export function AuthProvider({ children }) {
  const auth = useAuth()
  return <AuthContext.Provider value={auth.authed}>{children}</AuthContext.Provider>
}

export default function AuthConsumer() {
  return useContext(AuthContext)
}
