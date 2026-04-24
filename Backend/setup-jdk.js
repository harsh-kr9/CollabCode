const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const jdkDir = path.join(__dirname, 'jdk');

if (process.platform !== 'win32') {
    if (!fs.existsSync(jdkDir)) {
        console.log("Starting installation of portable JDK for Linux x64...");
        const tarPath = path.join(__dirname, 'jdk.tar.gz');
        
        try {
            // Download latest JDK 17 for Linux x64 using curl
            console.log("Downloading JDK from Adoptium API...");
            execSync(`curl -L -o "${tarPath}" "https://api.adoptium.net/v3/binary/latest/17/ga/linux/x64/jdk/hotspot/normal/eclipse?project=jdk"`);
            
            console.log("Extracting JDK...");
            fs.mkdirSync(jdkDir, { recursive: true });
            execSync(`tar -xzf "${tarPath}" -C "${jdkDir}" --strip-components=1`);
            
            console.log("Cleaning up archive...");
            fs.unlinkSync(tarPath);
            console.log("Portable JDK installed successfully at:", jdkDir);
        } catch (error) {
            console.error("Failed to install portable JDK:", error.message);
            // Don't crash the build if JDK fails, but log it
        }
    } else {
        console.log("Portable JDK already exists.");
    }
} else {
    console.log("Running on Windows, skipping portable Linux JDK download.");
}
