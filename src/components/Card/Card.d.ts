
export interface CardProps {

  className?: string;
  showAnimation?:string;
  hideAnimation?:string;
  setVisibility:"show" | "hide"

}

export default function Card(props: CardProps): JSX.Element;