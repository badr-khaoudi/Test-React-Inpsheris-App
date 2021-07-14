/**
 *
 * ArticleBlock
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
// import styled from 'styled-components';
import CKEditor from 'ckeditor4-react';

function ArticleBlock(props) {
  const { onChangeCKEditor, data } = props;
  return (
    <CKEditor
      data={data}
      config={{
        extraPlugins: 'justify,font,iframe',
        filebrowserImageBrowseUrl: '/filebrowserImageBrowseUrl',
        filebrowserImageBrowseLinkUrl: '/filebrowserImageBrowseLinkUrl',
        removeDialogTabs: 'image:Upload',
        toolbar: [
          ['Bold', 'Italic'],
          ['BulletedList', 'NumberedList'],
          ['JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock'],
          ['Link', 'Unlink', 'Anchor'],
          ['Maximize'],
          ['FontSize'],
          ['PasteFromWord', 'RemoveFormat'],
          ['Image', 'Table', 'SpecialChar', 'Iframe'],
          ['Outdent', 'Indent'],
          ['Undo', 'Redo'],
          ['Source'],
        ],
      }}
      onChange={e => onChangeCKEditor(e.editor.getData())}
    />
  );
}

ArticleBlock.propTypes = {
  data: PropTypes.string,
  onChangeCKEditor: PropTypes.func,
};

export default ArticleBlock;
