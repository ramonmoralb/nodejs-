import cors from 'cors'

export const middlewareCors = cors({
    origin: // acepta dos parametros el primero error o null y el segundo true o false según si la url está permitida
        (origin, callback) => {
            const ACCESS_ORIGIN_ACCEPTED = [
                'http://localhost:8080',
                'http://localhost:1234',
                'https://movies.com'
            ]

            if (ACCESS_ORIGIN_ACCEPTED.includes(origin)) {
                return callback(null, true)
            }

            if (!origin) {
                return callback(null, true)
            }

            return callback(new Error('Not allowed by CORS'))
        }

})
