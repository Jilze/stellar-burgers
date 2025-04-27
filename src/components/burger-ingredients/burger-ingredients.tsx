import { useState, useRef, useEffect, FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { useSelector } from '../../services/store';
import { TTabMode } from '@utils-types';
import { BurgerIngredientsUI, Preloader } from '@ui';
import {
  getIngredients,
  getIngredientsState,
  getIngredientsLoadingState
} from '../../slices/ingredients';

export const BurgerIngredients: FC = () => {
  const ingredients = useSelector(getIngredients),
    loading = useSelector(getIngredientsLoadingState),
    state = useSelector(getIngredientsState);

  const [currentTab, setCurrentTab] = useState<TTabMode>('bun');

  const [bunsRef, inViewBuns] = useInView({ threshold: 0 }),
    [mainsRef, inViewFilling] = useInView({ threshold: 0 }),
    [saucesRef, inViewSauces] = useInView({ threshold: 0 });

  const refs: Record<TTabMode, React.RefObject<HTMLHeadingElement>> = {
    bun: useRef(null),
    main: useRef(null),
    sauce: useRef(null)
  };

  useEffect(() => {
    if (inViewBuns) setCurrentTab('bun');
    else if (inViewSauces) setCurrentTab('sauce');
    else if (inViewFilling) setCurrentTab('main');
  }, [inViewBuns, inViewFilling, inViewSauces]);

  const onTabClick = (val: string) => {
    const tab = val as TTabMode;
    setCurrentTab(tab);
    refs[tab]?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (state.error) return <p>Упс... что-то пошло не так...</p>;
  if (loading) return <Preloader />;

  return (
    <BurgerIngredientsUI
      currentTab={currentTab}
      buns={ingredients.filter((i) => i.type === 'bun')}
      mains={ingredients.filter((i) => i.type === 'main')}
      sauces={ingredients.filter((i) => i.type === 'sauce')}
      titleBunRef={refs.bun}
      titleMainRef={refs.main}
      titleSaucesRef={refs.sauce}
      bunsRef={bunsRef}
      mainsRef={mainsRef}
      saucesRef={saucesRef}
      onTabClick={onTabClick}
    />
  );
};
