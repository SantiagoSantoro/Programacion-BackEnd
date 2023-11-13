import winston from 'winston';

// Configuración de winston

const levels = {
    silly: 6,
    debug: 5,
    verbose: 4,
    http: 3,
    info: 2,
    warn: 1,
    error: 0
};

winston.addColors({
    silly: 'magenta',
    debug: 'blue',
    verbose: 'cyan',
    http: 'green',
    info: 'green',
    warn: 'yellow',
    error: 'red'
});

const devLogger = winston.createLogger({
    levels: levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'debug', format: winston.format.combine(winston.format.colorize(), winston.format.simple()) })
    ]
});

const prodLogger = winston.createLogger({
    levels: levels,
    format: winston.format.simple(),
    transports: [
        new winston.transports.Console({ level: 'info', format: winston.format.combine(winston.format.colorize(), winston.format.simple()) }),
        new winston.transports.File({ filename: './errors.log', level: 'error' })
    ]
});

const environment = process.env.NODE_ENV || 'dev'; // Puedes establecer NODE_ENV a 'prod' en tu entorno de producción

export const addLogger = (req, res, next) => {
    if (environment === 'dev') {
        req.logger = devLogger;
    } else if (environment === 'prod') {
        req.logger = prodLogger;
    }
    req.logger.http(`${req.method} en ${req.url} - ${new Date().toLocaleTimeString()}`);
    next();
};
