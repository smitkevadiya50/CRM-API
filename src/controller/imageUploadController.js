const path = require('path');
const fs = require('fs');

// Save image file to the specified directory
const saveImageFile = (destination, filename, file) => {
  return new Promise((resolve, reject) => {
    const dir = `./uploads/${destination}`;
    fs.mkdirSync(dir, { recursive: true });

    const ext = path.extname(file.originalname).toLowerCase(); // Extract the file extension
    const filePath = path.join(dir, `${filename}${ext}`);

    // Check if the file already exists
    if (fs.existsSync(filePath)) {
      // If file exists, remove it
      fs.unlink(filePath, (err) => {
        if (err) {
          return reject(err);
        }
        // Write the new file after removing the old one
        fs.writeFile(filePath, file.buffer, (err) => {
          if (err) {
            reject(err);
          } else {
            resolve({ filePath: `/uploads/${destination}/${filename}${ext}` });
          }
        });
      });
    } else {
      // If file does not exist, write the new file
      fs.writeFile(filePath, file.buffer, (err) => {
        if (err) {
          reject(err);
        } else {
          resolve({ filePath: `/uploads/${destination}/${filename}${ext}` });
        }
      });
    }
  });
};

const deleteImageFile = (destination, id) => {
            // Path to the profile image directory
            const imageDir = path.join(__dirname, '..', '..', 'uploads', destination );

            // Read the directory and find the image file
            fs.readdir(imageDir, (err, files) => {
              if (err) {
                console.error('Error reading directory:', err);
                return;
              }
        
              const imageFile = files.find(file => file.startsWith(id));
              if (imageFile) {
                const imagePath = path.join(imageDir, imageFile);
                fs.unlink(imagePath, (err) => {
                  if (err) {
                    console.error('Error deleting profile image:', err);
                  } else {
                    console.log('image deleted successfully:', imagePath);
                  }
                });
              } else {
                console.log('image not found for employee ID:', id);
              }
            });
}

module.exports = {saveImageFile, deleteImageFile}
