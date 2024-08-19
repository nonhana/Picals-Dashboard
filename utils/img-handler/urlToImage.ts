import prisma from '@/prisma';
import * as p from '@prisma/client';
import fetch from 'node-fetch';
import sharp from 'sharp';
import generateThumbnail from './thumbnail';

/**
 * @description 根据插画的原图地址，将图片信息读取后存入Image表中
 */
export default async function urlToImage(url: string, illustrationId: string) {
  const imageRecord = await prisma.images.findFirst({
    where: {
      originUrl: url,
    },
  });
  if (imageRecord) return; // 如果已经存在则跳过

  const newImage: p.Prisma.imagesCreateInput = {
    originUrl: '',
    originWidth: 0,
    originHeight: 0,
    thumbnailUrl: '',
    thumbnailWidth: 0,
    thumbnailHeight: 0,
  };

  const response = await fetch(url);
  const buffer = await response.arrayBuffer();
  const image = sharp(buffer);
  const metadata = await image.metadata();

  if (!metadata.width || !metadata.height) {
    throw new Error('Cannot get image size');
  }

  newImage.originWidth = metadata.width;
  newImage.originHeight = metadata.height;

  const fileName = url.split('/').pop()!.split('.')[0];
  const result = (await generateThumbnail(buffer, fileName, 'detail')) as {
    url: string;
    width: number;
    height: number;
  };
  newImage.thumbnailUrl = result.url;
  newImage.thumbnailWidth = result.width;
  newImage.thumbnailHeight = result.height;
  newImage.illustrations = { connect: { id: illustrationId } };

  return await prisma.images.create({ data: newImage });
}
