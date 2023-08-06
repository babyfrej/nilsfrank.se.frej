import { PropsWithChildren } from "react";

type Props = PropsWithChildren<{}>;
export default function MagicText({ children }: Props): JSX.Element {
  return <span className="magic-text">{children}</span>;
}
