import ForgeUI, { render, Fragment, Text, IssuePanel } from '@forge/ui';

const App = () => {
  return (
    <Fragment>
      <Text>Hello world, I'm Naphtali</Text>
      <Text>Second Tris</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
