// src/components/Provider.tsx
import React from 'react';

interface IState {
  imageUri: string;
  setImageUri: React.Dispatch<any>;
  manipulator: {
    visible: boolean;
    label: string;
    setVisible: React.Dispatch<any>;
  };
}

const initialState: IState = {
  imageUri: '',
  setImageUri: () => {},
  manipulator: {
    visible: false,
    label: 'Rotate',
    setVisible: () => {},
  },
};

interface IProviderProps {
  children: React.ReactNode;
  uri: string;
}

export const EditorContext = React.createContext(initialState);
export const Provider = (props: IProviderProps) => {
  const { uri, children } = props;
  const [imageUri, setImageUri] = React.useState(uri);
  const [visible, setVisible] = React.useState(false);

  return (
    <EditorContext.Provider
      value={{
        imageUri,
        setImageUri,
        manipulator: {
          visible,
          setVisible,
          label: '',
        },
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};
export const Consumer = EditorContext.Consumer;
export const useProvider = () => React.useContext(EditorContext);
