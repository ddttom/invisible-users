import fs from 'fs/promises';
import path from 'path';
import { runTestsOnSitemap } from './main.js';

/**
 * Runs a bulk audit for a list of domains from a CSV file
 * @param {string} csvPath - Path to the CSV file
 */
export async function runBulkAudit(csvPath, context) {
  context.logger.info(`Starting Bulk Audit from: ${csvPath}`);

  let content;
  try {
    content = await fs.readFile(csvPath, 'utf8');
  } catch (err) {
    context.logger.error(`Could not read CSV file: ${err.message}`);
    process.exit(1);
  }

  const lines = content.split('\n').filter((l) => l.trim());
  const domains = [];

  // Basic CSV parsing (assuming column 1 is domain)
  for (const line of lines) {
    // Skip header and comments
    if (line.toLowerCase().startsWith('domain') || line.startsWith('#')) continue;

    let domain = line.split(',')[0].trim();
    if (domain) {
      // Ensure protocol
      if (!domain.startsWith('http')) {
        domain = `https://${domain}`;
      }
      domains.push(domain);
    }
  }

  context.logger.info(`Found ${domains.length} domains to audit.`);

  const originalOutputDir = context.options.output;
  const summary = [];

  for (const url of domains) {
    let hostname;
    try {
      hostname = new URL(url).hostname;
    } catch {
      hostname = url.replace(/[^a-z0-9]/gi, '_');
    }

    try {
      const domainOutputDir = path.join(originalOutputDir, hostname);

      context.logger.info(`\n--- Auditing ${hostname} ---`);

      // Update global config for this run - NOTE: Mutating context options
      context.options.sitemap = url;
      context.options.output = domainOutputDir;

      // Ensure the recursive flag is respected or defaulted appropriately for bulk
      // We assume user wants to crawl what is found.

      // Run the audit
      const results = await runTestsOnSitemap(context.options, context);

      // Calculate a simple score from results for the summary CSV
      // Using a weighted average similar to the Executive Dashboard
      let score = 0;
      if (results) {
        // This is a rough approximation if the exact score isn't exposed directly in results root
        // Ideally we would reuse the logic from executiveSummary but that's internal to that module.
        // Let's rely on SEO score as a proxy for now, or Calculate it.

        const seo = results.seoScores ? (results.seoScores.reduce((a, b) => a + (b.totalScore || 0), 0) / (results.seoScores.length || 1)) : 0;
        const perf = results.performanceAnalysis ? (results.performanceAnalysis.reduce((a, b) => a + (b.loadTime < 3000 ? 100 : 50), 0) / (results.performanceAnalysis.length || 1)) : 0;

        score = Math.round((seo + perf) / 2);
      }

      summary.push({
        domain: hostname,
        status: 'Success',
        score,
        pages: (results.urls || []).length,
        report: path.join(hostname, 'dashboard.html'),
      });
    } catch (err) {
      context.logger.error(`Failed to audit ${url}: ${err.message}`);
      summary.push({
        domain: hostname,
        status: 'Failed',
        error: err.message,
      });
    }
  }

  // Restore output dir just in case
  context.options.output = originalOutputDir;

  // Generate Master CSV
  const csvHeader = 'Domain,Status,Score,Pages,Report Path,Error\n';
  const csvRows = summary.map((r) => `${r.domain},${r.status},${r.score || ''},${r.pages || ''},${r.report || ''},"${r.error || ''}"`).join('\n');

  await fs.writeFile(path.join(originalOutputDir, 'bulk_audit_summary.csv'), csvHeader + csvRows);
  context.logger.info(`\nBulk Audit Complete. Summary saved to ${path.join(originalOutputDir, 'bulk_audit_summary.csv')}`);
}
