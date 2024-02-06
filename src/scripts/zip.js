const path = require('path');
const fs = require('fs');
const archiver = require('archiver');

// Get the name of the current directory
const dirName = path.basename(process.cwd());

// Create a zip file with the same name as the current directory
const output = fs.createWriteStream(`${dirName}.zip`);
const archive = archiver('zip', {
	zlib: { level: 9 }, // Sets the compression level.
});

archive.pipe(output);

// Add all files and directories in the current directory to the archive,
// except for node_modules
archive.glob('**/*', { ignore: ['node_modules/**/*', '**/*.zip'] });

archive.finalize();
