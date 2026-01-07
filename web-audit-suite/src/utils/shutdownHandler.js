import { generateReports } from './reports.js';

let isShuttingDown = false;
let currentResults = null;

export function setupShutdownHandler(context) {
  async function handleShutdown(signal) {
    if (isShuttingDown) return;
    isShuttingDown = true;

    context.logger.info(`\nReceived ${signal} signal. Saving data before exit...`);

    try {
      if (currentResults) { // Removed global.auditcore.results check as we should rely on currentResults updated via updateCurrentResults
        const results = currentResults;
        await generateReports(results, [], context.options.output, context);
        context.logger.info('All data saved successfully');
      } else {
        context.logger.warn('No results to save during shutdown');
      }
    } catch (error) {
      context.logger.error('Error saving data during shutdown:', error);
    }

    // Exit after a brief delay to allow logs to be written
    setTimeout(() => process.exit(0), 100);
  }

  // Handle various termination signals
  process.on('SIGINT', () => handleShutdown('SIGINT')); // Ctrl+C
  process.on('SIGTERM', () => handleShutdown('SIGTERM')); // Kill
  process.on('uncaughtException', (error) => {
    context.logger.error('Uncaught exception:', error);
    handleShutdown('UNCAUGHT_EXCEPTION');
  });
  process.on('unhandledRejection', (reason) => {
    context.logger.error('Unhandled rejection:', reason);
    handleShutdown('UNHANDLED_REJECTION');
  });
}

export function updateCurrentResults(results) {
  currentResults = results;
}

export function isProcessShuttingDown() {
  return isShuttingDown;
}
