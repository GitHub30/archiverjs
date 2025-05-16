import fs from 'fs';
import { promises as fsp } from 'fs';
import path from 'path';
import * as tar from 'tar';
import archiver from 'archiver';
import decompress from 'decompress-archive';
import sevenBin from '7zip-bin';
import Seven from 'node-7z';
const { add, extractFull } = Seven;

export async function compress(inputDir, outputPath = null) {
    if (outputPath === null) {
        outputPath = inputDir + '.tar.gz'
    }
    const ext = path.extname(outputPath);
    if (ext === '.gz') {
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
        await fsp.chmod(sevenBin.path7za, 0o755);
        await add(outputPath, inputDir, {
            $bin: sevenBin.path7za,
        });
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
        await fsp.chmod(sevenBin.path7za, 0o755);
        await extractFull(archivePath, destDir, {
            $bin: sevenBin.path7za,
        });
    } else {
        throw new Error(`Unsupported format ${ext}`);
    }
}
