/**
 *
 * TextareaAutocomplete
 *
 */

import React, { memo, useState, useRef } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { TextareaAutosize } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';
import { InsertEmoticon } from '@material-ui/icons';
import IconButton from '@material-ui/core/IconButton';
import ReactTextareaAutocomplete from '@webscopeio/react-textarea-autocomplete';
import '@webscopeio/react-textarea-autocomplete/style.css';
import { Picker, emojiIndex } from 'emoji-mart';
import 'emoji-mart/css/emoji-mart.css';
import PropTypes from 'prop-types';

const Item = ({ entity: { colons, native } }) => (
  <div>{`${colons} ${native}`}</div>
);

Item.propTypes = {
  entity: PropTypes.object,
};

const UserItem = ({ entity: { uid, displayName }, handleUserItem }) => (
  <div
    role="button"
    tabIndex="0"
    onKeyPress={() => handleUserItem(uid, displayName)}
    onClick={() => {
      handleUserItem(uid, displayName);
    }}
  >
    {displayName}
  </div>
);

UserItem.propTypes = {
  entity: PropTypes.object,
  handleUserItem: PropTypes.func,
};

const AutoTextArea = React.forwardRef((props, ref) => (
  <TextareaAutosize {...props} ref={ref} />
));

const userSuggestions = async token => {
  const { data } = await axios.get('api/user/suggestion', {
    params: { q: token },
  });
  return _.slice(data, 0, 7);
};

function TextareaAutocomplete(props) {
  const {
    parseText,
    setParseText,
    textDetail,
    setTextDetail,
    disabled,
    placeholder,
    rows,
  } = props;

  const handleUserItem = (uid, displayName) => {
    setTextDetail([...textDetail, { k: uid, v: displayName }]);
  };

  const textArea = useRef(null);

  const handleEmojiPicker = native => {
    const caretPosition = textArea.current.getCaretPosition();
    setParseText(
      `${parseText.slice(0, caretPosition)}${native}${parseText.slice(
        caretPosition,
      )}`,
    );
    setTimeout(() => {
      textArea.current.setCaretPosition(caretPosition + 2);
    }, 0);
  };

  const [pickerAnchorEl, setPickerAnchorEl] = useState(null);

  return (
    <>
      <div style={{ position: 'relative' }}>
        <ReactTextareaAutocomplete
          trigger={{
            ':': {
              dataProvider: token => emojiIndex.search(token).slice(0, 7),
              component: Item,
              output: item => item.native,
            },
            '@': {
              dataProvider: token => userSuggestions(token),
              component: allProps => (
                <UserItem {...allProps} handleUserItem={handleUserItem} />
              ),
              output: user => `@${user.displayName}`,
            },
          }}
          loadingComponent={() => null}
          disabled={disabled}
          style={{
            width: '100%',
            resize: 'none',
            padding: 10,
          }}
          dropdownStyle={{ zIndex: 1 }}
          textAreaComponent={AutoTextArea}
          ref={textArea}
          movePopupAsYouType
          minChar={1}
          value={parseText}
          onChange={e => setParseText(e.target.value)}
          placeholder={placeholder}
          rows={rows}
        />
        <IconButton
          onClick={e => setPickerAnchorEl(e.currentTarget)}
          style={{ position: 'absolute', bottom: 5, right: 0 }}
          disabled={disabled}
        >
          <InsertEmoticon />
        </IconButton>
      </div>

      <Popover
        open={Boolean(pickerAnchorEl)}
        anchorEl={pickerAnchorEl}
        onClose={() => setPickerAnchorEl(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        <Picker
          native
          showPreview={false}
          showSkinTones={false}
          useButton={false}
          title={null}
          onSelect={({ native }) => handleEmojiPicker(native)}
        />
      </Popover>
    </>
  );
}

TextareaAutocomplete.propTypes = {
  parseText: PropTypes.string,
  setParseText: PropTypes.func,
  textDetail: PropTypes.oneOfType([PropTypes.array, PropTypes.string]),
  setTextDetail: PropTypes.func,
  disabled: PropTypes.bool,
  placeholder: PropTypes.string,
  rows: PropTypes.number,
};

export default memo(TextareaAutocomplete);
