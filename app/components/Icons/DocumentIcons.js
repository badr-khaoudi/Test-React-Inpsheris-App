/**
 *
 * DocumentIcons
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import SvgIcon from '@material-ui/core/SvgIcon';
import { ReactComponent as Default } from 'images/icons/Default_icon.svg';
import { ReactComponent as IMAGE } from 'images/icons/IMAGE_icon.svg';
import { ReactComponent as PDF } from 'images/icons/PDF_icon.svg';
import { ReactComponent as PPT } from 'images/icons/PPT_icon.svg';
import { ReactComponent as Video } from 'images/icons/Video_icon.svg';
import { ReactComponent as Word } from 'images/icons/Word_icon.svg';
import { ReactComponent as XLS } from 'images/icons/XLS_icon.svg';
import { ReactComponent as ZipFile } from 'images/icons/Zip_File_icon.svg';
import Folder from './Folder';

function DocumentIcons({ type, ...props }) {
  switch (type) {
    case 'folder':
    case 'Folder':
    case 'application/vnd.google-apps.folder':
      return <Folder {...props} />;
    case 'application/zip':
      return <SvgIcon component={ZipFile} viewBox="0 0 52 60" {...props} />;
    case 'pdf':
    case 'PDF':
    case 'application/pdf':
      return <SvgIcon component={PDF} viewBox="0 0 49 56" {...props} />;
    case 'm4v':
    case 'mp4':
    case 'mov':
    case 'asf':
    case 'avi':
    case 'wmv':
    case 'm2ts':
    case '3g2':
    case '3gp2':
    case '3gpp':
    case 'Video':
    case 'video/mp4':
    case 'VideoGallery':
      return <SvgIcon component={Video} viewBox="0 0 50 44" {...props} />;
    case 'gif':
    case 'jpg':
    case 'jpeg':
    case 'bmp':
    case 'png':
    case 'tif':
    case 'tiff':
    case 'Image':
    case 'image/jpeg':
    case 'image/png':
      return <SvgIcon component={IMAGE} viewBox="0 0 57 53" {...props} />;
    case 'pptx':
    case 'ppt':
    case 'Powerpoint':
      return <SvgIcon component={PPT} viewBox="0 0 52 59" {...props} />;
    case 'xlsx':
    case 'xls':
    case 'csv':
    case 'Excel':
    case 'application/octet-stream':
    case 'application/vnd.ms-excel.sheet.macroEnabled.12':
      return <SvgIcon component={XLS} viewBox="0 0 58 56" {...props} />;
    case 'docx':
    case 'doc':
    case 'Word':
    case 'application/vnd.google-apps.document':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <SvgIcon component={Word} viewBox="0 0 57 55" {...props} />;
    default:
      return <SvgIcon component={Default} viewBox="0 0 53 61" {...props} />;
  }
}

DocumentIcons.propTypes = { type: PropTypes.string };

export default memo(DocumentIcons);
