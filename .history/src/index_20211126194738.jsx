import ForgeUI, { render, Fragment, Text, IssuePanel } from '@forge/ui';
import api, { route } from '@forge/api';

const App = () => {
  return (
    <Fragment>
      <Text>Hello world, I'm Naphtali</Text>
      <Text>Second Trial again</Text>
    </Fragment>
  );
};
// 
const fetchCommentsForIssue = async (issueId) => {
  const res = await api
    .asUser()
    .requestJira(route`/rest/api/3/issue/${issueId}/comment`);

  const data = await res.json();
  return data.comments;
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
