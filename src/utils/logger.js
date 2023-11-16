import winston from 'winston';

// Configuración de winston

const levels = {
    fatal: 0,
    error: 1,
    warning: 2,
    info: 3,
    http: 4,
    debug: 5,
};

winston.addColors({
    fatal: 'magenta',
    error: 'red',
    warning: 'yellow',
    info: 'green',
    http: 'cyan',
    debug: 'blue'
});

export const logger = (() => {
    if (process.env.NODE_ENV === 'prod') {
        return winston.createLogger({
            levels: levels,
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console({
                    level: 'info',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                }),
                new winston.transports.File({ filename: './errors.log', level: 'error' })
            ]
        });
    } else {
        // Si NODE_ENV no está definido o es un valor inesperado, usa un logger de desarrollo por defecto
        return winston.createLogger({
            levels: levels,
            format: winston.format.simple(),
            transports: [
                new winston.transports.Console({
                    level: 'debug',
                    format: winston.format.combine(
                        winston.format.colorize(),
                        winston.format.simple()
                    )
                })
            ]
        });
    }
})();

export const addLogger = (req, res, next) => {
    req.logger = logger;
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};

