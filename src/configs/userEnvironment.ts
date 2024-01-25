export const userEnvironment = () => {
  let apiUrl = 'https://localhost:7052/api/'
  let enviroment = 'dev'
  let swaggerUrl = ''
  let hostUrl: any

  if (typeof window !== 'undefined') {
    hostUrl = window.location.host
    if (window.location.href.startsWith('https://localhost')) {
      apiUrl = 'https://localhost:7052/api/'
      swaggerUrl = 'https://localhost:7052/swagger/index.html'
      enviroment = 'dev'
    } else if (window.location.href.startsWith('https://app.******')) {
      apiUrl = 'https://services.******.io/api/'
      swaggerUrl = 'https://services.******.io/swagger/index.html'
      enviroment = 'prod'
    }
  }

  return { apiUrl: apiUrl, enviroment: enviroment, hostUrl: hostUrl }
}
