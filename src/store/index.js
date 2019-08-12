// 封装方法  设置及存储登录的信息  在跳转的时候设置存储的信息
// sessionStorage  -etItem  或者  -getUser 方法是如果有对应键名,则返回对应的值,如果没有则返回null
const Key = 'toutiao-user'
export default {
  setUser (user) {
    //   设置存储的信息,
    const localUser = this.getUser()
    const newUser = { ...localUser, ...user }
    window.sessionStorage.setItem(Key, JSON.stringify(newUser))
  },
  getUser () {
    //   获取存储的信息
    return JSON.parse(window.sessionStorage.getItem(Key) || '{}')
  },
  clearUser () {
    window.sessionStorage.removeItem(Key)
  }
}
