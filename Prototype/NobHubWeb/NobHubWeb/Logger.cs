using log4net;
using log4net.Config;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace NobHubWeb
{
    public class Logger
    {
        private static ILog logger;

        private static ILog GetLogFile()
        {
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("Log4net.config"));
            return LogManager.GetLogger(typeof(Logger));
        }

        public Logger()
        {
            var logRepository = LogManager.GetRepository(Assembly.GetEntryAssembly());
            XmlConfigurator.Configure(logRepository, new FileInfo("Log4net.config"));
            logger = LogManager.GetLogger(typeof(Logger));
        }
        /// <summary>
        /// Logs the information.
        /// </summary>
        /// <param name="message">The message.</param>
        public static void Info(string message)
        {
            logger = GetLogFile();

            if (logger.IsInfoEnabled)
            {
                logger.Info(message);
            }
        }

        /// <summary>
        /// Logs the information.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="exception">The exception.</param>
        public static void Info(string message, Exception exception)
        {
            logger = GetLogFile();

            if (logger.IsInfoEnabled)
            {
                logger.Info(message, exception);
            }
        }

        /// <summary>
        /// Logs the debug.
        /// </summary>
        /// <param name="message">The message.</param>
        public static void Debug(string message)
        {
            logger = GetLogFile();

            if (logger.IsDebugEnabled && !string.IsNullOrWhiteSpace(message))
            {
                logger.Debug(message);
            }
        }

        public static void Debug(string message, bool troubleShoot)
        {
            logger = GetLogFile();

            if (logger.IsDebugEnabled && troubleShoot && !string.IsNullOrWhiteSpace(message))
            {
                logger.Debug(message);
            }
        }

        /// <summary>
        /// Logs the debug.
        /// </summary>
        /// <param name="message">The message.</param>
        /// <param name="exception">The exception.</param>
        public static void Debug(string message, Exception exception)
        {
            logger = GetLogFile();

            if (logger.IsDebugEnabled)
            {
                logger.Debug(message, exception);
            }
        }

        /// <summary>
        /// Logs the error.
        /// </summary>
        /// <param name="message">The exception message.</param>
        public static void Error(string message)
        {
            logger = GetLogFile();

            if (logger.IsErrorEnabled && !string.IsNullOrWhiteSpace(message))
            {
                logger.Error(message);
            }
        }

        public static void Error(string message, Exception exception)
        {
            logger = GetLogFile();

            if (logger.IsErrorEnabled && !string.IsNullOrWhiteSpace(message))
            {
                logger.Error(message, exception);
            }
        }
    }
}
