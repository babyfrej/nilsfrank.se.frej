import { type PropsWithChildren } from "react";
import { Markdown } from "../markdown";
import { Bag } from "./bag";
import { Lolipop } from "./lolipop";
import { OrangeCandy } from "./orange-candy";
import { YellowCandy } from "./yellow-candy";
import { PurpleCandy } from "./purple-candy";
import { Gum } from "./gum";
import * as css from "./styles.css";
import clsx from "clsx";

export function BlueyTitleCard({ children }: PropsWithChildren) {
  return (
    <div className={css.titleCardContainer}>
      <div className={css.candyBagWrapper}>
        <Bag className={clsx(css.candyBag, css.candyShadow)} />
        <PurpleCandy className={clsx(css.purpleCandy, css.candyShadow)} />
        <Gum className={clsx(css.gum, css.candyShadow)} />
        <OrangeCandy className={clsx(css.orangeCandy, css.candyShadow)} />
        <Lolipop className={clsx(css.lolipop, css.candyShadow)} />
        <YellowCandy className={clsx(css.yellowCandy, css.candyShadow)} />
      </div>
      {children}
    </div>
  );
}

export function BlueyTitleCardTitle({ children }: PropsWithChildren) {
  return <h1 className={css.titleCardTitle}>{children}</h1>;
}

export function BlueyTitleCardDescription({
  description,
}: {
  description: string;
}) {
  return <Markdown content={description} />;
}
