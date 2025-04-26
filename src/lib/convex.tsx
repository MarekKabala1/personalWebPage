import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { type FunctionComponent, type JSX } from 'react';

const convexUrl = import.meta.env.PUBLIC_CONVEX_URL;

if (!convexUrl) {
  console.error('CONVEX_URL is not provided');
}

const client = new ConvexReactClient(convexUrl);

export function withConvexProvider<Props extends JSX.IntrinsicAttributes>(
  Component: FunctionComponent<Props>,
) {
  return function WithConvexProvider(props: Props) {
    return (
      <ConvexProvider client={client}>
        <Component {...props} />
      </ConvexProvider>
    );
  };
}
