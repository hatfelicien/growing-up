import fs from 'fs';
import https from 'https';
import path from 'path';

const download = (url, filepath) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(filepath);
        https.get(url, (response) => {
            response.pipe(file);
            file.on('finish', () => {
                file.close();
                console.log(`Downloaded: ${filepath}`);
                resolve();
            });
        }).on('error', (err) => {
            fs.unlink(filepath, () => { }); // Delete the file async. (But we don't check the result)
            reject(err.message);
        });
    });
};

const run = async () => {
    try {
        await download('https://placehold.co/192x192/8b5cf6/ffffff.png?text=Growing+Up', 'public/pwa-192x192.png');
        await download('https://placehold.co/512x512/ec4899/ffffff.png?text=Growing+Up', 'public/pwa-512x512.png');
        console.log('Icons downloaded successfully.');
    } catch (error) {
        console.error('Error downloading icons:', error);
        process.exit(1);
    }
};

run();
