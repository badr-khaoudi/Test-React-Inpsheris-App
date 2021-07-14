import React from 'react';

const withWidgetFunctions = OriginalWidget => {
  const ModifiedWidget = props => <OriginalWidget {...props} />;

  return ModifiedWidget;
};

export default withWidgetFunctions;
