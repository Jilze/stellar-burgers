import { FC, memo } from 'react';
import { BurgerConstructorElementUI } from '@ui';
import { BurgerConstructorElementProps } from './type';
import { useSelector, useDispatch } from '../../services/store';
import {
  constructorSelector,
  deleteItem,
  updateAll
} from '../../slices/constructor';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();
    const { ingredients } = useSelector(constructorSelector.selectItems);

    const handleMove = (step: number) => () => {
      const newIngredients = [...ingredients];
      [newIngredients[index], newIngredients[index + step]] = [
        newIngredients[index + step],
        newIngredients[index]
      ];
      dispatch(updateAll(newIngredients));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMove(-1)}
        handleMoveDown={handleMove(1)}
        handleClose={() => dispatch(deleteItem(ingredient))}
      />
    );
  }
);
