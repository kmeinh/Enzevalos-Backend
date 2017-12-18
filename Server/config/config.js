let env = process.env.NODE_ENV || 'development'

if (env === 'development') {
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://159.89.31.10:27017/Server-bsc'
} else if (env === 'test') {
    process.env.PORT = 3000
    process.env.MONGODB_URI = 'mongodb://159.89.31.10:27017/Server-bsc-test'
}