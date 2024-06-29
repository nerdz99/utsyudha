// Gird.tsx
import React from 'react';
import GridEdge from './GridEdge';
import { grids } from './constants';
import GridRow from './GridRow';
import GridCol from './GridCol';

function Grid(): React.ReactElement {
  const renderRow = (row: any, rowIndex: number) => {
    return row.map((col: any, colIndex: number) => {
      if (col === undefined) return <GridCol key={`${rowIndex}-${colIndex}`} />;

      const { justifyContent, alignSelf, top, left, bottom, right } = col;

      return (
        <GridCol key={`${rowIndex}-${colIndex}`} style={{ justifyContent }}>
          <GridEdge {...{ top, left, bottom, right, alignSelf }} />
        </GridCol>
      );
    });
  };

  return (
    <>
      {grids.map((row, rowIndex) => {
        return (
          <GridRow key={`r-${rowIndex}`}>{renderRow(row, rowIndex)}</GridRow>
        );
      })}
    </>
  );
}

export default React.memo(Grid);
