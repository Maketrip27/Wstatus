import React from 'react';
import { RefreshControl } from 'react-native';
import { Container, Content } from 'native-base';
import AppHeader from './Header';
import Loader from './loading';
import theme from '../config/config';

const WithContainer = ({
  isHeader,
  title,
  leftClick,
  leftIcon,
  rightIcon,
  onRightClick,
  isLoading,
  contentStyle,
  containerStyle,
  refreshing,
  onRefresh,
  children,
  refresh,
  content,
  outSideContent,
  hideHeader
}) => {
  let child = null;
  if (isLoading) child = <Loader />;
  else
    if (refresh) {
      child = (
        <Content
          contentContainerStyle={containerStyle}
          style={contentStyle}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          )}

        >
          {children}
        </Content>
      );
    } else if (content) {
      child = (
        <Content
          contentContainerStyle={containerStyle}
          style={contentStyle}
        >
          {children}
        </Content>
      );
    } else {
      child = children;
    }

  return (
    <Container style={[{ backgroundColor: theme.backgroundColor }]}>
      {!hideHeader &&<AppHeader
        title={title}
        onLeftClick={leftClick}
        leftIcon={leftIcon}
        rightIcon={rightIcon}
        onRightClick={onRightClick}
        isHeader={isHeader}
      />}
      {child}
      {outSideContent && outSideContent}
    </Container>
  );
};

export default WithContainer;
