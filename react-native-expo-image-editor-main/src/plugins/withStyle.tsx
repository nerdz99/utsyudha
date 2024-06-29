import React from 'react';

export default function withStyle(WrappedComponent: any, styles: any) {
  return class extends React.Component<any, any> {
    render() {
      return (
        <WrappedComponent {...this.props} style={[styles, this.props.style]} />
      );
    }
  };
}
