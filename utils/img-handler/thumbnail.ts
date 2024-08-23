import { PutObjectCommand } from '@aws-sdk/client-s3';
import sharp from 'sharp';
import S3 from './S3';

/**
 * 压缩图片为缩略图，返回缩略图的URL
 */
export default async function generateThumbnail(
  imageBuffer: ArrayBuffer,
  fileName: string,
  type: 'cover' | 'detail' | 'avatar' | 'background' | 'label_cover',
  returnObj = false
) {
  const metadata = await sharp(imageBuffer).metadata();
  if (!metadata.width || !metadata.height) {
    throw new Error('Cannot get image size');
  }

  let leastLength: number;
  if (type === 'cover') {
    const maxSide = Math.max(metadata.width, metadata.height);
    leastLength = maxSide < 400 ? maxSide : 400;
  } else if (type === 'detail') {
    const maxSide = Math.max(metadata.width, metadata.height);
    leastLength = maxSide < 800 ? maxSide : 800;
  } else if (type === 'background') {
    const maxSide = Math.max(metadata.width, metadata.height);
    leastLength = maxSide < 1200 ? maxSide : 1200;
  } else {
    leastLength = 200;
  }

  const newWidth = metadata.width > metadata.height ? null : leastLength;
  const newHeight = metadata.height > metadata.width ? null : leastLength;

  const fileBuffer = await sharp(imageBuffer)
    .resize(newWidth, newHeight)
    .jpeg({ quality: 80 })
    .toBuffer();

  const targetPath = 'images/image-' + fileName + '-' + type + '-thumbnail.jpg';

  const putCommand = new PutObjectCommand({
    Bucket: process.env.R2_BUCKET,
    Key: targetPath,
    Body: fileBuffer,
  });

  await S3.send(putCommand);
  const resultUrl = `https://${process.env.R2_DOMAIN}/${targetPath}`;

  if (returnObj) {
    const thumbnailMetadata = await sharp(fileBuffer).metadata();
    if (!thumbnailMetadata.width || !thumbnailMetadata.height) {
      throw new Error('Cannot get thumbnail size');
    }
    return {
      url: resultUrl,
      width: thumbnailMetadata.width,
      height: thumbnailMetadata.height,
    };
  } else {
    return resultUrl;
  }
}
