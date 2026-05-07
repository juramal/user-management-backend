import { Logtail } from '@logtail/node';
import { LogtailTransport } from '@logtail/winston';
import winston from 'winston';

// Configurar Logtail (Better Stack) se o source token estiver disponível
const logtail = process.env.LOGTAIL_SOURCE_TOKEN
  ? new Logtail(process.env.LOGTAIL_SOURCE_TOKEN)
  : null;

// Criar logger Winston com Better Stack
const transports: winston.transport[] = [
  // Console transport (sempre ativo)
  new winston.transports.Console({
    format: winston.format.combine(
      winston.format.colorize(),
      winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
      winston.format.printf(({ timestamp, level, message, ...meta }) => {
        const metaString = Object.keys(meta).length ? JSON.stringify(meta) : '';
        return `${timestamp} [${level}]: ${message} ${metaString}`;
      })
    ),
  }),
];

// Adicionar Better Stack transport se configurado
if (logtail) {
  transports.push(new LogtailTransport(logtail));
}

// Criar e exportar logger
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.json()
  ),
  defaultMeta: {
    service: 'user-management-backend',
    environment: process.env.NODE_ENV || 'development',
  },
  transports,
});

// Log de inicialização
if (logtail) {
  logger.info('📊 Better Stack (Logtail) logging ativado');
} else {
  logger.info('⚠️  Better Stack não configurado - usando apenas console');
}

export default logger;
