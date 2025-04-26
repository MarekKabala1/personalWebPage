import { ConvexProvider, ConvexReactClient } from 'convex/react';
import { type FunctionComponent, type JSX } from 'react';

const client = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);

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
