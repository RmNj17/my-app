const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Run the build
execSync('npm run build', { stdio: 'inherit' });

// Ensure uploads directory exists in the output
const uploadsDir = path.join(__dirname, 'dist', 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Copy any existing uploads
const sourceUploadsDir = path.join(__dirname, 'uploads');
if (fs.existsSync(sourceUploadsDir)) {
  const files = fs.readdirSync(sourceUploadsDir);
  files.forEach((file) => {
    const sourceFilePath = path.join(sourceUploadsDir, file);
    const destFilePath = path.join(uploadsDir, file);
    if (fs.statSync(sourceFilePath).isFile()) {
      fs.copyFileSync(sourceFilePath, destFilePath);
    }
  });
}

console.log('Build completed successfully!');
