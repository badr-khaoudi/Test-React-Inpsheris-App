/**
 *
 * Tab
 *
 */

import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { sortableHandle } from 'react-sortable-hoc';
import _ from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import Dropzone from 'react-dropzone';
import {
  Grid,
  TextField,
  FormControlLabel,
  Typography,
} from '@material-ui/core';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Autocomplete from '@material-ui/lab/Autocomplete';
import {
  Close,
  DragHandle as DragHandleIcon,
  ViewList,
  ViewModule,
} from '@material-ui/icons';
import { useEffectAfterMount } from 'utils/helpers/useEffectAfterMount';
import { makeSelectTabTypeList, makeSelectHasContent } from './selectors';
import { hasContent as hasContentAction } from './actions';

const DragHandle = sortableHandle(() => (
  <IconButton>
    <DragHandleIcon fontSize="small" />
  </IconButton>
));

const displayModeNoAllow = [
  'GDrive',
  'Files',
  'Sharepoint',
  'DocumentTree',
  'Chat',
  'Applinks',
];

function Tab({
  tab,
  handleTab,
  handleDeleteTab,
  authorizeShare,
  addDescription,
  isLinkMicrosoftTeam,
  linkMicrosoftChannel,
  linkDocumentLibrary,
}) {
  const tabTypeList = useSelector(makeSelectTabTypeList());
  const handleFileUpload = files => {
    if (!_.isEmpty(files)) {
      const reader = new FileReader();
      reader.readAsBinaryString(_.head(files));
      reader.onload = e => handleTab('keyFile', btoa(e.target.result));
    }
  };
  useEffectAfterMount(() => {
    handleTab('tabName', tab.tabType);
  }, [tab.tabType]);

  const dispatch = useDispatch();
  const handleTabType = e => {
    if (_.startsWith(tab.uid, 'TAB-')) {
      handleTab('tabType', e.target.value);
      return;
    }
    dispatch(hasContentAction({ tabType: e.target.value, tabUid: tab.uid }));
  };
  const hasContent = useSelector(makeSelectHasContent(tab.uid));
  useEffectAfterMount(() => {
    if (hasContent && !hasContent.hasContent) {
      handleTab('tabType', hasContent.tabType);
    }
  }, [hasContent]);

  return (
    <Paper variant="outlined" square style={{ padding: 8 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography variant="h6">{tab.tabName}</Typography>
            </Grid>
            <Grid item>
              <DragHandle />
              <IconButton onClick={handleDeleteTab}>
                <Close fontSize="small" />
              </IconButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <TextField
                label="Nom"
                variant="outlined"
                fullWidth
                size="small"
                value={tab.tabName}
                onChange={e => handleTab('tabName', e.target.value)}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tab Type"
                variant="outlined"
                fullWidth
                size="small"
                select
                value={tab.tabType}
                onChange={handleTabType}
              >
                {_.map(_.without(tabTypeList, 'Chat', 'Applinks'), tabType => (
                  <MenuItem key={tabType} value={_.toLower(tabType)}>
                    {tabType}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            {!_.includes(displayModeNoAllow, tab.tabType) && (
              <Grid item xs={4}>
                <ButtonGroup disableElevation color="primary">
                  <Button
                    startIcon={<ViewList />}
                    onClick={() => handleTab('displayMode', 'list')}
                    variant={
                      tab.displayMode === 'list' ? 'contained' : 'outlined'
                    }
                  >
                    List
                  </Button>
                  <Button
                    startIcon={<ViewModule />}
                    onClick={() => handleTab('displayMode', 'grid')}
                    variant={
                      tab.displayMode === 'grid' ? 'contained' : 'outlined'
                    }
                  >
                    Grid
                  </Button>
                </ButtonGroup>
              </Grid>
            )}
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tab.tabSelected}
                        onChange={e =>
                          handleTab('tabSelected', e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Actif"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tab.privated}
                        onChange={e => handleTab('privated', e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Privé"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={tab.defaultSelected}
                        onChange={e =>
                          handleTab('defaultSelected', e.target.checked)
                        }
                        color="primary"
                      />
                    }
                    label="Sélectionné par défaut"
                  />
                </Grid>
                <Grid item>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={tab.authorizeShare}
                        onChange={e =>
                          handleTab('authorizeShare', e.target.checked)
                        }
                        color="primary"
                        disabled={authorizeShare !== 'custom'}
                      />
                    }
                    label="Autoriser le partage"
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={2}>
                {tab.tabType === 'gdrive' && (
                  <>
                    <Grid item xs={4}>
                      <TextField
                        label="Folder GDrive Id"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={tab.folderGDrive}
                        onChange={e =>
                          handleTab('folderGDrive', e.target.value)
                        }
                      />
                    </Grid>
                    <Dropzone
                      accept="application/json"
                      maxFiles={1}
                      onDrop={handleFileUpload}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <Grid item {...getRootProps()}>
                          <input {...getInputProps()} />
                          <Button variant="outlined" color="primary">
                            GDrive Key File
                          </Button>
                        </Grid>
                      )}
                    </Dropzone>
                  </>
                )}
                {tab.tabType === 'search' && (
                  <Grid item xs={4}>
                    <Autocomplete
                      fullWidth
                      multiple
                      freeSolo
                      clearOnBlur
                      limitTags={5}
                      size="small"
                      value={tab.searchKeys}
                      onChange={(event, newValue) =>
                        handleTab('searchKeys', newValue)
                      }
                      options={[]}
                      renderInput={params => (
                        <TextField
                          {...params}
                          label="Recherche clé"
                          variant="outlined"
                        />
                      )}
                    />
                  </Grid>
                )}
                {tab.tabType === 'collection' && isLinkMicrosoftTeam && (
                  <>
                    <Grid item>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={tab.isMicrosoftChannel}
                            onChange={e =>
                              handleTab('isMicrosoftChannel', e.target.checked)
                            }
                            color="primary"
                          />
                        }
                        label="Est Microsoft Channel?"
                      />
                    </Grid>
                    {tab.isMicrosoftChannel && (
                      <>
                        <Grid item>
                          <Button
                            onClick={linkMicrosoftChannel}
                            variant="outlined"
                            color="primary"
                          >
                            {tab.microsoftChannelId
                              ? 'Changer de MS Channel'
                              : 'Lien de MS Channel'}
                          </Button>
                        </Grid>
                        <Grid item xs={12}>
                          <TextField
                            label="URL relative du dossier Sharepoint"
                            variant="outlined"
                            fullWidth
                            size="small"
                            value={tab.microsoftChannelSharedDocument || ''}
                            disabled
                          />
                        </Grid>
                      </>
                    )}
                  </>
                )}
                {tab.tabType === 'sharepoint' && (
                  <>
                    <Grid item xs={12}>
                      <TextField
                        label="URL relative du dossier Sharepoint"
                        variant="outlined"
                        fullWidth
                        size="small"
                        value={tab.folderSharepoint || ''}
                        disabled
                      />
                    </Grid>
                    <Grid item>
                      <Button
                        onClick={linkDocumentLibrary}
                        variant="outlined"
                        color="primary"
                      >
                        Lien bibliothèque de documents
                      </Button>
                    </Grid>
                  </>
                )}
                {tab.tabType === 'joboffer' && (
                  <Grid item xs={4}>
                    <TextField
                      label="Json URL"
                      variant="outlined"
                      fullWidth
                      size="small"
                      value={tab.keyFile}
                      onChange={e => handleTab('keyFile', e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item>
                  <Button
                    onClick={addDescription}
                    variant="outlined"
                    color="primary"
                  >
                    {_.isEmpty(tab.descriptionBlocks)
                      ? 'Ajouter une description'
                      : 'Editer la description'}
                  </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  );
}

Tab.propTypes = {
  tab: PropTypes.object,
  handleTab: PropTypes.func,
  handleDeleteTab: PropTypes.func,
  authorizeShare: PropTypes.string,
  addDescription: PropTypes.func,
  isLinkMicrosoftTeam: PropTypes.bool,
  linkMicrosoftChannel: PropTypes.func,
  linkDocumentLibrary: PropTypes.func,
};

export default memo(Tab);
