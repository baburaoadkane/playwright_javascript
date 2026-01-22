import fs from 'fs';
import path from 'path';

export class SummaryHelper {

  /**
   * Logs a generic CRUD summary report in console.
   *
   * @param {Object} options
   * @param {string} options.entityName - Master name with description
   * @param {'Create'|'Update'|'Delete'} options.action - Action performed
   * @param {Array<string>} options.successRecords - Successfully processed records
   * @param {Array<string>} options.skippedRecords - Skipped records
   * @param {Array<string>} options.failedRecords - Failed records
   * @param {number} options.totalCount - Total records attempted
   */
  static logCrudSummary({
    entityName,
    action,
    successRecords = [],
    skippedRecords = [],
    failedRecords = [],
    totalCount = 0
  }) {
    console.info(`\n========== ${entityName} ${action} Summary ==========`);

    console.info(`📄 Total records attempted: ${totalCount}`);
    console.info(`🟢 ${action}d records: ${successRecords.length}`);

    if (successRecords.length) {
      console.info(`🟢 ${action}d record names: ${successRecords.join(', ')}`);
    }

    console.info(`⚠️ Skipped records: ${skippedRecords.length}`);

    if (skippedRecords.length) {
      console.info(`⚠️ Skipped record names: ${skippedRecords.join(', ')}`);
    }

    console.info(`🔴 Failed records: ${failedRecords.length}`);

    if (failedRecords.length) {
      console.info(`🔴 Failed record names: ${failedRecords.join(', ')}`);
    }

    console.info(`🕒 Test executed at: ${new Date().toLocaleString('en-IN')}\n`);
    console.info('=====================================================');
  }

  /**
   * Export a generic CRUD summary report to files (JSON & HTML)
   *
   * @param {Object} options
   * @param {string} options.entityName - Master name with description
   * @param {'Create'|'Update'|'Delete'} options.action - Action performed
   * @param {Array<string>} options.successRecords - Successfully processed records
   * @param {Array<string>} options.skippedRecords - Skipped records
   * @param {Array<string>} options.failedRecords - Failed records
   * @param {number} options.totalCount - Total records attempted
   */
  static exportCrudSummary({
    entityName,
    action,
    successRecords = [],
    skippedRecords = [],
    failedRecords = [],
    totalCount = 0
  }) {
    const summary = {
      module: entityName,
      action,
      total: totalCount,
      successCount: successRecords.length,
      skippedCount: skippedRecords.length,
      failedCount: failedRecords.length,
      successRecords,
      skippedRecords,
      failedRecords,
      executedAt: new Date().toLocaleString('en-IN')
    };

    const outputDir = path.resolve('reports/summaries');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // const fileBaseName = `${entityName}-${action}-Summary`;
    const fileBaseName = `${entityName.replace(/[^a-z0-9]/gi, '_')}_${action}_Summary`;

    // 📄 JSON
    fs.writeFileSync(
      path.join(outputDir, `${fileBaseName}.json`),
      JSON.stringify(summary, null, 2)
    );

    // 🌐 HTML
    fs.writeFileSync(
      path.join(outputDir, `${fileBaseName}.html`),
      this.generateHtml(summary)
    );
  }

  /* ===========================
     CRUD HTML GENERATOR
  ============================ */
  static generateHtml(summary) {
    return `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${summary.module} ${summary.action} Summary</title>
      <style>
        body { font-family: Arial; padding: 20px; color: #d2d2d2; background: #1a1a1a; }
        li { color: #b325ffff; }
        p { color: #1f9aff;}
        .success { color: #66ff66c1; }
        .skipped { color: #ff9100ff; }
        .failed { color: #ff0000d8; }
        ul { margin-left: 10px; }
      </style>
    </head>
    <body>
      <h2>${summary.module} ${summary.action} Summary</h2>

      <h3>Total records attempted: ${summary.total}</h3>
        <p>${summary.successCount} ${summary.action}d, ${summary.failedCount} failed, ${summary.skippedCount} skipped</p>      
        <h4 class="success">✔ ${summary.action}d record names</h4>
      <ul>
        ${summary.successRecords.length
        ? summary.successRecords.map(r => `<li>${r}</li><br />`).join('')
        : ``}
      </ul>     
        <h4 class="failed">🔴 Failed record names</h4>
      <ul>
        ${summary.failedRecords.length
        ? summary.failedRecords.map(r => `<li>${r}</li><br />`).join('')
        : ''}
      </ul>
        <h4 class="skipped">⚠️ Skipped record names</h4>
      <ul>
        ${summary.skippedRecords.length
        ? summary.skippedRecords.map(r => `<li>${r}</li><br />`).join('')
        : ``}
      </ul> 
      <p>Test Executed at: ${summary.executedAt}</p>
    </body>
    </html>`;
  }


