import fs from 'fs';
import path from 'path';
import * as tar from 'tar';
import archiver from 'archiver';
import decompress from 'decompress-archive';
import Seven from 'node-7z';
const { add, extractFull } = Seven;

export async function compress(inputDir, outputPath) {
    const ext = path.extname(outputPath);
    if (ext === '.tar.gz') {
        await tar.c({ gzip: true, file: outputPath }, [inputDir]);
    } else if (ext === '.zip') {
        await new Promise((res, rej) => {
            const output = fs.createWriteStream(outputPath);
            const archive = archiver('zip', { zlib: { level: 9 } });
            archive.pipe(output);
            archive.directory(inputDir, false);
            archive.finalize();
            output.on('close', res);
            archive.on('error', rej);
        });
    } else if (ext === '.7z') {
        await add(outputPath, inputDir);
    } else {
        throw new Error(`Unsupported format ${ext}`);
    }
}

export async function extract(archivePath, destDir = '.') {
    const ext = path.extname(archivePath);
    if (ext === '.gz' || archivePath.endsWith('.tar.gz')) {
        await tar.x({ file: archivePath, C: destDir });
    } else if (ext === '.zip') {
        await new Promise((res, rej) => {
            decompress(archivePath, destDir, err => {
                if (err) rej(err);
                else res();
            });
        });
    } else if (ext === '.7z') {
        await extractFull(archivePath, destDir);
    } else {
        throw new Error(`Unsupported format ${ext}`);
    }
}
