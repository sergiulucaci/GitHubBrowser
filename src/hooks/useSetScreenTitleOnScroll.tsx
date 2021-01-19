import { useState } from 'react';
import { NativeScrollEvent, NativeSyntheticEvent } from 'react-native';
import { Navigation } from 'react-native-navigation';

// This hook is used where the screen can have a top navigation title or a container title.
// Depending on the y layout position, the top navigation title or the screen container title will be shown or not.
const useSetScreenTitleOnScroll = ({
  componentId,
  title,
  additionalPadding,
}: {
  componentId: string;
  title: string;
  additionalPadding?: number;
}) => {
  const [titleShownInTopNav, setTitleShownInTopNav] = useState(false);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const yOffset = event.nativeEvent.contentOffset.y;
    const EXTRA_OFFSET = additionalPadding || 0;
    const HIDDEN_CONTAINER_TITLE_OFFSET = 26 + EXTRA_OFFSET;
    // If scroll action hides container title and title is shown already in top nav, do nothing
    if (yOffset > HIDDEN_CONTAINER_TITLE_OFFSET && titleShownInTopNav) {
      return;
    }
    // If scroll action starts to hide a part of the container title, hide border and top nav title
    if (yOffset > 1 && yOffset <= HIDDEN_CONTAINER_TITLE_OFFSET) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          noBorder: false,
          title: {
            text: '',
          },
        },
      });
      if (titleShownInTopNav) {
        setTitleShownInTopNav(false);
      }
      // If scroll action hides the entire container title, show top nav title
    } else if (yOffset > HIDDEN_CONTAINER_TITLE_OFFSET) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: title,
          },
        },
      });
      setTitleShownInTopNav(true);
      // If scroll action is reset to zero, hide border and top nav title
    } else if (yOffset < 1) {
      Navigation.mergeOptions(componentId, {
        topBar: {
          title: {
            text: '',
          },
          noBorder: true,
        },
      });
      if (titleShownInTopNav) {
        setTitleShownInTopNav(false);
      }
    }
  };

  return { onScroll };
};

export default useSetScreenTitleOnScroll;
