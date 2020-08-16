import { StandardProps } from '..';

export interface PagingProps {
  /**
   * If `true`, the card will use raised styling.
   */
  currentIndex?: number;
}

export default function Card(props: PagingProps): JSX.Element;