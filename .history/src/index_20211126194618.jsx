import ForgeUI, { render, Fragment, Text, IssuePanel } from '@forge/ui';
import 

const App = () => {
  return (
    <Fragment>
      <Text>Hello world, I'm Naphtali</Text>
      <Text>Second Trial again</Text>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