  /**
   * Logs duplicate master creation not allowed validation summary.
   * 
   * @param {string} masterCode - Code of the master (Supplier, Customer, etc.)
   */
  static logCodeValidationSummary(masterCode) {
    console.info('\n===== Duplicate Code Validation Summary =====');
    console.info(`✅ Validated Code: ${masterCode || 'Not Applicable'}`);
    console.info(`🕒 Test executed at: ${new Date().toLocaleString('en-IN')}`);
    console.info('==============================================\n');
  }

  /**
   * Logs duplicate master creation not allowed validation summary.
   * 
   * @param {string} masterName - Name of the master (Supplier, Customer, etc.) 
   */
  static logNameValidationSummary(masterName) {
    console.info('\n===== Duplicate Name Validation Summary =====');
    console.info(`✅ Validated Name: ${masterName}`);
    console.info(`🕒 Test executed at: ${new Date().toLocaleString('en-IN')}`);
    console.info('==============================================\n');
  }

  /**
 * logValidation
 * -------------
 * Logs a formatted summary for duplicate validation test cases.
 *
 * Used when:
 * - Validating duplicate entries (Code / Name / Any unique field)
 * - Displaying clear console output after validation tests
 *
 * @param {Object} params
 * @param {string} params.entityName - Name of the entity (e.g., Document Type, Item)
 * @param {string} params.type - Field type being validated (e.g., Code, Name)
 * @param {string} params.value - Duplicate value used for validation
 */

  static logValidationSummary({
    entityName,
    type,
    value
  }) {
    console.info(`\n===== Validation Summary for ${entityName} =====`);
    console.info(`✅ Validated ${type}: ${value}`);
    console.info(`🕒 Test executed at: ${new Date().toLocaleString('en-IN')}`);
    console.info('==============================================\n');
  }

  static exportValidationSummary({ entityName, type, value }) {
    const validationSummary = {
      module: entityName,
      type,
      value,
      executedAt: new Date().toLocaleString('en-IN')
    };

    const outputDir = path.resolve('reports/summaries');
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    const fileBaseName = `Duplicate_${entityName.replace(/[^a-z0-9]/gi, '_')}_${type}_Validation_Summary`;
    try {
      // 📄 JSON
      fs.writeFileSync(
        path.join(outputDir, `${fileBaseName}.json`),
        JSON.stringify(validationSummary, null, 2)
      );

      // 🌐 HTML
      fs.writeFileSync(
        path.join(outputDir, `${fileBaseName}.html`),
        this.generateValidationHtml(validationSummary)
      );
    } catch (error) {
      console.error('Failed to export validation summary:', error);
    }

  }

  /* ===========================
     VALIDATION HTML GENERATOR
  ============================ */
  static generateValidationHtml(validationSummary) {
    return `
  <!DOCTYPE html>
  <html>
  <head>
    <title>${validationSummary.module} ${validationSummary.type} Validation Summary</title>
    <style>
      body { font-family: Arial, sans-serif; padding: 20px; color: #d2d2d2; background: #1a1a1a; }
      h2,h3 { margin-bottom: 10px; }
      p { color: #1f9aff; }
      .success { color: #66ff66c1; }
      .highlight { color: #b325ff; }
    </style>
  </head>
  <body>
    <h2>Validation Summary for ${validationSummary.module}</h2>
    <h4 class="success">✔ Validated ${validationSummary.type}: 
    <span class="highlight">${validationSummary.value}</span>
    </h4>
    <p>Test executed at: ${validationSummary.executedAt}</p>
  </body>
  </html>`;
  }

  static logAndExportValidationSummary(summary) {
    this.logValidationSummary(summary);
    this.exportValidationSummary(summary);
  }

  static logAndExportCrudSummary(summary) {
    this.logCrudSummary(summary);
    this.exportCrudSummary(summary);
  }

}