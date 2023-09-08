export const fetchUser = () => {
  const id = localStorage.getItem('userId')
  const name = localStorage.getItem('name')
  const email = localStorage.getItem('email')
  const imageUrl = localStorage.getItem('imageUrl')

  const userInfo = {
    id,
    name,
    email,
    imageUrl,
  }
  return userInfo
}
