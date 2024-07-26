const fs = require('fs');
const path = require('path');

/**
 * FileManager class to handle file operations.
 */
class FileManager {
  /**
   * @param {string} filePath - The path to the file to manage.
   */
  constructor(filePath) {
    this.filePath = path.resolve(__dirname, filePath);
  }

  /**
   * Read and parse JSON data from the file.
   * @returns {Object} - The parsed JSON data, or an empty object if an error occurs.
   */
  readFile() {
    try {
      const data = fs.readFileSync(this.filePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading file:', error);
      return {};
    }
  }

  /**
   * Write JSON data to the file.
   * @param {Object} data - The data to write to the file.
   */
  writeFile(data) {
    try {
      fs.writeFileSync(this.filePath, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Error writing file:', error);
    }
  }
}

module.exports = FileManager;
