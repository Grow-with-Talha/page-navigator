// add all the public routes here
export const publicRoutes = [
    '/',
    '/auth/new-verification',
    '/book/:id',
    '/explore',
]   

// add all the routes that are used for authentication purposes here like register and login
export const authRoutes = [
    '/auth/login',
    '/auth/signup',
    '/auth/error',
    "/auth/reset",
    '/auth/new-password'
]

export const privateRoutes = [
    '/profile',
    '/app',
    '/collection'
]
export const apiAuthPrefix = "/api/auth"

// default routes where user will be redirected after login 
export const DEFAULT_LOGIN_REDIRECT = '/app'