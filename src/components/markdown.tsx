import { MDXRemote, type MDXRemoteProps } from "next-mdx-remote/rsc";
import Link from "next/link";
import type { AnchorHTMLAttributes } from "react";

export default async function Home() {}
export function Markdown({ content }: { content: string }) {
  return <MDXRemote source={content} components={components} />;
}

const components = {
  a: ({ href, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) => (
    <Link href={href as string} {...props} />
  ),
} satisfies MDXRemoteProps["components"];
