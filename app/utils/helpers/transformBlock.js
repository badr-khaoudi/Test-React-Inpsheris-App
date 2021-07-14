import { validate as uuidValidate } from 'uuid';

const transformLink = item => ({
  location: item.location,
  description: item.description,
  title: item.title,
  thumbnail_width: item.thumbnail_width,
  path: item.path,
  thumbnail_url: item.thumbnail_url,
  version: item.version,
  subTitle: item.subTitle,
  type: item.type,
  thumbnail_height: item.thumbnail_height,
  favicon: item.favicon,
});

const transformDocument = item => ({
  uid: item.uid,
  isInternal: item.isInternal,
  fileName: item.fileName,
  mimeType: item.mimeType,
  createdDate: item.createdDate,
  webViewLink: item.webViewLink,
  externalSource: item.externalSource,
});

const transformImage = item => ({
  uid: item.uid,
  isInternal: item.isInternal,
  fileName: item.fileName,
  mimeType: item.mimeType,
  createdDate: item.createdDate,
  webViewLink: item.webViewLink,
  thumbGalleryUrl: item.thumbGalleryUrl,
  externalSource: item.externalSource,
});

const transformVideo = item => ({
  embedVideo: item.embedVideo,
  embedVideoTitle: item.embedVideoTitle,
  url: item.url,
  description: item.description,
  originalThumbUrl: item.originalThumbUrl,
  thumbUrl: item.thumbUrl,
  videoName: item.videoName,
  handle: item.handle,
  videoFormat: item.videoFormat,
  videoUrl: item.videoUrl,
  thumbName: item.thumbName,
  thumbUid: item.thumbUid,
  isDefaultThumb: item.isDefaultThumb,
  internalVideo: item.internalVideo,
  id: uuidValidate(item.id) ? undefined : item.id,
  originalPath: item.originalPath,
  source: item.source,
  status: item.status,
  container: item.container,
  uploadId: item.uploadId,
  uploadedFrom: item.uploadedFrom,
});

export { transformLink, transformDocument, transformImage, transformVideo };
