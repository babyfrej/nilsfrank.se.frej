import { type PropsWithChildren } from "react";
import { Markdown } from "../markdown";
import { Bag } from "./bag";
import { Lolipop } from "./lolipop";
import { OrangeCandy } from "./orange-candy";
import { YellowCandy } from "./yellow-candy";
import { PurpleCandy } from "./purple-candy";
import { Gum } from "./gum";
import {
  candyBag,
  candyShadow,
  titleCardContainer,
  titleCardTitle,
} from "./styles.css";

export function BlueyTitleCard({ children }: PropsWithChildren) {
  return (
    <div className={titleCardContainer}>
      <div className={candyBag}>
        <Bag className={candyShadow} style={{ width: "200px" }} />
        <PurpleCandy
          className={candyShadow}
          style={{
            width: "60px",
            translate: "-70px 70px",
          }}
        />
        <Gum
          className={candyShadow}
          style={{ width: "40px", translate: "-50px 80px" }}
        />
        <OrangeCandy
          className={candyShadow}
          style={{ width: "60px", translate: "70px 70px" }}
        />
        <Lolipop
          className={candyShadow}
          style={{ width: "70px", translate: "-6px 70px" }}
        />
        <YellowCandy
          className={candyShadow}
          style={{ width: "60px", translate: "98px 80px" }}
        />
      </div>
      {children}
    </div>
  );
}

export function BlueyTitleCardTitle({ children }: PropsWithChildren) {
  return <h1 className={titleCardTitle}>{children}</h1>;
}

export function BlueyTitleCardDescription({
  description,
}: {
  description: string;
}) {
  return <Markdown content={description} />;
}
